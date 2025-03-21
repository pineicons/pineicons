const fs = require("fs").promises;
const camelcase = require("camelcase");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));
const svgr = require("@svgr/core").default;
const babel = require("@babel/core");
const { compile: compileVue } = require("@vue/compiler-dom");
const { dirname } = require("path");
const { deprecated } = require("./deprecated");

let transform = {
  react: async (svg, componentName, format, isDeprecated) => {
    let component = await svgr(svg, { ref: true, titleProp: true }, { componentName });
    let { code } = await babel.transformAsync(component, {
      plugins: [[require("@babel/plugin-transform-react-jsx"), { useBuiltIns: true }]],
    });

    // Add a deprecation warning to the component
    if (isDeprecated) {
      /** @type {string[]} */
      let lines = code.split("\n");
      lines.splice(1, 0, `/** @deprecated */`);
      code = lines.join("\n");
    }

    code = code.replace("React.forwardRef(", "/*#__PURE__*/ React.forwardRef(");

    if (format === "esm") {
      return code;
    }

    return code
      .replace('import * as React from "react"', 'const React = require("react")')
      .replace("export default", "module.exports =");
  },
  "react-native": async (svg, componentName, format, isDeprecated) => {
    // Modify SVG to use react-native-svg components
    svg = svg
      .replace(/<svg([^>]*)>/, (match, attrs) => {
        // Extract viewBox and other needed attributes
        const viewBoxMatch = attrs.match(/viewBox="([^"]*)"/);
        const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";
        return `<Svg width={size} height={size} viewBox="${viewBox}" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} {...props}>`;
      })
      .replace(/<\/svg>/, "</Svg>")
      .replace(/<path/g, "<Path")
      .replace(/<\/path>/g, "</Path>")
      .replace(/<circle/g, "<Circle")
      .replace(/<\/circle>/g, "</Circle>")
      .replace(/<rect/g, "<Rect")
      .replace(/<\/rect>/g, "</Rect>")
      .replace(/<line/g, "<Line")
      .replace(/<\/line>/g, "</Line>")
      .replace(/<polyline/g, "<Polyline")
      .replace(/<\/polyline>/g, "</Polyline>")
      .replace(/<polygon/g, "<Polygon")
      .replace(/<\/polygon>/g, "</Polygon>")
      .replace(/<ellipse/g, "<Ellipse")
      .replace(/<\/ellipse>/g, "</Ellipse>")
      .replace(/stroke="currentColor"/g, "stroke={color}")
      .replace(/fill="currentColor"/g, "fill={color}")
      .replace(/stroke-width="([^"]*)"/g, (_, width) => `strokeWidth={strokeWidth}`);

    // Create the component
    let code = `import * as React from "react";
import { Svg, Path, Circle, Rect, Line, Polyline, Polygon, Ellipse } from "react-native-svg";

${isDeprecated ? "/** @deprecated */\n" : ""}const ${componentName} = React.forwardRef(({
  color = "currentColor",
  size = 24,
  strokeWidth = 1.5,
  strokeLinecap = "round",
  strokeLinejoin = "round",
  ...props
}, ref) => (
  ${svg}
));

${componentName}.displayName = "${componentName}";

export default ${componentName};
`;

    if (format === "esm") {
      return code;
    }
    return code
      .replace('import * as React from "react"', 'const React = require("react")')
      .replace(
        'import { Svg, Path, Circle, Rect, Line, Polyline, Polygon, Ellipse } from "react-native-svg"',
        'const { Svg, Path, Circle, Rect, Line, Polyline, Polygon, Ellipse } = require("react-native-svg")'
      )
      .replace("export default", "module.exports =");
  },
  vue: (svg, componentName, format, isDeprecated) => {
    let { code } = compileVue(svg, {
      mode: "module",
    });

    // Add a deprecation warning to the component
    if (isDeprecated) {
      /** @type {string[]} */
      let lines = code.split("\n");
      lines.splice(2, 0, `/** @deprecated */`);
      code = lines.join("\n");
    }

    if (format === "esm") {
      return code.replace("export function", "export default function");
    }

    return code
      .replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+(['"])(.*?)\2/, (_match, imports, _quote, mod) => {
        let newImports = imports
          .split(",")
          .map((i) => i.trim().replace(/\s+as\s+/, ": "))
          .join(", ");

        return `const { ${newImports} } = require("${mod}")`;
      })
      .replace("export function render", "module.exports = function render");
  },
  svelte: (svg, componentName, format, isDeprecated) => {
    // Extract the content inside the SVG tag
    const svgContentMatch = svg.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    const svgContent = svgContentMatch ? svgContentMatch[1].trim() : "";

    // Create Svelte component
    // Updated for Svelte 5 compatibility while maintaining backward compatibility
    let code = `<script${format === "esm" ? ' context="module"' : ""}>
  // ${componentName} icon component
${isDeprecated ? "  /** @deprecated */\n" : ""}${
      format === "esm" ? "" : "  export "
    }default function ${componentName}($$props) {
    return {
      props: $$props,
      $$slot_def: {}
    };
  }
</script>

<svg {...$$props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
  ${svgContent}
</svg>`;

    return code;
  },
};

async function getIcons(style) {
  let files = await fs.readdir(`./optimized/${style}`);
  return Promise.all(
    files.map(async (file) => ({
      svg: await fs.readFile(`./optimized/${style}/${file}`, "utf8"),
      componentName: `${camelcase(file.replace(/\.svg$/, ""), {
        pascalCase: true,
      })}`,
      isDeprecated: deprecated.includes(file),
    }))
  );
}

function exportAll(icons, format, includeExtension = true) {
  return icons
    .map(({ componentName }) => {
      let extension = includeExtension ? ".js" : "";
      if (format === "esm") {
        return `export { default as ${componentName} } from './${componentName}${extension}'`;
      }
      return `module.exports.${componentName} = require("./${componentName}${extension}")`;
    })
    .join("\n");
}

async function ensureWrite(file, text) {
  await fs.mkdir(dirname(file), { recursive: true });
  await fs.writeFile(file, text, "utf8");
}

async function ensureWriteJson(file, json) {
  await ensureWrite(file, JSON.stringify(json, null, 2) + "\n");
}

async function buildIcons(package, style, format) {
  let outDir = `./${package}/${style}`;
  if (format === "esm") {
    outDir += "/esm";
  }

  let icons = await getIcons(style);

  await Promise.all(
    icons.flatMap(async ({ componentName, svg, isDeprecated }) => {
      let content = await transform[package](svg, componentName, format, isDeprecated);

      /** @type {string[]} */
      let types = [];

      if (package === "react") {
        types.push(`import * as React from 'react';`);
        if (isDeprecated) {
          types.push(`/** @deprecated */`);
        }
        types.push(
          `declare const ${componentName}: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;`
        );
        types.push(`export default ${componentName};`);
      } else if (package === "react-native") {
        types.push(`import * as React from 'react';`);
        if (isDeprecated) {
          types.push(`/** @deprecated */`);
        }
        types.push(
          `declare const ${componentName}: React.ForwardRefExoticComponent<{
    color?: string;
    size?: number;
    strokeWidth?: number;
    strokeLinecap?: string;
    strokeLinejoin?: string;
    [key: string]: any;
  } & React.RefAttributes<SVGSVGElement>>;`
        );
        types.push(`export default ${componentName};`);
      } else if (package === "vue") {
        types.push(`import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';`);
        if (isDeprecated) {
          types.push(`/** @deprecated */`);
        }
        types.push(`declare const ${componentName}: FunctionalComponent<HTMLAttributes & VNodeProps>;`);
        types.push(`export default ${componentName};`);
      } else if (package === "svelte") {
        // Updated types for Svelte 5 compatibility
        if (isDeprecated) {
          types.push(`/** @deprecated */`);
        }
        types.push(`import type { SvelteComponent } from 'svelte';`);
        types.push(`declare const ${componentName}: typeof SvelteComponent & {
  new (options: import('svelte').ComponentConstructorOptions): SvelteComponent<{
    [x: string]: any;
  }, {}, {}>
};`);
        types.push(`export default ${componentName};`);
      }

      return [
        ensureWrite(`${outDir}/${componentName}.js`, content),
        ...(types ? [ensureWrite(`${outDir}/${componentName}.d.ts`, types.join("\n") + "\n")] : []),
      ];
    })
  );

  await ensureWrite(`${outDir}/index.js`, exportAll(icons, format));

  await ensureWrite(`${outDir}/index.d.ts`, exportAll(icons, "esm", false));
}

/**
 * @param {string[]} styles
 */
async function buildExports(styles) {
  let pkg = {};

  // To appease Vite's optimizeDeps feature which requires a root-level import
  pkg[`.`] = {
    import: `./index.esm.js`,
    require: `./index.js`,
  };

  // For those that want to read the version from package.json
  pkg[`./package.json`] = { default: "./package.json" };

  // Backwards compatibility with v1 imports (points to proxy that prints an error message):
  pkg["./outline"] = { default: "./outline/index.js" };
  pkg["./outline/index"] = { default: "./outline/index.js" };
  pkg["./outline/index.js"] = { default: "./outline/index.js" };
  pkg["./solid"] = { default: "./solid/index.js" };
  pkg["./solid/index"] = { default: "./solid/index.js" };
  pkg["./solid/index.js"] = { default: "./solid/index.js" };

  // Explicit exports for each style:
  for (let style of styles) {
    pkg[`./${style}`] = {
      types: `./${style}/index.d.ts`,
      import: `./${style}/esm/index.js`,
      require: `./${style}/index.js`,
    };
    pkg[`./${style}/*`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
      require: `./${style}/*.js`,
    };
    pkg[`./${style}/*.js`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
      require: `./${style}/*.js`,
    };

    // This dir is basically an implementation detail, but it's needed for
    // backwards compatibility in case people were importing from it directly.
    pkg[`./${style}/esm/*`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
    };
    pkg[`./${style}/esm/*.js`] = {
      types: `./${style}/*.d.ts`,
      import: `./${style}/esm/*.js`,
    };
  }

  return pkg;
}

async function main(package) {
  const cjsPackageJson = { module: "./esm/index.js", sideEffects: false };
  const esmPackageJson = { type: "module", sideEffects: false };

  console.log(`Building ${package} package...`);

  await Promise.all([rimraf(`./${package}/icons/outline/*`), rimraf(`./${package}/icons/solid/*`)]);

  await Promise.all([
    buildIcons(package, "icons/solid", "cjs"),
    buildIcons(package, "icons/solid", "esm"),
    buildIcons(package, "icons/outline", "cjs"),
    buildIcons(package, "icons/outline", "esm"),
    ensureWriteJson(`./${package}/icons/outline/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./${package}/icons/outline/package.json`, cjsPackageJson),
    ensureWriteJson(`./${package}/icons/solid/esm/package.json`, esmPackageJson),
    ensureWriteJson(`./${package}/icons/solid/package.json`, cjsPackageJson),
  ]);

  let packageJson = JSON.parse(await fs.readFile(`./${package}/package.json`, "utf8"));

  packageJson.exports = await buildExports(["icons/outline", "icons/solid"]);

  await ensureWriteJson(`./${package}/package.json`, packageJson);

  return console.log(`Finished building ${package} package.`);
}

let [package] = process.argv.slice(2);

if (!package) {
  throw new Error("Please specify a package");
}

main(package);

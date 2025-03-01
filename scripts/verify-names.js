const fs = require("fs").promises;
const path = require("path");
const { deprecated } = require("./deprecated");

const srcPaths = {
  outline: path.resolve(__dirname, "../src/icons/outline/"),
  solid: path.resolve(__dirname, "../src/icons/solid/"),
};

async function main() {
  let files = await Promise.all(
    Object.entries(srcPaths).map(async ([name, path]) => {
      return { name, files: (await fs.readdir(path)).filter((file) => file.endsWith(".svg")) };
    })
  );

  let diffs = [];
  for (let current of files) {
    for (let other of files) {
      if (current === other) continue;

      for (let file of current.files) {
        if (!other.files.includes(file)) {
          // Ignore deprecated icons in micro
          // They're not going to be added
          if (other.name === "micro" && deprecated.includes(file)) continue;

          diffs.push({
            package: current.name,
            file: file,
            "Missing in?": other.name,
          });
        }
      }
    }
  }
  if (diffs.length > 0) {
    console.table(diffs);
  } else {
    console.log("All good!");
  }
}

main();

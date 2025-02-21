// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === "__esModule") {
        return {};
      }

      throw new Error(
        `Importing from \`@pineicons/vue\` directly is not supported. Please import from either \`@pineicons/vue/icons/solid\`, \`@pineicons/vue/icons/outline\`, or \`@pineicons/vue/icons/tinted\` instead.`
      );
    },
  }
);

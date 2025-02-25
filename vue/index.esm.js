// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

export default new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === "__esModule") {
        return {};
      }

      throw new Error(
        `Importing from \`@pine-icons/vue\` directly is not supported. Please import from either \`@pine-icons/vue/icons/solid\`, \`@pine-icons/vue/icons/outline\` instead.`
      );
    },
  }
);

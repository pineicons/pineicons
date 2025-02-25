// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

module.exports = new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === "__esModule") {
        return {};
      }

      throw new Error(
        `Importing from \`@pine-icons/react\` directly is not supported. Please import from either \`@pine-icons/react/icons/solid\`, \`@pine-icons/react/icons/outline\` instead.`
      );
    },
  }
);

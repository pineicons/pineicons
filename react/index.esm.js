// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

export default new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === "__esModule") {
        return {};
      }

      throw new Error(
        `Importing from \`@pineicons/react\` directly is not supported. Please import from either \`@pineicons/react/icons/solid\`, \`@pineicons/react/icons/outline\`, or \`@pineicons/react/icons/tinted\` instead.`
      );
    },
  }
);

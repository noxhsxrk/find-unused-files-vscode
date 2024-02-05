const getExtensionRegex = (extensions: string[]): RegExp => {
  const extensionsForRegex = extensions.map((ext) => ext.slice(1)).join("|");
  return new RegExp(`['"\`](.*?\.(?:${extensionsForRegex}))['"\`]`, "g");
};

export default getExtensionRegex;

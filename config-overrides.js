const { aliasWebpack, aliasJest } = require("react-app-alias");
const { addBabelPlugins, override } = require("customize-cra");

const options = {}; // default is empty for most cases

module.exports = override(
  aliasWebpack(options),
  ...addBabelPlugins([
    "@simbathesailor/babel-plugin-use-what-changed",
    {
      active: process.env.NODE_ENV === "development", // boolean
    },
  ])
);
module.exports.jest = aliasJest(options);

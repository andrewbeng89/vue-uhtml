module.exports = {
  presets: [
    ["@babel/preset-env", { modules: false, useBuiltIns: "usage" }]
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining']
};

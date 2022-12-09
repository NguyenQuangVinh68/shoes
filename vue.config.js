const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "https://api.npoint.io/cf81a42d10d1f4e7da31",
  },
});

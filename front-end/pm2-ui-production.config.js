module.exports = {
  apps: [
    {
      script: "serve",
      name: "foodcomputer-ui",
      env: {
        PM2_SERVE_PATH: "./build",
        PM2_SERVE_PORT: 3000,
        NODE_ENV: "production"
      }
    }
  ]
};

// ecosystem.config.js

module.exports = {
  apps: [{
    name: "app",
    script: "index.js",
    interpreter: "node",
    env: {
      /**
       * This is your full system PATH, hardcoded.
       * Since '/home/rocky/.nvm/versions/node/v24.9.0/bin' is in the PATH, 
       * the system will find the 'node' interpreter without any issues.
       */
      PATH: "/home/rocky/.bun/bin:/home/rocky/.nvm/versions/node/v24.9.0/bin:/home/rocky/.local/bin:/home/rocky/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin",
    },
  }]
};

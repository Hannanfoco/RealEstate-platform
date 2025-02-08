module.exports = {
  // Networks define how you connect to your ethereum client
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost for Ganache
      port: 8545,            // Port Ganache is running on (default for CLI: 8545)
      network_id: "*",       // Match any network ID
    },
  },

  // Mocha testing framework options
  mocha: {
    timeout: 100000,         // Timeout for tests (default: 100000ms)
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.21",      // Use Solidity version 0.8.21
      settings: {
        optimizer: {
          enabled: true,      // Enable optimization
          runs: 200,          // Optimize for how many times you intend to run the code
        },
        evmVersion: "istanbul", // Target Ethereum Virtual Machine version
      },
    },
  },

  // Enable Truffle DB if needed (disabled by default)
  db: {
    enabled: false,
  },
};

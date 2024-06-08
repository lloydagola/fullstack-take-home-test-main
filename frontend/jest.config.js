// jest.config.js
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./config/setupTests.js"],
  moduleDirectories: ["node_modules", "src"],
};

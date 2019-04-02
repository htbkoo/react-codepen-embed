const commonConfig = {
    preset: 'ts-jest',
    setupFiles: ["./test/enzymeSetup.ts"],
};

module.exports = {
    projects: [
        {
            ...commonConfig,
            displayName: "Unit tests",
            testRegex: ["(/test/unit/.*(test|spec))\\.[jt]sx?$"],
            // testMatch: ["**/test/unit/**/?(*.)+(spec|test).[jt]s?(x)" ],
            testEnvironment: "node"
        },
        {
            ...commonConfig,
            displayName: "Integration tests",
            testRegex: ["(/test/integration/.*(test|spec))\\.[jt]sx?$"],
            // testMatch: ["**/test/integration/**/?(*.)+(spec|test).[jt]s?(x)" ],
            testEnvironment: 'jsdom',
        },
    ]
};
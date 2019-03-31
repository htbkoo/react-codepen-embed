module.exports = {
    preset: 'ts-jest',
    projects: [
        {
            preset: 'ts-jest',
            setupFiles: ["./test/enzymeSetup.ts"],
            displayName: "Unit tests",
            testRegex: ["(/test/unit/.*(test|spec))\\.[jt]sx?$"],
            // testMatch: ["**/test/unit/**/?(*.)+(spec|test).[jt]s?(x)" ],
            testEnvironment: "node"
        },
        {
            preset: 'ts-jest',
            setupFiles: ["./test/enzymeSetup.ts"],
            // testMatch: ["**/test/integration/**/?(*.)+(spec|test).[jt]s?(x)" ],
            testRegex: ["(/test/integration/.*(test|spec))\\.[jt]sx?$"],
            displayName: "Integration tests",
            testEnvironment: 'jsdom',
        },
    ]
};
module.exports = {
    preset: 'ts-jest',
    projects: [
        {
            preset: 'ts-jest',
            setupFiles: ["./test/enzymeSetup.ts"],
            displayName: "Unit tests",
            testMatch: ["**/test/unit/**/?(*.)+(spec|test).[jt]s?(x)" ],
            testEnvironment: "node"
        },
        {
            preset: 'ts-jest',
            setupFiles: ["./test/enzymeSetup.ts"],
            testMatch: ["**/test/integration/**/?(*.)+(spec|test).[jt]s?(x)" ],
            displayName: "Integration tests",
            testEnvironment: 'jsdom',
        },
    ]
};
export const jsonFormatterExamples = {
    minifiedApi: {
        input: `{"user":{"id":123,"name":"John Smith","roles":["admin","editor"]},"active":true}`,
        viewMode: "pretty",
    },
    invalidJson: {
        input: `{"name":"John", age:30}`,
        viewMode: "pretty",
    },
    nestedConfig: {
        input: `{"app":{"name":"Demo API","features":{"auth":true,"billing":false},"limits":{"requestsPerMinute":1000}}}`,
        viewMode: "minified",
    },
};

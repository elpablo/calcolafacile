

export const timestampConverterExamples = {
    jwtExpiration: {
        mode: "timestampToDate",
        timestamp: 1893456000,
        unit: "seconds",
        dateTime: "01/01/2030 00:00",
    },
    apiLogTimestamp: {
        mode: "timestampToDate",
        timestamp: 1714560000,
        unit: "seconds",
        dateTime: "01/05/2024 12:00",
    },
    dateToTimestamp: {
        mode: "dateToTimestamp",
        timestamp: 946684800,
        unit: "seconds",
        dateTime: "01/01/2000 00:00",
    },
};
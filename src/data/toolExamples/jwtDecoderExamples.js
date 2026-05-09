

export const jwtDecoderExamples = {
    validToken: {
        token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1IiwiZW1haWwiOiJqb2huLnNtaXRoQGV4YW1wbGUuY29tIiwibmFtZSI6IkpvaG4gU21pdGgiLCJyb2xlcyI6WyJhZG1pbiIsImVkaXRvciJdLCJpYXQiOjE3MTQ1NjAwMDAsImV4cCI6NDEwMjQ0NDgwMH0.demo-signature",
    },
    expiredToken: {
        token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyX2V4cGlyZWQiLCJlbWFpbCI6ImV4cGlyZWQuZGVtb0BleGFtcGxlLmNvbSIsIm5hbWUiOiJFeHBpcmVkIFVzZXIiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcwNDA2NzIwMCwiZXhwIjoxNzA0MTUzNjAwfQ.demo-signature",
    },
    customClaimsToken: {
        token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYWFzXzAwMSIsInRlbmFudCI6Im5lcmFsYWIiLCJwbGFuIjoicHJvIiwicGVybWlzc2lvbnMiOlsicmVhZDpwcm9qZWN0cyIsIndyaXRlOnByb2plY3RzIiwiYmlsbGluZzpyZWFkIl0sImZlYXR1cmVzIjp7ImFwaSI6dHJ1ZSwiZXhwb3J0Ijp0cnVlLCJhdWRpdCI6ZmFsc2V9LCJpYXQiOjE3MTQ1NjAwMDAsImV4cCI6NDEwMjQ0NDgwMH0.demo-signature",
    },
};
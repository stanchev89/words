export default {
    development: {
        port: process.env.PORT || 3500,
        dbConnectionString: "mongodb://localhost:27017/cubes",
        staticPath: '/frontend',
    },
    production: {}
};

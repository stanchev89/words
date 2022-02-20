export default {
    development: {
        port: process.env.PORT || 3500,
        dbConnectionString: "mongodb://localhost:27017/cubes",
        staticPath: '/run/media/nasko/W/AtanasStanchev/brother/words/frontend/',

    },
    production: {}
};

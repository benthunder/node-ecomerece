const dev = {
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        userName: process.env.DB_USER,
        userPW: process.env.DB_PW,
    },
};

const pro = {
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: process.env.DB_PORT,
        userName: process.env.DB_USER,
        userPW: process.env.DB_PW,
    },
};
const configs = process.env.NODE_ENV === "pro" ? pro : dev;
module.exports = configs;

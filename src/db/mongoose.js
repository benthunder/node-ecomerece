const mongoose = require("mongoose");
const configs = require("../configs/mongodb");

class Database {
    constructor() {
        this.connect();
    }

    connect(type = "mongo") {
        if (type == "mongo") {
            mongoose
                .connect(
                    `mongodb://${configs.db.host}:${configs.db.port}/${configs.db.name}`,
                    {
                        maxPoolSize: 50,
                    }
                )
                .then((_) => {
                    console.log("Connect Mongo DB");
                })
                .catch((err) => console.log(err));
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;

const mongoose = require("mongoose");

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const Connection = () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DB_URI, connectionParams);
        console.log("db is connected");
    } catch (err) {
        console.log("db not connected due to " + err.message);
    }
};

module.exports = Connection;
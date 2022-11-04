const express = require("express");
const mongoose = require("mongoose");

const custRoute = require("./routes/customer");
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/JestDataTest";
const PORT = process.env.PORT || 3000;


(async () => {
    try {
        await mongoose.connect(DB_URI);
        express.call()
            .use(express.json())
            .use(express.urlencoded())
            .use("/customer", custRoute)
            .listen(PORT, () => {
                console.log("serverlistening");
            })
    } catch (e) {
        console.log(e.message);
        // process.exit();
    }
})()


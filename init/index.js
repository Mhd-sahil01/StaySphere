const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/staysphere";

main()
    .then(()=> {
        console.log("connected to db")
    })
    .catch((err)=> {
        console.log(err);
    });

async function main () {
    await mongoose.connect(MONGO_URL);
}

const initDb = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((el) => ({...el, owner:"6835619aed2405f72b62f265"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDb();
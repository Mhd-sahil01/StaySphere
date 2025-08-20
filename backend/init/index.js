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
    initData.data = initData.data.map((el) => ({...el, owner:"68a614a123ff4af9117c24f4"}))
    initData.data = initData.data.map((el) => ({...el, contact:"9876543210"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDb();
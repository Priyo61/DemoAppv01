const mongoose = require("mongoose");
const iniData = require("./data");

const Listing = require("../models/listing");

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/eyeclinic");
}

const initDB = async () => {
  await Listing.deleteMany({});
  iniData.data = iniData.data.map((obj) => ({
    ...obj,
    owner: "69433ccba70142e433b3abea",
  }));
  await Listing.insertMany(iniData.data);
  console.log("data was save");
};
initDB();

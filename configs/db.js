const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("connected to db successfully !");
    }
  } catch (err) {
    console.log("DB connectToDB has error => ", err);
  }
};
export default connectToDB;

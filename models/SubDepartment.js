const { default: mongoose } = require("mongoose");
require("./Department");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: "Department",
    require: true,
  },
});

const model =
  mongoose.models.Department || mongoose.model("Department", schema);

export default model;

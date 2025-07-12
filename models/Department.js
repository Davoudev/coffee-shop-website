const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
});

const model =
  mongoose.models.Department || mongoose.model("Department", schema);

export default model;

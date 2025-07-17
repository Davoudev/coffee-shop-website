const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const model = mongoose.models.Ban || mongoose.model("Ban", schema);

export default model;

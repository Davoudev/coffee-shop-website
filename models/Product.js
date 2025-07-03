const { default: mongoose } = require("mongoose");
require("./Comment");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  Weight: {
    type: Number,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    required: true,
  },
});

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;

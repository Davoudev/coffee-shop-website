const { default: mongoose } = require("mongoose");
require("./Department");
require("./SubDepartment");
require("./User");

const schema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Department",
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "subDepartment",
    },
    User: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;

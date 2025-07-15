const { default: mongoose } = require("mongoose");
require("./Department");
require("./SubDepartment");
require("./User");

const schema = new mongoose.Schema(
  {
    department: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Department",
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "subDepartment",
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    mainTicket: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;

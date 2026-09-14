const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    managerRole: {
      type: Boolean,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema)

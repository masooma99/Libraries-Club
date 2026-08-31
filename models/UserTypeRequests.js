const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true, ---> at first it'll not have an assigned admin, the manager will assign it to one of the admins after.
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    accepted: {
      type: Boolean,
    },
    managerApproval: {
      type: Boolean,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema)

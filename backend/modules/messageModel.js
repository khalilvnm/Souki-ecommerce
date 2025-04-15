import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "unread" }, // unread or read
}, { timestamps: true });

const MessageModel = mongoose.models.message || mongoose.model("Message", messageSchema);

export default MessageModel; 
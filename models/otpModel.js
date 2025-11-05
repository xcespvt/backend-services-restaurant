import mongoose from "mongoose";

const Schema = mongoose.Schema;
const otpSchema = new Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 mins
});

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;

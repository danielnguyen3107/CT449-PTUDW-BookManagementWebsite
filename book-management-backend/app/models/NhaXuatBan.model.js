const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NhaXuatBanSchema = new Schema({
  MaNXB: {
    type: Number,
    unique: true,
  },
  TenNXB: {
    type: String,
  },
  DiaChi: {
    type: String,
  },
});

module.exports = mongoose.model("NhaXuatBan", NhaXuatBanSchema);

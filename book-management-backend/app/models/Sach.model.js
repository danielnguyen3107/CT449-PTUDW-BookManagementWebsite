const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SachSchema = new Schema({
  MaSach: {
    type: Number,
    required: true,
    unique: true,
  },
  TenSach: {
    type: String,
  },
  DonGia: {
    type: Number,
  },
  SoQuyen: {
    type: Number,
  },
  NamXB: {
    type: Number,
  },
  MaNXB: {
    type: Number,
    ref: 'NhaXuatBan',
  },
  TacGia: {
    type: String,
  },
  ImageSach:{
    type: String
  }
});

module.exports = mongoose.model("Sach", SachSchema);

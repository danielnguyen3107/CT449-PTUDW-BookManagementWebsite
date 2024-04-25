const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NhanVienSchema = new Schema({
  MaNhanVien: {
    type: Number,
    required: true,
    unique: true,
  },
  HoTenNV: {
    type: String,
  },
  Password: {
    type: String,
  },
  ChucVu: {
    type: String,
  },
  DiaChi: {
    type: String,
  },
  SoDienThoai: {
    type: String,
  },
});

module.exports = mongoose.model("NhanVien", NhanVienSchema);

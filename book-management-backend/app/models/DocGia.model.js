const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DocGiaSchema = new Schema({
  MaDocGia: {
    type: Number,
    required: true,
    unique: true,
  },
  HoLot: {
    type: String,
  },
  Ten: {
    type: String,
  },
  Phai: {
    type: String,
  },
  DiaChi: {
    type: String,
  },
  SoDienThoai: {
    type: String,
  },
});

module.exports = mongoose.model("DocGia", DocGiaSchema);

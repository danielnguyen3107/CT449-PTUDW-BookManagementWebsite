const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { ObjectId } = Schema.Types; // Import ObjectId type

const TheoDoiMuonSachSchema = new Schema({
  MaDocGia: {
    type: Number, 
    required: true,
  },
  MaSach: {
    type: Number,
    required: true,
  },
  NgayMuon: {
    type: Date,
    required: true,
  },
  NgayTra: {
    type: Date,
  },
});

module.exports = mongoose.model("TheoDoiMuonSach", TheoDoiMuonSachSchema);


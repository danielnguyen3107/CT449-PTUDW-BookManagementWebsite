const express = require("express");
const router = express.Router();
const TheoDoiMuonSachController = require("../controllers/TheoDoiMuonSach.controller");

router.post('/them-phieu-theo-doi-muon-sach', TheoDoiMuonSachController.addTheoDoiMuonSach);
router.get('/lay-phieu-theo-doi-muon-sach/:MaDocGia', TheoDoiMuonSachController.getTheoDoiMuonSachByMaDocGia);

module.exports = router;
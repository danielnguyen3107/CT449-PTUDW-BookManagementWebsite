const express = require("express");
const router = express.Router();
const SachController = require("../controllers/Sach.controller");

router.post('/them-sach', SachController.addSach);
router.put('/sua-sach/:MaSach', SachController.updateSach);
router.get('/lay-tat-ca-sach', SachController.getAllSach);
router.delete('/xoa-sach/:MaSach', SachController.deleteSach);
router.get('/lay-sach-theo-id/:MaSach', SachController.getSachByMa);

module.exports = router;

const express = require('express');
const router = express.Router();
const NhaXuatBanController = require('../controllers/NhaXuatBan.controller');

router.post('/them-nxb', NhaXuatBanController.addNhaXuatBan);
router.put('/cap-nhat-nxb/:MaNXB', NhaXuatBanController.updateNhaXuatBan);
router.delete('/xoa-nxb/:MaNXB', NhaXuatBanController.deleteNhaXuatBan);
router.get('/lay-tat-ca-nxb', NhaXuatBanController.getAllNhaXuatBan);
router.get('/lay-nxb-theo-id/:MaNXB', NhaXuatBanController.getNhaXuatBanByMa);

module.exports = router;
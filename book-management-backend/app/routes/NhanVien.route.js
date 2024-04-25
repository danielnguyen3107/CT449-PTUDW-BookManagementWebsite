const express = require('express');
const router = express.Router();
const NhanVienController = require('../controllers/NhanVien.controller');

router.post('/them-nhan-vien', NhanVienController.addNhanVien);
router.put('/cap-nhat-nhan-vien/:MaNhanVien', NhanVienController.updateNhanVien);
router.delete('/xoa-nhan-vien/:MaNhanVien', NhanVienController.deleteNhanVien);
router.get('/lay-tat-ca-nhan-vien', NhanVienController.getAllNhanVien);
router.get('/lay-nhan-vien-theo-ma/:MaNhanVien', NhanVienController.getNhanVienByMa);
router.post('/nhan-vien-dang-nhap', NhanVienController.NhanVienDNhap);
router.post('/nhan-vien-dang-ky', NhanVienController.NhanVienDKy);
router.post('/nhan-vien-dang-xuat', NhanVienController.NhanVienDXuat);

module.exports = router;
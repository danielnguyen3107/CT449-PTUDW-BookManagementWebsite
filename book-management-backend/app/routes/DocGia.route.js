const express = require('express');
const router = express.Router();
const DocGiaController = require('../controllers/DocGia.controller');

router.post('/them-doc-gia', DocGiaController.AddDocGia);
router.put('/cap-nhat-doc-gia/:MaDocGia', DocGiaController.updateDocGia);
router.get('/lay-tat-ca-doc-gia', DocGiaController.getAllDocGia);
router.delete('/xoa-doc-gia/:MaDocGia', DocGiaController.deleteDocGia);
router.get('/lay-doc-gia-theo-ma/:MaDocGia', DocGiaController.getDocGiaByMa);


module.exports = router;
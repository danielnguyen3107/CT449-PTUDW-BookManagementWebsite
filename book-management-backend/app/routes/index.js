const express = require('express');
const router = express.Router();

const DocGiaRouter = require('./DocGia.route');
const NhanVienRouter = require('./NhanVien.route');
const NhaXuatBanRouter = require('./NhaXuatBan.route');
const SachRouter = require('./Sach.route');
const TheoDoiMuonSachRouter = require('./TheoDoiMuonSach.route');

function routes(app) {
    app.use('/api/doc-gia', DocGiaRouter);
    app.use('/api/nhan-vien', NhanVienRouter);
    app.use('/api/nha-xuat-ban', NhaXuatBanRouter);
    app.use('/api/sach', SachRouter);
    app.use('/api/theo-doi-muon-sach', TheoDoiMuonSachRouter);
}

module.exports = routes;
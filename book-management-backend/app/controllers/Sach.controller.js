const ApiError = require("../../api-error");
const SachModel = require("../models/Sach.model");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const NhaXuatBanModel = require("../models/NhaXuatBan.model");
const { fail } = require("assert");
const readFileAsync = promisify(fs.readFile);

class SachController {
  async addSach(req, res) {
    const { TenSach, DonGia, SoQuyen, NamXB, MaNXB, TacGia, ImageSach } = req.body;

    // Kiểm tra xem mã NXB có tồn tại trong cơ sở dữ liệu hay không
    const checkNXB = await NhaXuatBanModel.findOne({ MaNXB });
    if (!checkNXB) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy NXB" });
    }

    if (!TenSach || !DonGia || !SoQuyen || !NamXB || !MaNXB || !TacGia || !ImageSach) {
      return new (ApiError(400, "Chưa đủ thông tin thêm sách mới"))();
    }
    try {
      //* Auto Increment
      const latestSach = await SachModel.findOne().sort({ MaSach: -1 }); // Tìm MSHH lớn nhất
      let newMaSach;
      if (latestSach) {
        newMaSach = latestSach.MaSach + 1;
      } else {
        newMaSach = 1;
      }

      const newSach = new SachModel({
        MaSach: newMaSach,
        TenSach,
        DonGia,
        SoQuyen,
        NamXB,
        MaNXB,
        TacGia,
        ImageSach
      });

      // Lưu đối tượng mặt hàng vào cơ sở dữ liệu
      await newSach.save();

      res
        .status(201)
        .json({ success: true, message: "Thêm sách thành công", newSach });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Thêm sách thất bại", error });
    }
  }
  async updateSach(req, res) {
    try {
      const SachId = Number(req.params.MaSach);
      const SachUpdateData = req.body;
      console.log("SachId", SachId);
      console.log("SachUpdateData", SachUpdateData);

      const checkSach = await SachModel.findOne({ MaSach: SachId });
      console.log("checkSach", checkSach);
      if (!checkSach) {
        return res.status(500).json({
          success: false,
          message: `Không tìm thấy sách với mã ${SachId}`,
        });
      }
      const updatedSach = await SachModel.findByIdAndUpdate(
        checkSach._id,
        SachUpdateData,
        {
          new: true,
        }
      );
      res.status(201).json({
        success: true,
        message: "Cập nhật sách thành công",
        updatedSach,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Cập nhật sách thất bại", error });
    }
  }

  async getAllSach(req, res) {
    try {
      const listSach = await SachModel.find();
      if (!listSach) {
        res.status(500).json({ success: false, message: "Chưa có sách" });
      }
      res.status(200).json({
        success: true,
        message: "Lấy danh sách hàng hóa thành công",
        listSach,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lấy danh sách hàng hóa thất bại",
        error,
      });
    }
  }

  async deleteSach(req, res) {
    try {
      const SachId = Number(req.params.MaSach);
      const findSach = await SachModel.findOne({ MaSach: SachId });
      console.log("findSach", findSach);

      if (!findSach) {
        res.status(404).json({
          success: false,
          message: `Không tìm thấy hàng hóa có mã ${SachId}`,
        });
      }
      const deletedSach = await SachModel.findByIdAndDelete(findSach._id);
      res.status(200).json({
        success: true,
        message: "Xóa hàng hóa thành công",
        deletedSach,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Xóa hàng hóa thất bại", error });
    }
  }
  async addImage(req, res) {
    try {
      const SachId = Number(req.params.MSHH);
      const imagePath = req.file.path;

      const Sach = await SachModel.findOne({ MSHH: SachId });
      Sach.images.push({ TenHinh: imagePath });
      await Sach.save();

      res.status(201).json({ message: "Upload success" });
    } catch (error) {
      res.status(500).json({ success: false, message: "thất bại", error });
    }
  }
  async getSachByMa(req, res) {
    try {
      const SachId = req.params.MaSach;
      const checkedSach = await SachModel.findOne({ MaSach: SachId });

      if (!checkedSach) {
        res.status(404).json({
          success: false,
          message: `Không tìm thấy SÁCH có mã ${SachId}`,
          error,
        });
      }
      res.status(200).json({
        success: true,
        message: "Lấy SÁCH thành công",
        checkedSach,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Lấy SÁCH thất bại", error });
    }
  }
}

module.exports = new SachController();

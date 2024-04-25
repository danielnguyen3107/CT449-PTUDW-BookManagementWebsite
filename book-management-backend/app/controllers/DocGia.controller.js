// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const DocGiaModel = require("../models/DocGia.model");
const ApiError = require("../../api-error");
// const {
//   blacklist,
//   getBlacklist,
//   setBlacklist,
// } = require("../../middleware/middleware");

class DocGiaController {
  async AddDocGia(req, res) {
    const { HoLot, Ten, Phai, DiaChi, SoDienThoai } = req.body;
    console.log()

    if (!HoLot || !Ten || !Phai || !DiaChi || !SoDienThoai) {
      return res.json({ success: false, message: "Thông tin chưa đầy đủ" });
    }
    try {
      const latestDocGia = await DocGiaModel.findOne().sort({ MaDocGia: -1 }); // Tìm người có MSDG lớn nhất
      let newMaDG;
      if (latestDocGia) {
        newMaDG = latestDocGia.MaDocGia + 1;
      } else {
        newMaDG = 1;
      }

      const newDocGia = new DocGiaModel({
        MaDocGia: newMaDG,
        HoLot,
        Ten,
        Phai,
        DiaChi,
        SoDienThoai,
      });
      const resultDocGia = await newDocGia.save();
      res.json({
        success: true,
        message: "Độc giả đăng ký thành công",
        resultDocGia,
      });
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Đăng ký thất bại"));
    }
  }
  async updateDocGia(req, res) {
    try {
      const DocGiaId = Number(req.params.MaDocGia);
      const DocGiaUpdateData = req.body;
      console.log("DocGiaId", DocGiaId);
      console.log("DocGiaUpdateData", DocGiaUpdateData);

      const checkDocGia = await DocGiaModel.findOne({ MaDocGia: DocGiaId });
      console.log("checkDocGia", checkDocGia);
      if (!checkDocGia) {
        return res
          .status(500)
          .json({
            success: false,
            message: `Không tìm thấy sản phẩm với mã ${DocGiaId}`,
          });
      }
      const updatedDocGia = await DocGiaModel.findByIdAndUpdate(
        checkDocGia._id,
        DocGiaUpdateData,
        {
          new: true,
        }
      );
      res
        .status(201)
        .json({
          success: true,
          message: "Cập nhật DG thành công",
          updatedDocGia,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Cập nhật ĐG thất bại", error });
    }
  }
  async getAllDocGia(req, res) {
    try {
      const listDocGia = await DocGiaModel.find();
      res.json({
        success: true,
        message: "Lấy danh sách Độc giả thành công",
        listDocGia,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Lấy danh sách Độc giả thất bại",
        error,
      });
    }
  }

  async deleteDocGia(req, res) {
    try {
      const DocGiaId = Number(req.params.MaDocGia);
      const findDocGia = await DocGiaModel.findOne({ MaDocGia: DocGiaId });
      console.log("findDG", findDocGia);

      if (!findDocGia) {
        res
          .status(404)
          .json({
            success: false,
            message: `Không tìm thấy DG có mã ${DocGiaId}`,
          });
      }
      const deletedDocGia = await DocGiaModel.findByIdAndDelete(findDocGia._id);
      res
        .status(200)
        .json({ success: true, message: "Xóa DG thành công", deletedDocGia });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Xóa DG thất bại", error });
    }
  }

  async getDocGiaByMa(req, res) {
    try {
      const DocGiaId = req.params.MaDocGia;
      const checkedDocGia = await DocGiaModel.findOne({ MaDocGia: DocGiaId });

      if (!checkedDocGia) {
        res.status(404).json({
          success: false,
          message: `Không tìm thấy DocGia có mã ${DocGiaId}`,
          error,
        });
      }
      res.status(200).json({
        success: true,
        message: "Lấy DocGia thành công",
        checkedDocGia,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Lấy DocGia thất bại", error });
    }
  }
}

module.exports = new DocGiaController();

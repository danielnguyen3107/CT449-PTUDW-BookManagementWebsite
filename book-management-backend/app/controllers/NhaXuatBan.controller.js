const ApiError = require("../../api-error");
const NXBModel = require("../models/NhaXuatBan.model");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const NhaXuatBanModel = require("../models/NhaXuatBan.model");
const readFileAsync = promisify(fs.readFile);

class NhaXuatBanController {
  async addNhaXuatBan(req, res) {
    const { TenNXB, DiaChi } = req.body;
    if (!TenNXB || !DiaChi) {
      return new (ApiError(400, "Chưa đủ thông tin thêm nhà xuất bản mới"))();
    }
    try {
      //* Auto Increment
      const latestNXB = await NXBModel.findOne().sort({ MaNXB: -1 }); // Tìm MSNXB lớn nhất
      let newMaNXB;
      if (latestNXB) {
        newMaNXB = latestNXB.MaNXB + 1;
      } else {
        newMaNXB = 1;
      }

      const newNXB = new NXBModel({
        MaNXB: newMaNXB,
        TenNXB,
        DiaChi
      });

      // Lưu đối tượng mặt hàng vào cơ sở dữ liệu
      await newNXB.save();

      res
        .status(201)
        .json({ success: true, message: "Thêm NXB thành công", newNXB });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Thêm NXB thất bại", error });
    }
  }
  async updateNhaXuatBan(req, res) {
    try {
      const NXBId = Number(req.params.MaNXB);
      const NXBUpdateData = req.body;
      console.log("NXBId", NXBId);
      console.log("NXBUpdateData", NXBUpdateData);

      const checkNXB = await NXBModel.findOne({ MaNXB: NXBId });
      console.log("checkNXB", checkNXB);
      if (!checkNXB) {
        return res
          .status(500)
          .json({
            success: false,
            message: `Không tìm thấy sản phẩm với mã ${NXBId}`,
          });
      }
      const updatedNXB = await NXBModel.findByIdAndUpdate(
        checkNXB._id,
        NXBUpdateData,
        {
          new: true,
        }
      );
      res
        .status(201)
        .json({
          success: true,
          message: "Cập nhật NXB thành công",
          updatedNXB,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Cập nhật NXB thất bại", error });
    }
  }
  async deleteNhaXuatBan(req, res) {
    try {
      const NXBId = Number(req.params.MaNXB);
      const findNXB = await NXBModel.findOne({ MaNXB: NXBId });
      console.log("findHH", findNXB);

      if (!findNXB) {
        res
          .status(404)
          .json({
            success: false,
            message: `Không tìm thấy NXB có mã ${NXBId}`,
          });
      }
      const deletedNXB = await NXBModel.findByIdAndDelete(findNXB._id);
      res
        .status(200)
        .json({ success: true, message: "Xóa NXB thành công", deletedNXB });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Xóa NXB thất bại", error });
    }
  }
  async getAllNhaXuatBan(req, res) {
    try {
      const listNXB = await NhaXuatBanModel.find();
      if (!listNXB) {
        res.status(500).json({ success: false, message: "Chưa có NXB" });
      }
      res
        .status(200)
        .json({
          success: true,
          message: "Lấy danh NXB NXB thành công",
          listNXB,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Lấy danh sách NXB thất bại",
          error,
        });
    }
  }
  async getNhaXuatBanByMa(req, res) {
    try {
      const NXBId = req.params.MaNXB;
      const checkedNXB = await NhaXuatBanModel.findOne({ MaNXB: NXBId });

      if (!checkedNXB) {
        res.status(404).json({
          success: false,
          message: `Không tìm thấy NXB có mã ${NXBId}`,
          error,
        });
      }
      res.status(200).json({
        success: true,
        message: "Lấy NXB thành công",
        checkedNXB,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Lấy NXB thất bại", error });
    }
  }

}

module.exports = new NhaXuatBanController();

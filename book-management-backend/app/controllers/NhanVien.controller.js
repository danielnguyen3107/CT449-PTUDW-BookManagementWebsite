const NhanVienModel = require("../models/NhanVien.model");
const ApiError = require("../../api-error");
// const { setBlacklist } = require("../../middleware/middleware");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class NhanVienController {
  async addNhanVien(req, res) {
    const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;
    if (!HoTenNV || !Password || !ChucVu || !DiaChi || !SoDienThoai) {
      return new (ApiError(400, "Chưa đủ thông tin thêm nhân viên mới"))();
    }
    try {
      //* Auto Increment
      const latestNhanVien = await NhanVienModel.findOne().sort({
        MaNhanVien: -1,
      }); // Tìm MSNhanVien lớn nhất
      let newMaNhanVien;
      if (latestNhanVien) {
        newMaNhanVien = latestNhanVien.MaNhanVien + 1;
      } else {
        newMaNhanVien = 1;
      }

      const newNhanVien = new NhanVienModel({
        MaNhanVien: newMaNhanVien,
        HoTenNV,
        Password,
        ChucVu,
        DiaChi,
        SoDienThoai,
      });

      // Lưu đối tượng nhân viên vào cơ sở dữ liệu
      await newNhanVien.save();

      res
        .status(201)
        .json({
          success: true,
          message: "Thêm Nhân viên thành công",
          newNhanVien,
        });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Thêm Nhân viên thất bại", error });
    }
  }

  async NhanVienDKy(req, res, next) {
    const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;

    if (!HoTenNV || !Password || !ChucVu || !DiaChi || !SoDienThoai) {
      return res.json({ success: false, message: "Thông tin chưa đầy đủ" });
    }
    try {
      const latestNhanVien = await NhanVienModel.findOne().sort({
        MaNhanVien: -1,
      }); // Tìm người có MaNhanVien lớn nhất
      let newMaNhanVien;
      if (latestNhanVien) {
        newMaNhanVien = latestNhanVien.MaNhanVien + 1;
      } else {
        newMaNhanVien = 1;
      }

      const hashedPassword = await bcrypt.hash(Password, 10);
      const newNhanVien = new NhanVienModel({
        MaNhanVien: newMaNhanVien,
        HoTenNV,
        Password: hashedPassword,
        ChucVu,
        DiaChi,
        SoDienThoai,
      });
      const resultNhanVien = await newNhanVien.save();
      res.json({
        success: true,
        message: "Nhân viên đăng ký thành công",
        resultNhanVien,
      });
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Đăng ký thất bại"));
    }
  }
  async NhanVienDNhap(req, res, next) {
    const { SoDienThoai, Password } = req.body;
    if (!SoDienThoai || !Password) {
      return next(new ApiError(400, "Thiếu SĐT hay mật khẩu"));
    }
    try {
      const checkNhanVien = await NhanVienModel.findOne({ SoDienThoai });
      if (!checkNhanVien) {
        return next(new ApiError(400, "Người dùng không tồn tại"));
      }
      const validPassword = await bcrypt.compare(
        Password,
        checkNhanVien.Password
      );
      if (!validPassword) {
        return next(new ApiError(400, "Mật khẩu chưa đúng"));
      }

      return res
        .status(200)
        .json({
          success: true,
          message: "Đăng nhập thành công",
          checkNhanVien
        });
    } catch (error) {
      console.log(error);
      return next(new ApiError(500, "Đăng nhập thất bại"));
    }
  }

  async updateNhanVien(req, res) {
    try {
      const NhanVienId = Number(req.params.MaNhanVien);
      const NhanVienUpdateData = req.body;
      console.log("NhanVienId", NhanVienId);
      console.log("NhanVienUpdateData", NhanVienUpdateData);

      const checkNhanVien = await NhanVienModel.findOne({
        MaNhanVien: NhanVienId,
      });
      console.log("checkNhanVien", checkNhanVien);
      if (!checkNhanVien) {
        return res.status(500).json({
          success: false,
          message: `Không tìm thấy sản phẩm với mã ${NhanVienId}`,
        });
      }
      const updatedNhanVien = await NhanVienModel.findByIdAndUpdate(
        checkNhanVien._id,
        NhanVienUpdateData,
        {
          new: true,
        }
      );
      res.status(201).json({
        success: true,
        message: "Cập nhật NhanVien thành công",
        updatedNhanVien,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Cập nhật NhanVien thất bại", error });
    }
  }
  async deleteNhanVien(req, res) {
    try {
      const NhanVienId = Number(req.params.MaNhanVien);
      const findNhanVien = await NhanVienModel.findOne({
        MaNhanVien: NhanVienId,
      });
      console.log("findHH", findNhanVien);

      if (!findNhanVien) {
        res.status(404).json({
          success: false,
          message: `Không tìm thấy NhanVien có mã ${NhanVienId}`,
        });
      }
      const deletedNhanVien = await NhanVienModel.findByIdAndDelete(
        findNhanVien._id
      );
      res
        .status(200)
        .json({
          success: true,
          message: "Xóa NhanVien thành công",
          deletedNhanVien,
        });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Xóa NhanVien thất bại", error });
    }
  }
  async getAllNhanVien(req, res) {
    try {
      const listNhanVien = await NhanVienModel.find();
      if (!listNhanVien) {
        res.status(500).json({ success: false, message: "Chưa có NhanVien" });
      }
      res.status(200).json({
        success: true,
        message: "Lấy danh NhanVien NhanVien thành công",
        listNhanVien,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lấy danh sách NhanVien thất bại",
        error,
      });
    }
  }
  async getNhanVienByMa(req, res) {
    try {
      const NhanVienId = req.params.MaNhanVien;
      const checkedNhanVien = await NhanVienModel.findOne({
        MaNhanVien: NhanVienId,
      });

      if (!checkedNhanVien) {
        res.status(404).json({
          success: false,
          message: `Không tìm thấy NhanVien có mã ${NhanVienId}`,
          error,
        });
      }
      res.status(200).json({
        success: true,
        message: "Lấy NhanVien thành công",
        checkedNhanVien,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Lấy NhanVien thất bại", error });
    }
  }
  async NhanVienDXuat(req, res) {
    try {
      const token = req.headers.token.split(" ")[1];
      console.log("token", token);
      // res.clearCookie('token');
      // blacklist = getBlacklist();
      setBlacklist(token);
      return res
        .status(200)
        .json({ success: true, message: "Đăng xuất thành công" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Đăng xuất thất bại", error });
    }
  }
}

module.exports = new NhanVienController();

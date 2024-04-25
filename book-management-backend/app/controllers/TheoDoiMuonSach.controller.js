const DocGiaModel = require("../models/DocGia.model");
const SachModel = require("../models/Sach.model");
const TheoDoiMuonSachModel = require("../models/TheoDoiMuonSach.model");

const ApiError = require("../../api-error");

class TheoDoiMuonSachController {
  async addTheoDoiMuonSach(req, res) {
    const { MaDocGia, MaSach, NgayMuon, NgayTra } = req.body;
    if (!MaDocGia || !MaSach || !NgayMuon || !NgayTra) {
      return res.json({
        success: false,
        message: "Chưa đủ thông tin lập Phiếu theo dõi mượn sách",
      });
    }
    // Kiểm tra ngày trả không được nhỏ hơn ngày mượn
    if (new Date(NgayTra) < new Date(NgayMuon)) {
      return res.json({
        success: false,
        message: "Ngày trả không thể trước ngày mượn",
      });
    }
    try {
      const getMaDocGia = await DocGiaModel.findOne({ MaDocGia });
      const getMaSach = await SachModel.findOne({ MaSach });

      if (!getMaDocGia) {
        console.log(`Không tìm thấy độc giả với mã ${MaDocGia}`);
        return res.status(500).json({
          success: false,
          message: `Không tìm thấy độc giả với mã ${MaDocGia}`,
        });
      } else {
        console.log(`Tìm thấy độc giả với mã ${MaDocGia}`);
      }
      if (!getMaSach) {
        console.log(`Không tìm thấy sách với mã ${MaSach}`);
        return res.status(500).json({
          success: false,
          message: `Không tìm thấy sách với mã ${MaSach}`,
        });
      } else {
        console.log(`Tìm thấy sách với mã ${MaSach}`);
      }

      console.log(getMaSach.SoQuyen);
      // Kiểm tra số lượng sách
      if (getMaSach.SoQuyen >= 1) {
        // Giảm số lượng sách đi 1
        getMaSach.SoQuyen -= 1;
        // Lưu sách sau khi giảm số lượng vào cơ sở dữ liệu
        await getMaSach.save();
      } else {
        // Nếu số lượng sách = 0, báo lỗi
        return res.status(500).json({
          success: false,
          message: `Số lượng sách với mã ${SachId} đã hết`,
        });
      }
      console.log(req.body);
      console.log("MaDocGia", typeof getMaDocGia);
      console.log("MaSach", typeof getMaSach);
      const newTheoDoiMuonSach = new TheoDoiMuonSachModel({
        MaDocGia: MaDocGia,
        MaSach: MaSach,
        NgayMuon: NgayMuon,
        NgayTra: NgayTra,
      });
      console.log("Check");
      await newTheoDoiMuonSach.save();
      res.status(201).json({
        success: true,
        message: "Tạo phiếu theo dõi thành công",
      });
    } catch (error) {
      console.log("Lỗi khi xử lý yêu cầu:", error); // Log ra lỗi cụ thể
      res
        .status(500)
        .json({
          success: false,
          message: "Tạo phiếu theo dõi thất bại",
          error,
        });
    }
  }

  async getTheoDoiMuonSachByMaDocGia(req, res) {
    try {
      const DocGiaID = req.params.MaDocGia;
      console.log("DocGiaID:", DocGiaID);

      const CheckedTheoDoiMuonSach = await TheoDoiMuonSachModel.find({
        MaDocGia: DocGiaID,
      });

      if (!DocGiaID) {
        res
          .status(404)
          .json({ success: false, message: "Không tìm được độc giả" });
      }
      res.status(200).json({
        success: true,
        message: `Lấy thành công phiếu theo dõi mượn sách của độc giả có mã số ${DocGiaID}`,
        CheckedTheoDoiMuonSach,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Lấy danh sách phiếu theo dõi mượn sách thất bại",
        error,
      });
    }
  }

  
}

module.exports = new TheoDoiMuonSachController();

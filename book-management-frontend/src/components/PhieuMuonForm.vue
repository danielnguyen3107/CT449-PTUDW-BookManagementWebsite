<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <h2 class="form-title">THÔNG TIN PHIẾU MƯỢN</h2>
      <form @submit.prevent="addPhieuMuon">
        <div class="form-group">
          <label for="MaSach">Mã sách:</label>
          <select
            v-model="PhieuMuon.MaSach"
            class="form-control"
            id="MaSach"
            required
          >
            <option v-for="sach in sachs" :value="sach.MaSach">
              {{ sach.TenSach + ' - '+ 'Số quyển: ' + sach.SoQuyen }}
              {{ console.log('Dữ liệu sach:', sach.TenSach) }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="NgayMuon">Ngày mượn:</label>
          <input
            type="date"
            class="form-control"
            id="NgayMuon"
            v-model="PhieuMuon.NgayMuon"
            required
          />
        </div>
        <div class="form-group">
          <label for="NgayTra">Ngày trả:</label>
          <input
            type="date"
            class="form-control"
            id="NgayTra"
            v-model="PhieuMuon.NgayTra"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Xác nhận</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import TheoDoiMuonSachService from "@/services/TheoDoiMuonSach.service";
import SachService from "@/services/Sach.service";
import { useRouter } from "vue-router"; // Import router của Vue
const router = useRouter(); // Khởi tạo router
import Swal from "sweetalert2";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const DocGiaId = route.params.MaDocGia;

const sachs = ref([]);

onMounted(async () => {
  try {
    // Lấy danh sách các quyển sách từ API 
    const listSach = await SachService.getAllSach();    
    sachs.value = listSach.listSach;
    console.log("sachs.value", sachs.value)
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sách:", error);
  }
});

const PhieuMuon = ref({
  MaDocGia: DocGiaId, // Sẽ được tự động cập nhật từ DocGiaId
  MaSach: "",
  NgayMuon: "",
  NgayTra: "",
});

console.log("PhieuMuon", PhieuMuon);
const addPhieuMuon = async () => {
  try {
    await TheoDoiMuonSachService.taoPhieuTheoDoi(PhieuMuon.value);
    console.log("Phiếu mượn: ", PhieuMuon.value);

    Swal.fire({
      icon: "success",
      title: "Thêm phiếu mượn thành công",
      showConfirmButton: false,
      timer: 1500, // Thời gian hiển thị thông báo
    });
    router.push("/danh-sach-doc-gia");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Thêm phiếu mượn thất bại!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
    console.error("Lỗi khi thêm phiếu mượn:", error);
  }
};
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: auto;
}



.form-title {
  text-align: center; /* Căn giữa tiêu đề */
  margin-bottom: 20px; /* Khoảng cách dưới tiêu đề */
}
</style>

<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <h2><strong> Phiếu mượn của độc giả {{ state.tenDocGia }}</strong></h2>
      <div class="row">
        <div class="container-items col-12 p-5">
          <div v-auto-animate class="row d-flex">
            <div
              v-for="(PhieuMuon, index) in listPhieuMuonFormatted"
              :key="index"
              class="phieu-muon-container"
            >
              <!-- Hiển thị thông tin phiếu mượn -->
              <div class="card-body">
                <p class="card-text "><strong>{{ PhieuMuon.TenSach }}</strong></p>
                <p class="card-text">Mã sách: {{ PhieuMuon.MaSach }}</p>
                
                <p class="card-text">
                  Ngày mượn: {{ formatDate(PhieuMuon.NgayMuon) }}
                </p>
                <p class="card-text">
                  Ngày trả: {{ formatDate(PhieuMuon.NgayTra) }}
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="add-button" @click="goToAddPhieuMuonForm(DocGiaId)">
      Thêm Phiếu mượn mới
    </button>
  </div>
</template>

<script setup>
import TheoDoiMuonSachService from "@/services/TheoDoiMuonSach.service";
import SachService from "@/services/Sach.service";
import DocGiaService from "@/services/DocGia.service";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

import { useRouter } from "vue-router"; // Import useRouter từ vue-router

const router = useRouter(); // Sử dụng useRouter để khởi tạo router
const route = useRoute();
const DocGiaId = route.params.MaDocGia;

const state = reactive({
  listPhieuMuon: [],
  selectedPhieuMuon: null,
  tenDocGia: ""
});

// Khai báo mảng chứa danh sách các phiếu mượn
const listPhieuMuonFormatted = ref([]);



const getListPhieuMuon = async () => {
  try {
    console.log("DocGiaId", DocGiaId);
    const listPhieuMuon =
      await TheoDoiMuonSachService.layPhieuTheoDoiTheoDocGia(DocGiaId);
    const DocGia =
      await DocGiaService.layDocGiaByMa(DocGiaId);
    state.tenDocGia = DocGia.checkedDocGia.Ten
    console.log("tenDocGia", state.tenDocGia)
    listPhieuMuonFormatted.value = await Promise.all(
      listPhieuMuon.CheckedTheoDoiMuonSach.map(async (PhieuMuon) => {
        console.log("PhieuMuon.MaSach ", PhieuMuon.MaSach);
        console.log("PhieuMuon.MaDocGia ", PhieuMuon.MaDocGia);

        // Call laySachByMaSach from SachService and await for the promise to be resolved
        const sach = await SachService.laySachByMaSach(PhieuMuon.MaSach);

        console.log("Sach.checkedSach", sach.checkedSach.TenSach);

        // Return a new object with TenSach added
        return {
          MaDocGia: PhieuMuon.MaDocGia,
          MaSach: PhieuMuon.MaSach,
          NgayMuon: formatDate(PhieuMuon.NgayMuon),
          NgayTra: formatDate(PhieuMuon.NgayTra),
          TenSach: sach.checkedSach.TenSach,
        };
      })
    );
    console.log("listPhieuMuonFormatted", listPhieuMuonFormatted);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getListPhieuMuon();
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // hoặc sử dụng thư viện như moment.js để định dạng lại ngày tháng
};

const goToAddPhieuMuonForm = (DocGiaId) => {
  router.push(`/form-tao-phieu-theo-doi-muon-sach/${DocGiaId}`);
};
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: auto;
}

.main-content {
  margin-top: 20px;
}

.borrowed-books {
  margin-top: 20px;
}

.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999; /* Đảm bảo nút luôn hiển thị phía trên */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.card-container {
  background-color: rgba(0, 0, 0, 0.2); /* Màu xám mờ */
  backdrop-filter: blur(8px); /* Hiệu ứng mờ */
}

.phieu-muon-container {
  background-color: rgba(0, 0, 0, 0.1); /* Màu nền xung quanh */
  padding: 10px; /* Khoảng cách giữa các phiếu mượn */
  margin: 10px; /* Khoảng cách dưới của mỗi phiếu mượn */
}
</style>

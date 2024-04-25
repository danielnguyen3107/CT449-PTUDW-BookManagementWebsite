<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <div class="row">
        <div class="container-items col-12 p-5">
          <div v-auto-animate class="row d-flex">
            <div
              class="col-sm-3 p-1"
              v-for="DocGia in state.listDocGia"
              :key="DocGia.id"
            >
              <div class="card-container">
                <!-- Hiển thị thông tin sách -->
                <div class="card-body card">
                  <h5 class="card-title">{{ DocGia.TenDocGia }}</h5>
                  <p class="card-text">Họ lót: {{ DocGia.HoLot }}</p>
                  <p class="card-text">Tên: {{ DocGia.Ten }}</p>
                  <p class="card-text">Phái: {{ DocGia.Phai }}</p>
                  <p class="card-text">Địa chỉ: {{ DocGia.DiaChi }}</p>
                  <p class="card-text">
                    Số điện thoại: {{ DocGia.SoDienThoai }}
                  </p>

                  <!-- Nút để theo dõi mượn sách -->
                  <button class="btn btn-success" @click="muonSach(DocGia)">
                    Theo dõi mượn sách
                  </button>                  
                  <button class="btn btn-primary" @click="editDocGia(DocGia)">
                    Sửa
                  </button>
                  <button class="btn btn-danger" @click="deleteDocGia(DocGia)">
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="add-button" @click="goToAddDocGiaForm">Thêm Độc Giả</button>
  </div>
</template>

<script setup>
import DocGiaService from "@/services/DocGia.service";
import { onMounted, reactive } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const state = reactive({
  listDocGia: [],
  selectedDocGia: null,
});

const getListDocGia = async () => {
  try {
    const listDocGia = await DocGiaService.getAllDocGia();
    state.listDocGia = listDocGia.listDocGia;
    console.log("listDocGia", listDocGia);
    // console.log("state.listKhoDocGia", state.listDocGia);
    state.listDocGia.forEach((DocGia) => {
      console.log("DocGia.TenDocGia ", DocGia.TenDocGia); // In ra tên của mỗi sách
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getListDocGia();
});

// BUTTON chuyển tới form thêm độc giả
const goToAddDocGiaForm = () => {
  router.push("/form-them-doc-gia");
};

// BUTTON Chuyển đến trang sửa độc giả với thông tin của độc giả được chọn
const editDocGia = (DocGia) => {
  router.push(`/form-cap-nhat-doc-gia/${DocGia.MaDocGia}`);
};

// Xóa độc giả khỏi danh sách và cơ sở dữ liệu
const deleteDocGia = async (DocGia) => {
  try {
    await DocGiaService.deleteDocGia(DocGia.MaDocGia);
    // Sau khi xóa thành công, cập nhật lại danh sách độc giả
    getListDocGia();
  } catch (error) {
    console.error("Lỗi khi xóa độc giả:", error);
  }
};

// Chuyển đến trang mượn sách với thông tin của độc giả được chọn
const muonSach = (DocGia) => {
  // Chuyển đến trang mượn sách với ID của độc giả được chọn
  router.push(`/phieu-theo-doi-muon-sach/${DocGia.MaDocGia}`);
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
</style>

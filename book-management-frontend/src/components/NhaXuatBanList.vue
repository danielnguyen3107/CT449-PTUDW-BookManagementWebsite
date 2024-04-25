<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <div class="row">
        <div class="container-items col-12 p-5">
          <div v-auto-animate class="row d-flex">
            <div
              v-for="nxb in state.listNXB"
              :key="nxb.id"
              class="nxb-container"
            >
              <!-- Hiển thị thông tin nhà xuất bản -->
              <div class="card-body card ">
                <h5 class="card-title">Tên NXB: {{ nxb.TenNXB }}</h5>

                <p class="card-text">Mã NXB: {{ nxb.MaNXB }}</p>
                <p class="card-text">Địa chỉ: {{ nxb.DiaChi }}</p>
                <button class="btn btn-primary" @click="goToEditNXBForm(nxb)">
                  Sửa
                </button>
                <button class="btn btn-danger" @click="deleteNXB(nxb)">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  <button class="add-button" @click="goToAddNXBForm">
      Thêm Nhà xuất bản mới
    </button>
</template>

<script setup>
import NhaXuatBanService from "@/services/NhaXuatBan.service";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const state = reactive({
  listNXB: [],
  selectedNXB: null,
});

// Khai báo mảng chứa danh sách các nhà xuất bản
const listNXBFormatted = ref([]);

const getListNXB = async () => {
  try {
    const listNXB = await NhaXuatBanService.getAllNXB();
    state.listNXB = listNXB.listNXB;
    console.log("state.listNXB", state.listNXB);
    console.log("state.listNXB[0]", state.listNXB[0]);
    console.log("state.listNXB[1]", state.listNXB[1]);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getListNXB();
});

// Xóa nhà xuất bản khỏi danh sách và cơ sở dữ liệu
const deleteNXB = async (nxb) => {
  try {
    await NhaXuatBanService.deleteNXB(nxb.MaNXB);
    // Sau khi xóa thành công, cập nhật lại danh sách nhà xuất bản
    getListNXB();
  } catch (error) {
    console.error("Lỗi khi xóa nhà xuất bản:", error);
  }
};

const goToAddNXBForm = () => {
  router.push(`/them-nha-xuat-ban`);
};

const goToEditNXBForm = (nxb) => {
  router.push(`/sua-nha-xuat-ban/${nxb.MaNXB}`);
};






</script>

<style>
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
</style>

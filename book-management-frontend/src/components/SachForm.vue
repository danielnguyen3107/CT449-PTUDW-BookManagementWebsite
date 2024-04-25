<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <h2 class="form-title">THÔNG TIN SÁCH</h2>
      <form @submit.prevent="addSach">
        <div class="form-group">
          <label for="TenSach">Tên sách:</label>
          <input
            type="text"
            class="form-control"
            id="TenSach"
            v-model="sach.TenSach"
            required
          />
        </div>
        <div class="form-group">
          <label for="DonGia">Đơn giá:</label>
          <input
            type="number"
            class="form-control"
            id="DonGia"
            v-model="sach.DonGia"
            required
          />
        </div>
        <div class="form-group">
          <label for="SoQuyen">Số lượng:</label>
          <input
            type="number"
            class="form-control"
            id="SoQuyen"
            v-model="sach.SoQuyen"
            required
          />
        </div>
        <div class="form-group">
          <label for="NamXB">Năm xuất bản:</label>
          <input
            type="number"
            class="form-control"
            id="NamXB"
            v-model="sach.NamXB"
            required
          />
        </div>
        <div class="form-group">
          <label for="MaNXB">Mã NXB:</label>
          <input
            type="number"
            class="form-control"
            id="MaNXB"
            v-model="sach.MaNXB"
            required
          />
        </div>
        <div class="form-group">
          <label for="TacGia">Tác giả:</label>
          <input
            type="text"
            class="form-control"
            id="TacGia"
            v-model="sach.TacGia"
            required
          />
        </div>
        <div class="form-group">
          <label for="ImageSach">Link hình ảnh:</label>
          <input
            type="text"
            class="form-control"
            id="ImageSach"
            v-model="sach.ImageSach"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Xác nhận</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SachService from "@/services/Sach.service";
import { useRouter } from "vue-router"; // Import router của Vue
const router = useRouter(); // Khởi tạo router
import Swal from "sweetalert2";

const sach = ref({
  TenSach: "",
  DonGia: null,
  SoQuyen: null,
  NamXB: null,
  MaNXB: null,
  TacGia: "",
  ImageSach: "",
});

const addSach = async () => {
  try {
    await SachService.addSach(sach.value);
    console.log("Sách: ", sach.value);
    router.push("/");
    // Hiển thị thông báo thành công
    Swal.fire({
      icon: "success",
      title: "Thêm sách thành công",
      showConfirmButton: false,
      timer: 1500, // Thời gian hiển thị thông báo
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Thêm sách thất bại!",
      footer: '<a href="#">Why do I have this issue?</a>',
    });
    console.error("Lỗi khi thêm sách:", error);
  }
};
</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: auto;
}

.background {
  /* Thêm CSS cho background nếu cần */
}

.container {
  /* Thêm CSS cho container nếu cần */
}

.form-title {
  text-align: center; /* Căn giữa tiêu đề */
  margin-bottom: 20px; /* Khoảng cách dưới tiêu đề */
}
</style>

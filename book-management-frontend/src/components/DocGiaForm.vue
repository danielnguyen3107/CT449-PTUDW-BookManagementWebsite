<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <h2 class="form-title">THÔNG TIN ĐỘC GIẢ</h2>
      <form @submit.prevent="addDocGia">
        <div class="form-group">
          <label for="HoLot">Họ lót:</label>
          <input
            type="text"
            class="form-control"
            id="HoLot"
            v-model="DocGia.HoLot"
            required
          />
        </div>
        <div class="form-group">
          <label for="Ten">Tên:</label>
          <input
            type="text"
            class="form-control"
            id="Ten"
            v-model="DocGia.Ten"
            required
          />
        </div>
        <div class="form-group">
          <label for="Phai">Phái:</label>
          <select class="form-control" id="Phai" v-model="DocGia.Phai" required>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div class="form-group">
          <label for="DiaChi">Địa chỉ:</label>
          <input
            type="text"
            class="form-control"
            id="DiaChi"
            v-model="DocGia.DiaChi"
            required
          />
        </div>
        <div class="form-group">
          <label for="SoDienThoai">Số điện thoại:</label>
          <input
            type="tel"
            class="form-control"
            id="SoDienThoai"
            v-model="DocGia.SoDienThoai"
            required
            @keyup="validatePhoneNumber(DocGia.SoDienThoai)"
          />
          <div v-if="!isValidPhone" class="text-danger">
            Số điện thoại không hợp lệ (10 chữ số).
          </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!isValidPhone">
          Xác nhận
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DocGiaService from "@/services/DocGia.service";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();

const DocGia = ref({
  HoLot: "",
  Ten: "",
  Phai: "",
  DiaChi: "",
  SoDienThoai: "",
});

const addDocGia = async () => {
  try {
    await DocGiaService.addDocGia(DocGia.value);
    console.log("Độc giả : ", DocGia.value);

    // Hiển thị thông báo thành công
    Swal.fire({
      icon: "success",
      title: "Thêm độc giả thành công",
      showConfirmButton: false,
      timer: 1500, // Thời gian hiển thị thông báo
    });

    router.push("/danh-sach-doc-gia");

    
    
  } catch (error) {
    console.error("Lỗi khi thêm độc giả:", error);
  }
};

const isValidPhone = ref(true); // Flag for phone number validity

// Phương thức để xác thực số điện thoại
const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/; // Check for exactly 10 digits
  isValidPhone.value = phoneRegex.test(phoneNumber);
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

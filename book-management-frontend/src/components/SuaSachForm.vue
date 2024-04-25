<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <h2 class="form-title">CẬP NHẬT THÔNG TIN</h2>
      <form @submit.prevent="updateSach">
        <div class="form-group">
          <label for="TenSach">Tên sách:</label>
          <input
            type="text"
            class="form-control"
            id="TenSach"
            :value="sach.TenSach"
            @input="sach.TenSach = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="DonGia">Đơn giá:</label>
          <input
            type="number"
            class="form-control"
            id="DonGia"
            :value="sach.DonGia"
            @input="sach.DonGia = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="SoQuyen">Số quyển:</label>
          <input
            type="number"
            class="form-control"
            id="SoQuyen"
            :value="sach.SoQuyen"
            @input="sach.SoQuyen = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="NamXB">Năm xuất bản:</label>
          <input
            type="number"
            class="form-control"
            id="NamXB"
            :value="sach.NamXB"
            @input="sach.NamXB = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="MaNXB">Mã nhà xuất bản:</label>
          <input
            type="number"
            class="form-control"
            id="MaNXB"
            :value="sach.MaNXB"
            @input="sach.MaNXB = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="TacGia">Tác giả:</label>
          <input
            type="text"
            class="form-control"
            id="TacGia"
            :value="sach.TacGia"
            @input="sach.TacGia = $event.target.value"
            required
          />
        </div>
        <!-- Các trường thông tin khác tương tự -->
        <button type="submit" class="btn btn-primary">Xác nhận</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import sachService from "@/services/Sach.service";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const router = useRouter();

const route = useRoute();
const sachId = route.params.MaSach;
console.log("sachId", sachId);
const sachOriginal = ref({
  TenSach: "",
  DonGia: 0,
  SoQuyen: 0,
  NamXB: 0,
  MaNXB: 0,
  TacGia: "",
  ImageSach: "",
});

const sach = ref({ ...sachOriginal.value });

const getsachById = async (id) => {
  try {
    console.log("id", id);
    const response = await sachService.laySachByMaSach(id);
    console.log("respone", response);
    console.log("response.checkedsach", response.checkedSach);
    const sachData = response.checkedSach; // Giả sử API trả về dữ liệu độc giả dưới dạng object
    console.log("sachData: ", sachData);
    for (const key in sachData) {
      if (sachOriginal.value.hasOwnProperty(key)) {
        sachOriginal.value[key] = sachData[key];
        console.log("sachOriginal.key", sachOriginal.value[key]);
      }
    }
    // Copy dữ liệu từ sachOriginal sang sach để điền vào form
    Object.assign(sach.value, sachOriginal.value);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin độc giả:", error);
  }
};

// Hàm xử lý cập nhật thông tin độc giả
const updateSach = async () => {
  try {
    // Tạo một bản sao của tất cả các trường hiện có trong form
    const updatedFields = { ...sach.value };
    

    console.log("updateField ", updatedFields);
    // Gọi hàm updatesach từ service và truyền vào đối số là bản sao của các trường hiện có trong form
    console.log("sachId", sachId);
    await sachService.updateSach(sachId, updatedFields);

    Swal.fire({
      icon: "success",
      title: "Cập nhật sách thành công",
      showConfirmButton: false,
      timer: 1500, // Thời gian hiển thị thông báo
    });
    router.push("/");

  } catch (error) {
    console.error("Lỗi khi cập nhật độc giả:", error);
  }
};

onMounted(() => {
  Object.assign(sach.value, sachOriginal.value);
  getsachById(sachId);
});
</script>

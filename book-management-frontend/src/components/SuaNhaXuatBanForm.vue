<template>
    <div class="background py-3">
      <div class="container bg-white px-5 py-2">
        <h2 class="form-title">CẬP NHẬT THÔNG TIN</h2>
        <form @submit.prevent="updateNXB">
          <div class="form-group">
            <label for="TenNXB">Tên Nhà xuất bản:</label>
            <input
              type="text"
              class="form-control"
              id="TenNXB"
              :value="NXB.TenNXB"
              @input="NXB.TenNXB = $event.target.value"
              required
            />
          </div>
          <div class="form-group">
            <label for="DiaChi">Địa chỉ:</label>
            <input
              type="text"
              class="form-control"
              id="DiaChi"
              :value="NXB.DiaChi"
              @input="NXB.DiaChi = $event.target.value"
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
  import NhaXuatBanService from "@/services/NhaXuatBan.service";
  import { useRoute } from "vue-router";
  import Swal from "sweetalert2";
  import { useRouter } from "vue-router";
  const router = useRouter();
  
  const route = useRoute();
  const NXBId = route.params.MaNXB;
  console.log("NXBId", NXBId);
  const NXBOriginal = ref({
    TenNXB: "",
    DiaChi: ""
  });
  
  const NXB = ref({ ...NXBOriginal.value });
  
  const getNXBById = async (id) => {
    try {
      console.log("id", id);
      const response = await NhaXuatBanService.layNXBByMa(id);
      console.log("respone", response);
      // console.log("response.checkedsach", response.checkedSach);
      const NXBData = response.checkedNXB; // Giả sử API trả về dữ liệu độc giả dưới dạng object
      console.log("NXBDatahData: ", NXBData);
      for (const key in NXBData) {
        if (NXBOriginal.value.hasOwnProperty(key)) {
          NXBOriginal.value[key] = NXBData[key];
          console.log("NXBOriginal.key", NXBOriginal.value[key]);
        }
      }
      // Copy dữ liệu từ sachOriginal sang sach để điền vào form
      Object.assign(NXB.value, NXBOriginal.value);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin độc giả:", error);
    }
  };
  
  // Hàm xử lý cập nhật thông tin độc giả
  const updateNXB = async () => {
    try {
      // Tạo một bản sao của tất cả các trường hiện có trong form
      const updatedFields = { ...NXB.value };
      
  
      console.log("updateField ", updatedFields);
      // Gọi hàm updatesach từ service và truyền vào đối số là bản sao của các trường hiện có trong form
      console.log("NXBId", NXBId);
      await NhaXuatBanService.updateNXB(NXBId, updatedFields);
  
      Swal.fire({
        icon: "success",
        title: "Cập nhật NXB thành công",
        showConfirmButton: false,
        timer: 1500, // Thời gian hiển thị thông báo
      });
      router.push("/nha-xuat-ban");
  
    } catch (error) {
      console.error("Lỗi khi cập nhật độc giả:", error);
    }
  };
  
  onMounted(() => {
    Object.assign(NXB.value, NXBOriginal.value);
    getNXBById(NXBId);
  });
  </script>
  
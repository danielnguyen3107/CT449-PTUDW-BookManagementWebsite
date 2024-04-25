<template>
  <div class="background py-3">
    <div class="container bg-white px-5 py-2">
      <h2 class="form-title">CẬP NHẬT THÔNG TIN</h2>
      <form @submit.prevent="updateDocGia">
        <div class="form-group">
          <label for="HoLot">Họ lót:</label>
          <input
            type="text"
            class="form-control"
            id="HoLot"
            :value="DocGia.HoLot"
            @input="DocGia.HoLot = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="Ten">Tên:</label>
          <input
            type="text"
            class="form-control"
            id="Ten"
            :value="DocGia.Ten"
            @input="DocGia.Ten = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="Phai">Phái:</label>
          <input
            type="text"
            class="form-control"
            id="Phai"
            :value="DocGia.Phai"
            @input="DocGia.Phai = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="DiaChi">Địa chỉ:</label>
          <input
            type="text"
            class="form-control"
            id="DiaChi"
            :value="DocGia.DiaChi"
            @input="DocGia.DiaChi = $event.target.value"
            required
          />
        </div>
        <div class="form-group">
          <label for="SoDienThoai">Số điện thoại:</label>
          <input
            type="text"
            class="form-control"
            id="SoDienThoai"
            :value="DocGia.SoDienThoai"
            @input="DocGia.SoDienThoai = $event.target.value"
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
import DocGiaService from "@/services/DocGia.service";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const DocGiaId = route.params.MaDocGia;
const router = useRouter();

const DocGiaOriginal = ref({
  HoLot: "", // Giá trị ban đầu có thể lấy từ đối tượng độc giả cần cập nhật
  Ten: "",
  Phai: "",
  DiaChi: "",
  SoDienThoai: "",
});

const DocGia = ref({ ...DocGiaOriginal.value });

const getDocGiaById = async (id) => {
  try {
    console.log("id", id);
    const response = await DocGiaService.layDocGiaByMa(id);
    console.log("respone", response);
    console.log("response.checkedDocGia", response.checkedDocGia);
    const docGiaData = response.checkedDocGia; // Giả sử API trả về dữ liệu độc giả dưới dạng object
    console.log("docGiaData: ", docGiaData);
    for (const key in docGiaData) {
      if (DocGiaOriginal.value.hasOwnProperty(key)) {
        DocGiaOriginal.value[key] = docGiaData[key];
        console.log("DocGiaOriginal.key", DocGiaOriginal.value[key]);
      }
    }
    // Copy dữ liệu từ DocGiaOriginal sang DocGia để điền vào form
    Object.assign(DocGia.value, DocGiaOriginal.value);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin độc giả:", error);
  }
};

// Hàm xử lý cập nhật thông tin độc giả
const updateDocGia = async () => {
  try {
    // Tạo một bản sao của tất cả các trường hiện có trong form
    const updatedFields = { ...DocGia.value };
    // console.log("updateField ",updatedFields.Object)
    // Gọi hàm updateDocGia từ service và truyền vào đối số là bản sao của các trường hiện có trong form
    console.log("DocGiaOriginal.value.MaDocGia", DocGiaId);
    await DocGiaService.updateDocGia(DocGiaId, updatedFields);

    // Hiển thị thông báo thành công
    Swal.fire({
      icon: "success",
      title: "Cập nhật thành công",
      showConfirmButton: false,
      timer: 1500, // Thời gian hiển thị thông báo
    });

    router.push("/danh-sach-doc-gia");
    // Thực hiện các hành động khác sau khi cập nhật thành công
  } catch (error) {
    console.error("Lỗi khi cập nhật độc giả:", error);
  }
};

onMounted(() => {
  Object.assign(DocGia.value, DocGiaOriginal.value);
  getDocGiaById(DocGiaId);
});
</script>

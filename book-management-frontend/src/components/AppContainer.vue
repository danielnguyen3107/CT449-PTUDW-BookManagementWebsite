<template >
  <div class="background-2 py-3">
    <div class="container  px-5 py-2">
      <div class="pt-2 " >
        <form class="form-inline my-2 mx-lg-1 d-flex">
          <input
            v-model="state.searchKeyword"
            @input="handleSearchInputChange"
            class="form-control pr-5 search-input flex-grow-1"
            type="search"
            placeholder="Tìm kiếm sách..."
          />
          <button
            class="btn my-sm-0 search-button px-4"
            type="submit"
            @click.prevent="handleSearchSubmit"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div class="row">
        <div class="container-items col-12 p-5">
          <div v-auto-animate class="row d-flex">
            <div
              class="col-sm-3 p-1"
              v-for="sach in state.filteredBooks"
              :key="sach.id"
            >
              <!-- Hiển thị thông tin sách -->
              <div class="card-body card" >
                <h5 class="card-title"  > {{ sach.TenSach }}</h5>
                <p class="card-text">Tác giả: {{ sach.TacGia }}</p>
                <p class="card-text">Năm xuất bản: {{ sach.NamXB }}</p>
                <p class="card-text">Số lượng: {{ sach.SoQuyen }}</p>
                <!-- Hiển thị hình ảnh -->
                <img
                  :src="sach.ImageSach"
                  alt="Ảnh bìa"
                  class="card-img-top"
                  style="
                    width: 100%;
                    height: auto;
                    max-width: 200px;
                    max-height: 200px;
                  "
                />
                <button class="btn btn-primary" @click="goToEditSachForm(sach)">
                    Sửa
                  </button>
                <button class="btn btn-danger" @click="deleteSach(sach)">
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="add-button" @click="goToAddSachForm">Thêm sách mới</button>
  </div>
</template>

<script setup>
import SachService from "@/services/Sach.service";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const state = reactive({
  listSach: [],
  selectedSach: null,
  searchKeyword: "",
  filteredBooks: [], // Thêm trường này để lưu trữ danh sách sách đã lọc
});

const getListSach = async () => {
  try {
    const listSach = await SachService.getAllSach();
    state.listSach = listSach.listSach;
    state.filteredBooks = listSach.listSach
    console.log("listSach", listSach);
    // console.log("state.listKhoSach", state.listSach);
    state.listSach.forEach((sach) => {
      console.log("Tên sách: ", sach.TenSach); // In ra tên của mỗi sách
    });
  } catch (error) {
    console.log(error);
  }
};


onMounted(() => {
  getListSach();
});

// BUTTON chuyển tới form thêm sách
const goToAddSachForm = () => {
  router.push("/form-them-sach");
};



// BUTTON Chuyển đến trang sửa độc giả với thông tin của độc giả được chọn
const goToEditSachForm = (sach) => {
  router.push(`/form-sua-sach/${sach.MaSach}`);
};

const deleteSach = async (sach) => {
  try {
    // Gọi service để xóa sách
    await SachService.deleteSach(sach.MaSach);
    // Cập nhật danh sách sách sau khi xóa
    await getListSach();
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
  }
};

const handleSearchInputChange = () => {
  console.log(state.filteredBooks)
  // Lọc danh sách sách dựa trên từ khóa tìm kiếm
  state.filteredBooks = state.listSach.filter((sach) =>
    
    sach.TenSach.toLowerCase().includes(state.searchKeyword.toLowerCase())
  );
};

</script>

<style scoped>
.app-container {
  max-width: 800px;
  margin: auto;
}

.background-2{
  background-color: #ffffff !important;
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
</style>

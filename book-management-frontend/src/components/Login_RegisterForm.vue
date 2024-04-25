<template>
  <div class="auth-container">
    <div class="auth-form">
      <h2>Đăng nhập Nhân viên</h2>
      <form @submit.prevent="loginFormSubmit">
        <div class="form-group">
          <label for="SoDienThoai">SĐT:</label>
          <input
            type="text"
            class="form-control"
            id="SoDienThoai"
            v-model="loginData.SoDienThoai"
            required
          />
        </div>
        <div class="form-group">
          <label for="Password">Mật khẩu:</label>
          <input
            type="Password"
            class="form-control"
            id="Password"
            v-model="loginData.Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// Import hàm đăng nhập từ service hoặc backend của bạn
import NhanVienService from "@/services/NhanVien.service.js";

// Dữ liệu cho form đăng nhập
const loginData = ref({
  SoDienThoai: "",
  Password: "",
});

const state = reactive({
  NhanVien: [],
});

const findNhanVien = await NhanVienService.layNhanVienByMaNhanVien();


// Sử dụng Vue Router để chuyển hướng người dùng sau khi đăng nhập thành công
const router = useRouter();

// Hàm gọi service để đăng nhập
const login = async (credentials) => {
  try {
    const response = await NhanVienService.NhanVienDNhap(credentials);
    console.log("respone",response)
    return response;
  } catch (error) {
    throw new Error("Đã xảy ra lỗi khi gọi service đăng nhập");
  }
};

// Hàm xử lý đăng nhập
const handleLogin = async () => {
  try {
    // Gọi hàm đăng nhập từ service hoặc backend của bạn
    const response = await login(loginData.value);

    // Kiểm tra xem đăng nhập thành công hay không
    if (response.success) {
      // Lưu token vào local storage hoặc session storage để sử dụng cho các yêu cầu sau này
      localStorage.setItem("accessToken", response.accessToken);

      // Chuyển hướng người dùng đến trang sau khi đăng nhập thành công
      router.push("/");
    } else {
      // Xử lý trường hợp đăng nhập không thành công, ví dụ: hiển thị thông báo lỗi
      console.log(response.message);
    }
  } catch (error) {
    // Xử lý trường hợp lỗi từ server, ví dụ: hiển thị thông báo lỗi
    console.error("Đã xảy ra lỗi khi đăng nhập:", error);
  }
};

// Phương thức được gọi khi biểu mẫu được gửi đi
const loginFormSubmit = async () => {
  // console.log("loginData", loginData.value)
  await handleLogin();
};
</script>

<style scoped>
.auth-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.auth-form {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-form-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.auth-form-toggle button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.auth-form-toggle button.active {
  background-color: #007bff;
  color: #fff;
}

.auth-form-section {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

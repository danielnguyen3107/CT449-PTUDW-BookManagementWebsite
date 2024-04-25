<template>
  <header class="navbar navbar-expand-lg navbar-light " style="background-color: #e3f2fd">
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item mr-auto">
          <router-link
            to="/"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
            >Trang chủ</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/danh-sach-doc-gia"
            class="nav-link"
            :class="{ active: $route.path === '/danh-sach-doc-gia' }"
            >Độc giả</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            to="/nha-xuat-ban"
            class="nav-link"
            :class="{ active: $route.path === '/nha-xuat-ban' }"
            >Nhà xuất bản</router-link
          >
        </li>
        
      </ul>
      <form v-if="!isLoggedIn" class="my-2 my-lg-0">
        <button class="nav-link" @click="goToLoginForm">Đăng nhập</button>
      </form>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goToLoginForm = () => {
  router.push("/nhan-vien-dang-nhap"); // Chuyển hướng đến trang đăng nhập
};
</script>



<template>
    <div id="app"><router-view /></div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppContainer from '@/components/AppContainer.vue';
// import DangKyNhanVienView from '@/views/DangKyNhanVienView.vue';
// import DangNhapNhanVienView from '@/views/DangNhapNhanVienView.vue';
import NhanVienHomeView from '@/views/NhanVienHomeView.vue';
// import KhoSachView from '@/views/RegisterStaffView.vue';
// import TheoDoiMuonSachView from '@/views/TheoDoiMuonSachView.vue';

export default {
    components: {
        AppHeader,
        AppContainer,
        // DangKyNhanVienView,
        // DangNhapNhanVienView,
        NhanVienHomeView,
        // KhoSachView,
        // TheoDoiMuonSachView
    },
};
</script>

<style>
.page {
    max-width: 400px;
    margin: auto;
}
</style>
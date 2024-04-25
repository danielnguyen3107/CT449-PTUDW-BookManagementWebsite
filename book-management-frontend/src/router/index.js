import { createWebHistory, createRouter } from 'vue-router';
import NhanVienHomeView from '../views/NhanVienHomeView.vue';

// Đăng ký + Đăng nhập
import DangNhapNhanVienView from '../views/Auth/DangNhapNhanVienView.vue';
import DangKyNhanVienView from '../views/Auth/DangKyNhanVienView.vue';

// Sách
import ThemSachView from '../views/ThemSachView.vue';
import SuaSachView from '@/views/SuaSachView.vue';

// Độc giả
import ListDocGiaView from '../views/ListDocGiaView.vue';
import ThemDocGiaView from '../views/ThemDocGiaView.vue';
import DocGiaCapNhatView from '../views/DocGiaCapNhatView.vue';

// Phiếu mượn
import TheoDoiMuonSachView from '../views/TheoDoiMuonSachView.vue';
import TaoPhieuTheoDoiMuonSachView from '../views/TaoPhieuTheoDoiMuonSachView.vue';

// Nhà xuất bản
import NhaXuatBanView from '@/views/NhaXuatBanView.vue';
import ThemNhaXuatBanView from '@/views/ThemNhaXuatBanView.vue';
import SuaNhaXuatBanView from '@/views/SuaNhaXuatBanView.vue';


const routes = [
    {
        path: '/',
        name: 'home',
        component: NhanVienHomeView,
    },
    {
        path: '/form-them-sach',
        name: 'Sach-them',
        component: ThemSachView,
    },
    {
        path: '/form-sua-sach/:MaSach',
        name: 'Sach-sua',
        component: SuaSachView,
    },
    {
        path: '/nhan-vien-dang-ky',
        name: 'NhanVien-dang-ky',
        component: DangKyNhanVienView,
    },
    {
        path: '/nhan-vien-dang-nhap',
        name: 'NhanVien-dang-nhap',
        component: DangNhapNhanVienView,
    },  
    {
        path: '/danh-sach-doc-gia',
        name: 'NhanVien-danh-sach-doc-gia',
        component: ListDocGiaView,
    },
    {
        path: '/form-them-doc-gia',
        name: 'NhanVien-them-doc-gia',
        component: ThemDocGiaView,
    },
    {
        path: '/form-cap-nhat-doc-gia/:MaDocGia',
        name: 'NhanVien-cap-nhat-doc-gia',
        component: DocGiaCapNhatView,
    },    
    {
        path: '/phieu-theo-doi-muon-sach/:MaDocGia',
        name: 'NhanVien-phieu-theo-doi-muon-sach',
        component: TheoDoiMuonSachView,
    },
    {
        path: '/form-tao-phieu-theo-doi-muon-sach/:MaDocGia',
        name: 'NhanVien-tao-phieu-theo-doi-muon-sach',
        component: TaoPhieuTheoDoiMuonSachView,
    },
    {
        path: '/nha-xuat-ban',
        name: 'NhanVien-nha-xuat-ban',
        component: NhaXuatBanView,
    },
    {
        path: '/them-nha-xuat-ban',
        name: 'NhanVien-them-nha-xuat-ban',
        component: ThemNhaXuatBanView,
    },
    {
        path: '/sua-nha-xuat-ban/:MaNXB',
        name: 'NhanVien-sua-nha-xuat-ban',
        component: SuaNhaXuatBanView,
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
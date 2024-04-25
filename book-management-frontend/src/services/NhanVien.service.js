import createApiClient from './api.service';
class NhanVienService {
    constructor(baseUrl = '/api/nhan-vien') {
        this.api = createApiClient(baseUrl);
    }
    // Nhân viên
    async NhanVienDNhap(data) {
        return (await this.api.post('/nhan-vien-dang-nhap', data)).data;
    }
    async NhanVienDKy(data) {
        return (await this.api.post('/nhan-vien-dang-ky', data)).data;
    }
    async NhanVienDXuat(data) {
        return (await this.api.post('/nhan-vien-dang-xuat', data)).data;
    }
    async getAllNhanVien() {
        return (await this.api.get('/lay-tat-nhan-vien')).data;
    }
    async addNhanVien(data) {
        return (await this.api.post('/them-nhan-vien', data)).data;
    }
    async deleteNhanVien(MaNhanVien) {
        return (await this.api.delete(`/xoa-nhan-vien/${MaNhanVien}`)).data;
    }
    async updateNhanVien(MaNhanVien, data) {
        return (await this.api.put(`/cap-nhat-nhan-vien/${MaNhanVien}`, data)).data;
    }
    async layNhanVienByMaNhanVien(MaNhanVien) {
        return (await this.api.get(`/lay-nhan-vien-theo-ma/${MaNhanVien}`)).data;
    }

    // Độc giả
    async DocGiaThem(data) {
        return (await this.api.post(`/them-doc-gia`, data)).data;
    }
    async DocGiaCapNhat(MaDocGia, data) {
        return (await this.api.put(`/cap-nhat-doc-gia/${MaDocGia}`, data)).data;
    }
}
export default new NhanVienService();
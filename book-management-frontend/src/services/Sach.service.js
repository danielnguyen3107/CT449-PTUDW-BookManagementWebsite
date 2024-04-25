import createApiClient from './api.service';
class SachService {
    constructor(baseUrl = '/api/sach') {
        this.api = createApiClient(baseUrl);
    }
    async getAllSach() {
        return (await this.api.get('/lay-tat-ca-sach')).data;
    }
    async addSach(data) {
        return (await this.api.post('/them-sach', data)).data;
    }
    async deleteSach(MaSach) {
        return (await this.api.delete(`/xoa-sach/${MaSach}`)).data;
    }
    async updateSach(MaSach, data) {
        return (await this.api.put(`/sua-sach/${MaSach}`, data)).data;
    }
    async laySachByMaSach(MaSach) {
        return (await this.api.get(`/lay-sach-theo-id/${MaSach}`)).data;
    }
}
export default new SachService();
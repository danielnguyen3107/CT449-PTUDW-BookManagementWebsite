import createApiClient from './api.service';
class DocGiaService {
    constructor(baseUrl = '/api/doc-gia') {
        this.api = createApiClient(baseUrl);
    }
    async getAllDocGia() {
        return (await this.api.get('/lay-tat-ca-doc-gia')).data;
    }
    async addDocGia(data) {
        return (await this.api.post('/them-doc-gia', data)).data;
    }
    async deleteDocGia(MaDocGia) {
        return (await this.api.delete(`/xoa-doc-gia/${MaDocGia}`)).data;
    }
    async updateDocGia(MaDocGia, data) {
        return (await this.api.put(`/cap-nhat-doc-gia/${MaDocGia}`, data)).data;
    }
    async layDocGiaByMa(MaDocGia) {
        return (await this.api.get(`/lay-doc-gia-theo-ma/${MaDocGia}`)).data;
    }
}
export default new DocGiaService();
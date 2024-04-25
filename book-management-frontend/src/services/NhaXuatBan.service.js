import createApiClient from './api.service';
class NXBService {
    constructor(baseUrl = '/api/nha-xuat-ban') {
        this.api = createApiClient(baseUrl);
    }
    async getAllNXB() {
        return (await this.api.get('/lay-tat-ca-nxb')).data;
    }
    async addNXB(data) {
        return (await this.api.post('/them-nxb', data)).data;
    }
    async deleteNXB(MaNXB) {
        return (await this.api.delete(`/xoa-nxb/${MaNXB}`)).data;
    }
    async updateNXB(MaNXB, data) {
        return (await this.api.put(`/cap-nhat-nxb/${MaNXB}`, data)).data;
    }
    async layNXBByMa(MaNXB) {
        return (await this.api.get(`/lay-nxb-theo-id/${MaNXB}`)).data;
    }
}
export default new NXBService();
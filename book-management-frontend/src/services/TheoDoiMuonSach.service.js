import createApiClient from './api.service';
class TheoDoiMuonSachService {
    constructor(baseUrl = '/api/theo-doi-muon-sach') {
        this.api = createApiClient(baseUrl);
    }
    async taoPhieuTheoDoi(data) {
        return (await this.api.post('/them-phieu-theo-doi-muon-sach', data)).data;
    }
    async layPhieuTheoDoiTheoDocGia(MaDocGia) {
        return (await this.api.get(`/lay-phieu-theo-doi-muon-sach/${MaDocGia}`)).data;
    }
}
export default new TheoDoiMuonSachService();
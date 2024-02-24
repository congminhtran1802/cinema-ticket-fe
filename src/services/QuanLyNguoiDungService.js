import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService{
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }
    dangNhap = (thongTinDangNhap) => {//taiKhoan, matKhau
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)
    }

    layThongTinNguoiDung = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
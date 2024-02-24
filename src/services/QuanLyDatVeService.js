/* eslint-disable no-use-before-define */
import { ThongTinDatVe } from "../_core/models/ThongTinDatVe";
import { baseService } from "./baseService";

export class QuanLyDatVeService extends baseService{
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }
    layChiTietPhongVe = (maLichChieu) => {// Mã lịch chiếu
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
    }

    datVe = (thongTinDatVe = new ThongTinDatVe()) => { 
        return this.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
    }
}

export const quanLyDatVeService = new QuanLyDatVeService();
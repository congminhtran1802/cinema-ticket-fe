/* eslint-disable no-use-before-define */
import { SET_CHI_TIET_PHONG_VE } from "./types/QuanLyDatVeType"
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";

export const layChiTietPhongVeAction = (maLichChieu) => {

    return async dispatch => {
        try {
            const result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            console.log('Result from API',result);
            if (result.status === 200) {
                dispatch({
                    type: SET_CHI_TIET_PHONG_VE,
                    chiTietPhongVe: result.data.content
                })
            }
        } catch (error) {
            console.log('error', error);
            console.log('error', error.response?.data);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async dispatch => {
        try {
            const result = await quanLyDatVeService.datVe(thongTinDatVe);
            console.log(result.data.content);
        } catch (error) {
            console.log(error.response.data)
        }
    }
}
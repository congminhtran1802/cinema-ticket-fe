import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap, navigate) => {

    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

            // Log result để kiểm tra dữ liệu nhận được từ API
            console.log('result', result);

            if (result && result.data) {
                if (result.data.statusCode === 200) {
                    dispatch({
                        type: DANG_NHAP_ACTION,
                        thongTinDangNhap: result.data.content
                    });

                    // Chuyển hướng về trang trước đó
                    navigate(-1);
                } else {
                    console.log('Error:', result.data.message);
                }
            } else {
                console.log('Error: Invalid response structure - Missing data property');
            }
        } catch (error) {
            console.log('Error:', error.response ? error.response.data : error.message);
        }
    };
};

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
            console.log('result', result);
        } catch (error) {
            console.log('error', error.response.data);
        }
    };
};

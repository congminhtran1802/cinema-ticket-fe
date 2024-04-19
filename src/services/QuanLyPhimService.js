import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService{
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super();
    }
    layDanhSachBanner = () => {
        return this.get(`/api/QuanLyPhim/layDanhSachBanner`)
    }

    layDanhSachPhim = () => {
        return this.get(`/api/QuanLyPhim/layDanhSachPhim?maNhom=${GROUPID}`)
    }

    layDanhSachPhimAdmin = () => {
        return this.get2(`/api/movies/showing`)
    }

    editPhim = (film) => {
        return this.put2(`/api/movies/${film.id}`,film)
    }

    layThongTinPhim = (movieId) => {
        return this.get(`/api/movies/detail?movieId=${movieId}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService();
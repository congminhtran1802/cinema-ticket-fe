import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { EDIT_FILM, LIST_FILM, SET_DANH_SACH_PHIM } from "./types/QuanLyPhimType";

export const layDanhSachPhimAction = () => {
    return async (dispatch) => {
        try{
            const result = await quanLyPhimService.layDanhSachPhim();
    
            //Sau khi lấy dữ liệu từ api về => redux (reducer)
            dispatch({
              type:SET_DANH_SACH_PHIM,
              arrFilm: result.data.content
            })
          } catch (errors){
            console.log("errors", errors)
          }
    } 
}

export const layDanhSachPhimAdmin = () => {
  return async (dispatch) => {
      try{
          const result = await quanLyPhimService.layDanhSachPhimAdmin();
  
          //Sau khi lấy dữ liệu từ api về => redux (reducer)
          dispatch({
            type:LIST_FILM,
            filmList: result
          })
        } catch (errors){
          console.log("errors", errors)
        }
  } 
}

export const editPhim = (film) => {
  return async (dispatch) => {
      try{
          const result = await quanLyPhimService.editPhim(film);
  
          //Sau khi lấy dữ liệu từ api về => redux (reducer)
          dispatch({
            type:EDIT_FILM,
            editFilm: result
          })
        } catch (errors){
          console.log("errors", errors)
        }
  } 
}







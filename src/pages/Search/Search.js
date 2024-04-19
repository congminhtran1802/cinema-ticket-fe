import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import MultipleRows from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import { dataSearchSelector } from "../../redux-toolkit/selector";
import { dataSearchSlice} from "../../redux-toolkit/reducer/dataSearchSlice";

import axios from "axios";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState,userLogin } from '../../recoil/initState';
import Film_Flip from "../../components/Film/Film_Flip";
import { NavLink, useParams } from "react-router-dom";
const Search = () => {
    const isUser =   localStorage.getItem("accessToken")
  const navigate = useNavigate();
 // const name = ""
   const { name } = useParams();
  const [userL, setUserLogin] = useRecoilState(userLogin);
  console.log(userL)
  useEffect(() => {
    dispatch(dataSearchSlice.actions.getDataSearchequest());
    axios
      .get(`http://localhost:8080/api/movies/showing/search?name=${name}`)
      .then(function (response) {
        console.log(response)
        dispatch(dataSearchSlice.actions.getDataSearchSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataSearchSlice.actions.getDataSearchFailure());
      });
  }, [name]);
  const { dataSearch, isLoadingSearch } = useSelector(dataSearchSelector);
  console.log("dataSearch: ", dataSearch[0]);
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto mb-36">
    <section className="text-gray-600 body-font ">
    <div className=" px-5 py-4 mx-auto">
      {/* <div className="flex flex-wrap -m-4">{renderFilm()}</div> */}

      {
        dataSearch?.map((item, index) => (
           
         
              <div className="mt-2" key={index}>
                <Film_Flip phim={dataSearch[index]} />
        
              </div>
              
           
        ))
    }
    </div>
  </section>
  </div>
  )
}

export default Search
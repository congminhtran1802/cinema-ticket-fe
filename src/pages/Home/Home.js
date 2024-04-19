import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import MultipleRows from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import { dataHomeSelector } from "../../redux-toolkit/selector";
import { dataHomeSlice } from "../../redux-toolkit/reducer/dataHomeSlice";
import axios from "axios";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { tokenState,userLogin } from '../../recoil/initState';
import { api } from "../../util/setAuthToken";
import { setAuthToken } from "../../util/setAuthToken";
export default function Home(props) {
  const isUser =   localStorage.getItem("accessToken")
  const navigate = useNavigate();

  const [userL, setUserLogin] = useRecoilState(userLogin);
  console.log(userL)
  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/movies/showing`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());
      });
  }, []);
  const { dataHome, isLoading } = useSelector(dataHomeSelector);
  console.log("dataHome: ", dataHome);
  // const { arrFilm } = useSelector(state => state.QuanLyPhimReducer);
  // const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  // const renderFilm = () => {
  //   return arrFilm.map((phim, index) => {
  //     return (
  //       <Film key={index}/>
  //     );
  //   });
  // };
  // useEffect(() => {
  //   //1 action = {type:'', data}
  //   //2 (Phải cài middleware)
  //   //callBackFunction(dispatch)
  //   const action = layDanhSachPhimAction();
  //   dispatch(action); //dispatch function từ thunk
  //   dispatch(layDanhSachHeThongRapAction());
  // }, [])
  const token = useRecoilValue(tokenState);
  const handle = async () => {
    setAuthToken(token);
    const data = {
      userId:"5",
      scheduleId:"1",
      listSeatIds:[3]
    }
    console.log(data)
    try {
      const res = await api.post("http://localhost:8080/api/bills/create-new-bill", data);
   
      console.log(res)
    } catch (err) {
      console.error(err);
     
    }
  }
  return (
    <div className="container mx-auto">
      <HomeCarousel/>
      <section className="text-gray-600 body-font ">
        <div className=" px-5 py-4 mx-auto">
          {/* <div className="flex flex-wrap -m-4">{renderFilm()}</div> */}
          <MultipleRows dataHome={dataHome} />
        </div>
      </section>
    
      {/* <HomeMenu heThongRapChieu={heThongRapChieu} /> */}
    </div>
  );
}

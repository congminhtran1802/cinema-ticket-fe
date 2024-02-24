import React, { useEffect , useState, useReducer} from "react";
import { useSelector, useDispatch } from "react-redux";
import { layDanhSachPhimAdmin } from "../../redux/actions/QuanLyPhimAction";
import TableList from "../../components/Table/TableList";
import Popup from "../../components/Popup/Popup";


export default function Admin(props) {
  const { filmList, filmListUp } = useSelector(state => state.QuanLyPhimReducer);
  const [openPopup, setOpenPopup] = useState(false);
  const [film, setFilm] = useState({});
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const dispatch = useDispatch();
  // const renderFilm = () => {
  //   return arrFilm.map((phim, index) => {
  //     return (
  //       <Film key={index}/>
  //     );
  //   });
  // };
  useEffect(() => {
    //1 action = {type:'', data}
    //2 (Phải cài middleware)
    //callBackFunction(dispatch)
    const action = layDanhSachPhimAdmin();
    dispatch(action); //dispatch function từ thunk
    console.log("ignored", ignored);
  }, [ignored])


  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl">Quản lý phim</h1>
      <section className="text-gray-600 body-font">
        <div className=" px-5 py-4 mx-auto">
          {/* <div className="flex flex-wrap -m-4">{renderFilm()}</div> */}
          <TableList listFilm={filmList} setOpenPopup={setOpenPopup} setFilm={setFilm}/>
        </div>
      </section>
      <Popup title="Sửa phim" openPopup={openPopup} setOpenPopup={setOpenPopup} film={film} forceUpdate={forceUpdate}>
      </Popup>
    </div>
  );
}

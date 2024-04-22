import React, { useEffect , useState, useReducer} from "react";
import { useSelector, useDispatch } from "react-redux";
import { layDanhSachPhimAdmin } from "../../redux/actions/QuanLyPhimAction";
import TableList from "../../components/Table/TableList";
import Popup from "../../components/Popup/Popup";
import { dataHomeSelector } from "../../redux-toolkit/selector";
import { dataHomeSlice } from "../../redux-toolkit/reducer/dataHomeSlice";
import axios from "axios";
export default function Admin(props) {
  const { dataHome, isLoading } = useSelector(dataHomeSelector);
  const [openPopup, setOpenPopup] = useState(false);
  const [film, setFilm] = useState({});
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/movies/`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());
      });
  }, [ignored])


  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl">Quản lý phim</h1>
      <section className="text-gray-600 body-font">
        <div className=" px-5 py-4 mx-auto">
          {/* <div className="flex flex-wrap -m-4">{renderFilm()}</div> */}
          <TableList listFilm={dataHome} setOpenPopup={setOpenPopup} setFilm={setFilm}/>
        </div>
      </section>
      <Popup title="Sửa phim" openPopup={openPopup} setOpenPopup={setOpenPopup} film={film} forceUpdate={forceUpdate}>
      </Popup>
    </div>
  );
}

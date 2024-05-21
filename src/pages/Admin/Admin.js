import React, { useEffect , useState, useReducer} from "react";
import { useSelector, useDispatch } from "react-redux";
import { layDanhSachPhimAdmin } from "../../redux/actions/QuanLyPhimAction";
import TableList from "../../components/Table/TableList";
import Popup from "../../components/Popup/Popup";
import { dataHomeSelector } from "../../redux-toolkit/selector";
import { dataHomeSlice } from "../../redux-toolkit/reducer/dataHomeSlice";
import axios from "axios";
import MovieIcon from '@mui/icons-material/Movie';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
export default function Admin(props) {
  const { dataHome, isLoading } = useSelector(dataHomeSelector);
  const [openPopup, setOpenPopup] = useState(false);
  const [film, setFilm] = useState({});
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("USER_LOGIN"))
	const [role, setRole] = useState(null)

	useEffect(() => {
		axios.get(`http://localhost:8080/api/role?userId=${user.id}`)
			.then(res => {
				setRole(res.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

  
  


  const sideBar = [
    {
      title: "Trang chủ",
      icon: (
        <HomeIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/",
    },
    {
      title: "Quản lý phim",
      icon: (
        <MovieIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/admin/list",
    },
    {
      title: "Quản lý rạp",
      icon: (
        <TheatersIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/admin/branch/list",
    },
    {
      title: "Quản lý phòng",
      icon: (
        <MeetingRoomIcon className="h-7 w-7 max-[1270px]:h-12 max-[1270px]:w-12" />
      ),
      link: "/admin/room/list",
    },
  ];

  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/admin`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());
      });
  }, [ignored])


  return (
    // <div className="container mx-auto">
    //   <h1 className="text-center text-4xl">Quản lý phim</h1>
    //   <section className="text-gray-600 body-font">
    //     <div className=" px-5 py-4 mx-auto">
    //       {/* <div className="flex flex-wrap -m-4">{renderFilm()}</div> */}
    //       <TableList listFilm={dataHome} setOpenPopup={setOpenPopup} setFilm={setFilm}/>
    //     </div>
    //   </section>
    //   <Popup title="Sửa phim" openPopup={openPopup} setOpenPopup={setOpenPopup} film={film} forceUpdate={forceUpdate}>
    //   </Popup>
    // </div>


    <>
      <div className=" bg-gray-100 max-[769px]:mt-0 h-full flex">
        {/* <div className='flex w-[100vw]'> */}
        {/* left menu */}
        <Card className="h-full shadow-none fixed rounded-none max-w-[15vw] w-full py-4 px-2 border-r-2">
          <List>
            {sideBar.map((e, i) => {
              return (
                <Link to={e.link} key={i}>
                  <ListItem>
                    <ListItemPrefix>{e.icon}</ListItemPrefix>
                    <h4 className="max-[1270px]:hidden w-full">{e.title}</h4>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Card>

        <div className="px-2 ml-[15vw] mb-32">
          <Outlet />
        </div>

       
      </div>
    </>
  );
}

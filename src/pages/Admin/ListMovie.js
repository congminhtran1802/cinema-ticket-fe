import React, { useEffect, useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataHomeSelector } from "../../redux-toolkit/selector";
import { dataHomeSlice } from "../../redux-toolkit/reducer/dataHomeSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { DeleteAlert } from "../../components/Alert/Alert";
export default function ListMovie() {

    const { dataHome, isLoading } = useSelector(dataHomeSelector);
    const [openPopup, setOpenPopup] = useState(false);
    const [film, setFilm] = useState({});
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [ignored])

    const fetchData = async () => {
        try {
            dispatch(dataHomeSlice.actions.getDataHomeRequest());
            axios
            .get(`http://localhost:8080/api/admin`)
            .then(function (response) {
                dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
            })
            .catch(function (error) {
                dispatch(dataHomeSlice.actions.getDataHomeFailure());
            });
        } catch (error) {
            console.error(error);
        }
    }


    const handleDelete = async (movieId) => {
        try {
          await DeleteAlert(async () => {
            const res = await axios.delete(
              `http://localhost:8080/api/admin/${movieId}`
            );
            if (res.status === 200) {
              fetchData();
            }
          });
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <div className="flex py-4 px-4">
                <h1 className="text-center text-4xl">Quản lý phim</h1>
                <Link to="/admin/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-auto">Thêm phim</Link>
            </div>
            <table class="w-full text-gray-700 table-hover">
                <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-4 w-[150px]">
                            Phim
                        </th>
                        <th scope="col" className="px-4 w-[80px]">
                            Đạo diễn
                        </th>
                        <th scope="col" className="px-4 w-[300px]">
                            Diễn viên
                        </th>
                        <th scope="col" className="px-4 w-[150px]">
                            Thể loại
                        </th>
                        <th scope="col" className="px-4 w-[100px]">
                            Ngày khởi chiếu
                        </th>
                        <th scope="col" className="px-4 w-[80px]">
                            Thời lượng
                        </th>
                        <th scope="col" className="px-4 w-[100px]">
                            Ngôn ngữ
                        </th>
                        <th scope="col" className="px-4 w-[100px]">
                            Rated
                        </th>
                        <th scope="col" className="px-4 w-[60px]">
                            Trailer URL
                        </th>
                        <th scope="col" className="px-4 w-[150px]">
                            Thao tác
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {dataHome.map((index) => (
                        <tr
                            key={index.id}
                            className="bg-white border-b dark:bg-gray-800  dark:border-gray-700 max-h-[250px] h-[250px] text-white"
                        >
                            <td className="px-4">
                                <img
                                    className="w-40 h-40 object-cover rounded-lg"
                                    src={index.smallImageURl}
                                    alt=""
                                />
                                <p className="text-center">{index.name}</p>
                            </td>
                            <td className="text-center">{index.director}</td>
                            <td className="text-center px-4">{index.actors}</td>
                            <td className="text-center">{index.categories}</td>
                            <td className="text-center">{index.releaseDate}</td>
                            <td className="text-center">{index.duration}</td>
                            <td className="text-center">{index.language}</td>
                            <td className="pl-4 text-center text-ellipsis overflow-hidden ...">{index.rated}</td>
                            <td className="pl-4 text-center text-ellipsis overflow-hidden ..."><a className="text-yellow-200 text-center" href={index.trailerURL} target="_blank">Xem <OpenInNewIcon /></a></td>
                            <td className="text-center">
                                <div className="flex align-middle justify-evenly">

                                <Link
                                    to={`/admin/update/${index.id}`}
                                    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center"
                                    style={{ width: 'fit-content' }}
                                >
                                    <EditIcon />
                                </Link>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center justify-center"
                                    style={{ width: 'fit-content' }}
                                    onClick={() => handleDelete(index.id)}
                                >
                                    <DeleteIcon />
                                </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
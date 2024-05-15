import React, { useEffect, useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataBranchSelector } from "../../redux-toolkit/selector";
import { dataBranchSlice } from "../../redux-toolkit/reducer/dataBranchSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { DeleteAlert } from "../../components/Alert/Alert";
export default function ListBranch() {

    const { dataBranch, isLoading } = useSelector(dataBranchSelector);
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
            dispatch(dataBranchSlice.actions.getDataBranchRequest());
            axios
            .get(`http://localhost:8080/api/branches/full`)
            .then(function (response) {
                dispatch(dataBranchSlice.actions.getDataBranchSuccess(response.data));
            })
            .catch(function (error) {
                dispatch(dataBranchSlice.actions.getDataBranchFailure());
            });
        } catch (error) {
            console.error(error);
        }
    }


    const handleDelete = async (branchId) => {
        try {
          await DeleteAlert(async () => {
            const res = await axios.delete(
              `http://localhost:8080/api/branches/${branchId}`
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
                <h1 className="text-center text-4xl">Quản lý rạp</h1>
                <Link to="/admin/branch/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-auto">Thêm rạp</Link>
            </div>
            <table className="w-full text-gray-700 table-hover">
                <thead className="bg-gray-200">
                    <tr>
                        <th scope="col" className="px-8 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Rạp
                        </th>
                        <th scope="col" className="px-8 w-[600px] text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Địa chỉ
                        </th>
                        <th scope="col" className="px-4 w-[200px] text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Số điện thoại
                        </th>
                        <th scope="col" className="px-4 w-[200px] text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Hành động
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {dataBranch.map((index) => (
                        <tr
                            key={index.id}
                            className="bg-white border-b dark:bg-gray-800  dark:border-gray-700 max-h-[250px] h-[250px] text-white"
                        >
                            <td className="px-4">
                                <img
                                    className="w-40 h-40 object-cover rounded-lg"
                                    src={index.imgURL}
                                    alt=""
                                />
                                <p className="text-center">{index.name}</p>
                            </td>
                            <td className="text-center">{index.diaChi}</td>
                            <td className="text-center px-4">{index.phoneNo}</td>
                            <td className="text-center">
                                <div className="flex align-middle justify-evenly">

                                <Link
                                    to={`/admin/branch/update/${index.id}`}
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
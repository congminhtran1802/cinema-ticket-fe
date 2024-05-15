/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../Services/firebaseService";
import { Alert } from "../../components/Alert/Alert";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function EditRoom() {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataBranch, setDataBranch] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const branchResponse = await axios.get(
                    `http://localhost:8080/api/branches/full`
                );
    
                if (branchResponse.status === 200) {
                    setDataBranch(branchResponse.data);
                }
            } catch (error) {
                console.error(error);
            }
    
            try {
                const roomResponse = await axios.get(
                    `http://localhost:8080/api/rooms/detail?roomId=${roomId}`
                );
    
                setData(roomResponse.data);
                setSelectedBranch(roomResponse.data.branch.id);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    }, [roomId]);
    

    // movie data body

    // input handle change
    const change = (e) => {
        const { name } = e.target;
        let value = e.target.value;
        setData({
            ...data,
            [name]: value,
        });
    };
    

    //   // Images upload
    //   const uploadMultipleFiles = async (images) => {
    //     const storageRef = ref(storage); // Thay 'storage' bằng đường dẫn đến thư mục bạn muốn lưu trữ ảnh

    //     try {
    //       const uploadPromises = images.map(async (file) => {
    //         const imageRef = ref(storageRef, `images/${file.name}`);
    //         await uploadBytes(imageRef, file);
    //         const downloadUrl = await getDownloadURL(imageRef);
    //         return downloadUrl;
    //       });

    //       const downloadUrls = await Promise.all(uploadPromises);
    //       return downloadUrls;
    //     } catch (error) {
    //       console.error("Error: ", error);
    //     }
    //   };

    // data save success
    const [dataSave, setDataSave] = useState(null);


    // save room
    const saveRoom = async () => {
        data.branch.id = selectedBranch;
        try {
            const response = await axios.put(
                `http://localhost:8080/api/rooms/${roomId}`,
                data
            );

            if (response.status === 200) {
                setDataSave(response.data);
            }
        } catch (error) {
            Alert(2000, "Cập nhật phòng thất bại", "Vui lòng thử lại!", "error", "OK");
        }
    };
    // end save room

    // submit
    const uploadAndSave = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await saveRoom();
        } catch (error) {
            console.log("error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (dataSave) {
            Alert(2000, "Cập nhật phòng mới", "Cập nhật thành công", "success", "OK");

            const timeoutId = setTimeout(() => {
                navigate("/admin/room/list");
            }, 2000);

            // Cleanup effect để tránh lỗi memory leak
            return () => clearTimeout(timeoutId);
        }
    }, [dataSave, navigate]);

    if (isLoading) {
        return (
            <div className="mx-4 my-4 flex flex-col items-center justify-center">
                <p>Đang tải...</p>
                <Box sx={{ width: "30%" }}>
                    <LinearProgress />
                </Box>
            </div>
        );
    }

    return (
        <div className="mx-4 mt-3 mb-4 w-[1000px]">
            <form onSubmit={uploadAndSave}>
                <div>
                    <div className="font-medium mt-8 flex items-center text-gray-900 text-[2rem]">
                        <span>CẬP NHẬT PHÒNG</span>
                    </div>
                    <hr />
                    {/* row 1 */}
                    <div className="mt-8 mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
                        {/* branch name */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="username"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Tên phòng
                            </label>
                            <input
                                defaultValue={data.name}
                                onChange={change}
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* branch */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="username"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Rạp
                            </label>
                            <div className="mt-3 bg-white h-16" >

                            <FormControl fullWidth>
                                <Select
                                    value={selectedBranch}
                                    id="branch"
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    style={{ height: "64px" }}
                                >
                                    {dataBranch.map((branch) => (
                                        <MenuItem key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </div>
                        </div>

                        {/* capacity */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Sức chứa
                            </label>
                            <input
                                defaultValue={data.capacity}
                                required
                                onChange={change}
                                type="number"
                                name="capacity"
                                id="capacity"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>


                        {/* total area */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Diện tích
                            </label>
                            <input
                                defaultValue={data.totalArea}
                                required
                                onChange={change}
                                type="number"
                                name="totalArea"
                                id="totalArea"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* img url */}
                        <div className="col-span-full">
                            <label
                                htmlFor="street-address"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ảnh phòng
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={data.imgURL}
                                    required
                                    onChange={change}
                                    type="text"
                                    name="imgURL"
                                    id="imgURL"
                                    className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="flex items-center justify-end gap-x-4 text-[1em]">
                    <Link to="/admin/room/list">
                        <button
                            type="submit"
                            className=" rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-[#ff385c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                        >
                            Hủy
                        </button>
                    </Link>
                    <button
                        onClick={uploadAndSave}
                        type="submit"
                        className=" bg-indigo-600 text-white rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../../Services/firebaseService";
import { Alert } from "../../components/Alert/Alert";

export default function EditMovie() {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/movies/details?movieId=${movieId}`).then((response) => {
            setData(response.data);
        });
    }
    , []);

    // movie data body
    const [data, setData] = useState({});

    // input handle change
    const change = (e) => {
        const { name } = e.target;
        let value = e.target.value;
        
        if (name === "duration" || name === "isShowing") {
            value = parseInt(value);
        }
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

    // save property
    const saveProperty = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/admin/${movieId}`,
                data
            );

            if (response.status === 200) {
                setDataSave(response.data);
            }
        } catch (error) {
            Alert(2000, "Cập nhật phim thất bại", "Vui lòng thử lại!", "error", "OK");
        }
    };
    // end save property

    // submit
    const uploadAndSave = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            await saveProperty();
        } catch (error) {
            console.log("error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (dataSave) {
            Alert(2000, "Cập nhật phim mới", "Cập nhật thành công", "success", "OK");

            const timeoutId = setTimeout(() => {
                navigate("/admin/list");
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
        <div className="mx-4 mt-3 mb-4">
            <form onSubmit={uploadAndSave}>
                <div>
                    <div className="font-medium mt-8 flex items-center text-gray-900 text-[2rem]">
                        <span>CẬP NHẬT PHIM</span>
                    </div>
                    <hr />
                    {/* row 1 */}
                    <div className="mt-8 mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* movie name */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="username"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Tên phim
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

                        {/* director */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Đạo diễn
                            </label>
                            <input
                                defaultValue={data.director}
                                required
                                onChange={change}
                                type="text"
                                name="director"
                                id="director"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* actors */}
                        <div className="sm:col-span-full">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Diễn viên
                            </label>
                            <input
                                defaultValue={data.actors}
                                required
                                onChange={change}
                                type="text"
                                name="actors"
                                id="actors"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>


                        {/* small url */}
                        <div className="col-span-3">
                            <label
                                htmlFor="street-address"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ảnh đại diện
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={data.smallImageURl}
                                    required
                                    onChange={change}
                                    type="text"
                                    name="smallImageURl"
                                    id="smallImageURl"
                                    className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* image cover url */}
                        <div className="col-span-3">
                            <label
                                htmlFor="street-address"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ảnh bìa
                            </label>
                            <div className="mt-2">
                                <input
                                    defaultValue={data.largeImageURL}
                                    required
                                    onChange={change}
                                    type="text"
                                    name="largeImageURL"
                                    id="largeImageURL"
                                    className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* description */}
                        <div className="col-span-full">
                            <label
                                htmlFor="about"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Mô tả
                            </label>
                            <div className="mt-2">
                                <textarea
                                    defaultValue={data.longDescription}
                                    required
                                    onChange={change}
                                    id="shortDescription"
                                    name="shortDescription"
                                    rows={3}
                                    className="block pl-5 w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black  sm:leading-6"
                                />
                            </div>
                        </div>



                        

                        {/* categories */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Thể loại
                            </label>
                            <input
                                defaultValue={data.categories}
                                required
                                onChange={change}
                                type="text"
                                name="categories"
                                id="categories"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* release date */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ngày khởi chiếu
                            </label>
                            <input
                                defaultValue={data.releaseDate}
                                required
                                onChange={change}
                                type="date"
                                name="releaseDate"
                                id="releaseDate"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* duration */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Thời lượng
                            </label>
                            <input
                                defaultValue={data.duration}
                                required
                                onChange={change}
                                type="number"
                                name="duration"
                                id="duration"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* trailer url */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Trailer URL
                            </label>
                            <input
                                defaultValue={data.trailerURL}
                                required
                                onChange={change}
                                type="text"
                                name="trailerURL"
                                id="trailerURL"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* language */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ngôn ngữ
                            </label>
                            <input
                                defaultValue={data.language}
                                required
                                onChange={change}
                                type="text"
                                name="language"
                                id="language"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* rated */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Rated
                            </label>
                            <input
                                defaultValue={data.rated}
                                required
                                onChange={change}
                                type="text"
                                name="rated"
                                id="rated"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* is showing */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Đang chiếu
                            </label>
                            <input
                                defaultValue={data.isShowing}
                                required
                                onChange={change}
                                type="number"
                                name="isShowing"
                                id="isShowing"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="flex items-center justify-end gap-x-4 text-[1.6em]">
                    <Link to="/admin/list">
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
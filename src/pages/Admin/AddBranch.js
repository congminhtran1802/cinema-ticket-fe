/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../util/firebaseconfig";
import { Alert } from "../../components/Alert/Alert";
export default function AddBranch() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState();

    // branch data body
    const [data, setData] = useState({
        name: "",
        imgURL: "",
        diaChi: "",
        phoneNo: "",
    });

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
    const uploadSingleFile = async (file) => {
        // Thay 'storage' bằng đường dẫn đến thư mục bạn muốn lưu trữ ảnh
        const storageRef = ref(storage);

        try {
            // Tạo một tham chiếu đến vị trí lưu trữ cụ thể cho tệp ảnh
            const imageRef = ref(storageRef, `images/${file.name}`);

            // Tải tệp ảnh lên vị trí lưu trữ cụ thể
            await uploadBytes(imageRef, file);

            // Lấy URL tải xuống của ảnh sau khi đã được tải lên
            const downloadUrl = await getDownloadURL(imageRef);

            // Trả về URL tải xuống của ảnh
            return downloadUrl;
        } catch (error) {
            // In ra lỗi nếu có bất kỳ lỗi nào xảy ra trong quá trình tải lên
            console.error("Error: ", error);
        }
    };

    // data save success
    const [dataSave, setDataSave] = useState(null);



    // save property
    const saveBranch = async (avatar) => {
        try {
            data.imgURL = avatar;
            const response = await axios.post(
                `http://localhost:8080/api/branches`,
                data
            );

            if (response.status === 200) {
                setDataSave(response.data);
            }
        } catch (error) {
            Alert(2000, "Tạo rạp thất bại", "Vui lòng thử lại!", "error", "OK");
        }
    };
    // end save branch

    // submit
    const uploadAndSave = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            const avatar = await uploadSingleFile(image);
            await saveBranch(avatar);
        } catch (error) {
            console.log("error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (dataSave) {
            Alert(2000, "Tạo rạp mới", "Tạo thành công", "success", "OK");

            const timeoutId = setTimeout(() => {
                navigate("/admin/branch/list");
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
            <form onSubmit={uploadAndSave} className="w-full">
                <div>
                    <div className="font-medium mt-8 flex items-center text-gray-900 text-[2rem]">
                        <span>TẠO RẠP MỚI</span>
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
                                Tên rạp
                            </label>
                            <input
                                onChange={change}
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* phoneNo */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Số điện thoại
                            </label>
                            <input
                                defaultValue={""}
                                required
                                onChange={change}
                                type="text"
                                name="phoneNo"
                                id="phoneNo"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>

                        {/* diaChi */}
                        <div className="sm:col-span-full">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Địa chỉ
                            </label>
                            <input
                                defaultValue={""}
                                required
                                onChange={change}
                                type="text"
                                name="diaChi"
                                id="diaChi"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                        </div>


                        {/* img url */}
                        <div className="col-span-full">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ảnh rạp
                            </label>
                            <div className="bg-white">

                                <input
                                    required
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="block h-16 mt-3 w-full rounded-md border-0 pt-4 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="flex items-center justify-end gap-x-4 text-[1em]">
                    <Link to="/admin/branch/list">
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
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../util/firebaseconfig";
import { Alert } from "../../components/Alert/Alert";
import { useFormik } from "formik";
import * as yup from "yup";

export default function AddBranch() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState();
    const [dataSave, setDataSave] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            imgURL: "",
            diaChi: "",
            phoneNo: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Tên rạp không được để trống"),
            imgURL: yup.mixed().required('Ảnh rạp là bắt buộc'),
            phoneNo: yup.string().required("Số điện thoại không được để trống"),
            diaChi: yup.string().required("Địa chỉ không được để trống"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const avatar = await uploadSingleFile(image);
                await saveBranch({ ...values, imgURL: avatar });
            } catch (error) {
                console.log("error");
            }
            setIsLoading(false);
        },
    });

    // Images upload
    const uploadSingleFile = async (file) => {
        const storageRef = ref(storage);

        try {
            const imageRef = ref(storageRef, `images/${file.name}`);
            await uploadBytes(imageRef, file);
            const downloadUrl = await getDownloadURL(imageRef);
            return downloadUrl;
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    // save property
    const saveBranch = async (data) => {
        try {
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

    useEffect(() => {
        if (dataSave) {
            Alert(2000, "Tạo rạp mới", "Tạo thành công", "success", "OK");

            const timeoutId = setTimeout(() => {
                navigate("/admin/branch/list");
            }, 2000);

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
            <form onSubmit={formik.handleSubmit} className="w-full">
                <div>
                    <div className="font-medium mt-8 flex items-center text-gray-900 text-[2rem]">
                        <span>TẠO RẠP MỚI</span>
                    </div>
                    <hr />
                    <div className="mt-8 mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
                        {/* branch name */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="name"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Tên rạp
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-600">{formik.errors.name}</div>
                            ) : null}
                        </div>

                        {/* phoneNo */}
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="phoneNo"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                name="phoneNo"
                                id="phoneNo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNo}
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.phoneNo && formik.errors.phoneNo ? (
                                <div className="text-red-600">{formik.errors.phoneNo}</div>
                            ) : null}
                        </div>

                        {/* diaChi */}
                        <div className="sm:col-span-full">
                            <label
                                htmlFor="diaChi"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Địa chỉ
                            </label>
                            <input
                                type="text"
                                name="diaChi"
                                id="diaChi"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.diaChi}
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.diaChi && formik.errors.diaChi ? (
                                <div className="text-red-600">{formik.errors.diaChi}</div>
                            ) : null}
                        </div>

                        {/* imgURL */}
                        <div className="col-span-full">
                            <label
                                htmlFor="imgURL"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ảnh rạp
                            </label>
                            <div className="bg-white">
                                <input
                                    type="file"
                                    name="imgURL"
                                    id="imgURL"
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        formik.setFieldValue("imgURL", e.target.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="block h-16 mt-3 w-full rounded-md border-0 pt-4 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                                {formik.touched.imgURL && formik.errors.imgURL ? (
                                    <div className="text-red-600">{formik.errors.imgURL}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="flex items-center justify-end gap-x-4 text-[1em]">
                    <Link to="/admin/branch/list">
                        <button
                            type="button"
                            className="rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-[#ff385c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                        >
                            Hủy
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                    >
                        Lưu
                    </button>
                </div>
            </form>
        </div>
    );
}

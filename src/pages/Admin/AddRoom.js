/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../util/firebaseconfig";
import { Alert } from "../../components/Alert/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import * as yup from "yup";

export default function AddRoom() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState();
    const [dataBranch, setDataBranch] = useState([]);
    const [dataSave, setDataSave] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/branches/full`
                );

                if (response.status === 200) {
                    setDataBranch(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            imgURL: "",
            capacity: "",
            totalArea: "",
            branch: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Tên phòng không được để trống"),
            imgURL: yup.mixed().required('Ảnh phòng là bắt buộc'),
            capacity: yup.number().required("Sức chứa không được để trống").positive().integer(),
            totalArea: yup.number().required("Diện tích không được để trống").positive(),
            branch: yup.number().required("Rạp không được để trống"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const avatar = await uploadSingleFile(image);
                await saveRoom(avatar, values);
            } catch (error) {
                console.log("error");
            }
            setIsLoading(false);
        },
    });

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

    const saveRoom = async (avatar, formValues) => {
        const data = {
            ...formValues,
            imgURL: avatar,
            branch: {
                id: formValues.branch,
            },
        };
        try {
            const response = await axios.post(
                `http://localhost:8080/api/rooms`,
                data
            );

            if (response.status === 200) {
                setDataSave(response.data);
            }
        } catch (error) {
            Alert(2000, "Tạo phòng thất bại", "Vui lòng thử lại!", "error", "OK");
        }
    };

    useEffect(() => {
        if (dataSave) {
            Alert(2000, "Tạo phòng mới", "Tạo thành công", "success", "OK");

            const timeoutId = setTimeout(() => {
                navigate("/admin/room/list");
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
                        <span>TẠO PHÒNG MỚI</span>
                    </div>
                    <hr />
                    <div className="mt-8 mb-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block font-medium leading-6 text-gray-900">
                                Tên phòng
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

                        <div className="sm:col-span-3">
                            <label htmlFor="branch" className="block font-medium leading-6 text-gray-900">
                                Rạp
                            </label>
                            <div className="mt-3 bg-white h-16">
                                <FormControl fullWidth>
                                    <InputLabel id="branch">Rạp</InputLabel>
                                    <Select
                                        labelId="branch"
                                        id="branch"
                                        name="branch"
                                        value={formik.values.branch}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                            {formik.touched.branch && formik.errors.branch ? (
                                <div className="text-red-600">{formik.errors.branch}</div>
                            ) : null}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="capacity" className="block font-medium leading-6 text-gray-900">
                                Sức chứa
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                id="capacity"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.capacity}
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.capacity && formik.errors.capacity ? (
                                <div className="text-red-600">{formik.errors.capacity}</div>
                            ) : null}
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="totalArea" className="block font-medium leading-6 text-gray-900">
                                Diện tích
                            </label>
                            <input
                                type="number"
                                name="totalArea"
                                id="totalArea"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.totalArea}
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.totalArea && formik.errors.totalArea ? (
                                <div className="text-red-600">{formik.errors.totalArea}</div>
                            ) : null}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="image" className="block font-medium leading-6 text-gray-900">
                                Ảnh phòng
                            </label>
                            <div className="bg-white">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        formik.setFieldValue("imgURL", e.target.files[0]);
                                    }}
                                    className="block h-16 mt-3 w-full rounded-md border-0 pt-4 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                            {formik.touched.imgURL && formik.errors.imgURL ? (
                                <div className="text-red-600">{formik.errors.imgURL}</div>
                            ) : null}
                        </div>
                    </div>
                    <hr />
                </div>

                <div className="flex items-center justify-end gap-x-4 text-[1em]">
                    <Link to="/admin/room/list">
                        <button
                            type="button"
                            className="rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-[#ff385c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                        >
                            Hủy
                        </button>
                    </Link>
                    <button
                        onClick={formik.handleSubmit}
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

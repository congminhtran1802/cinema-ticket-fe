/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../util/firebaseconfig";
import { Alert } from "../../components/Alert/Alert";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import SchedulePopup from "../../components/Popup/SchedulePopup";
import { useFormik } from "formik";
import * as yup from "yup";

export default function AddMovie() {
    const navigate = useNavigate();
    const [openPopup, setOpenPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [listSchedule, setListSchedule] = useState([]);
    const [image, setImage] = useState();
    const [banner, setBanner] = useState();
    const [dataSave, setDataSave] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            director: "",
            actors: "",
            smallImageURl: "",
            largeImageURL: "",
            shortDescription: "",
            categories: "",
            releaseDate: "",
            duration: 0,
            trailerURL: "",
            language: "",
            rated: "",
            isShowing: 0,
        },
        validationSchema: yup.object({
            name: yup.string().required('Tên phim là bắt buộc'),
            smallImageURl: yup.mixed().required('Poster phim là bắt buộc'),
            largeImageURL: yup.mixed().required('Ảnh bìa là bắt buộc'),
            shortDescription: yup.string().required('Mô tả ngắn là bắt buộc'),
            categories: yup.string().required('Thể loại là bắt buộc'),
            releaseDate: yup.date().required('Ngày khởi chiếu là bắt buộc'),
            duration: yup.number().required('Thời lượng là bắt buộc'),
            trailerURL: yup.string().url('URL không hợp lệ').required('Trailer URL là bắt buộc'),
            language: yup.string().required('Ngôn ngữ là bắt buộc'),
            rated: yup.string().required('Rated là bắt buộc'),
            isShowing: yup.number().required('Trạng thái đang chiếu là bắt buộc'),
            director: yup.string().required('Đạo diễn là bắt buộc'),
            actors: yup.string().required('Diễn viên là bắt buộc'),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);

            try {
                const avatar = await uploadSingleFile(image);
                const bannerUrl = await uploadSingleFile(banner);
                await saveProperty(avatar, bannerUrl);
            } catch (error) {
                console.log("error");
            } finally {
                setIsLoading(false);
            }
        },
    });

    const disableTime = () => {
        var today, dd, mm, yyyy;
        today = new Date();
        dd = today.getDate();
        mm = today.getMonth() + 1; //January is 0!
        yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        return `${yyyy}-${mm}-${dd}`;
    }

    // // movie data body
    // const [data, setData] = useState({
    //     name: "",
    //     smallImageURl: "",
    //     shortDescription: "",
    //     longDescription: "",
    //     largeImageURL: "",
    //     director: "",
    //     actors: "",
    //     categories: "",
    //     releaseDate: "",
    //     duration: 0,
    //     trailerURL: "",
    //     language: "",
    //     rated: "",
    //     isShowing: 0,
    // });


    // // input handle change
    // const change = (e) => {
    //     const { name } = e.target;
    //     let value = e.target.value;

    //     if (name === "duration" || name === "isShowing") {
    //         value = parseInt(value);
    //     }
    //     setData({
    //         ...data,
    //         [name]: value,
    //     });
    // };


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
    const saveProperty = async (avatar, bannerUrl) => {
        try {
            const dataFinal = {
                movieDTO: {
                    ...formik.values,
                    smallImageURl: avatar,
                    largeImageURL: bannerUrl,
                },
                scheduleDTO: listSchedule,
            };
            const response = await axios.post(`http://localhost:8080/api/admin`, dataFinal);

            if (response.status === 200) {
                setDataSave(response.data);
            }
        } catch (error) {
            Alert(2000, "Tạo phim thất bại", "Vui lòng thử lại!", "error", "OK");
        }
    };
    // end save property

    useEffect(() => {
        if (dataSave) {
            Alert(2000, "Tạo phim mới", "Tạo thành công", "success", "OK");

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
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className="font-medium mt-8 flex items-center text-gray-900 text-[2rem]">
                        <span>TẠO PHIM MỚI</span>
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
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                required
                                type="text"
                                name="name"
                                id="name"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-600">{formik.errors.name}</div>
                            ) : null}
                        </div>

                        {/* director */}
                        <div className="sm:col-span-3">
                            <label htmlFor="director" className="block font-medium leading-6 text-gray-900">
                                Đạo diễn
                            </label>
                            <input
                                onChange={formik.handleChange}
                                value={formik.values.director}
                                type="text"
                                name="director"
                                id="director"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.director && formik.errors.director ? (
                                <div className="text-red-600">{formik.errors.director}</div>
                            ) : null}
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
                                value={formik.values.actors}
                                required
                                onChange={formik.handleChange}
                                type="text"
                                name="actors"
                                id="actors"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.actors && formik.errors.actors ? (
                                <div className="text-red-600">{formik.errors.actors}</div>
                            ) : null}
                        </div>


                        {/* small url */}
                        <div className="col-span-3">

                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ảnh đại diện
                            </label>
                            <div className="bg-white">

                                <input
                                    required
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                        formik.setFieldValue("smallImageURl", e.target.files[0]);
                                    }}
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="block h-16 mt-3 w-full rounded-md border-0 pt-4 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                            {formik.touched.smallImageURl && formik.errors.smallImageURl ? (
                                <div className="text-red-600">{formik.errors.smallImageURl}</div>
                            ) : null}

                        </div>

                        {/* image cover url */}
                        <div className="col-span-3">

                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Ảnh bìa
                            </label>
                            <div className="bg-white">

                                <input
                                    required
                                    onChange={(e) => {
                                        setBanner(e.target.files[0]);
                                        formik.setFieldValue("largeImageURL", e.target.files[0]);
                                    }}
                                    type="file"
                                    name="banner"
                                    id="banner"
                                    className="block h-16 mt-3 w-full rounded-md border-0 pt-4 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                                />
                            </div>
                            {formik.touched.largeImageURL && formik.errors.largeImageURL ? (
                                <div className="text-red-600">{formik.errors.largeImageURL}</div>
                            ) : null}

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
                                    value={formik.values.shortDescription}
                                    required
                                    onChange={formik.handleChange}
                                    id="shortDescription"
                                    name="shortDescription"
                                    rows={3}
                                    className="block pl-5 w-full rounded-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black  sm:leading-6"

                                />
                                {formik.touched.shortDescription && formik.errors.shortDescription ? (
                                    <div className="text-red-600">{formik.errors.shortDescription}</div>
                                ) : null}
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
                                value={formik.values.categories}
                                required
                                onChange={formik.handleChange}
                                type="text"
                                name="categories"
                                id="categories"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.categories && formik.errors.categories ? (
                                <div className="text-red-600">{formik.errors.categories}</div>
                            ) : null}
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
                                value={formik.values.releaseDate}
                                required
                                onChange={formik.handleChange}
                                min={disableTime()}
                                type="date"
                                name="releaseDate"
                                id="releaseDate"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.releaseDate && formik.errors.releaseDate ? (
                                <div className="text-red-600">{formik.errors.releaseDate}</div>
                            ) : null}
                        </div>

                        {/* Schedule */}
                        <div className="sm:col-span-1">
                            <label
                                htmlFor="numguest"
                                className="block font-medium leading-6 text-gray-900"
                            >
                                Schedule
                            </label>
                            <p className="bg-white cursor-pointer mt-3 py-4 px-3 font-bold border-2" onClick={
                                () => {
                                    setOpenPopup(true);
                                }
                            }>Lịch chiếu (<span id="scheduleCount">{listSchedule.length}</span>)</p>
                            <SchedulePopup title="Lịch chiếu" openPopup={openPopup} setOpenPopup={setOpenPopup} listSchedule={listSchedule} setListSchedule={setListSchedule} />
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
                                value={formik.values.duration}
                                onChange={formik.handleChange}
                                type="number"
                                name="duration"
                                id="duration"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.duration && formik.errors.duration ? (
                                <div className="text-red-600">{formik.errors.duration}</div>
                            ) : null}
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
                                value={formik.values.trailerURL}
                                onChange={formik.handleChange}
                                type="text"
                                name="trailerURL"
                                id="trailerURL"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.trailerURL && formik.errors.trailerURL ? (
                                <div className="text-red-600">{formik.errors.trailerURL}</div>
                            ) : null}
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
                                value={formik.values.language}
                                onChange={formik.handleChange}
                                type="text"
                                name="language"
                                id="language"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.language && formik.errors.language ? (
                                <div className="text-red-600">{formik.errors.language}</div>
                            ) : null}
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
                                value={formik.values.rated}
                                onChange={formik.handleChange}
                                type="text"
                                name="rated"
                                id="rated"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.rated && formik.errors.rated ? (
                                <div className="text-red-600">{formik.errors.rated}</div>
                            ) : null}
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
                                value={formik.values.isShowing}
                                onChange={formik.handleChange}
                                type="number"
                                name="isShowing"
                                id="isShowing"
                                className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            />
                            {formik.touched.isShowing && formik.errors.isShowing ? (
                                <div className="text-red-600">{formik.errors.isShowing}</div>
                            ) : null}
                        </div>

                    </div>
                    <hr />
                </div>

                <div className="flex items-center justify-end gap-x-4 text-[1em]">
                    <Link to="/admin/list">
                        <button
                            type="submit"
                            className=" rounded-lg px-3 py-2 font-semibold border ring-2 shadow-md hover:bg-[#ff385c] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-3"
                        >
                            Hủy
                        </button>
                    </Link>
                    <button
                        onClick={formik.handleSubmit}
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
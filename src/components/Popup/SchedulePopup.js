import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import React from "react";
import { useState, useEffect } from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import axios from 'axios';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useFormik } from "formik";
import * as yup from "yup";
export default function SchedulePopup(props) {
    const { title, openPopup, setOpenPopup, listSchedule, setListSchedule } = props;
    const [timeSelected, setTimeSelected] = useState("08:00");
    const [branch, setBranch] = useState([]);
    const [room, setRoom] = useState([]);
    const [branchId, setBranchId] = useState(0);

    const timeList = [
        "08:00", "09:30", "11:00", "12:30", "14:00", "15:30",
        "17:00", "18:30", "20:00", "21:30", "23:00"
    ];

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

    const validationSchema = yup.object({
        branch: yup.object().shape({
            id: yup.number().required("Chọn rạp là bắt buộc"),
            name: yup.string().required("Chọn rạp là bắt buộc")
        }).required("Chọn rạp là bắt buộc"),
        room: yup.object().shape({
            id: yup.number().required("Chọn phòng là bắt buộc"),
            name: yup.string().required("Chọn phòng là bắt buộc")
        }).required("Chọn phòng là bắt buộc"),
        startDate: yup.date().required("Chọn ngày chiếu là bắt buộc").min(disableTime(), "Ngày chiếu không hợp lệ"),
        startTime: yup.string().required("Chọn giờ chiếu là bắt buộc"),
        price: yup.number().required("Nhập giá vé là bắt buộc").positive("Giá vé phải lớn hơn 0")
    });

    const formik = useFormik({
        initialValues: {
            branch: {
                id: 0,
                name: "",

            },
            room: {
                id: 0,
                name: "",

            },
            startDate: "",
            startTime: timeSelected,
            price: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setListSchedule([...listSchedule, values]);
        },
    });

    const changeBranch = (event) => {
        const branchId = event.target.value;
        const branchName = branch.find(item => item.id === branchId).name;
        setBranchId(branchId);
        formik.setFieldValue("branch", { id: branchId, name: branchName });
        formik.setFieldValue("room", ""); // Reset room when branch changes
    };

    const changeRoom = (event) => {
        const roomId = event.target.value;
        const selectedRoom = room.find(item => item.id === roomId);
        if (selectedRoom) {
            formik.setFieldValue("room", selectedRoom);
        } else {
            formik.setFieldValue("room", { id: 0, name: "" }); // hoặc null
        }
    };



    const deleteSchedule = (index) => {
        const newList = listSchedule.filter((item, idx) => idx !== index);
        setListSchedule(newList);
    }

    const fetchBranch = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/branches/full`);
            setBranch(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const fetchRoom = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/rooms/full?branchId=${branchId}`);
            setRoom(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRoom(branchId);
    }, [
        branchId
    ]);


    useEffect(() => {
        fetchBranch();
    }
        , []);

    return (
        <Dialog open={openPopup} maxWidth="lg" fullWidth="true">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 w-full">
                    <div className="sm:col-span-1">
                        <label htmlFor="branch" className="block font-medium leading-6 text-gray-900">
                            Rạp
                        </label>
                        <div className="mt-3 bg-white h-16">
                            <FormControl fullWidth error={formik.touched.branch && Boolean(formik.errors.branch)}>
                                <InputLabel id="branch-label">Rạp</InputLabel>
                                <Select
                                    labelId="branch-label"
                                    id="branch"
                                    value={branchId}
                                    onChange={changeBranch}
                                    onBlur={formik.handleBlur}
                                    style={{ height: "64px" }}
                                >
                                    {branch.map((temp) => (
                                        <MenuItem key={temp.id} value={temp.id}>
                                            {temp.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.branch && formik.errors.branch && (
                                    <div className="text-red-600">{formik.errors.branch}</div>
                                )}
                            </FormControl>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="room" className="block font-medium leading-6 text-gray-900">
                            Phòng
                        </label>
                        <div className="mt-3 bg-white h-16">
                            <FormControl fullWidth error={formik.touched.room && Boolean(formik.errors.room)}>
                                <InputLabel id="room-label">Phòng</InputLabel>
                                <Select
                                    labelId="room-label"
                                    id="room"
                                    value={formik.values.room.id}
                                    onChange={changeRoom}
                                    onBlur={formik.handleBlur}
                                    style={{ height: "64px" }}
                                >
                                    {room.length === 0 ? (
                                        <MenuItem disabled value="">
                                            Không có phòng chiếu
                                        </MenuItem>
                                    ) : (
                                        room.map((temp) => (
                                            <MenuItem key={temp.id} value={temp.id}>
                                                {temp.name}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>

                                {formik.touched.room && formik.errors.room && (
                                    <div className="text-red-600">{formik.errors.room}</div>
                                )}
                            </FormControl>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="startDate" className="block font-medium leading-6 text-gray-900">
                            Ngày chiếu
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            min={disableTime()}
                            className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                        />
                        {formik.touched.startDate && formik.errors.startDate && (
                            <div className="text-red-600">{formik.errors.startDate}</div>
                        )}
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="startTime" className="block font-medium leading-6 text-gray-900">
                            Giờ chiếu
                        </label>
                        <div className="mt-3 bg-white h-16">
                            <FormControl fullWidth error={formik.touched.startTime && Boolean(formik.errors.startTime)}>
                                <InputLabel id="time-label">Giờ</InputLabel>
                                <Select
                                    labelId="time-label"
                                    id="startTime"
                                    value={formik.values.startTime}
                                    onChange={(e) => formik.setFieldValue("startTime", e.target.value)}
                                    onBlur={formik.handleBlur}
                                    style={{ height: "64px" }}
                                >
                                    {timeList.map((temp) => (
                                        <MenuItem key={temp} value={temp}>
                                            {temp}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {formik.touched.startTime && formik.errors.startTime && (
                                    <div className="text-red-600">{formik.errors.startTime}</div>
                                )}
                            </FormControl>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="price" className="block font-medium leading-6 text-gray-900">
                            Giá vé
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            placeholder="Giá vé"
                        />
                        {formik.touched.price && formik.errors.price && (
                            <div className="text-red-600">{formik.errors.price}</div>
                        )}
                    </div>
                    <div className="sm:col-span-4 flex justify-end mt-5">
                        <button onClick={formik.handleSubmit} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Thêm
                        </button>
                    </div>
                </form>
                <div className="mt-5">
                    <h1 className="text-xl font-bold">Danh sách lịch chiếu</h1>
                    <table className="min-w-full divide-y divide-gray-200 mt-3">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rạp
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phòng
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày chiếu
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giờ chiếu
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Giá vé
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {listSchedule?.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.branch.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.room.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.startTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button onClick={() => deleteSchedule(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DialogContent>
            <DialogActions>
                <button className="pb-4 pr-7" onClick={() => setOpenPopup(false)}>Huỷ</button>
            </DialogActions>
        </Dialog>
    );
}
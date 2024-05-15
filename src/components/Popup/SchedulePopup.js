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
export default function SchedulePopup(props) {
    const { title, openPopup, setOpenPopup, listSchedule, setListSchedule } = props;
    const [timeSelected, setTimeSelected] = useState("08:00");

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

    // schedule data body
    const [scheduleData, setScheduleData] = useState({
        branch: {
            id: 0,
            name: "",
        },
        room: {
            id: 0,
            name: "",
        },
        startDate: "",
        startTime: "",
        price: 0,
    });


    const [branch, setBranch] = useState([]);
    const [room, setRoom] = useState([]);

    const [branchId, setBranchId] = useState(0);

    const changeBranch = (branchId, branchName) => {

        setScheduleData({
            ...scheduleData,
            branch: {
                id: branchId,
                name: branchName,
            }
        });
        setBranchId(branchId);
    }

    const changeRoom = (roomId, roomName) => {
        setScheduleData({
            ...scheduleData,
            room: {
                id: roomId,
                name: roomName,
            }
        });
    }

    const changeDate = (date) => {
        setScheduleData({
            ...scheduleData,
            startDate: date,
        });
    }

    const changeTime = (time) => {
        setTimeSelected(time);
        setScheduleData({
            ...scheduleData,
            startTime: time,
        });
    }

    const saveSchedule = async () => {
        setListSchedule([...listSchedule, scheduleData]);
    }

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
                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-4 w-full" >
                    <div className="sm:col-span-1">
                        <label
                            htmlFor="username"
                            className="block font-medium leading-6 text-gray-900"
                        >
                            Rạp
                        </label>
                        <div className="mt-3 bg-white h-16" >

                            <FormControl fullWidth>
                                <InputLabel id="branch">Rạp</InputLabel>
                                <Select
                                    labelId="branch"
                                    id="branch"
                                    value={scheduleData.branch.id}
                                    label="Branch"
                                    onChange={(e) => changeBranch(e.target.value, branch.find(item => item.id === e.target.value).name)}
                                    style={{ height: "64px" }}
                                >
                                    {branch.map((temp) => (
                                        <MenuItem key={temp.id} value={temp.id}>
                                            {temp.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label
                            htmlFor="username"
                            className="block font-medium leading-6 text-gray-900"
                        >
                            Phòng
                        </label>
                        <div className="mt-3 bg-white h-16" >

                            <FormControl fullWidth>
                                <InputLabel id="room">Phòng</InputLabel>
                                <Select
                                    labelId="room"
                                    id="room"
                                    value={scheduleData.room.id}
                                    label="Room"
                                    onChange={(e) => changeRoom(e.target.value, room.find(item => item.id === e.target.value).name)}
                                    style={{ height: "64px" }}
                                >
                                    {room.length === 0 ? (
                                        <MenuItem disabled value={0}>
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
                            </FormControl>
                        </div>
                    </div>
                    <div className="sm:col-span-1">
                        <label
                            htmlFor="numguest"
                            className="block font-medium leading-6 text-gray-900"
                        >
                            Ngày chiếu
                        </label>
                        <input
                            defaultValue={""}
                            required
                            onChange={(e) => changeDate(e.target.value)}
                            type="date"
                            min={disableTime()}
                            name="releaseDate"
                            id="releaseDate"
                            className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                        />
                    </div>

                    <div className="sm:col-span-1">
                        <label
                            htmlFor="numguest"
                            className="block font-medium leading-6 text-gray-900"
                        >
                            Giờ chiếu
                        </label>
                        <div className="mt-3 bg-white h-16" >

                            <FormControl fullWidth>
                                <InputLabel id="time">Giờ</InputLabel>
                                <Select
                                    labelId="time"
                                    id="time"
                                    value={timeSelected}
                                    label="Time"
                                    onChange={(e) => changeTime(e.target.value)}
                                    style={{ height: "64px" }}
                                >
                                    {timeList.map((temp) => (
                                        <MenuItem key={temp} value={temp}>
                                            {temp}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label
                            htmlFor="numguest"
                            className="block font-medium leading-6 text-gray-900"
                        >
                            Giá vé
                        </label>
                        <input
                            defaultValue={""}
                            required
                            onChange={(e) => setScheduleData({ ...scheduleData, price: e.target.value })}
                            type="number"
                            name="price"
                            id="price"
                            className="block h-16 mt-3 w-full rounded-md border-0 py-1.5 pl-5 pr-2.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-black sm:leading-6"
                            placeholder="Giá vé"
                        />
                    </div>


                </div>
                <div className='mt-5'>
                    <h1 className='text-xl font-bold'>Danh sách lịch chiếu</h1>
                    <table className="min-w-full divide-y divide-gray-200 mt-3">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rạp</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phòng</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày chiếu</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giờ chiếu</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá vé</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
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
                                        <button onClick={() => deleteSchedule(index)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-end mt-5'>
                    <button onClick={saveSchedule} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Thêm
                    </button>
                </div>
            </DialogContent>
            <DialogActions>
                <button className='pb-4 pr-7' onClick={() => setOpenPopup(false)}>Huỷ</button>
            </DialogActions>
        </Dialog>
    )
}
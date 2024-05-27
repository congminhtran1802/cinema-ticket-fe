import DialogTitle from '@mui/material/DialogTitle';
import { Link, useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import React from "react";
import { useState, useEffect } from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import { useSelector, useDispatch } from "react-redux";
import { editPhim } from "../../redux/actions/QuanLyPhimAction";
import axios from 'axios';
import { Alert } from '../Alert/Alert';
import { useTranslation } from "react-i18next"
export default function BookingPopup(props) {
    const { title, lichchieu, openPopup, setOpenPopup } = props;
    const { t, i18n } = useTranslation();
    const [seatList, setSeatList] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const user = JSON.parse(localStorage.getItem("USER_LOGIN"));
    const bookingData = {
        userId: user?.id,
        listSeatIds: [],
        scheduleId: null,
    };

    useEffect(() => {
        if (lichchieu) {
            axios.get(`http://localhost:8080/api/seats?scheduleId=${lichchieu.id}`)
                .then((res) => {
                    setSeatList(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [lichchieu && lichchieu.id && openPopup]);

    const handleClose = () => {
        setSelectedSeat([]);
        setOpenPopup(false);
    };

    const handleSelectSeat = (seatId) => {
        const index = selectedSeat.includes(seatId);
        if (!index) {
            setSelectedSeat([...selectedSeat, seatId]);
        } else {
            setSelectedSeat(selectedSeat.filter((seat) => seat !== seatId));
        }
    }

    const handleBooking = () => {

        if(user == null) {
            Alert(1500, "Đặt vé", "Vui lòng đăng nhập", "warning", "OK");
            return;
        }

        if (selectedSeat.length == 0) {
            Alert(1500, "Đặt vé", "Vui lòng chọn ghế", "warning", "OK");
            return;
        }

        bookingData.listSeatIds = selectedSeat;
        bookingData.scheduleId = lichchieu.id;
        axios.post(`http://localhost:8080/api/bills/create-new-bill`, bookingData)
        .then(function (response) {
          bookingData.listSeatIds = [];
          bookingData.scheduleId = null;
          setSelectedSeat([]);
          Alert(1500, "Đặt vé", "Thành công", "success", "OK");
          setTimeout(() => {
            setOpenPopup(false);
        }, 1500);
        })
        .catch(function (error) {
          Alert(2000, "Đặt vé", error.response.data, "error", "OK");
        });
    };

    return (
        <Dialog open={openPopup} maxWidth="lg" fullWidth="true" id='modal-center'>
            <div className="flex justify-between pl-2 pr-4 border-b-2 border-black/30 box-border">
                <DialogTitle><h1 className="text-2xl font-bold">{title}</h1></DialogTitle>
                <DialogActions>
                    <button onClick={() => handleClose()} className='text-2xl font-bold'>X</button>
                </DialogActions>
            </div>

            <DialogContent>
                <div className='flex flex-col content-center align-middle'>
                    <div className='flex justify-center'>
                        <img src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-screen.png" alt="..." />
                    </div>
                    <div className='flex justify-center p-2 mt-5'>
                        <div className='grid grid-cols-8 gap-3'>
                            {seatList.map((seat, index) => (
                                seat.isOccupied == 1 ?
                                    <div key={index} className="max-w-[45px] max-h-[45px] bg-gray-400 p-2 rounded-md border-2 border-black/30 cursor-not-allowed">
                                        {seat.name}
                                    </div>
                                    :
                                    <div key={index} className={` ${selectedSeat.includes(seat.id) ? "bg-blue-400" : "bg-white"} max-w-[45px] max-h-[45px] p-2 rounded-md border-2 border-black/30`} onClick={() => handleSelectSeat(seat.id)}>
                                        {seat.name}
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex justify-center p-2 gap-1 mt-5 pb-5 border-b-2 border-black/30 box-border'>
                        <div className='flex w-[50%] justify-between'>
                            <div className='flex items-center'>
                                <div className='bg-white p-2 rounded-md border-2 border-black/30 min-w-[40px] min-h-[40px]'></div>
                                <div className='ml-2'>{t('AvailableSeats')}</div>
                            </div>
                            <div className='flex items-center'>
                                <div className='bg-blue-400 p-2 rounded-md border-2 border-black/30 min-w-[40px] min-h-[40px]'></div>
                                <div className='ml-2'>{t('SeatsBeingSelected')}</div>
                            </div>
                            <div className='flex items-center'>
                                <div className='bg-gray-400 p-2 rounded-md border-2 border-black/30 min-w-[40px] min-h-[40px]'></div>
                                <div className='ml-2'>{t('ReservedSeats')}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center p-2 gap-1 mt-5'>
                        <div className="flex">
                            <img className='w-[120px] h-[150px]' src={lichchieu.movie?.smallImageURl} alt="..." />
                            <div className="flex flex-col max-w-[150px] pl-2">
                                <div className='text-base font-bold'>{lichchieu.movie?.name}</div>
                                <div className='text-base'>{lichchieu.movie?.rated}</div>
                            </div>
                        </div>
                        <div className="flex flex-col pl-7">
                            <table>
                                <tr className="align-top">
                                    <td>{t('Time')}:</td>
                                    <td className="font-bold max-w-[100px] pl-2">{lichchieu.startTime}, {lichchieu.startDate}</td>
                                </tr>
                                <tr>
                                    <td>{t('Room')}:</td>
                                    <td className="font-bold pl-2">{lichchieu.room?.name}</td>
                                </tr>
                            </table>
                        </div>
                        <div className="flex flex-col pl-7">
                            <table>
                                <tr className="align-top">
                                    <td>{t('Price')}:</td>
                                    <td className="font-bold max-w-[100px] pl-2">{lichchieu.price}đ</td>
                                </tr>
                                <tr>
                                    <td>{t('Quantity')}:</td>
                                    <td className="font-bold pl-2">{selectedSeat.length}</td>
                                </tr>
                                <tr>
                                    <td>{t('Total')}:</td>
                                    <td className="font-bold pl-2">{selectedSeat.length * lichchieu.price}đ</td>
                                </tr>
                            </table>
                        </div>
                        <div className='flex justify-items-center items-center pl-10'>
                            <button className='bg-red-500 w-[100px] h-[100px] text-white font-bold p-2 rounded-md border-2 border-black/30' onClick={()=> handleBooking()}>{t('book_tickets')}</button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
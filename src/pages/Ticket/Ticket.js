import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataTicketSelector } from "../../redux-toolkit/selector";
import { dataTicketSlice } from "../../redux-toolkit/reducer/dataTicketSlice";
import axios from "axios";
import AccordionComponent from "../../components/Accordion/AccordionComponent";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Feedback from "../../components/Feedback/Feedback";



export default function Ticket() {
    var user = JSON.parse(localStorage.getItem("USER_LOGIN"));
    var dispatch = useDispatch();
    const [isDisable , setIsDisable] = React.useState([]);
    const [isWriting, setIsWriting] = React.useState(false);
    if (user === null) {
        window.location.href = "/login";
    }
    useEffect(() => {
        if (user.id) {
            axios
                .get(`http://localhost:8080/api/tickets?userId=${user.id}`)
                .then((res) => {
                    dispatch(dataTicketSlice.actions.getDataTicketSuccess(res.data));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    const { dataTicket, isLoading } = useSelector(dataTicketSelector);

    const schedulesByDay = dataTicket.reduce((acc, datatemp) => {
        const { id, qrImageURL, schedule, seat, bill, status } = datatemp; // Trích xuất thông tin từ schedule
        if (!acc[schedule.id]) {
            acc[schedule.id] = {
                ticket: [],
                // Thêm các thuộc tính phụ vào đây
                startDate: schedule.startDate,
                startTime: schedule.startTime,
                movie: schedule.movie,
                status: status,
            };
        }
        acc[schedule.id].ticket.push({ id, qrImageURL, schedule, seat, bill });
        return acc;
    }, {});


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFeedback = () => {
        setIsWriting(!isWriting);
    }

    return (
        <div className="container mx-auto">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Lịch sử đặt vé" value="1" />
                            <Tab label="Feedback" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {Object.entries(schedulesByDay).map(([scheduleId, scheduleData]) => (
                            <AccordionComponent key={scheduleId} scheduleData={scheduleData} />
                        ))}
                    </TabPanel>
                    <TabPanel value="2">
                        {Object.entries(schedulesByDay).map(([scheduleId, scheduleData]) => (
                            scheduleData.status === "complete" ? (
                                <div key={scheduleId} className="border-b-2 border-black/30 box-border pb-4">
                                    <div className='flex justify-start ml-[250px] p-2 gap-1 mt-5 w-[80%]'>
                                        <div className="flex">
                                            <img className='w-[120px] h-[150px]' src={scheduleData.movie?.smallImageURl} alt="..." />
                                            <div className="flex flex-col max-w-[150px] pl-2">
                                                <div className='text-base font-bold'>{scheduleData.movie?.name}</div>
                                                <div className='text-base'>{scheduleData.movie?.rated}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col pl-7">
                                            <table>
                                                <tr className="align-top">
                                                    <td>Thời gian:</td>
                                                    <td className="font-bold max-w-[100px] pl-2">{scheduleData.startTime}, {scheduleData.startDate}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phòng:</td>
                                                    <td className="font-bold pl-2">{scheduleData.ticket[0].schedule.room?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Ghế:</td>
                                                    <td className="font-bold pl-2">{scheduleData.ticket.map((temp) => (
                                                        temp.seat.name + " "
                                                    ))}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="flex flex-col pl-7">
                                            <table>
                                                <tr className="align-top">
                                                    <td>Tổng giá vé:</td>
                                                    <td className="font-bold max-w-[100px] pl-2">{scheduleData.ticket.reduce((totalPrice, ticket) => totalPrice + ticket.schedule.price, 0)}đ</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className="flex flex-col pl-7">
                                            <table>
                                                <tr className="align-top">
                                                    <td>
                                                        <button onClick={handleFeedback} className={`${isDisable.includes(scheduleData.ticket[0].bill.id) ? "hidden" : ""} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>Đánh giá</button>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="w-[80%]">
                                            <Feedback userId={scheduleData.ticket[0].bill.user.id} movieId={scheduleData.movie.id} billId={scheduleData.ticket[0].bill.id} isDisable={isDisable} setIsDisable={setIsDisable} isWriting={isWriting} setIsWriting={setIsWriting}/>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </TabPanel>
                </TabContext>
            </Box>

        </div>
    );
}

import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionComponent(props) {
    const { scheduleData } = props;
    return (
        <Accordion className='mt-4'>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div>
                    <p><b>Movie Name:</b> {scheduleData.movie.name}</p>
                    <p><b>Start Date:</b> {scheduleData.startDate}</p>
                    <p><b>Start Time:</b> {scheduleData.startTime}</p>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                {scheduleData.ticket.map(ticket => (
                    <div key={ticket.id}>
                        <div className='flex justify-center p-2 gap-1 mt-5'>
                            <div className="flex">
                                <img className='w-[120px] h-[150px]' src={ticket.schedule.movie?.smallImageURl} alt="..." />
                                <div className="flex flex-col max-w-[150px] pl-2">
                                    <div className='text-base font-bold'>{ticket.schedule.movie?.name}</div>
                                    <div className='text-base'>{ticket.schedule.movie?.rated}</div>
                                </div>
                            </div>
                            <div className="flex flex-col pl-7">
                                <table>
                                    <tr className="align-top">
                                        <td>Thời gian:</td>
                                        <td className="font-bold max-w-[100px] pl-2">{ticket.schedule.startTime}, {ticket.schedule.startDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Phòng:</td>
                                        <td className="font-bold pl-2">{ticket.schedule.room?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Ghế:</td>
                                        <td className="font-bold pl-2">{ticket.seat.name}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="flex flex-col pl-7">
                                <table>
                                    <tr className="align-top">
                                        <td>Giá vé:</td>
                                        <td className="font-bold max-w-[100px] pl-2">{ticket.schedule.price}đ</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
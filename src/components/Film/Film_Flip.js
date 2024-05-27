import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import './Film_Flip.css'
import { history } from '../../App';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from "react-i18next"

export default function Film_Flip(props) {
    const { t, i18n } = useTranslation();
    const { phim } = props;
    const handleReload = () => {
        history.push(`/detail/${phim.id}`);
        window.location.reload();
    };
    

    const [showVideo, setShowVideo] = useState(false);
    const iframeRef = useRef(null);

    const handleClick = () => {
        setShowVideo(true);
    };

    return (
        <div className="flip-card mt-2">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={phim.smallImageURl} alt="Avatar" style={{ width: 260, height: 300 }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)' }}>
                    <div style={{ position: 'absolute' }}>
                        {!showVideo && (
                            <img
                                src={phim.smallImageURl}
                                alt="Avatar"
                                style={{ width: 260, height: 300 }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://picsum.photos/300/300';
                                }}
                            />
                        )}
                        {showVideo && (
                            <iframe
                                className="absolute"
                                ref={iframeRef}
                                width="260"
                                height="300"
                                src={phim.trailerURL}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0, zIndex: 9999 }}
                            ></iframe>
                        )}
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div onClick={handleClick}>
                            <div className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                            <div className="text-2xl mt-2 font-bold">{phim.name}</div>
                        </div>
                    </div>
                </div>
            </div>
            {phim.isShowing !== 0 && (
                <div onClick={handleReload} className="bg-orange-300 text-center cursor-pointer py-2 my-2 text-success-50 font-bold">
                    {t('book_tickets')}
                </div>
            )}
            {/* <div className="relative bg-black h-10" style={{ width: 260,}}>
                <NavLink to={`/detail/${phim.maPhim}`} className="absolute text-center bg-orange-300 py-2 text-success-50 font-bold">
                    ĐẶT VÉ
                </NavLink>
            </div> */}
        </div>


    )
}
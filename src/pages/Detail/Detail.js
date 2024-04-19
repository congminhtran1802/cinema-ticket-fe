import React, { useEffect, useState } from "react";
import "../../assets/styles/circle.scss";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import axios from "axios";
import { dataDetailSelector } from "../../redux-toolkit/selector";
import { dataDetailSlice } from "../../redux-toolkit/reducer/dataDetailSlice";
import { dataBranchSelector } from "../../redux-toolkit/selector";
import { dataBranchSlice } from "../../redux-toolkit/reducer/dataBranchSlice";
import { dataScheduleSelector } from "../../redux-toolkit/selector";
import { dataScheduleSlice } from "../../redux-toolkit/reducer/dataScheduleSlice";
import BookingPopup from "../../components/BookingPopup/BookingPopup";
import { useTranslation } from "react-i18next"
const { TabPane } = Tabs;

export default function Detail(props) {
  const [branch, setBranch] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [activeKey, setActiveKey] = useState(0);
  const [activeKeyStartDate, setActiveKeyStartDate] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [lichChieu, setLichChieu] = useState({});
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(dataDetailSlice.actions.getDataDetailRequest());
    if (id) {
      axios.get(`http://localhost:8080/api/movies/details?movieId=${id}`)
        .then((res) => {
          dispatch(dataDetailSlice.actions.getDataDetailSuccess(res.data));
        })
        .catch((err) => {
          dispatch(dataDetailSlice.actions.getDataDetailFailure());
          console.log(err);
        });
      axios.get(`http://localhost:8080/api/branches?movieId=${id}`)
        .then((res) => {
          dispatch(dataBranchSlice.actions.getDataBranchSuccess(res.data));
          if (res.data.length > 0) {
            setBranch(res.data[0].id);
          }
        })
        .catch((err) => {
          dispatch(dataBranchSlice.actions.getDataBranchFailure());
          console.log(err);
        });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (branch && id) {
      axios.get(`http://localhost:8080/api/schedule/time?movieId=${id}&branchId=${branch}`)
        .then((res) => {
          dispatch(dataScheduleSlice.actions.getDataStartDate(res.data));
        })
        .catch((err) => {
          dispatch(dataScheduleSlice.actions.getDataScheduleFailure());
          console.log(err);
        });
    }
  }, [branch, id, dispatch]);

  useEffect(() => {
    if (branch && id && startDate) {
    axios.get(`http://localhost:8080/api/schedule/show?movieId=${id}&branchId=${branch}&startDate=${startDate}`)
        .then((res) => {
          dispatch(dataScheduleSlice.actions.getDataScheduleSuccess(res.data));
        })
        .catch((err) => {
          dispatch(dataScheduleSlice.actions.getDataScheduleFailure());
          console.log(err);
        });
    }
  }, [branch, id, startDate, dispatch]);

  const { dataDetail, isLoading } = useSelector(dataDetailSelector);
  const { dataBranch } = useSelector(dataBranchSelector);
  const { dataStartDate } = useSelector(dataScheduleSelector);
  const { dataSchedule } = useSelector(dataScheduleSelector);
  console.log(dataSchedule)
  const handleBranchClick = (id, index) => {
    setActiveKey(index);
    setBranch(id);
  }

  const handleStartDateClick = (date,index) => {
    setActiveKeyStartDate(index);
    setStartDate(date);
  }

  const handleOpenPopup = (lichChieu) => {
    setLichChieu(lichChieu);
    setOpenPopup(true);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${dataDetail && dataDetail.smallImageURl})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          paddingTop: 150,
          minHeight: "100vh",
          backdropFilter: "blur(1px)",
          borderRadius: "15px", 
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          color: "#fff", 
        }}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-6 col-start-4">
            <div className="grid grid-cols-3 items-center">
              {dataDetail && (
                <>
                  <img className="col-span-1" src={dataDetail.smallImageURl} alt={dataDetail.name} />
                  <div className="col-span-2 ml-5 bg-gray-900 bg-opacity-35 p-4 rounded-xl">
                    <p className="p-4 text-2xl font-bold border-b-2 border-white/30 box-border">{dataDetail.name}</p>
                    <div className="p-4">
                      <p className="text-white"><b className="text-yellow-300">{t('Director') }:</b> {dataDetail.director}</p>
                      <p className="text-white"><b className="text-yellow-300">{t('Actor') }:</b> {dataDetail.actors}</p>
                      <p className="text-white"><b className="text-yellow-300">{t('genre') }:</b> {dataDetail.categories}</p>
                      <p className="text-white"><b className="text-yellow-300">{t('Premieredate') }u:</b> {moment(dataDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                      <p className="text-white"><b className="text-yellow-300">{t('timeline') }:</b> {dataDetail.duration} phút</p>
                      <p className="text-white"><b className="text-yellow-300">{t('language') }:</b> {dataDetail.language}</p>
                      <p className="text-white"><b className="text-yellow-300">Rated:</b> {dataDetail.rated}</p>
                    </div>
                  </div>
                  <div className="col-span-3 mt-5 bg-gray-900 bg-opacity-35 p-4 rounded-xl">
                    <p className="text-white text-2xl font-bold">{t('content') }</p>
                    <p className="text-white">{dataDetail.shortDescription}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 mx-52 rounded-lg bg-white px-5 py-5" >
          <Tabs defaultActiveKey="1" centered >
            <TabPane tab= {t('Screeningschedule') } key="1" style={{ minHeight: 300 }}>
              <div>
                <Tabs tabPosition={'left'} defaultActiveKey="1">
                  {dataBranch && dataBranch.map((branch, index) => (
                    <TabPane
                      tab={
                        <div className="flex flex-row items-center justify-center" onClick={() => handleBranchClick(branch.id,index)}>
                          <img src={branch.imgURL} className="rounded-full w-full" style={{ width: 50,height:50 }} alt="..." />
                          <div className="text-center text-lg ml-2 text-black" style={activeKey === index ? { color: '#007FFF' } : {}}>
                            {branch.name}
                          </div>
                        </div>
                      }
                      key={index}
                    >
                      <div className="thong-tin-lich-chieu grid grid-cols-4 pb-4 border-b-2 border-black/30 box-border">
                        {dataStartDate && dataStartDate.map((lichChieu, index) => (
                          <div className="mt-5" key={index}>
                            <div className="flex flex-row">
                              <div className="ml-2 cursor-pointer" onClick={() => handleStartDateClick(lichChieu, index)}>
                                <p style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    lineHeight: 1,
                                    ...(activeKeyStartDate === index ? { color: '#007FFF' } : {})
                                  }}>{lichChieu}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="thong-tin-lich-chieu grid grid-cols-4 mt-2">
                      { dataSchedule && dataSchedule.map((lichChieu, index) => (
                          <div className="mt-5" key={index}>
                            <div className="flex flex-row">
                              <div className="ml-2 cursor-pointer" onClick={()=>handleOpenPopup(lichChieu)}>
                                <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{lichChieu.room.name}</p>                  
                                <p className="p-2">{lichChieu.startTime}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
              <BookingPopup title="Đặt vé" lichchieu={lichChieu} openPopup={openPopup} setOpenPopup={setOpenPopup} />
            </TabPane>
            <TabPane tab= {t('Info') } key="2" style={{ minHeight: 300 }}>
            {t('Info') }
            </TabPane>
            <TabPane tab={t('Review') } key="3" style={{ minHeight: 300 }}>
            {t('Review') }
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

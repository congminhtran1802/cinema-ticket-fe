import React, { useEffect } from "react";
import "../../assets/styles/circle.scss";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
import axios from "axios";
import { dataDetailSelector } from "../../redux-toolkit/selector";
import { dataDetailSlice } from "../../redux-toolkit/reducer/dataDetailSlice";
const { TabPane } = Tabs;
export default function Detail(props) {
  

  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("ID:", id);

  useEffect(() => {
    dispatch(dataDetailSlice.actions.getDataDetailRequest());
    if (id) {
      axios.get(`http://localhost:8080/api/movies/details?movieId=${id}`)
        .then((res) => {
          console.log("res:", res.data);
          dispatch(dataDetailSlice.actions.getDataDetailSuccess(res.data));
        })
        .catch((err) => {
          dispatch(dataDetailSlice.actions.getDataDetailFailure());
          console.log(err);
        });
    }
  }, [id]);

  const { dataDetail, isLoading } = useSelector(dataDetailSelector);


  return (
    <div
      style={{
        backgroundImage: `url(${dataDetail.smallImageURl})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        minHeigh: "100vh",
      }}
    >
      <div
        style={{
          paddingTop: 150,
          minHeight: "100vh",
          backdropFilter: "blur(10px)",
          borderRadius: "15px", // Đặt giá trị phù hợp với nhu cầu của bạn
          backgroundColor: "rgba(f, f, f, 0.5)", // Màu nền với độ mờ
          color: "#fff", // Màu chữ
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
                        <p className="text-white"><b className="text-yellow-300">Đạo diễn:</b> {dataDetail.director}</p>
                        <p className="text-white"><b className="text-yellow-300">Diễn viên:</b> {dataDetail.actors}</p>
                        <p className="text-white"><b className="text-yellow-300">Thể loại:</b> {dataDetail.categories}</p>
                        <p className="text-white"><b className="text-yellow-300">Khởi chiếu:</b> {moment(dataDetail.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                        <p className="text-white"><b className="text-yellow-300">Thời lượng:</b> {dataDetail.duration} phút</p>
                        <p className="text-white"><b className="text-yellow-300">Ngôn ngữ:</b> {dataDetail.language}</p>
                        <p className="text-white"><b className="text-yellow-300">Rated:</b> {dataDetail.rated}</p>
                      </div>
                    </div>
                    <div className="col-span-3 mt-5 bg-gray-900 bg-opacity-35 p-4 rounded-xl">
                      <p className="text-white text-2xl font-bold">Nội dung</p>
                      <p className="text-white">{dataDetail.shortDescription}</p>
                    </div>

                </>
              )}
            </div>

          </div>
        </div>
        {/* <div className="mt-10 mx-52 rounded-lg bg-white px-5 py-5" >
          <Tabs defaultActiveKey="1" centered >
            <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
              <div >
                <Tabs tabPosition={'left'} >
                  {dataDetail.heThongRapChieu?.map((htr, index) => {
                    return <TabPane
                      tab={<div className="flex flex-row items-center justify-center">
                        <img src={htr.logo} className="rounded-full w-full" style={{ width: 50 }} alt="..." />
                        <div className="text-center text-lg ml-2 text-black">
                          {htr.tenHeThongRap}
                        </div>
                      </div>}
                      key={index}>
                      {htr.cumRapChieu?.map((cumRap, index) => {
                        return <div className="mt-5" key={index}>
                          <div className="flex flex-row">
                            <img style={{ width: 60, height: 60 }} src={cumRap.smallImageURl} alt="..." />
                            <div className="ml-2">
                              <p style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 1 }} >{cumRap.tenCumRap}</p>
                              <p className="text-gray-400" style={{ marginTop: 0 }}>{cumRap.diaChi}</p>
                            </div>
                          </div>
                          <div className="thong-tin-lich-chieu grid grid-cols-4">
                            {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                              return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className="col-span-1 text-green-800 font-bold">
                                {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                              </NavLink>
                            })}
                          </div>
                        </div>
                      })}
                    </TabPane>
                  })}
                </Tabs>
              </div>
            </TabPane>
            <TabPane tab="Thông tin" key="2" style={{ minHeight: 300 }}>
              Thông tin
            </TabPane>
            <TabPane tab="Đánh giá" key="3" style={{ minHeight: 300 }}>
              Đánh giá
            </TabPane>
          </Tabs>
        </div> */}
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import "../../assets/styles/circle.scss";
import { Rate, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { layThongTinChiTietPhim } from "../../redux/actions/QuanLyRapAction";
import moment from "moment";
const { TabPane } = Tabs;
export default function Detail(props) {
  const filmDetail = useSelector(state => (state.QuanLyPhimReducer.filmDetail));

  const dispatch = useDispatch();
  // const { id } = useParams();
  // console.log("ID:", id);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(layThongTinChiTietPhim(id));
  //   }
  // }, [id, dispatch]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(layThongTinChiTietPhim(id));
    }
  }, [id, dispatch]);

  console.log('filmDetail', filmDetail);

  return (
    <div
      style={{
        backgroundImage: `url(${filmDetail.hinhAnh})`,
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
          <div className="col-span-5 col-start-3">
            <div className="grid grid-cols-3 items-center">
              {filmDetail && (
                <>
                  <img className="col-span-1" src={filmDetail.hinhAnh} alt={filmDetail.tenPhim} />
                  <div className="col-span-2 ml-5">
                    <p className="text-sm">{moment(filmDetail.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
                    <div className="flex my-2">
                      <p className="px-1 py-0.5 bg-red-600 rounded-sm text-center mr-2">C20</p>
                      <p className="text-xl">{filmDetail.tenPhim}</p>
                    </div>
                    <p>120 phút - 10 Tix - 2D/Digital</p>
                    {filmDetail.moTa && (
                      <p className="mt-2">{filmDetail.moTa.slice(0, 300)}...</p>
                    )}
                  </div>
                </>
              )}
            </div>

          </div>
          <div className="col-span-4 my-10">
            <div className={`c100 p${filmDetail.danhGia * 10} center`}>
              <span>{filmDetail.danhGia * 10}</span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
            <h1 className="mt-3 text-center">Đánh giá</h1>
            <div className="mt-1 text-center"><Rate allowHalf value={filmDetail.danhGia / 2}></Rate></div>
          </div>
        </div>
        <div className="mt-10 mx-52 rounded-lg bg-white px-5 py-5" >
          <Tabs defaultActiveKey="1" centered >
            <TabPane tab="Lịch chiếu" key="1" style={{ minHeight: 300 }}>
              <div >
                <Tabs tabPosition={'left'} >
                  {filmDetail.heThongRapChieu?.map((htr, index) => {
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
                            <img style={{ width: 60, height: 60 }} src={cumRap.hinhAnh} alt="..." />
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
        </div>
      </div>
    </div>
  );
}

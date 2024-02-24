import React, { Fragment, useState } from "react";
import { Tabs } from "antd";
import { NavLink } from "react-router-dom";
import moment from "moment/moment";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const [state, setState] = useState({
    tabPosition: "left",
  });
  const changeTabPosition = (e) => {
    setState({ tabPosition: e.target.value });
  };
  const { tabPosition } = state;

  const renderHeThongRap = () => {
    return props.heThongRapChieu?.map((heThongRap, index) => {
      return (
        <TabPane 
          tab={
            <img
              className="rounded-full w-14"
              src={heThongRap.logo}
              alt="123"
            />
          }
          key={index}
        >
          <Tabs tabPosition={tabPosition}>
            {heThongRap.lstCumRap?.map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: "300px", display: "flex" }}>
                      <img
                        className="w-14"
                        src="https://movie-booking-project.vercel.app/img/cumRap/cinestar-hai-ba-trung-15383833704033.jpg"
                        alt={cumRap.tenCumRap}
                      />
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p>{cumRap.diaChi.slice(0,30)}...</p>
                        <p className="text-red-600">Chi Tiết</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {/*Load phim tương ứng */}
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-5">
                          <div style={{ display: "flex" }}>
                            <img
                              style={{ height: 50, width: 50 }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://picsum.photos/50/50";
                              }}
                            />

                            <div className="ml-2">
                              <h1 className="text-2xl font-bold">
                                {phim.tenPhim}
                              </h1>
                              <p>{cumRap.diaChi}</p>
                              <div className="grid grid-cols-6 gap-3 mt-2">
                                {phim.lstLichChieuTheoPhim
                                  ?.slice(0, 12)
                                  .map((lichChieu, index) => {
                                    return (
                                      <NavLink
                                        className="text-lg text-green-400"
                                        to={`/checkout/${lichChieu.maLichChieu}`}
                                        key={index}
                                      >
                                        {moment(
                                          lichChieu.ngayChieuGioChieu
                                        ).format("hh:mm A")}
                                      </NavLink>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </>
  );
}

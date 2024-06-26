import React, { useState } from "react";
import _ from "lodash";
import Popup from "./Popup";

const data = [
  {
    maMonAN: "MA01",
    tenMonAn: "Cơm chiên dương châu",
    gia: 200,
    hinhAnh: "https://cdn.pixabay.com/photo/2017/07/16/11/57/fried-2509089_1280.jpg",
    maDanhMuc: "MC",
    tenDanhMuc: "Món Chiên",
  },
  {
    maMonAN: "MA02",
    tenMonAn: "Gà kho sả ớt",
    gia: 250,
    hinhAnh: "https://th.bing.com/th/id/R.e61c94c55deb489e1c3a5f1062ee2ba9?rik=HJPs7mRzr97bPQ&pid=ImgRaw&r=0",
    maDanhMuc: "MG",
    tenDanhMuc: "Món Gà",
  },
  {
    maMonAN: "MA03",
    tenMonAn: "Bò bít tết",
    gia: 350,
    hinhAnh: "https://th.bing.com/th/id/R.31934472cb22ab613611f0fe57400ecb?rik=aC7uqAu%2b7EjkIw&riu=http%3a%2f%2fculinaryvietnam.com%2fwp-content%2fuploads%2f2015%2f05%2ffrench-food-saigon-vietnam.jpg&ehk=UTdQ6iPXGKIVnPqqAGSv%2bbqU6KWHDk%2fZnLRWlce3szs%3d&risl=&pid=ImgRaw&r=0",
    maDanhMuc: "MB",
    tenDanhMuc: "Món Bò",
  },
  {
    maMonAN: "MA04",
    tenMonAn: "Sườn xào chua ngọt",
    gia: 220,
    hinhAnh: "https://3.bp.blogspot.com/-Y4TPkjn2TpM/WeLNWbFn1AI/AAAAAAAAAZY/hM9ND8KH_AU_Vn2kqiq7MElTCGg9bSv0ACLcBGAs/s1600/Street%2Bfood%2Bin%2BCambodia%252C%2BKH%2BMedia-FOOD.jpg",
    maDanhMuc: "MS",
    tenDanhMuc: "Món Sườn",
  },
  {
    maMonAN: "MA05",
    tenMonAn: "Phở gà",
    gia: 180,
    hinhAnh: "https://th.bing.com/th/id/OIP.do9xfsOAvwjnom-BRfNTMgHaEL?pid=ImgDet&rs=1",
    maDanhMuc: "MP",
    tenDanhMuc: "Món Phở",
  },
  {
    maMonAN: "MA06",
    tenMonAn: "Cá chiên xù",
    gia: 280,
    hinhAnh: "https://media.istockphoto.com/id/855749956/vi/anh/c%C3%A1-tr%C3%A1p-bi%E1%BB%83n-n%C6%B0%E1%BB%9Bng-v%E1%BB%9Bi-l%C3%A1t-chanh.jpg?s=1024x1024&w=is&k=20&c=kS4aDJZrQnaYMnBhwJ-a95u4P6lXJ8_v0h-CBPMbKg4=",
    maDanhMuc: "MC",
    tenDanhMuc: "Món Chiên",
  },
  {
    maMonAN: "MA07",
    tenMonAn: "Mực nướng mỡ hành",
    gia: 300,
    hinhAnh: "https://monngonmoingay.com/wp-content/uploads/2019/09/muc-trung-nuong-mo-hanh-500.jpg",
    maDanhMuc: "MN",
    tenDanhMuc: "Món Nướng",
  },
  {
    maMonAN: "MA08",
    tenMonAn: "Gà chiên giòn",
    gia: 300,
    hinhAnh: "https://cdn.pixabay.com/photo/2014/01/24/04/05/fried-chicken-250863_1280.jpg",
    maDanhMuc: "MC",
    tenDanhMuc: "Món Chiên",
  },
];

export default function BaiTapTongHop() {
  const mangDanhMuc = _.uniqBy(data, "maDanhMuc");
  const [openModal, setOpenModal] = useState(false);
  const [maDanhMuc, setMaDanhMuc] = useState(mangDanhMuc[0].maDanhMuc);
  const [item, setItem] = useState({})

  return (
    <div>
      <Popup openModal={openModal} setOpenModal={setOpenModal} item={item} />
      <div className="grid grid-cols-6">
        <div className="col-span-1 h-full p-3 space-y-2 dark:bg-gray-900 dark:text-gray-100">
          <div className="flex items-center p-2 space-x-4">
            <img
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/354904311_785858436364720_1934446951363780962_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=baKLNMhFYZIAX_SSBYd&_nc_oc=AQmF0Ek-ZsKVBvMPsE18wVX62PNjnlD3My1Hl8Ril-hIhFRT3Uq90TVL6iAJMb6p7qs&_nc_ht=scontent.fdad1-4.fna&oh=00_AfARpb8bMrcbujGAXL5wyMbFLUDrqc5GaC9iK3arSXTVmA&oe=654A7D10"
              alt=""
              className="w-12 h-12 rounded-full dark:bg-gray-500"
            />
            <div>
              <h2 className="text-lg font-semibold">Rum</h2>
              <span className="flex items-center space-x-1">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-400"
                >
                  View profile
                </a>
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-700">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {mangDanhMuc.map((danhmuc, index) => {
                const classNameActive = ['flex', 'items-center', 'p-2', 'space-x-3', 'rounded-md', maDanhMuc === danhmuc.maDanhMuc ? 'bg-orange-400 text-white': ''];
                return (
                  <li
                    className="dark:bg-gray-800 dark:text-gray-50"
                    key="index" onClick={() =>{setMaDanhMuc(danhmuc.maDanhMuc)}}
                  >
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className={classNameActive.join(' ')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current dark:text-gray-400"
                      >
                        <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                      </svg>
                      <span>{danhmuc.tenDanhMuc}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <ul className="pt-4 pb-2 space-y-1 text-sm">
              <li>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current dark:text-gray-400"
                  >
                    <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                    <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                  </svg>
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center p-2 space-x-3 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current dark:text-gray-400"
                  >
                    <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                    <rect width="32" height="64" x="256" y="232"></rect>
                  </svg>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-5">
          <h3 className="text-center text-8xl text-orange-400 mt-5">MENU</h3>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4">
                {_.filter(data, (item) => item.maDanhMuc === maDanhMuc).map(
                  (item, index) => {
                    return (
                      <div className="p-4 lg:w-1/3" key="index">
                        <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-5 rounded-lg overflow-hidden text-center">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                            {item.tenMonAn}
                          </h2>
                          <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
                            {item.tenMonAn}
                          </h1>
                          <div className="leading-relaxed mb-3">
                            <img
                              className="rounded-lg"
                              src={item.hinhAnh}
                              alt={item.maMonAN}
                            />
                          </div>
                          <a
                            className="text-orange-400 inline-flex items-center cursor-pointer"
                            onClick={() => {
                              setOpenModal(true);
                              setItem(item);
                            }}
                          >
                            Chi tiết
                            <svg
                              className="w-4 h-4 ml-2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14" />
                              <path d="M12 5l7 7-7 7" />
                            </svg>
                          </a>
                          <div className="text-center leading-none flex justify-end  w-full py-3">
                            <span className="text-black  inline-flex items-center leading-none text-sm font-bold">
                              Giá: {item.gia}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";

export default function Film(props) {
  const { phim } = props;
  return (
    <div className="p-4">
      <div className="h-full bg-gray-100 bg-opacity-75 pb-6 rounded-lg overflow-hidden text-center relative">
        {/* <img src={phim.hinhAnh} alt={phim.tenPhim}/> */}
        <div
          style={{
            background: `url(${phim.hinhAnh})`,
            backgroundPosition: "center",
            backgroundSize: "100%",
          }}
        >
          <img
            src={phim.hinhAnh}
            alt={phim.tenPhim}
            className="opacity-0 w-full"
            style={{ height: "190px" }}
          />
        </div>
        <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 my-3">
          {phim.tenPhim}
        </h1>
        <p className="leading-relaxed px-2 mb-3 h-12">
          {phim.moTa.length > 80 ? (
            <span>{phim.moTa.slice(0, 80)} ...</span>
          ) : (
            <span>{phim.moTa}</span>
          )}
        </p>
        <NavLink className="text-indigo-500 inline-flex items-center">
          ĐẶT VÉ
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
        </NavLink>
      </div>
    </div>
  );
}

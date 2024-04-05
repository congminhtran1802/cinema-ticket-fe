import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselAction } from "../../../../redux/actions/CarouselAction";
import { dataHomeSelector } from "../../../../redux-toolkit/selector";

export default function HomeCarousel(props) {
  const { dataHome, isLoading } = useSelector(dataHomeSelector);

  console.log("arrImg", props);
  const dispatch = useDispatch();
  //Sẽ tự kích hoạt khi component load ra
  useEffect(() => {
    //1 action = {type:'', data}
    //2 (Phải cài middleware)
    //callBackFunction(dispatch)
    dispatch(getCarouselAction());
  }, []);
  const renderImg = () => {
    return dataHome.map((item, index) => {
      const contentStyle = {
        height: "490px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        backgroundImage: `url(${item.largeImageURL})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
      };
      return (
        <div key={index}>
          <div style={contentStyle}>
            <img
              src={item.largeImageURL}
              className="w-full opacity-0"
              alt={item.largeImageURL}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <Carousel effect="fade">{renderImg()}</Carousel>
    </div>
  );
}

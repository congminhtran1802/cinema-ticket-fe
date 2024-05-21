import styleSlick from "./MultipleRowSlick.module.css";
import Slider from "react-slick";
// import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector  } from "react-redux";
import { useEffect, useState } from "react";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-50px" }}
      onClick={onClick}
    ></div>
  );
}


const MultipleRows = (props) => {
  const [dangChieu, setDangChieu] = useState(true);
  const [dataFilm, setDataFilm] = useState(props.dataHome);

  useEffect(() => {
    if (dangChieu) {
      setDataFilm(props.dataHome.filter((item) => item.isShowing == 1));
    } else {
      setDataFilm(props.dataHome.filter((item) => item.isShowing == 0));
    }
  }, [dangChieu, props.dataHome]);

  const dispatch = useDispatch();
  const renderFilms = () => {
    return dataFilm.slice(0, 12).map((item, index) => {
      return (
        <div className="mt-2" key={index}>
          <Film_Flip phim={item} />
        </div>
        
      );
    });
  };

  // let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";

  // let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";

  let activeClassSC = dangChieu === false ? "active_Film" : "none_active_Film";

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <button
        className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`}
        onClick={() => {
          setDangChieu(true);
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`}
        onClick={() => {
          setDangChieu(false);
        }}
      >
        PHIM SẮP CHIẾU
      </button>
      <Slider className="pb-20" {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRows;

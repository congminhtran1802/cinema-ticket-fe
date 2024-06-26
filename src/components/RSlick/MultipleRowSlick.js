import styleSlick from "./MultipleRowSlick.module.css";
import Slider from "react-slick";
// import Film from "../Film/Film";
import Film_Flip from "../Film/Film_Flip";
import { useDispatch, useSelector  } from "react-redux";
import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";
import { useTranslation } from "react-i18next";
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
  console.log("props.arrFilm:", props.dataHome);
  
  const dispatch = useDispatch();
  // const {dangChieu,sapChieu} = useSelector(state => state.QuanLyPhimReducer);
  const renderFilms = () => {
    return props.dataHome.slice(0, 12).map((item, index) => {
      return (
        // <div className={`${styleSlick['width-item']}`} key={index}>
        //     <Film_Flip phim={item}/>
        // </div>
        <div className="mt-2" key={index}>
          <Film_Flip phim={item} />
          {/* <Film phim={item}/> */}
        </div>
        
      );
    });
  };

  // let activeClassDC = dangChieu === true ? "active_Film" : "none_active_Film";

  // let activeClassSC = sapChieu === true ? "active_Film" : "none_active_Film";

  let activeClassDC = true

  let activeClassSC = true

  console.log("activeSC", activeClassSC);
  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const { t, i18n } = useTranslation();
  return (
    <div>
      <button
        className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white mr-2`}
        onClick={() => {
          const action = { type: SET_FILM_DANG_CHIEU };
          dispatch(action);
        }}
      >
      {t('currently_movies') }
      </button>
      <button
        className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`}
        onClick={() => {
          const action = { type: SET_FILM_SAP_CHIEU };
          dispatch(action);
        }}
      >
      {t('movies_coming_soon') }
      </button>
      <Slider className="pb-20" {...settings}>{renderFilms()}</Slider>
    </div>
  );
};

export default MultipleRows;

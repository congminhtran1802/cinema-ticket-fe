import React, { useEffect } from "react";
import HomeMenu from "./HomeMenu/HomeMenu";
import { useSelector, useDispatch } from "react-redux";
import MultipleRows from "../../components/RSlick/MultipleRowSlick";
import { layDanhSachPhimAction } from "../../redux/actions/QuanLyPhimAction";
import { layDanhSachHeThongRapAction } from "../../redux/actions/QuanLyRapAction";
import HomeCarousel from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
import { dataHomeSelector } from "../../redux-toolkit/selector";
import { dataHomeSlice } from "../../redux-toolkit/reducer/dataHomeSlice";
import axios from "axios";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Film_Flip from "../../components/Film/Film_Flip";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



export default function Home(props) {
  const [category, setCategory] = React.useState("");
  const [moviePredict, setMoviePredict] = React.useState();
  const user = JSON.parse(localStorage.getItem("USER_LOGIN"));
  useEffect(() => {
    dispatch(dataHomeSlice.actions.getDataHomeRequest());
    axios
      .get(`http://localhost:8080/api/movies/`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/movies/category?category=${category}`)
      .then(function (response) {
        dispatch(dataHomeSlice.actions.getDataHomeSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(dataHomeSlice.actions.getDataHomeFailure());
      });
  }, [category]);

  const [categoryPredict, setCategoryPredict] = React.useState();

  useEffect(() => {
    if (!user) {
      return;
    }
    axios
      .get(`http://localhost:5000/predict?age=${user.age}&gender=${user.gender}`)
      .then(function (response) {
        setCategoryPredict(response.data.prediction[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const mapToMovieTypes = numbers => {
    return numbers?.map(number => {
        switch (number) {
            case 0:
                return "Hoạt hình";
            case 1:
                return "Hành động";
            case 2:
                return "Tình cảm";
            case 3:
                return "Kinh dị";
            case 4:
                return "Trinh thám";
            case 5:
                return "Viễn tưởng";
            case 6:
                return "Hài";
            case 7:
                return "Phim tài liệu";
            case 8:
                return "Khoa học";
            default:
                return "Không xác định";
        }
    });
  }

  useEffect(() => {
    const movieCategories = mapToMovieTypes(categoryPredict);
    if (!movieCategories) {
        return;
    }
    axios
      .get(`http://localhost:8080/api/movies/byCategory`, {
            params: {
                categories: movieCategories?.join(',') // Chuyển mảng thành một chuỗi, phân cách bằng dấu phẩy
            }
        })
      .then(function (response) {
        setMoviePredict(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [categoryPredict]);


  const { dataHome, isLoading } = useSelector(dataHomeSelector);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="container mx-auto">
      <HomeCarousel/>
      <div className="text-left text-2xl font-bold mt-5"><ChevronRightIcon></ChevronRightIcon>Đề xuất phim</div>
      <section className="text-gray-600 body-font">
        <div className="grid grid-cols-4 gap-y-16 pb-10 pl-5">
          {moviePredict?.map((item, index) => {
            return (
              <div className="mt-2" key={index}>
                <Film_Flip phim={item} />
              </div>
            );
          })}
        </div>
      </section>
      
      <div className="mt-5">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Thể loại</InputLabel>
        <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={category}
            label="Thể loại"
            autoWidth
            onChange={handleChange}
          >
            <MenuItem value="" disabled>
                Chọn thể loại
            </MenuItem>
            <MenuItem value="">Không</MenuItem>
            <MenuItem value="Hành động">Hành động</MenuItem>
            <MenuItem value="Hoạt hình">Hoạt hình</MenuItem>
            <MenuItem value="Khoa học viễn tưởng">Khoa học viễn tưởng</MenuItem>
            <MenuItem value="Kịch">Kịch</MenuItem>
            <MenuItem value="Phiêu lưu">Phiêu lưu</MenuItem>
            <MenuItem value="Thần thoại">Thần thoại</MenuItem>
            <MenuItem value="Hài">Hài</MenuItem>
            <MenuItem value="Nhạc kịch">Nhạc kịch</MenuItem>
            <MenuItem value="Tình cảm">Tình cảm</MenuItem>
            <MenuItem value="Phim tài liệu">Phim tài liệu</MenuItem>
          </Select>
        </FormControl>
      </div>
      <section className="text-gray-600 body-font">
        <div className=" px-5 py-4 mx-auto">
          {/* <div className="flex flex-wrap -m-4">{renderFilm()}</div> */}
          <MultipleRows dataHome={dataHome} />
        </div>
      </section>
      
      {/* <HomeMenu heThongRapChieu={heThongRapChieu} /> */}
    </div>
  );
}

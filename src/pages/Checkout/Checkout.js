/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from './Checkout.module.css';
import _ from 'lodash'
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons'
import './Checkout.css'
import { datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyDatVeAction';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction'
import { useParams } from 'react-router';
import { DAT_VE } from '../../redux/actions/types/QuanLyDatVeType';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe'
import { Tabs } from 'antd';
import moment from 'moment';

function Checkout(props) {
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();
  console.log('danhSachGheDangDat', danhSachGheDangDat)

  const { id } = useParams();
  useEffect(() => {
    if (id) { dispatch(layChiTietPhongVeAction(id)) };
  }, [id, dispatch])

  console.log('chiTietPhongVe', chiTietPhongVe);

  const { thongTinPhim, danhSachGhe } = chiTietPhongVe

  const renderSeats = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';
      //Kiểm tra tưng ghế render xem có trong ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex(
        gheDD => gheDD.maGhe === ghe.maGhe
      )
      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat'
      }
      if (indexGheDD !== -1) {
        classGheDaDat = 'gheDangDat'
      }
      return <Fragment key={index}>
        <button onClick={() => {
          dispatch({
            type: DAT_VE,
            gheDuocChon: ghe
          })
        }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`} key={index}>
          {ghe.daDat ? classGheDaDuocDat !== '' ? <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> : ghe.stt}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}
      </Fragment>
    })
  }
  return (
    <div className='min-h-screen'>
      <div className='grid grid-cols-12'>
        <span className='col-span-9 mt-5'>
          <div className='flex flex-col items-center'>
            <div className='flex bg-black h-4 relative justify-center' style={{ width: '80%' }}><span className='absolute top-7'>Màn hình</span></div>
            <div className={`${style['trapezoid']}`}></div>
            <div>{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center">
            <table className=" divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế vip</th>
                  <th>Ghế đã đặt</th>
                  <th>Ghế mình đặt</th>
                  <th>Ghế khách đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                  <td><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                  <td><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                  <td><button className="ghe gheDaDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                  <td><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                  <td><button className="ghe gheKhachDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </span>
        <span className='col-span-3 mt-5'>
          <h3 className='text-center text-4xl'>0 đ</h3>
          <hr />
          <h3 className='text-xl'>{thongTinPhim.tenPhim}</h3>
          <p>Địa điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
          <p>Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
          <hr />
          <div className='flex flex-row my-4'>
            <div className='w-11/12'>
              <span className='text-red-600 text-lg'>Ghế</span>
              {_.sortBy(danhSachGheDangDat, [(ghe) => parseInt(ghe.stt)]).map((gheDD, index) => {
                return <span className='text-green-600 text-2xl' key={index}> {gheDD.stt}</span>
              })}
            </div>
            <div className='text-right col-span-1'>
              <span className='text-green-600 text-2xl'>
                {danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                  return tongTien += ghe.giaVe
                }, 0).toLocaleString()}
              </span>
            </div>
          </div>
          <hr />
          <div className='my-4'>
            <i>Email</i> <br />
            {userLogin.email}
          </div>
          <hr />
          <div className='my-4'>
            <i>Phone</i> <br />
            {userLogin.soDT}
          </div>
          <hr />
          <div className='h-full flex flex-col items-center' >
            <div onClick={() => {
              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = id;
              thongTinDatVe.danhSachVe = danhSachGheDangDat;
              console.log(thongTinDatVe);
              dispatch(datVeAction(thongTinDatVe));

            }} className='mb-0 bg-green-500 text-white w-full text-center font-bold text-2xl py-3 cursor-pointer'>ĐẶT VÉ</div>
          </div>
        </span>
      </div>
    </div>
  )
}
const  { TabPane } = Tabs;

function callBack(key) {
  console.log(key)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(props){
  return <div className='pt-5'>
    <Tabs defaultActiveKey='1' onChange={callBack}>
      <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
        <Checkout {...props} />
      </TabPane>
      <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
        <KetQuaDatVe/>
      </TabPane>
    </Tabs>
  </div>
}


function KetQuaDatVe (props) {
  const dispatch = useDispatch();
  const {thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer)
  // const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  useEffect(() => {
    const action = layThongTinNguoiDungAction()
    dispatch(action)
  },[])
  console.log('thongTinNguoiDung', thongTinNguoiDung)

  const renderTicketItem = function () {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
        const seats = _.first(ticket.danhSachGhe);

        return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                <div className="flex-grow">
                    <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
                    <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
                    <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}   </p>
                    <p>
                        <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
                    </p>
                </div>
            </div>
        </div>
    })
}

  return <div className='p-5'>
    <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-purple-600 ">Lịch sử đặt vé khách hàng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa và thời gian để xem phim vui vẻ bạn nhé !</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                    {/* <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Lật mặt 48h</h2>
                                <p className="text-gray-500">10:20 Rạp 5, Hệ thống rạp cinestar bhd </p>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>
  </div>
}


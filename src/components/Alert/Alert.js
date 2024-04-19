import Swal from "sweetalert2";

// success
export const Alert = (timer, title, message, icon, confirmButtonText) => {
  Swal.fire({
    timer: timer, //1500
    title: title, //'Đặt vé'
    text: message, //'Thành công'
    icon: icon, //'success' or 'error' or 'warning'
    confirmButtonText: confirmButtonText, //'OK'
  });
};

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

// delete
export const DeleteAlert = (onDelete) => {
  Swal.fire({
    title: "Bạn chắc chắn muốn xóa?",
    text: "Bạn sẽ không nhìn thấy phim này nữa!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      onDelete(); // gọi hàm xóa
      Swal.fire({
        title: "Đã xóa!",
        icon: "success",
      });
    }
  });
};

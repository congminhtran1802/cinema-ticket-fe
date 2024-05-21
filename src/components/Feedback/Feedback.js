
import React, { useState, useEffect, useRef, useContext, memo } from "react";
import moment from "moment";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

const Feedback = ({ userId, movieId, billId, isDisable, setIsDisable, isWriting, setIsWriting }) => {
    const [feedbacks, setFeedbacks] = useState([]);
    const user = JSON.parse(localStorage.getItem("USER_LOGIN"));
    const [newFeedback, setNewFeedback] = useState({
        content: "",
        rating: 0,
        user: {
            id: 0,
        },
        bill: {
            id: 0,
        },
        movie: {
            id: 0,
        },
    });
    const [editFeedback, setEditFeedback] = useState({
        feedbackId: 0,
        content: "",
        rating: 0,
        user: {
            id: 0,
        },
        bill: {
            id: 0,
        },
        movie: {
            id: 0,
        },
    });
    const commentContainerRef = useRef(null);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(1);
    const [isEdit, setIsEdit] = useState(false);


    const getFeedback = async () => {
        const res = await axios.get(
            `http://localhost:8080/api/feedback?userId=${userId}&billId=${billId}`
        );
        setFeedbacks(res.data);
        if (res.data.length > 0) {
            const billIdToAdd = res.data[0].bill.id;
            // Kiểm tra nếu billIdToAdd chưa tồn tại trong mảng isDisable
            if (!isDisable.includes(billIdToAdd)) {
                setIsDisable(prevState => [...prevState, billIdToAdd]);
            }
        }
    };

    useEffect(() => {
        getFeedback();
    }, [userId]);


    const handleSendFeedback = () => {
        newFeedback.user.id = userId;
        newFeedback.movie.id = movieId;
        newFeedback.rating = rating;
        newFeedback.content = content;
        newFeedback.bill.id = billId;
        axios.post(`http://localhost:8080/api/feedback`, newFeedback)
            .then(function (response) {
                setNewFeedback({
                    content: "",
                    rating: 0,
                    user: {
                        id: 0,
                    },
                    bill: {
                        id: 0,
                    },
                    movie: {
                        id: 0,
                    },
                });
                setContent("");
                setRating(0);
                getFeedback();
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    };

    const handleUpdateFeedback = async (feedbackId) => {

        editFeedback.feedbackId = feedbackId;
        editFeedback.rating = rating;
        editFeedback.user.id = userId;
        editFeedback.movie.id = movieId;
        editFeedback.content = content;
        editFeedback.bill.id = billId;
        const res = await axios.put(
            `http://localhost:8080/api/feedback/${feedbackId}`,
            editFeedback
        );
        setEditFeedback({
            feedbackId: "",
            content: "",
            rating: 0,
            user: {
                id: 0,
            },
            bill: {
                id: 0,
            },
            movie: {
                id: 0,
            },
        });
        setContent("");
        setRating(0);
        setIsEdit(false);
        getFeedback();
    };

    const handleDelete = async (feedbackId, billId) => {
        await axios.delete(
            `http://localhost:8080/api/feedback/${feedbackId}`
        );
        setIsDisable(prevState => prevState.filter(id => id !== billId));
        setIsWriting(false);
        getFeedback();
    };

    const handleDeleteFeedback = (feedbackId, billId) => {
        confirmAlert({
            title: 'Xác nhận',
            message: 'Bạn có chắc chắn muốn xóa đánh giá này?',
            buttons: [
              {
                label: 'Có',
                onClick: () => handleDelete(feedbackId, billId)
              },
              {
                label: 'Không',
                onClick: () => {}
              }
            ]
          });
    };

    return (
        <div className="w-full">
            <h1 className="ml-[7.7rem] font-bold text-lg">Đánh giá</h1>
            {feedbacks && feedbacks.length > 0 ? (
                feedbacks.map((feedback) => (
                    <div className="flex w-full justify-center">
                        <div className="w-[80%] rounded-2xl ml-10 p-4 bg-white mt-2 h-full shadow-checkout-shadow border-checkout-bg border-[1px] mb-4">
                            <div className="flex relative">
                                <h1 className="text-lg">{feedback.user?.fullName || "Ẩn Danh"}</h1>
                                <div className="pl-4 flex">
                                    {[...Array(5)].map((star, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                            <label key={index}>
                                                <StarIcon
                                                    style={{ fontSize: "20px" }}
                                                    className={`${ratingValue <= feedback.rating ? "text-yellow-500" : "text-gray-300"}`}
                                                />
                                            </label>
                                        );
                                    }
                                    )}
                                </div>
                                <div className="absolute right-0 top-0">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                setContent(feedback.content);
                                                setIsEdit(true);
                                                setRating(feedback.rating);
                                                setEditFeedback(feedback);
                                            }}
                                        >
                                            <EditIcon className="text-blue-600" />
                                        </button>

                                        <button
                                            onClick={() => handleDeleteFeedback(feedback.feedbackId, feedback.bill.id)}
                                        >
                                            <DeleteIcon className="text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <span className="text-base italic pl-4">
                                {moment(feedback.createAt).format("YYYY-MM-DD HH:mm")}
                            </span>
                            <p className="text-xl pl-4">{feedback.content}</p>
                        </div>
                    </div>


                ))
            ) : (
                <p className="ml-[7.7rem]">Chưa có đánh giá</p>
            )}
            {/* write comment */}
            <div className={` ${(!feedbacks.length > 0 && isWriting) ? '' : 'hidden'} flex w-full justify-center`}>
                <div className="w-[80%] rounded-2xl ml-10 p-4 bg-white mt-2 h-full shadow-checkout-shadow border-checkout-bg border-[1px] mb-4">
                    <div className="flex relative">
                        <p className="text-lg m-0 font-semibold">
                            {user?.name || "Ẩn Danh"}
                        </p>
                        <div className="pl-4 flex">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index}>
                                        <StarIcon
                                            style={{ fontSize: "25px" }}
                                            onClick={() => setRating(ratingValue)}
                                            className={`cursor-pointer ${ratingValue <= (rating || 0) ? "text-yellow-500" : "text-gray-300"}`}
                                        />
                                    </label>
                                );
                            }
                            )}
                        </div>
                    </div>
                    <div className="flex rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] w-[95%] ml-[2rem] mt-2">
                        <textarea
                            name="comment"
                            id="comment"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{ height: "100px", width: "100%" }}
                            placeholder="Nhập đánh giá của bạn..."
                            className="p-4"
                        ></textarea>
                    </div>
                    <div className={`w-full flex justify-end pr-2 pb-2 mt-3`}>
                        <div
                            className={`bg-[#ff5a5f] w-[20%] rounded-2xl text-center cursor-pointer hover:bg-[#ff5a5f] `}
                            onClick={handleSendFeedback}
                        >
                            <p className="text-white font-medium text-lg p-2">
                                Gửi đánh giá
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* edit comment */}

            <div className={` ${(feedbacks.length > 0 && isEdit) ? '' : 'hidden'} flex w-full justify-center`}>
                <div className="w-[80%] rounded-2xl ml-10 p-4 bg-white mt-2 h-full shadow-checkout-shadow border-checkout-bg border-[1px] mb-4">
                    <div className="flex relative">
                        <p className="text-lg m-0 font-semibold">
                            {user?.name || "Ẩn Danh"}
                        </p>
                        <div className="pl-4 flex">
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index}>
                                        <StarIcon
                                            style={{ fontSize: "25px" }}
                                            onClick={() => setRating(ratingValue)}
                                            className={`cursor-pointer ${ratingValue <= (rating || 0) ? "text-yellow-500" : "text-gray-300"}`}
                                        />
                                    </label>
                                );
                            }
                            )}
                        </div>
                    </div>
                    <div className="flex rounded-2xl shadow-checkout-shadow border-checkout-bg border-[1px] w-[95%] ml-[2rem] mt-2">
                        <textarea
                            name="commentEdit"
                            id="commentEdit"
                            defaultValue={feedbacks[0]?.content}
                            onChange={(e) => setContent(e.target.value)}
                            style={{ height: "100px", width: "100%" }}
                            placeholder="Nhập đánh giá của bạn..."
                            className="p-4"
                        ></textarea>
                    </div>
                    <div className={`w-full flex justify-end pr-2 pb-2 mt-3`}>
                        <div
                            className={`bg-[#ff5a5f] w-[20%] rounded-2xl text-center cursor-pointer hover:bg-[#ff5a5f] `}
                            onClick={() => handleUpdateFeedback(feedbacks[0]?.feedbackId)}
                        >
                            <p className="text-white font-medium text-lg p-2">
                                Cập nhật
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Feedback);

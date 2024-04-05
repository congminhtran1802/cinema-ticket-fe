import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import React from "react";
import { useState } from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import { useSelector, useDispatch } from "react-redux";
import { editPhim } from "../../redux/actions/QuanLyPhimAction";
import Form from "../Form/Form";
export default function Popup(props) {
    const { title, children, openPopup, setOpenPopup, film, forceUpdate } = props;
    const dispatch = useDispatch();
    const onSubmit = (filmEdit) => {
        const action = editPhim(filmEdit);
        dispatch(action);
        setOpenPopup(false);
    }

    return (
        <Dialog open={openPopup}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent><Form film={film} onSubmit={onSubmit} forceUpdate={forceUpdate}>{children}</Form></DialogContent>
            <DialogActions>
                <button onClick={() => setOpenPopup(false)}>Huỷ</button>
            </DialogActions>
            {/* <div className="popup">
                <div className="flex justify-between items-center pb-3">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <button
                        onClick={() => setOpenPopup(false)}
                        className="text-2xl font-bold"
                    >
                        X
                    </button>
                </div>
                <Form film={film}>{children}</Form>
            </div> */}
        </Dialog>
    )
}
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import React from "react";
import { useState } from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from "@mui/material/DialogActions";
import { useSelector, useDispatch } from "react-redux";
import { editPhim } from "../../redux/actions/QuanLyPhimAction";
import Form from "../Form/Form";
import axios from 'axios';
import Alert from 'antd/es/alert/Alert';
import EditMovie from '../../pages/Admin/EditMovie';
import { useParams } from "react-router-dom";
export default function Popup(props) {
    const { title, openPopup, setOpenPopup, film, forceUpdate } = props;
    const { movieId } = useParams();
    return (
        <Dialog open={openPopup}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent><EditMovie movieId={movieId} movie={film} forceUpdate={forceUpdate} /></DialogContent>
            <DialogActions>
                <button onClick={() => setOpenPopup(false)}>Huỷ</button>
            </DialogActions>
        </Dialog>
    )
}
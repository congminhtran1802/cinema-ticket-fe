import { Fragment } from "react";
import Header from "../HomeTemplate/Layout/Header/Header";
import Footer from "../HomeTemplate/Layout/Footer/Footer";

export const TicketTemplate = (props) => {
    const { Component, ...restProps } = props;

    return (
        <Fragment>
            <Header/>
            <Component {...restProps} />
            <Footer/>
        </Fragment>
    );
}
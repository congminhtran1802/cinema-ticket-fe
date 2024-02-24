import { Fragment } from "react";
import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";

export const HomeTemplate = (props) => {
    const { Component, ...restProps } = props;

    return (
        <Fragment>
            <Header/>
            <Component {...restProps} />
            <Footer/>
        </Fragment>
    );
}

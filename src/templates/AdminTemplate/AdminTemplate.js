import { Fragment } from "react";

export const AdminTemplate = (props) => {
    const { Component, ...restProps } = props;

    return (
        <Fragment>
            <Component {...restProps} />
        </Fragment>
    );
}

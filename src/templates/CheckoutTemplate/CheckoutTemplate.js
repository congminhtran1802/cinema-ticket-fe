import { Fragment, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";

const CheckoutTemplate = (props) => {
  const { Component, ...restProps } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Navigate to='/login' />;
  }

  return (
    <Fragment>
      <Component {...restProps} />
    </Fragment>
  );
};



export default CheckoutTemplate;
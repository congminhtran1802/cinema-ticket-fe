import publicAxios from "../../../services/requestMethods";
import API from "../../../services/API";
import {
    loginFailure,
    loginStart,
    loginSuccess,
    signupStart,
    signupSuccess,
    signupFailure,
  } from "../../../redux-toolkit/reducer/loginSlice";

 export const login = async (dispatch, data) => {
  dispatch(loginStart());
  try {
    const res = await publicAxios.post(API.LOGIN, data);
    console.log(res.data)
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.error(err);
    dispatch(loginFailure());

  }
};
export const signup = async (dispatch, data) => {
    dispatch(signupStart());
    try {
      const res = await publicAxios.post(API.REGISTER, data);
      dispatch(signupSuccess(res.data));
    } catch (err) {
      dispatch(signupFailure());
    }
  };
  
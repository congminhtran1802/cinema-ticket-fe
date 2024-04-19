import { atom } from "recoil";
import { TOKEN, USER_LOGIN } from "../util/settings/config";
let user = {};
if(localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

export const avatarRC1 = atom({
  key: "avatarRC",
  default:  "",
});
export const userLogin = atom({
  key: "userLogin",
  default: user,
});
export const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem("token") || "",
});

export const initState = atom({
  key: "initText",
  default: "",
});

// export const newinitState = selector({
//   key: "newInitState",
//   get: ({ get }) => {
//     const currentInit = get(initState);
//     return currentInit.filter((init:any) => init.status === "new");
//   },
// });
export default initState;

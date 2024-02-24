// import "./App.css";
// import { createBrowserHistory } from "history";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
// import Home from "./pages/Home/Home";

// export const history = createBrowserHistory();
// // import BaiTapTongHop from "./BaiTapTongHop/BaiTapTongHop";

// function App() {
//   return (
//     // <BaiTapTongHop />
//     <Router>
//       <Routes>
//         <Route path="/" exact>
//           <HomeTemplate  Component={Home} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// App.js
import "./App.css";
import "./assets/styles/admin.css";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import Admin from "./pages/Admin/Admin";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<HomeTemplate Component={Home} />} />
        <Route path="/home" element={<HomeTemplate Component={Home} />} />
        <Route path="/contact" element={<HomeTemplate Component={Contact} />} />
        <Route path="/news" element={<HomeTemplate Component={News} />} />
        <Route path="/detail/:id" element={<HomeTemplate Component={Detail} />} />
        <Route path="/register" element={<UserTemplate Component={Register}/>} />
        <Route path="/checkout/:id" element={<CheckoutTemplate Component={Checkout} />} />
        <Route path="/login" element={<UserTemplate Component={Login} />} />
        <Route path="/admin" element={<AdminTemplate Component={Admin} />} />
      </Routes>
    </Router>
  );
}
export default App;

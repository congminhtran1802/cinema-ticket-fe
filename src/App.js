
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
import Search from "./pages/Search/Search";
import Ticket from "./pages/Ticket/Ticket";
import { TicketTemplate } from "./templates/TicketTemplate/TicketTemplate";
import ListMovie from "./pages/Admin/ListMovie";
import AddMovie from "./pages/Admin/AddMovie";
import EditMovie from "./pages/Admin/EditMovie";
import Popup from "./components/Popup/Popup";
import ListBranch from "./pages/Admin/ListBranch";
import ListRoom from "./pages/Admin/ListRoom";
import AddBranch from "./pages/Admin/AddBranch";
import AddRoom from "./pages/Admin/AddRoom";
import EditBranch from "./pages/Admin/EditBranch";
import EditRoom from "./pages/Admin/EditRoom";
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<HomeTemplate Component={Home} />} />
        <Route path="/contact" element={<HomeTemplate Component={Contact} />} />
        <Route path="/news" element={<HomeTemplate Component={News} />} />
        <Route path="/search/:name" element={<HomeTemplate Component={Search} />} />
        <Route path="/detail/:id" element={<HomeTemplate Component={Detail} />} />
        <Route path="/register" element={<UserTemplate Component={Register} />} />
        <Route path="/checkout/:id" element={<CheckoutTemplate Component={Checkout} />} />
        <Route path="/login" element={<UserTemplate Component={Login} />} />
        <Route path="/admin/" element={<AdminTemplate Component={Admin} />}>
          <Route path="statistic" element={<HomeTemplate Component={Home} />} />
          <Route path="branch/">
            <Route path="list" element={<AdminTemplate Component={ListBranch} />} />
            <Route path="add" element={<AdminTemplate Component={AddBranch} />} />
            <Route path="update/:branchId" element={<AdminTemplate Component={EditBranch} />} />
          </Route>
          <Route path="room/" >
            <Route path="list" element={<AdminTemplate Component={ListRoom} />} />
            <Route path="add" element={<AdminTemplate Component={AddRoom} />} />
            <Route path="update/:roomId" element={<AdminTemplate Component={EditRoom} />} />
          </Route>
          <Route path="list" element={<AdminTemplate Component={ListMovie} />} />
          <Route path="add" element={<AdminTemplate Component={AddMovie} />} />
          <Route path="update/:movieId" element={<AdminTemplate Component={EditMovie} />} />
        </Route>
        <Route path="/ticket" element={<TicketTemplate Component={Ticket} />} />
      </Routes>
    </Router>
  );
}
export default App;

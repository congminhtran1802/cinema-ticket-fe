import React ,{useEffect,useState}from "react";
import { Link, NavLink, } from "react-router-dom";
import { history } from "../../../../App";
import { useNavigate } from "react-router";
import { Button, Dropdown, Menu } from "antd";
import { useTranslation } from "react-i18next"
export default function Header() {
	const navigate = useNavigate()
	const isUser =   localStorage.getItem("accessToken")
	const { t, i18n } = useTranslation();
	const [search,setSearch] = useState("")
	const handleReload1 = () => {
		history.push('/login')
		window.location.reload();
	  };
	  const handleReload = () => {
		history.push('/register')
		window.location.reload();
	  };
	  const handleLogout = () => {
		localStorage.removeItem("accessToken");
		navigate('/login')
	  };

	  const items = [
		{
		  key: "1",
		  label: "https://cdn.iconscout.com/icon/free/png-256/free-vietnam-flag-country-nation-union-empire-33148.png",
			language:"vi"
		},
		{
		  key: "2",
		  label: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeIytOZNgVeRQ_DYn-CB-0aiFs5_cZMk83sn7tf6M82pYPGamNdrAj0f-WsXQdJkfljqw&usqp=CAU",
		  language:"en"
		},
	  ];
	  const [selectedItem, setSelectedItem] = useState(items[0]);
	  const handleMenuClick = (item) => {
		 i18n.changeLanguage(item.language)
		console.log(item.language)
		setSelectedItem(item);
	  };
	  const handleSearch = () => {
			navigate(`/search/${search}`)
	  }
	  const handleKeyRe = (e) => {
		if (e.code === "Enter") {
			handleSearch();
		}
	  };
  return (
    <header className="p-4 dark:bg-gray-800 dark:text-gray-100  bg-[#1f2937] sticky top-0 z-10  w-full text-white">
	<div className="container flex justify-between h-5 mx-auto">
		<div    className="flex items-center p-2 justify-start w-[40%] pl-14">
		<Link to="/"><img className="w-16" src="//assets.glxplay.io/web/images/logoglx.svg" alt="galaxy"/></Link>	
			<div class='max-w-md ml-8'>
    <div class="relative flex items-center w-full h-8 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
		value={search}
		onChange={(e) => setSearch(e.target.value)}
		onKeyDown={handleKeyRe}
        placeholder="Search something.." /> 
    </div>
</div>
		</div>
		<ul className="items-stretch hidden space-x-3 lg:flex">
			<li className="flex">
				<Link rel="noopener noreferrer" to="/" className="flex items-center px-4 -mb-0.5  dark:border-transparent dark:text-violet-400 dark:border-violet-400 text-white" activeClassName="border-b-2 border-white">{t('home') }</Link>
			</li>
			<li className="flex">
				<Link rel="noopener noreferrer" to="/contact" className="flex items-center px-4 -mb-0.5  dark:border-transparent text-white" activeClassName="border-b-2 border-white">{t('contact') }</Link>
			</li>
			<li className="flex">
            <Link rel="noopener noreferrer" to="/news" className="flex items-center px-4 -mb-0.5  dark:border-transparent text-white" activeClassName="border-b-2 border-white">{t('news') }</Link>
			</li>
		</ul>
		{
			isUser === null ? <div className="items-center flex-shrink-0 hidden lg:flex  w-[40%] justify-end">
			<button onClick={handleReload} className="self-center px-4 py-[6px] ml-3 rounded-[5px] border-[1px] border-solid border-white text-[12px] hover:bg-white hover:text-black duration-700">{t('signin') }</button>
			<button onClick={handleReload1}  className="self-center px-4 py-[6px] ml-3 rounded-[5px] border-[1px] border-solid border-white text-[12px] hover:bg-white hover:text-black duration-700">{t('signup') }</button>
			<Dropdown
			overlay={
			  <Menu>
				{items.map((item) => (
				  <Menu.Item
					key={item.key}
					onClick={() => handleMenuClick(item)}
				  >
				  <img src=    {item.label} href="co" className="w-[20px] h-[20px]"/>
				  </Menu.Item>
				))}
			  </Menu>
			}
			placement="bottomLeft"
			arrow={{ pointAtCenter: true }}
			className="ml-2"
		  >
			<Button>
				<img src=  {selectedItem ? selectedItem.label : items[0]?.label} href="co" className="w-[20px] h-[20px]"/>
			
			</Button>
		  </Dropdown>
		</div> :
		<div className="items-center justify-end flex-shrink-0 hidden lg:flex  w-[40%]">
			
			<ul className="items-stretch hidden space-x-3 lg:flex">
				<li className="flex">
					<Link rel="noopener noreferrer" to="/ticket" className="flex items-center px-4 -mb-0.5  dark:border-transparent text-white" activeClassName="border-b-2 border-white">{t('Lịch sử đặt vé') }</Link>
				</li>
			</ul>
			<Dropdown
			overlay={
			  <Menu>
				{items.map((item) => (
				  <Menu.Item
					key={item.key}
					onClick={() => handleMenuClick(item)}
				  >
				  <img src=    {item.label} href="co" className="w-[20px] h-[20px]"/>
				  </Menu.Item>
				))}
			  </Menu>
			}
			placement="bottomLeft"
			arrow={{ pointAtCenter: true }}
		  >
			<Button>
				<img src=  {selectedItem ? selectedItem.label : items[0]?.label} href="co" className="w-[20px] h-[20px]"/>
			
			</Button>
		  </Dropdown>
		  <button onClick={handleLogout} className="self-center px-2 py-[6px] ml-3 rounded-[5px] border-[1px] border-solid border-white text-[12px] hover:bg-white hover:text-black duration-700">{t('logout') }</button>
		</div>
		}
		<button className="p-4 lg:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:text-gray-100">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
			</svg>
		</button>
	</div>
</header>
  );
}

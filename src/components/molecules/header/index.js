import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import useAuth from '../../../hooks/useAuth.js';
// Image
import {Logo} from '../../../assets'

const Header = () => {
	const {auth, setAuth} = useAuth();
	const [isLogin, setIsLogin] = useState(false);
	const history = useLocation();
	const objMenu = [
		{
			name:"Browse",
			id:"browse",
			url:`/browse`
		},
		{
			name:"My Books",
			id:"mybooks",
			url:`/my-books`
		},
		{
			name:"Shop",
			id:"shop",
			url:`/shop`
		},
		{
			name:"Order",
			id:"order",
			url:`/order`
		},
	]
	useEffect(() => {
		auth.login ? setIsLogin(true) : setIsLogin(false)
	},[auth])
	const handleClickEvent = () => {
		if(isLogin){
			Axios.get('https://e-books-app.herokuapp.com/removeCookies')
			.then(data => {
				if(data.statusText === "OK")setAuth({login:false})
			})
			.catch(error => {
				console.log(error.response, "from error header")
			})
		}else{
			window.location.assign('/login')
		}
	}
	return (
		<>
			<header>
				<div className="wo-header-fixed">
					<div className="wt-header main-header">
						<div className="part-one">
							<img alt="Logo RWB" src={Logo} className="hl"/>
						</div>
						<div className="part-two">
							<ul className="nav-header">
								{
									objMenu.length !== 0 ? objMenu.map((data,index) => {
									return (<li className={`nav-icon ${"navicon-" + index} ${data.url === history.pathname ? "active" : ""}`}key={data.id}id={"nav" + index}><Link to={data.url} className="l-p"><span>{data.name}</span></Link></li>) 
									}) : null
								}
								<li className="nav-nl nl-tw l-p">
									<span onClick={handleClickEvent}>{isLogin ? "Logout" : "Login"}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}

export default Header
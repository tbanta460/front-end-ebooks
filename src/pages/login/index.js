import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { setLogin,loginPost } from '../../config/redux/action/setForm.js';
import RequestAccess from '../../config/midleware/requestAccess.js';
import useAuth from '../../hooks/useAuth.js';
import './index.css';
// components
import { Button, Input,Gap, Error } from '../../components';

// Image
import { Logo } from '../../assets'
import RefreshToken from '../../config/midleware/refreshToken.js';
const Login = () => {
	const [error, setError] = useState({})
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {setAuth} = useAuth();
	const {login} = useSelector(state => state.SetForm);
	const {username, password} = login;

	const checkToken = async (accessToken, refreshToken) => {
		try{
			let newAccessToken = accessToken;
			if(!newAccessToken){
				setError("Terjadi kesalahan saat login")
				return null
			}else if(newAccessToken === undefined){
				newAccessToken = await refreshToken(refreshToken);
				if(newAccessToken === false){
					setError("Terjadi kesalahan saat login")
					return null
				}
			}else {
				const resultFromRequestAccess = await RequestAccess(newAccessToken, refreshToken);
				const {fullname, userId} = resultFromRequestAccess.data.data;
				setAuth(prev => {
					return{
						...prev,
						fullname,
						userId,
						login: true,
						accessToken: newAccessToken
					}
				});
				navigate('/browse')
			}
		}catch(error){
			setError("Terjadi kesalahan saat login")
		}
	}
	const handleClickLogin = () => {
		loginPost(login)
		.then(async data => {
			const {accessToken, refreshToken} = data.data
			await checkToken(accessToken, refreshToken);
		})
		.catch(error => {
			setError(error.data.message)
		})
		dispatch(setLogin("username", ""))
		dispatch(setLogin("password", ""))
	}
	return (
		<>
			<div className="mcl">
				<div className="main-login">
					<div>
						<img src={Logo} alt="Logo CEO" className="ml-logo"/>
						<Gap isStyle="h-4"/>
						<span className="ml-wel">Selamat Datang</span>
					</div>
					<div className="inf-pgn">
						<span>Silahkan gunakan username dan password di bawah ini, jika anda tidak ingin membuat akun terlebih dahulu.</span>
						<div>
						<span>Username: Aryaa</span>
						<span>Password: arya7272</span>
						</div>
					</div>
					{
						Object.keys(error).length !== 0 ? <Error message={error}/> : null
					}
					<form className="ml-part-input" method="POST" enctype="multipart/form-data">
						<Input titleLabel="UserName:" forId="username" idInput="username" placeHolder="UserName" typeInput="text" value={username} onChange={e => dispatch(setLogin("username", e.target.value))}/>
						<Gap isStyle="h-2" />
						<Input value={password}onChange={e => dispatch(setLogin("password", e.target.value))}titleLabel="Password:" forId="password" idInput="Password" placeHolder="Password" typeInput="password"/>
					
						<Gap isStyle="h-2" />
						
					</form>
					<div className="button-bbtn">
							<Button title="Masuk" iSstyle="btn-blue" onClick={handleClickLogin}/>
							<span onClick={() => navigate('/register')}>Belum Memiliki Akun?</span>
						</div>
				</div>
			</div>
		</>
	)
	
}
export default Login
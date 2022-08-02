import { getAllData } from '../redux/action/setForm.js';
import Axios from 'axios';

const Middleware = (auth) => {
	return new Promise(async (resolve, reject) => {
		const inRefresh = (refreshToken) => {
			return new Promise((resolve, reject) => {
				Axios.post('https://e-books-app.herokuapp.com/refresh',{token: refreshToken}, {
					withCredentials:true,
					headers:{
						"Content-Type": "application/json"
					}
				})
				.then(async dataToken => {
					if(dataToken.data.success === false){
						reject(false)
					}else {
						const {accessToken} = dataToken.data;
						resolve(accessToken)
					}
				})
				.catch(error => {
					reject({success: false, message:"Terjadi kesalahan ketika meng-authenticated"})
				})
			})
		}
		const requestAccess = async (accessToken, refreshToken) => {
			Axios.get(`https://e-books-app.herokuapp.com/my-books`,{
				withCredentials: true,
				headers:{
					'Authorization': `Bearer ${accessToken}`,
					Accept: 'application/json',
					"Content-Type":"application/json"
				}
			})
			.then(async resData => {
				if(resData.data.success === false){
					if(resData.data.message === "Token expired"){
						try{
							const newAccessToken = await inRefresh(refreshToken);
							requestAccess(newAccessToken, refreshToken);

						}catch(error){
							reject({success: false, message:"User Tidak Dikenal"}) 
						}
					}else if(resData.data.message === 'User not authenticated'){
						reject({success: false, message:"User Not authenticated"})
					}else {
						reject({success:false, message:"Terjadi kesalahan pada server"})
					}
				}else {
					if(resData.data.message === "Berhasil terverifikasi"){
						resolve({success:true, data:resData.data})
					}
				}
			})
			.catch(error => {
				reject({success: false, message:"Terjadi Kesalahan"})
			})
		}
		const tokenUser = async (dataUser) => {
			await Axios.get('https://e-books-app.herokuapp.com/cookies', {
				withCredentials:true,
				headers:{
					Accept: 'application/json',
					"Content-Type":"application/json"
				}
			})
			.then(async data => {
				const getAccessToken = data.data.data.access_token.toString();
				if(dataUser === undefined || getAccessToken === undefined){
					reject({success: false, message: "User Tidak Ditemukan"})
				}else {
					const {refreshToken} = dataUser;
					await requestAccess(getAccessToken, refreshToken)
				}
				
			})
			.catch(error => {
				reject({success: false, message:error.response})
			});
			
		}
		
		const getData = async () => {
			await getAllData(`https://e-books-app.herokuapp.com/my-books/${auth.userId}`)
				.then(data => {
					tokenUser(data.data.data);
				})
				.catch(error => {
					reject({success: false, message: error.data.message})
			})
		}
		getData();
		
	})	
}

export default Middleware
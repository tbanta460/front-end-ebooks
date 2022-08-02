import Axios from 'axios';
import RefreshToken from './refreshToken.js';
const RequestAccess = (accessToken, refreshToken = undefined) => {
	return new Promise(async (resolve, reject) => {
		try{
			const res = await Axios.get('https://e-books-app.herokuapp.com/my-books', {
				withCredentials:true,
				headers:{
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`
				}
			})
			if(res.data.success === false){
				if(res.data.message === "Token expired"){
					try{
						if(refreshToken !== undefined){
							const newAccessToken = await RefreshToken(refreshToken);
							if(!newAccessToken.success){
								reject(newAccessToken)
							}
							RequestAccess(newAccessToken, refreshToken)
						}else{
							reject({success: false, message:"RefreshToken tidak ditemukan"})
						}
					}catch(error){
						reject({success: false, message: "User Tidak Dikenal"})
					}
				}else if(res.data.message === "User not authenticated"){
					reject({success: false, message:"User Not authenticated"})
				}
			}else {
				resolve({success:true, data:res.data})
			}
		}catch(error){
			reject(error)
		}
	})
}
export default RequestAccess
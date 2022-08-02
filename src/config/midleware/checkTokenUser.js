import RequestAccess from './requestAccess.js';
import { getAllData } from '../redux/action/setForm.js';
const CheckTokenUser = (auth) => {

	const tokenUser = async (dataUser) => {
		try{
			if(dataUser === undefined || auth.accessToken === undefined){
				return ({success: false, message: "User Tidak Ditemukan"})
			}else {
				const {refreshToken} = dataUser
				try{
					const result = await RequestAccess(auth.accessToken, refreshToken);
					
					return result
				}catch(error){
					return error
				}
				
			}
		}catch(error){
			return error.response
		}
	}

	const getDataUser = async () => {
		let result;
	
		await getAllData(`https://e-books-app.herokuapp.com/my-books/${auth.userId}`)
		.then(async data => {

			result = auth.accessToken !== undefined ? await tokenUser(data.data.data) : ({success:false, message:"Token Tidak Ditemukan"})
		})
		.catch(error => {
			result = error.response
		});
		return result
	}


	return getDataUser
}

export default CheckTokenUser
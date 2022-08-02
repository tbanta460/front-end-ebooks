import Axios from 'axios';
const RefreshToken = (refreshToken) => {
	const inRefresh = async () => {
		try{
			const resData = await Axios.post('https://e-books-app.herokuapp.com/refresh',{token:refreshToken},{
			withCredentials: true,
			headers:{
				'Content-Type': 'application/json',

				}
			});
			const result = resData.data.success === false ? ({success: false, message:"Token tidak Ditemukan"}) : ({refToken: resData.data.accessToken, isId: resData.data.id, success:true, allDatas: resData.data})
			return result
		}catch(error){
			return error.response
		}
	}
	return inRefresh();

}
export default RefreshToken
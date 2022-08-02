import useAuth from './useAuth.js';
import Axios from 'axios';

const useCookie = () => {
	const{setAuth} = useAuth();
	
	const refresh = async () => {
		let result
		await Axios.get('https://e-books-app.herokuapp.com/cookies',{
			withCredentials:true,
			headers:{
				Accept:"application/json",
				"Content-Type":"application/json"
			}
		})
		.then(data => {
			const refreshToken = data.data.data.refresh_token
			setAuth(prev => {
				return{
					...prev,
					refreshToken,
					login:true
				}
			});
			result = ({token:refreshToken, success: true})
			return result
		})
		.catch(error => {
			result = ({message:error.response, success: false});
			return result
		})
		return result
	}
	
	return refresh
	
}

export default useCookie
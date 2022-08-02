import Axios from 'axios';

export const setLogin = (formType, formValue) => {
	return {
		type: "SET_FORM_LOGIN", formType, formValue
	}
}

export const setRegister = (formType, formValue) => {
	return{
		type: "SET_FORM_REGISTER", formType, formValue
	}
}
export const createNewBook = (formType, formValue) => {
	return {
		type:"SET_FORM_CREATEBOOK", formType, formValue
	}
}
export const setImagePreview = (data) => {
	return{
		type:"SET_IMAGEPREVIEW", data
	}
}

export const loginPost = (dataUser, path) => {
	const objData = {}
		objData["username"] = dataUser.username;
		objData["password"] = dataUser.password;

	return Axios.post('https://e-books-app.herokuapp.com/login', objData,{
		withCredentials:true,
		headers:{
			'Content-Type':'application/json'
		}
	}).then(data => {
		console.log(data, "apakah benar?")
		return data
	}).catch(error => {
		console.log(error.response, "apakah salah?")
		return error.response
	})
}
export const registerPost = (dataUser) => {
	return new Promise((resolve,reject) => {
		const objData = {}
		objData["username"] = dataUser.username
		objData["fullname"] = dataUser.fullname
		objData["email"] = dataUser.email
		objData["password"] = dataUser.password
		objData["confirmpassword"] = dataUser.confirmpassword
	
		Axios.post(`https://e-books-app.herokuapp.com/register`, objData, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(data => {
			resolve(data)
		})
		.catch(error => {
			reject(error.response)
		})
	})
}
export const bookPost = (dataBook) => {
	
	let newObj = {}
	for(let pro in dataBook){
		newObj[pro] = dataBook[pro]
	}
	// multipart/form-data
	
	const data = new FormData();
	data.append('title', dataBook.title);
	data.append('image', dataBook.image);
	data.append('iduser', dataBook.iduser);
	data.append('genres', dataBook.genres);
	data.append('sinopsis', dataBook.sinopsis);
	return Axios.post('https://e-books-app.herokuapp.com/dashboard/book/create', newObj, {
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(data => {
		return data
	})
	.catch(error => {
		return error.response
	})

}
export const getUser = (idUser) => {
	return new Promise((resolve, reject) => {
		Axios.get(`https://e-books-app.herokuapp.com/dashboard/${idUser}`)
			.then(data => {
				resolve(data)
			})
			.catch(error => {
				reject(error.response)
		})	
	})
	
}
export const getAllData = (url) => {
	return new Promise((resolve, reject) => {
		Axios.get(url)
		.then(data => {
			resolve(data)
		})
		.catch(error => {
			reject(error.response)
		})
	})
}
export const getBooks = (url) => {
	return new Promise((resolve, reject) => {
		Axios.get(url)
		.then(data => {
			resolve(data)
		})
		.catch(error => {
			reject(error.response)
		})
	})
}
export const getChaps = (url) => {
	return new Promise((resolve,reject) => {
		Axios.get(url)
		.then(data => {
			resolve(data)
		})
		.catch(error => {
			reject(error.response)
		})
	})
}
export const createChap = (url, data) => {
	return new Promise((resolve, reject) => {
		const datas = new FormData();
		datas.append('title', data.title);
		datas.append('paragraf', data.paragraf);
		datas.append('idbook', data.idbook)
		Axios.post(url, datas, {
			headers: {
			'Content-Type': 'multipart/form-data'
			}
		})
		.then(res => {
			resolve(res)
		})
		.catch(error => {
			reject(error.response)
		});
	})
}

export const dataChaps = (url, data) => {
	return Axios.get(url)
			.then(data => {
				return data
			})
			.catch(error => {
				return error.response
			})
}
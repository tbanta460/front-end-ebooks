import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth.js';
import './index.css';
import { createNewBook, setImagePreview, bookPost } from '../../config/redux/action/setForm.js';
// Components
import { Input, Button, Upload, PopUp } from '../../components';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from '../../firebase';

const CreateBook = () => {
	const {createBook, imagepreview} = useSelector(state => state.SetForm );
	const [status, setStatus] = useState(false);
	const [message, setMessage] = useState("");
	const [progress, setProgress] = useState(0)
	const { genres, image} = createBook;
	const {auth} = useAuth();
	const dispatch = useDispatch();
	const parentEl = useRef(null);
	const getDiv = useRef();
	useEffect(() => {
		if(progress === 100 && typeof image === 'string'){
			const createMyBook = async () => {
				const rest = await bookPost(createBook);
				setStatus(rest.data.success);
			}
			createMyBook()
		}
	},[progress, image])
	const storeImageToFirebase = async (file) => {
		let perketes = 0
		let fileName = new Date().getTime() + file.name;
			const storageRef = ref(
				storage,
				`/images/${fileName}`
			);
			let uploadTask = uploadBytesResumable(storageRef, file);
			await uploadTask.on(
				"state_changed",
				async (snapshot) => {
					const uploaded = Math.floor(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(uploaded)
					
				},
				(error) => {
					console.log(error, "hasil eerror");
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then( (url) => {
						dispatch(createNewBook("image", url));
					});
				}
			);
	}
	const handleClickEvent = async () => {
		try{
			const getDivElement = getDiv.current;
			let file = image
			if(getDivElement.children.length !== 0 && Object.keys(createBook["title"]).length > 0){
				createBook["author"] = auth.fullname.split("_").join(" ");
				createBook["iduser"] = auth.userId;
				createBook["sinopsis"] = getDivElement.outerHTML
				storeImageToFirebase(file);
			}
		}catch(error){
			setMessage("Terjadi kesalahan ketika membuat buku")
		}
	}
	const handleImage = (e) => {
		const file = e.target.files[0];
		dispatch(createNewBook("image", file));
		dispatch(setImagePreview(URL.createObjectURL(file)));

		// let fileName = new Date().getTime() + file.name;
		// 	const storageRef = ref(
		// 		storage,
		// 		`/images/${fileName}`
		// 	);
		// 	let uploadTask = uploadBytesResumable(storageRef, file);
		// 	uploadTask.on(
		// 		"state_changed",
		// 		(snapshot) => {
		// 			const uploaded = Math.floor(
		// 				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
		// 			);
		// 			if(uploaded === 100){
		// 				getDownloadURL(uploadTask.snapshot.ref).then( (url) => {
		// 					dispatch(createNewBook("image", url));
		// 				});
		// 			}
		// 		},
		// 		(error) => {
		// 			console.log(error);
		// 		}
		// 		// () => {
		// 			// getDownloadURL(uploadTask.snapshot.ref).then( (url) => {
		// 			// 	dispatch(createNewBook("image", url));
		// 			// });
		// 		// }
		// 	);
	}
	const hadleEventCheckbox = async (e) => {
		if(genres === undefined){
			let newGenres = [];
			if(e.target.checked){
				newGenres.push(e.target.value)
			}
			dispatch(createNewBook("genres", newGenres))
		}else if(genres !== undefined){
			const checkValueGenres = genres.includes(e.target.value)
			if(e.target.checked && checkValueGenres === false){
				genres.push(e.target.value);
			}
			if(!e.target.checked){
				const index = genres.indexOf(e.target.value);
				if(index > -1){
					genres.splice(index, 1);
				}
			}
			dispatch(createNewBook("genres", genres))
		}
	}
	const createSinopsis = () => {
		const getDivElement = getDiv.current;
		if(getDivElement.children.length === 0){
			const createParagraf = document.createElement('p');
			const createBr = document.createElement('br');
			createParagraf.appendChild(createBr);
			getDivElement.appendChild(createParagraf);
		}
	}
	const hanldePopUpClick = () => {
		dispatch(createNewBook("image", null));
		dispatch(createNewBook("title", ""))
		window.location.assign('/browse')
	}
	return(
		<>
			{
			status 
			? <PopUp onClick={hanldePopUpClick} text="Selamat Anda Berhasil Membuat Buku" buttonTitle="Kembali Ke Profile" /> : null}
			<form className="form-create-book" >
				<Input titleLabel="Judul:" forId="title" typeInput="text" idInput="title" placeHolder="Masukkan Judul Buku" onChange={e => dispatch(createNewBook("title", e.target.value))}/>
				<div>
					<label htmlFor="sinop">Sinopsis:</label>
					<div id="sinop" contentEditable="true" ref={getDiv}className="sinopsis-story" onFocus={createSinopsis}>

					</div>
				</div>
				<Upload img={imagepreview} onChange={handleImage}/>
				<div className="list-genres" ref={parentEl}>
					<Input type="checkbox" idInput="action" forId="action" name="action" value="action" titleLabel="Action" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="advantrue" forId="advantrue" name="advantrue" value="advantrue" titleLabel="Advantrue" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="romance" forId="romance" name="romance" value="romance" titleLabel="Romance" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="horror" forId="horror" name="horror" value="horror" titleLabel="Horror" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="mystery" forId="mystery" name="mystery" value="mystery" titleLabel="Mystery" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="thriller" forId="thriller" name="thriller" value="thriller" titleLabel="Thriller" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="history" forId="history" name="history" value="history" titleLabel="History" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="sci-fi" forId="sci-fi" name="sci-fi" value="sci-fi" titleLabel="Sci-Fi" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="westerns" forId="westerns" name="westerns" value="westerns" titleLabel="Westerns" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="fantasy" forId="fantasy" name="fantasy" value="fantasy" titleLabel="Fantasy" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="drama" forId="drama" name="drama" value="drama" titleLabel="Drama" onChange={hadleEventCheckbox}/>
					<Input type="checkbox" idInput="comedy" forId="comedy" name="comedy" value="comedy" titleLabel="Comedy" onChange={hadleEventCheckbox}/>
				</div>
				<Button title="Selesai" type="button" iSstyle="btn-blue" onClick={handleClickEvent}/>
			</form>
			
		</>
	)
}
export default CreateBook
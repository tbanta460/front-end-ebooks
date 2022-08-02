import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import "./index.css";
import { createChap } from '../../config/redux/action/setForm.js';

// Component
import { Input, Button, PopUp } from '../../components';


const CreateChap = () => {
	const params = useParams();
	const textPlaceholder = "Ketik Di Sini...";
	const [status, seStatus] = useState(false)
	const [values, setValue] = useState({
		title:"",
		placeholder:textPlaceholder,
		classPlaceholder:"actived"
	});

	const getTextArea = useRef();
	const handleEventValues = (e) => {
		setValue(val => {
			return {
				...val,
				[e.target.name]: e.target.value
			}
		});
	}
	const handleKeyPress = async (e) => {
		const getChildNodess = getTextArea.current.childNodes;
		const lengthContent = getChildNodess[0].textContent.length;
		if((lengthContent === 0 && getChildNodess.length === 1) && (e.keyCode === 8 || e.keyCode === 46)){
			e.preventDefault();
		}
	}
	
	const handleSubmitChapter = () => {

		let chapObj = {}
		const childNodes = getTextArea.current
		let res;
		if((values.title !== undefined && values.title !== "") || (childNodes.children.length >= 1 && childNodes.children[0].textContent.length > 20)){
			chapObj["title"] = values.title;
			chapObj["paragraf"] = childNodes.outerHTML;
			chapObj["idbook"] = params.idbook
			createChap('https://e-books-app.herokuapp.com/chapter/create', chapObj)
			.then(data => {
				res = data.message
			})
			.catch(error => {
				res = error
			})

		}else {
			res = "Anda gagal membuat chapter";
		}

		seStatus(true)
	}
	const removePlaceholder = (e) => {
		const childNodes = getTextArea.current.childNodes;

		if(childNodes[0].textContent === textPlaceholder && childNodes.length === 1){
			setValue(val => {
				return {
					...val,
					placeholder: "",
					classPlaceholder: ""
				}
			})
		}
	}
	const addPlaceholder = async () => {
		const childNodes = getTextArea.current.childNodes;

		if(childNodes[0].textContent === "" && childNodes.length === 1){
			await setValue(val => {
				return{
					...val,
					placeholder: textPlaceholder,
					classPlaceholder: "actived"
				}
			});
		}
	}

	const hanldePopUpClick = () => {
		window.location.assign('/my-books')
	}
	return (
		<>
			{status && (<PopUp onClick={hanldePopUpClick} text="Selamat Anda Berhasil Membuat Chapters" buttonTitle="Kembali Ke Profile" />)}
			<div className="main-cp">
				<div className="part-one-cp">
					<form className="form-txt" >
						<Input value={values.title}onChange={handleEventValues} data-placeholder="Edit me" type="text" name="title" hide="true" idInput="jdl" placeHolder="Masukkan Judul Chapter" />

						<div suppressContentEditableWarning={true}ref={getTextArea} onFocus={removePlaceholder}onBlur={addPlaceholder}className="create-text"  contentEditable="true" onKeyDown={handleKeyPress}>
							<p className={values.classPlaceholder} >{values.placeholder}<br/></p>
						</div>
						
					</form>
					<Button title="Buat Chapter" type="submit" iSstyle="btn-blue" onClick={handleSubmitChapter}/>
				</div>
			</div>
		</>
	)
}

export default CreateChap
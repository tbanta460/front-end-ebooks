import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllData } from '../../config/redux/action/setForm.js';
import './index.css';

const ReadChap = () => {
	const [dataChap, setDataChap] = useState([]);
	const [paragraf, setParagraf] = useState([])
	const parser = new DOMParser();
	const params = useParams();
	useEffect(() => {
		getAllData(`https://e-books-app.herokuapp.com/chapter/${params.idchap}`)
		.then(data => {
			const elementParagraf = data.data.data[0].paragraf;

			const doc = parser.parseFromString(elementParagraf,'text/html');
			const getDivElement = doc.body.firstChild;
			const getParagrafElement = getDivElement.children
			setDataChap(data.data.data[0]);
			setParagraf(getParagrafElement)
		})
		.catch(error => {
			window.location.assign('somethingwrong')
		})
	}, [])
	return (
		<>
			<div className="read-chapter">
				<h2 className="title-book">{dataChap.title}</h2>
				<div className="paragraf-story">
					{
						paragraf.length !== 0
						? Array.from(paragraf).map((data, i) => {
							return <p key={i}>{data.textContent}</p>
						})
						: null
					}
				</div>
			</div>
		</>
	)
}

export default ReadChap
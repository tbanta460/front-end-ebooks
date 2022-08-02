import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './index.css';
import useAuth from '../../hooks/useAuth.js';
import { getAllData } from '../../config/redux/action/setForm.js';
// Compoent

import { Button, CoverImage } from '../../components';

// image
import { Star, Eye, Bab } from '../../assets';

const Chapters = () => {
	const [dataBook, setDataBooks] = useState([]);
	const [dataChap, setDataChap] = useState([]);
	const [isButton, setIsButton] = useState(true)
	const [sinopsis, setSinopsis] = useState("");
	const {auth} = useAuth();
	const navigate = useNavigate();
	const params = useParams();
	useEffect(() => {
		const getDataBooks = async () => {
			getAllData(`https://e-books-app.herokuapp.com/dashboard/getbooks/${params.idbook}`)
			.then(async data => {
				const res = data.data.data[0];
				const parser = new DOMParser();
				const doc = parser.parseFromString(res.sinopsis,'text/html');
				const getDivElement = doc.body.firstChild;
				const getParagrafElement = getDivElement.children
				await setSinopsis(getParagrafElement)
				await setDataBooks(res);
			})
			.catch(error => {
				window.location.assign('/somethingwrong')
			})
		}
		const getDataChaps = async () => {
				getAllData(`https://e-books-app.herokuapp.com/chapter/${params.idbook}`)
				.then(async data => {
					await setDataChap(data.data.data)
				})
				.catch(error => {
					window.location.assign('/somethingwrong')
				})
			
		}
		getDataBooks();
		getDataChaps();

	},[]);

	useEffect(() => {
		auth.fullname === dataBook.author ? setIsButton(true) : setIsButton(false)
	},[auth, dataBook])
	const hadleEventClick = () => {
		isButton ? navigate(`/create-chapter/${params.idbook}/${params.bookname}`) : navigate(`/read/${dataChap[0].chapid}/${dataChap[0].bookname}`)
	}
	const readChap = (data) => {
		navigate(`/read/${data.chapid}/${params.bookname}`)
	}
	console.log(dataBook.cover, "test")
	return (
		<>
			<div className="main-card-chaps">
				<div className="part-info">
					<div className="mid">
						<CoverImage srcImage={`${dataBook.cover}`} altImage="Cover Buku"/>
						<div className="info-book">
							<h3>{dataBook.title}</h3>
							<div className="atbli">
								<IconInfo alt="icon total dibaca" img={Eye} txt="Total Dibaca"/>
								<IconInfo alt="icon vote" img={Star} txt="Vote"/>
								<IconInfo alt="icon total bab pada buku" img={Bab} txt="Total Chaps"/>
							</div>
							<Button title={isButton ? "Buat Chapter" : "Baca Chapter"} iSstyle="btn-blue" type="button" onClick={hadleEventClick}/>
						</div>
					</div>
				</div>
				<div className="list-chapters">
					<div className="sinopsis">
						<div className="text-sinopsis-story snp">
							<p>
								{
									sinopsis !== ""
									? Array.from(sinopsis).map((data,index) =>{
										return <p key={index}>{data.textContent}</p>
									})
									: null
								}
							</p>
						</div>
						<div className="genre-story snp">
							{
								dataBook.length !== 0 
								? dataBook.genres.map((data, index) => {
									return <span key={index}className="list-genres">{data}</span>
								})
								: null
							}
						</div>
					</div>
					<div className="mid-chap">
						<div>
							<h3>Daftar Isi</h3>
						</div>
						{
							dataChap.length !== 0 
							? dataChap.map(data => {
								return<div key={data.id}onClick={() => readChap(data)} className="list-chaps"><span>{data.title}</span></div>
							})
							: null
						}
					</div>
				</div>
			</div>
		</>
	)
}

export const IconInfo = ({img, alt, txt, ...rest}) => {
	return(
		<>
			<div className="mi">
				<img className="mi-image"src={img} alt={alt} />
				<span className="mi-text">{txt}</span>
			</div>
		</>
	)
}

export default Chapters
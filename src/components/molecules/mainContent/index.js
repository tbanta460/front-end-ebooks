import React, { useEffect, useState } from 'react';
import { RegSlide, InfoGuide, ListByGenre, TopAuthors, NewBooks } from '../../';
import { getAllData, dataChaps } from '../../../config/redux/action/setForm.js';
import Axios from 'axios'
import './index.css'

const MainContent = () => {
	const [dataUser, setDataUser] = useState([])
	const [newChaps, setNewChaps] = useState([]);
	const [isList, setIsList] = useState({
		book: null,
		books: []
	})
	const [isGenres, setIsGenres] = useState({});
	useEffect(() => {
		const getDataUser = async () => {
			Axios.get(`https://e-books-app.herokuapp.com/getusers`)
			.then(async data => {
				await setDataUser(data.data.data);
			})
			.catch(error => {
				window.location.assign('/somethingwrong')
			});
		}

		const getDataBooks = async () => {
		getAllData(`https://e-books-app.herokuapp.com/dashboard/getbooks`)
			.then(data => {
				let newObj = {};
				if(data){
					let dataList = data.data.data
					let res = dataList.map(data => {
						// Filter buku berdasarkan genre
						data.genres.forEach(arr => {
							if(data.genres.includes(arr)){
								newObj[arr] === undefined ? newObj[arr] = [data] : newObj[arr].push(data)
							}
						});
						return data
					}).filter(data => data !== dataList[0]);
					setIsList({
						book: dataList[0],
						books: res
					})
				}
				setIsGenres(newObj)
			})
			.catch(error => {
				window.location.assign('/somethingwrong')
			})
		}

		const getDataChap = async () => {
			const res = await dataChaps('https://e-books-app.herokuapp.com/chaps');
			setNewChaps(res.data.datas)
		}
		getDataBooks()
		getDataUser()
		getDataChap()

		
	}, []);

	return(
		<>
			<div className="main-content-ppl">
				<div className="part-two-main-content">
					<RegSlide titleGenre="New Chapters" dataBooks={newChaps} id="new-chaps"/>
					<NewBooks dataBooks={isList.books} dataBook={isList.book}/>
					<InfoGuide />
					<ListByGenre romance={isGenres.romance} action={isGenres.action} mystery={isGenres.mystery} />
					<TopAuthors data={dataUser} />
				</div>
			</div>
		</>
	)
}

export default MainContent
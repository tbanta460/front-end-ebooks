import React,{ useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import { getAllData } from '../../config/redux/action/setForm.js';
import useAuth from '../../hooks/useAuth';
import './index.css'

// Image


// Component
import { Sidebars, McMyBooks, ListBooks, InfoBox } from '../../components'
const MyBooks = () => {
	const navigate = useNavigate();
	const {auth} = useAuth();
	const [dataUser, setDataUser] = useState({});
	const [dataBooks, setDataBooks] = useState([])

	useEffect(() => {
		// Pengambilan data user dan data buku
		const getDataUser = async (idUser = undefined) => {
			Axios.get(`https://e-books-app.herokuapp.com/my-books/${auth.userId}`)
			.then(async data => {
				await setDataUser(data.data.data);
			})
			.catch(error => {
				window.location.assign('/somethingwrong')
			});
		}
		const getDataBooks = (idUser = undefined) => {
			getAllData(`https://e-books-app.herokuapp.com/dashboard/getbooks/${auth.userId}`)
			.then(async data => {
				await setDataBooks(data.data.data)
			})
			.catch(error => {
				window.location.assign('/somethingwrong')
			})
		}
		getDataBooks();
		getDataUser();
	},[]);

	const handleClickEvent = () => {
		navigate(`/my-books/create`)
	}
	
	return (
		<>
			<div className="main-profile">
				<div className="mc-profile">
					<div>
						<McMyBooks dataUser={dataUser}/>
					</div>
					<div className="part-one-main-content">
						<InfoBox info="Pengikut" num="870"/>
						<InfoBox info="Diikuti" num="330"/>
						<InfoBox info="Disukai" num="870"/>
						<InfoBox info="Total Dibaca" num="4.210.999"/>
						<InfoBox info="Buku Saya" num="4"/>
						<InfoBox info="Perpustakaan" num="32"/>
					</div>
					<div className="cb" onClick={handleClickEvent}>
						<h3 className="txt-cb">Buat Buku</h3>
						<Link className="box-cb l-p" to="/my-books">
							<span>+</span>
						</Link>
					</div>
					<div className="list-books-mp">
						<h3 className="txt-inf">Buku Terbaru Anda</h3>
						<div >
							{
								dataBooks.length !== 0 

								? <div className="list-mybooks">{dataBooks.map(data => {
									return <div key={data.idbook}className="list-books"><Link className="nav-link" to={`/sinopsis/${data.idbook}/${data.title.split(" ").join("-")}`}><ListBooks createAt={data.createdAt} author={data.author} title={data.title} img={data.cover} sinop={data.sinopsis}/></Link></div>
								})}</div>

								: <div className="nth-book"><h2 className="text-nth">Anda Belum Memiliki Buku</h2></div>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default MyBooks
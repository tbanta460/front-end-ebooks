import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
// Components
import { SmallListBooks,HeroBook } from '../..';
const NewBooks = ({dataBooks = [], dataBook}) => {
    return(
        <>
            <div className="inf-b-p1">
				<h3 className="nm-bk-typ">New Books</h3>
				<div className="nb">
					<section className="nb-s-two">
						<div className="hr-chd">
							{dataBook !== null ? <HeroBook idBook={dataBook.idbook} altt={`sampul gambar dari ${dataBook.title}`} srcc={dataBook.cover} titleBook={dataBook.title} authorBook={dataBook.author} sinop={dataBook.sinopsis}/> : null}
						</div>
					</section>
					<section className="nb-s-one">
						<div className="nb-chd-one">
							{
								dataBooks.length !== 0
								? dataBooks.map((data,index) => {
									return index >= 0 && index <= 7 && (
										<div key={data.idbook}className='int-lpp'><Link className="nav-link nl" to={`/sinopsis/${data.idbook}/${data.title.split(" ").join("-")}`}><SmallListBooks titleBook={data.title} authorBook={data.author} srcc={data.cover} altt={`sampul gambar dari ${data.title}`}/></Link></div>
									    )
								    })
								: null
							}
						</div>
					</section>
				</div>
			</div>
        </>
    )
}

export default NewBooks
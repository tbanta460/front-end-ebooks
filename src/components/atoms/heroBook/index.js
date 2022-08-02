import React from 'react';
import {CoverImg} from '../../';
import { Link } from 'react-router-dom';
import './index.css';


const HeroBook = ({sinop, authorBook, titleBook, idBook,altt, srcc}) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sinop,'text/html');
	const getDivElement = doc.body.firstChild;
	const getParagrafElement = getDivElement.children
    const handleClickEvent = () => {
        window.location.assign(`sinopsis/${idBook}/${titleBook.split(" ").join("-")}`)
    }
    return(
        <>
            <div className="h-bk">
                <Link className="nav-link nl" to={`/sinopsis/${idBook}/${titleBook.split(" ").join("-")}`}>
                    <CoverImg srcImg={srcc} altImg={altt} sizeCover="smal-cv"/>
                </Link>
                    <div className="h-snp-bk">
                        <Link className="nav-link nl-f" to={`/sinopsis/${idBook}/${titleBook.split(" ").join("-")}`}>
                            <h4 className="txt-ttl">{titleBook}</h4>
                        </Link>
                        <span className='txt-ath'>{authorBook}</span>
                        <p className="txt-parag">
                            {
								sinop.length > 50 
								? Array.from(getParagrafElement)[0].textContent.slice(0, 250) + "..."
								: sinop
							}
                        </p>
                       <button className="btn-rd" onClick={handleClickEvent}>Baca</button>
                    </div>
               
            </div>
        </>
    )
}

export default HeroBook
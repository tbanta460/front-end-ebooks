import React, { useState, useEffect }  from 'react';
import './index.css';

// Components
import { CoverImage } from '../index.js';

const ListBooks = ({author, sinop, title, img, createAt, adrs, ...rest}) => {
	const [createBook, setCreateBook] = useState(null);
	const [showInfo, setShowInfo] = useState(false)
	const parser = new DOMParser();
	const doc = parser.parseFromString(sinop,'text/html');
	const getDivElement = doc.body.firstChild;
	const getParagrafElement = getDivElement.children
	
	useEffect(() => {
		let arrayCreatAt = []
		if(createAt !== undefined || createAt !== null || createAt !== ""){
			let copp = [...createAt];
			for(let i = 0; i < copp.length; i++){
				if(copp[i].match(/[a-zA-Z]/i)){
					break;
				}else{
					arrayCreatAt.push(copp[i])
				}
			}
		}
		setCreateBook(arrayCreatAt.join(""))
	},[createAt]);
	const handleMouse = () => {
		setShowInfo(!showInfo)
	}
	
	return (
		<>
			<div className="book">
				<div className="ct-img" onMouseLeave={handleMouse} onMouseEnter={handleMouse}>
					<div className="chd-img">
						<div className={`inf-snp ${showInfo ? "show-inf" : "hide-inf"}`}>
							<div className="info-card">
								<div className="inf-shw">
									<h4 {...rest}>{title}</h4>
									<span>{`${author} / ${createBook}`}</span>
									<p>
										{
											sinop.length > 50 
											? Array.from(getParagrafElement)[0].textContent.slice(0, 300) + "..."
										
											: sinop
										}
									</p>
								</div>
							</div>
						</div>
						<CoverImage srcImage={img} altImage="Cover Buku" />
					</div>
                    <h4 className="txt-ttl"{...rest}>{title}</h4>
				</div>
			</div>
		</>
	)
}

export default ListBooks
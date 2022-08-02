import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Components
import { ArrowPrev, ArrowNext, SmallListBooks } from '../../../'
const RegSlide = ({dataBooks = [], titleGenre, id}) => {
	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		arrows:true,
		slidesToShow: 5,
		slidesToScroll: 2,
		prevArrow: <ArrowPrev />,
		nextArrow: <ArrowNext />,
		responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
		}
	return (
		<>

			<div className="hero-books">
				<h3 className="nm-bk-typ">{titleGenre}</h3>
				<Slider {...settings} >
					
						{
							dataBooks.length !== 0
							? dataBooks.map((data, index) => {
								return( <div id={`${id}-${index}`} className="slide-show" key={data.idbook}><Link className="nav-link" to={`/sinopsis/${data.idbook}/${data.title.split(" ").join("-")}`}><SmallListBooks  authorBook={data.author} titleBook={data.title} srcc={data.cover} altt={`ini adalah cover dari gambar ${data.title}`}/></Link></div>)
							})
							: null
						}
					
				</Slider>
			</div>
		</>
	)
}
export default RegSlide
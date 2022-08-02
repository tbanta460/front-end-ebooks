import React from 'react';
import './index.css';

import { CoverImg } from '../..';
const SmallListBooks = ({titleBook, authorBook, srcc, altt}) => {
    return(
        <>
            <div className="ct-lst"> 
                <div className="prt-two">
                    <CoverImg srcImg={srcc} altImg={altt} sizeCover="smal-cv"/>
                    <div className="wrp">
                        <h4 className="txt-ttl">{titleBook}</h4>
                        <span className='txt-ath'>{authorBook}</span>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SmallListBooks
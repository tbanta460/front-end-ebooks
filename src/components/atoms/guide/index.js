import React from 'react';
import './index.css';

import { InfOne, InfTwo, InfThree } from '../../../assets';

const InfoGuide = () => {
    const imgArr = [
        {
            img:InfOne,
            ttl: "Menjadi Penulis",
            txt: "Buat Buku Pertama Anda Dan Jadilah Penulis.",
            id: 12939
        },
        {
            img:InfTwo,
            ttl: "Koleksi Buku",
            txt: "Jelajahi Bermacam Buku Dan Temui Buku Favorit Anda.",
            id:21392
        },
        {
            img:InfThree,
            ttl: "Dapatkan Bayaran",
            txt: "Jual Buku Anda Dan Dapatkan Pembayaran Dari Hasil Jual Buku.",
            id:11923
        }
    ]
    return(
        <>
            <div className="inf-gid-ct">
                <div className="inf-gid-chd">
                    {imgArr.map(data => {
                        return(
                            <div key={data.id}className="wrp-gid">
                                <img src={data.img} alt="gambar abstrak background" className="img-gid"/>
                                <div className='wrp-txt-gid'>
                                    <h4 className="ttl-gid">{data.ttl}</h4>
                                    <span className="txt-gid">{data.txt}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default InfoGuide
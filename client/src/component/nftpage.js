import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './nftpage.css';

function NFTPage({}) {
    const onClick = () => {
            alert("입찰되었습니다");
        };
    const onKeyPress = (e) => {
            if(e.key == 'Enter') {
                onClick();
            } 
        }
    return (
        <div className="nftPageWrapper">
            <div className='nftPageContents'>
            <Link to="/" className="back">뒤로가기</Link>
                <div className="NFTTitle">오늘의 NFT</div>
                
                <div style={{color: "black", borderLeft: "0.8vw solid #553742", backgroundColor: "rgb(179, 219, 219)"}}></div>
                <div className='nftWrapper'>
                    <span className="card">
                        <div className="cardImgDiv">
                            <img className="cardImg" src={"https://img.freepik.com/free-vector/isometric-cryptocurrency-concept-with-bitcoins-people-mining-3d-vector-illustration_1284-29932.jpg?size=626&ext=jpg"} alt="test"/>
                        </div>
                    </span>
                </div>
                <div className='nftBid'>
                    <div className='bidList'>
                        <div>작품명 : example</div>
                        <div>작가 : 미상</div>
                    </div>
                    <div>가격 : {`1000`}TOT</div>
                    <button className='bidButton'>NFT 구매하기</button>
                </div>
            </div>
        </div>
    )
}

export default NFTPage;
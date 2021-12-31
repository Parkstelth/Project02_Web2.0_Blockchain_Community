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
                        <div>입찰 진행 상황</div>
                        <div>zdvsx1 : 1000TOT</div>
                        <div>llove143 : 985TOT</div>
                        <div>vastine325 : 940TOT</div>
                        <div>strawbin222 : 935TOT</div>
                    </div>
                    <div>현재가격 : {`1000`}</div>
                    <div className='bidText'>
                        <div>입찰하기</div>                    
                        <div>다음 입찰까지:{`4초`}</div>
                    </div>

                    <input className='bidInput' onKeyPress={onKeyPress} placeholder='수량을 입력하세요'></input>
                    <button className='bidButton'>+1</button>
                    <button className='bidButton'>+5</button>
                    <button className='bidButton'>+10</button>
                    <button className='bidButton'>+50</button>
                    <button className='bidButton'>+100</button>
                </div>
            </div>
        </div>
    )
}

export default NFTPage;
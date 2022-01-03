import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './nftpage.css';

function NFTPage({nftprice, symbole, userName, password}) {

    const [message,setMessage] = useState('')
    const [tx,setTx] = useState('')

    const onClick = () => {
            alert("입찰되었습니다");
        };
    const onKeyPress = (e) => {
            if(e.key == 'Enter') {
                onClick();
            } 
        }

   async function buynft(){
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        
            const params = new URLSearchParams();
            params.append('userName',userName);
            params.append('password',password)
                await axios.post('http://localhost:3000/minterc721/buynft',params,{headers}).then((res)=>{
                    if(res.data.tx){
                        setTx(res.data.tx)
                        setMessage(res.data.message)
                    }
                    else{
                        setMessage(res.data.message)
                    }
                })
        
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
                            <img className="cardImg" src={"https://www.futurekorea.co.kr/news/photo/202104/145945_150512_1130.jpg"} alt="test"/>
                        </div>
                    </span>
                </div>
                <div className='nftBid'>
                    <div className='bidList'>
                        <div>입찰 진행 상황</div>
                        <div>zdvsx1 : 1000TOT</div>
                        <div>llove143 : 985TOT</div>
                    </div>
                    <div>현재가격 : {nftprice} {symbole}</div>
                    {/* <div className='bidText'>
                        <div>입찰하기</div>                    
                        <div>다음 입찰까지:{`4초`}</div>
                    </div>

                    <input className='bidInput' onKeyPress={onKeyPress} placeholder='수량을 입력하세요'></input>
                    <button className='bidButton'>+1</button>
                    <button className='bidButton'>+5</button>
                    <button className='bidButton'>+10</button>
                    <button className='bidButton'>+50</button>
                    <button className='bidButton'>+100</button> */}
                    {
                        userName!=='' && password!==''
                        ? <button className="topButton addoption" onClick={()=>buynft()}>구매 하기</button>
                        : <button disabled className="bidButton" onClick={()=>buynft()}>로그인이 필요합니다</button>
                    }
                        <div className="message">{message}</div>
                        <div className="message">{tx}</div>
                </div>
            </div>
        </div>
    )
}

export default NFTPage;
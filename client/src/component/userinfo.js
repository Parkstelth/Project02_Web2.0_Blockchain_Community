import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './userinfo.css';



function UserInfo({ mainUsername,mainPassword,myPageModal }) {
    const [presentBalance,setPresentBalance] = useState(0)
    const [to, setTo] = useState('')
    const [sendvalue, setSendvalue] = useState(0)
    const [message,setMessage] = useState('')
    const [symbole, setSymbole] = useState('')

    useEffect(()=>{
        get();
        getsymbol();
    },[])

    useEffect(()=>{
        get();
        getsymbol();
       
    },[symbole])

    const onCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            myPageModal();
        }
    }

    function changeto (e){
        setTo(e.target.value)
    }

    function changevalue (e){
        setSendvalue(e.target.value)
    }


    async function get(){ 
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',mainUsername);
        params.append('password',mainPassword)
            await axios.post('http://localhost:3000/userinfo/getbalance',params,{headers}).then((res)=>{
                setPresentBalance(res.data.balance)
            })
    }

    async function getsymbol(){ 
            await axios.get('http://localhost:3000/userinfo/getsymbol').then((res)=>{
                setSymbole(res.data.data)
            })
    }


    async function allowance(){ //테스트용
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',mainUsername);
        params.append('receiveName',to)
        params.append('amount',sendvalue)
            await axios.post('http://localhost:3000/userinfo/sendallowance',params,{headers}).then((res)=>{
                setMessage(res.data.message)
                get();
            })
    }

    return (
        <div className="wrapper" onClick={onCloseModal}>
            <div className="myPageDiv">마이페이지
            <button className="myPageBack" onClick={myPageModal}>뒤로가기</button>  
                <div className="myPageContents">
                    <div className="tokenCheck">
                        <div>보유 포인트 확인</div>
                        <div>{presentBalance} {symbole}</div>
                        <button className="button" onClick={()=>get()}>새로고침</button>
                        <div>보유 토큰 확인</div>
                        <button className="button" onClick={''}>새로고침</button>
                    </div>
                    <div className="tokenSendDiv">포인트 전송       
                        <input className="tokenSendInput" onChange={changeto} type="text" placeholder='받는 사람'></input>
                        <input className="tokenSendInput" onChange={changevalue} type="text" placeholder='수량'></input>
                        <div className="result">{message}</div>
                        <button className="button addoption" onClick={()=>allowance()}>포인트 보내기</button>  
                        <div>포인트를 토큰으로 전환</div>
                        <input className="tokenSendInput" onChange={''} type="text" placeholder='수량'></input>
                        <button className="button addoption" onClick={''}>토큰 보내기</button> 
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default UserInfo;
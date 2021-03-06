import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './userinfo.css';



function UserInfo({ mainUsername,mainPassword,myPageModal,symbole }) {
    const [presentBalance,setPresentBalance] = useState(0)
    const [presentMetaBalance,setPresentMetaBalance] = useState(0)
    const [to, setTo] = useState('')
    const [sendvalue, setSendvalue] = useState(0)
    const [sendvalue2, setSendvalue2] = useState(0)
    const [message,setMessage] = useState('')
    const [message2,setMessage2] = useState('')
    const [txmessage2,setTxmessage2] = useState('')
 

    useEffect(()=>{
        get();
        getmeta();
  
    },[])

    useEffect(()=>{
        get();
        getmeta();
   
       
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

    function changevalue2 (e){
        setSendvalue2(e.target.value)
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

    async function getmeta(){ 
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',mainUsername);
        params.append('password',mainPassword)
            await axios.post('http://localhost:3000/userinfo/getmetabalance',params,{headers}).then((res)=>{
                setPresentMetaBalance(res.data.balance)
             
            })
    }



    async function allowance(){ 
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
                getmeta();
            })
    }

    async function sendtometamask(){ 
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',mainUsername);
        params.append('password',mainPassword)
        params.append('amount',sendvalue2)
            await axios.post('http://localhost:3000/userinfo/sendtometamask',params,{headers}).then((res)=>{
               if(res.data.data){
                   setMessage2(res.data.message)
                   setTxmessage2(res.data.data.txHash)
                   get()
                   getmeta();
                
               }
               else{
               setMessage2(res.data.message)
               setTxmessage2('')
               get()
               getmeta();
               }
            })
    }

    return (
        <div className="wrapper" onClick={onCloseModal}>
            <div className="myPageDiv">???????????????
            <button className="myPageBack" onClick={myPageModal}>????????????</button>  
                <div className="myPageContents">
                    <div className="tokenCheck">
                        <div>?????? ????????? ??????</div>
                        <div>{presentBalance} {symbole}</div>
                        <button className="button" onClick={()=>get()}>????????????</button>
                        <div>?????? ?????? ??????</div>
                        <div>{presentMetaBalance} {symbole}</div>
                        <button className="button" onClick={()=>getmeta()}>????????????</button>
                    </div>
                    <div className="tokenSendDiv">????????? ??????       
                        <input className="tokenSendInput" onChange={changeto} type="text" placeholder='?????? ??????'></input>
                        <input className="tokenSendInput" onChange={changevalue} type="text" placeholder='??????'></input>
                        <div className="result">{message}</div>
                        <button className="button addoption" onClick={()=>allowance()}>????????? ?????????</button>  
                        <div>???????????? ???????????? ??????</div>
                        <input className="tokenSendInput" onChange={changevalue2} type="text" placeholder='??????'></input>
                        <div className="result">{message2}</div>
                        <div className="meta">tx : {txmessage2}</div>     
                        <button className="button addoption" onClick={()=>sendtometamask()}>?????? ?????????</button> 
                    </div>
                </div>
            </div>
         
        </div>
    );
}

export default UserInfo;
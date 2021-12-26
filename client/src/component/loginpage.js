import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './loginpage.css';

function LoginPage({setIsLogin, username, userpassword, isLogin, LoginClick}) {
    const [failLogin,setfailLoin] =useState(false);
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    
    function username(e){
        setUserName(e.target.value);
    }
    
    function passWord(e){
        setPassword(e.target.value);
    }

    const onCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            LoginClick();
        }
    }


    async function login(){

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',userName);
        params.append('password',password)
            await axios.post('http://localhost:3000/login',params,{headers}).then((res)=>{
                if(res.data.data) {
                    setIsLogin(true);
                    username(userName);
                    userpassword(password);
                    setfailLoin(false);
                    console.log(res);
                }
                else{
                    setfailLoin(true)
                }
            })
    }
    
    async function faucet(){
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',userName);
        params.append('password',password)
            await axios.post('http://localhost:3000/ethfaucet',params,{headers}).then((res)=>{
                console.log(res)
            })
    }
    
    async function deploy(){
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',userName);
        params.append('password',password)
            await axios.post('http://localhost:3000/deploy',params,{headers}).then((res)=>{
                console.log(res)
            })
    }

    return (
        <div className="wrapper" onClick={onCloseModal}>
            <div className="loginDiv">
                <div>로그인</div>
                <input className="loginInput" type='text' onChange={(e)=>username(e)} placeholder="ID"/>
                <input className="loginInput" type='text' onChange={(e)=>passWord(e)} placeholder="password"/>
                {
                isLogin 
                ? <button className="button" disabled onClick={()=>login()}>로그인</button>
                : <button className="button" onClick={()=>login()}>로그인</button>
                }

                <Link to="signup">
                    {
                    isLogin
                    ? <button className="button" disabled>회원가입</button>
                    : <button className="button">회원가입</button>
                    }
                </Link>

                <Link to="posting">
                    {
                    isLogin
                    ? <button className="button">글쓰기</button>
                    : <button disabled className="button">글쓰기</button>
                    }
                    
                </Link>
                
                {
                    isLogin
                    ? <><button className="button" onClick={()=>faucet()}>1ETH faucet Only Server</button>
                    <button className="button" onClick={()=>deploy()}>ERC20 Deploy Only Server</button></>
                    :<><button className="button" disabled onClick={()=>faucet()}>1ETH faucet Only Server</button>
                    <button className="button" disabled onClick={()=>deploy()}>ERC20 Deploy Only Server</button></>
                }

                <div>
                    {
                    failLogin
                    ? <div>아이디 또는 패스워드가 올바르지 않습니다.</div>
                    : null
                    }
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
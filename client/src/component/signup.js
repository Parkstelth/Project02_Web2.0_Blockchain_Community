import { Link } from 'react-router-dom';
import React, {useState} from "react";
import axios from 'axios';
import './signup.css';


function SignUp() {
    
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [exist,setExist] = useState('')
    
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*'
    }

    const params = new URLSearchParams();
    params.append('userName',userName);
    params.append('password',password)

    async function post(){
        await axios.post('http://localhost:3000/sign/user',params,{headers}).then((res)=>{
            console.log(res);
            if(res.data=="User exists"){
                setExist(true)
            }
            else{
                setExist(false)
            }
        })
    }

    return (
        <div className="signUpWrapper">
            <div className="text">signup</div>
            <input className="input" type='text' onChange={(e)=>setUserName(e.target.value)} placeholder="ID"/>
            <input className="input" type='password' onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            {
                exist===true
                ? <div className="addoption">이미 존재 하는 아이디입니다.</div>
                : null
            }
            {
                exist===false
                ?<div className="flex"> 
                <div className="addoption">계정 생성 완료!</div>
                <Link to='/'>
                <button className="return">HOME</button>
                </Link>
                </div>
                : null 
            }

            <div className="flex addoption">
            <button className="submit" onClick={()=>post()}>가입하기</button>
            </div>
        </div>
    )
}

export default SignUp;
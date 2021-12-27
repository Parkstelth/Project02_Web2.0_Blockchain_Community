import { Link } from 'react-router-dom';
import React, {useState} from "react";
import axios from 'axios';
import './signup.css';


function SignUp() {
    
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    
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
        })
    }

    return (
        <div className="signUpWrapper">
            <div className="text">signup</div>
            <input className="input" type='text' onChange={(e)=>setUserName(e.target.value)} placeholder="ID"/>
            <input className="input" type='text' onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <Link to="/">
            <button className="submit" onClick={()=>post()}>가입하기</button>
            </Link>
        </div>
    )
}

export default SignUp;
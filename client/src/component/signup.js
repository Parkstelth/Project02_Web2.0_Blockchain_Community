import React, {useState,useEffect} from "react";
import axios from 'axios'


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
            console.log(res)
        })
    }

    return (
        <>
            <div>signup</div>
            <input type='text' onChange={(e)=>setUserName(e.target.value)} placeholder="ID"/>
            <input type='text' onChange={(e)=>setPassword(e.target.value)} placeholder="password"/>
            <button onClick={()=>post()}>submit</button>
        </>
    )
}

export default SignUp;
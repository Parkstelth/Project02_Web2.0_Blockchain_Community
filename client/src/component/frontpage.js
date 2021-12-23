import { Link } from 'react-router-dom';
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import './frontpage.css'


function FrontPage({postlogin,postname}) {

 const [isLogin,setIsLogin] = useState(false)
 const [failLogin,setfailLoin] =useState(false);
 const [postlist, setPostlist] = useState([])
 const [userName,setUserName] = useState('')
 const [password,setPassword] = useState('')

    useEffect(()=>{
    setpost()

    },[])

function username(e){
    setUserName(e.target.value)
}

function passWord(e){
    setPassword(e.target.value)
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
            if(res.data.data){
            setIsLogin(true);
            postlogin(true)
            postname(userName)
            setfailLoin(false)
            
            }
            else{
                setfailLoin(true)
            }
        })
}

 function setpost(){
    axios.get('http://localhost:3000/loadpost').then((res)=>{
        setPostlist(res.data)
    })
}



    return (
        <div>

            <div>front page</div>
            <div>Login</div>
            <input type='text' onChange={(e)=>username(e)} placeholder="ID"/>
            <input type='text' onChange={(e)=>passWord(e)} placeholder="password"/>
            {isLogin 
            ? <button disabled onClick={()=>login()}>submit</button>
            : <button onClick={()=>login()}>submit</button>
            }

            <Link to="posting">
                <button>posting</button>
            </Link>
            <Link to="signup">
                {isLogin
                ? <button disabled>signup</button>
                : <button>signup</button>
                }
            </Link>
                <div>
                    {failLogin
                    ? <div>아이디 또는 패스워드가 올바르지 않습니다.</div>
                    : null
                    }
                </div>
                <div className="flexbox addOption">
                <div className="name"><strong>userName</strong></div>
                <div className="time"><strong>Date</strong></div>
                <div className="text"><strong>Text</strong></div>
                </div>
                {
                    postlist.map((post)=>{
                        return(
                        <div className="flexbox addOption" key={post.id}>
                        <div className="name">{post.userName}</div>
                        <div className="time">{post.createdAt}</div>
                        <div className="text">{post.text}</div>
                        </div>
                    )
                    })
                }
        </div>
    );
}

export default FrontPage;
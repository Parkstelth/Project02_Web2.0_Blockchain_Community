import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './posting.css';


function Posting({ postlogin, postname, postpassword }) {
    
    const [text,setText] = useState('')
    const [message, setMessage] = useState('')

    async function save(){
        if(text==='' || text===undefined || text===null){
            setMessage('제목 또는 내용이 없습니다.')
        }
        else{
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        
            const params = new URLSearchParams();
            params.append('userName',postname);
            params.append('text',text)
    
            const params2 = new URLSearchParams();
            params2.append('userName',postname);
            params2.append('password',postpassword)

                await axios.post('http://localhost:3000/posting',params,{headers}).then(async (res)=>{
                setMessage(res.data.data)
                await axios.post('http://localhost:3000/servetoken',params2,{headers}).then((result)=>{
                    console.log(result)
                    })
                })
        }
    }

    return (
        <div className="postWrapper">
            <div className="postContents">  
                <Link to="/" style={{color: "white", fontSize: "2vh"}}>뒤로가기</Link>
                <div className="postText">유저이름 : {postname}</div>
                <textarea className="postTitle" onChange={null} placeholder="제목"></textarea>
                <textarea className="postArticle" onChange={(e)=>setText(e.target.value)} placeholder="내용을 적어주세요"></textarea>
                <div className="postText">RESULT : {message}</div>
                {postlogin
                ? <button className="postSend" onClick={()=>save()}>send</button>
                : <button className="postSend"disabled>로그인이 필요합니다.</button>
                }
            </div>
        </div>
    )
}

export default Posting;
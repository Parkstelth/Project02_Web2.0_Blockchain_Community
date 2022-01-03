import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './posting.css';


function Posting({ postlogin, postname, postpassword }) {
    
    const [text,setText] = useState('')
    const [postclass,setPostclass] = useState('defaultvalue')
    const [posttitle,setPostitle] = useState('')
    const [message, setMessage] = useState('')

    function combobox (e){
        setPostclass(e.target.value)
    }

    function title (e){
        setPostitle(e.target.value)
    }

    async function save(){
        if(text==='' || text===undefined || text===null || posttitle==='' || posttitle===undefined || posttitle===null || postclass==='defaultvalue'){
            setMessage('게시판선택 & 제목 & 내용을 입력해주세요')
        }
        else{
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            }
        
            const params = new URLSearchParams();
            params.append('userName',postname);
            params.append('text',text)
            params.append('class',postclass)
            params.append('title',posttitle)
    
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
                <form>
                    <select onChange={(e)=>combobox(e)} name="language" >
                        <option value="defaultvalue">-게시판-</option>
                        <option value="0">블록체인 게시판</option>
                        <option value="1">코인 게시판</option>
                        <option value="2">컴퓨터 게시판</option>
                        <option value="3">음악 게시판</option>
                        <option value="4">깔깔유머 게시판</option>
                        <option value="5">게임 게시판</option>
                    </select>
                </form>
                <textarea className="postTitle" onChange={(e)=>title(e)} placeholder="제목"></textarea>
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
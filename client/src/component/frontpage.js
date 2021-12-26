import React, {useState,useEffect} from 'react'
import axios from 'axios';
import './frontpage.css'
import LoginPage from './loginpage';


function FrontPage() {
 
 const [postlist, setPostlist] = useState([]);
 const [loginClick, setLoginClick] = useState(false);

    useEffect(()=>{
        setpost()
    },[])


function LoginClick() {
    setLoginClick(!loginClick);
}

function setpost(){
    axios.get('http://localhost:3000/loadpost').then((res)=>{
        setPostlist(res.data)
    })
}

    return (
        <>
        {
        loginClick
        ?<>
        <LoginPage LoginClick={LoginClick} />
        <div className = "background">

            <div className = "siteTop">
                <img className="siteLogo" src='https://cdn-icons-png.flaticon.com/512/4729/4729674.png'></img>
                <div className="siteName">BlockIn</div>
                <button className="topLogin" onClick={LoginClick}>로그인</button>
            </div>

            <div className="contentDiv">
            <div className="forum">
                <div className="title"><strong>인기 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
            <div className="forum">
                <div className="title"><strong>블록체인 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
            <div className="forum">
                <div className="title"><strong>코인 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
            <div className="forum">
                <div className="title"><strong>컴퓨터과학 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
            </div>
        </div>
        </>
        :<div className = "background">

        <div className = "siteTop">
            <img className="siteLogo" src='https://cdn-icons-png.flaticon.com/512/4729/4729674.png'></img>
            <div className="siteName">BlockIn</div>
            <button className="topLogin" onClick={LoginClick}>로그인</button>
        </div>

        <div className="contentDiv">
            <div className="forum">
                <div className="title"><strong>인기 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
            <div className="forum">
                <div className="title"><strong>블록체인 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
            <div className="forum">
                <div className="title"><strong>코인 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
            <div className="forum">
                <div className="title"><strong>컴퓨터과학 게시판</strong></div>
                {
                    postlist.map((post)=>{
                        return(
                            <div className="post">{post.text}</div>
                        )
                    })
                }
            </div>
        </div>
        
    </div>
        }
        </>
    );
}

export default FrontPage;
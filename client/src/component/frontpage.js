import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './frontpage.css';
import LoginPage from './loginpage';
import NFTPage from './nftpage';
import UserInfo from './userinfo';


function FrontPage({ loginClick, loginModal, myPageClick, myPageModal, setIsLogin, appusername, userpassword, isLogin, mainUsername, mainPassword, setPostid, symbole }) {

    const [postlist, setPostlist] = useState([]);
//

    useEffect(()=>{
        setpost()
    },[])

    function setpost(){
        axios.get('http://localhost:3000/loadpost').then((res)=>{
            setPostlist(res.data)
        })
    }


    return (
        <>
        {loginClick 
        ? <LoginPage loginModal={loginModal} setIsLogin={setIsLogin} appusername={appusername} userpassword={userpassword} isLogin={isLogin} mainUsername={mainUsername} mainPassword={mainPassword}/>
        : ''}
        {myPageClick
        ? <UserInfo myPageModal={myPageModal} setIsLogin={setIsLogin} appusername={appusername} userpassword={userpassword} isLogin={isLogin} mainUsername={mainUsername} mainPassword={mainPassword} symbole={symbole}/>
        : ''}
        <div className = "background">

            <div className = "siteTop">
                <img className="siteLogo" src='https://cdn-icons-png.flaticon.com/512/4729/4729674.png'></img>
                <div className="siteName">BlockIn</div>
                {
                isLogin
                ? <Link to="posting" onClick={loginModal}><button className="topButton">글쓰기</button></Link>
                : <button style={{visibility: "hidden"}} className="topButton">글쓰기</button>
                }
                <Link to='NFTPage'>
                    {
                    !isLogin
                    ? <button className="topLogin">NFT</button>
                    : <button className="topLogin">NFT</button>
                    }
                </Link>
                {!isLogin
                ? <button className="topLogin" onClick={loginModal}>로그인</button>
                : <button className="topLogin" onClick={myPageModal}>마이페이지</button>}   
                </div>

            <div className="contentDiv">

            <div className="forum1">
                <div className="title1"><strong>인기 게시판</strong>
                <div className="post">준비 중 입니다</div>
                </div>
                    
                <div className="title"><strong>블록체인 게시판</strong>
                {
                    postlist.map((post)=>{
                        if(post.class==='blockchain'){
                            return(
                                <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                            )
                        }

                    })
                }
                </div>
  
            </div>

            <div className="forum2">
                <div className="title1"><strong>코인 게시판</strong>
                {
                    postlist.map((post)=>{
                        if(post.class==='coin'){
                        return(
                            <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                        )
                        }
                    })
                }
                </div>

                <div className="title"><strong>자유 게시판</strong>
                {
                    postlist.map((post)=>{
                        if(post.class==='free'){
                        return(
                            <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                        )
                        }
                    })
                }
                </div>

            </div>
            <div className='footer'></div>
            </div>
        </div>
        </>
    );
}

export default FrontPage;
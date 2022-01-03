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

    const listdivide = (num) => { 
        const mylist = postlist.filter((post) => {
            return post.class == num;
        })
        if(mylist.length > 10) {
            return mylist.slice(-10); 
        } else {
            return mylist;
        }
    }


    console.log(postlist);
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
                ? <Link to="posting" onClick={loginModal} className="addoption"><button className="topButton">글쓰기</button></Link>
                : <button style={{visibility: "hidden"}} className="topButton addoption">글쓰기</button>
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
                <div className="forum">
                    <div className="title"><strong>블록체인 게시판</strong>
                        {
                            listdivide(0).map((post)=>{
                                return(
                                    <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="forum">
                    <div className="title"><strong>코인 게시판</strong>
                        {
                            listdivide(1).map((post)=>{
                                return(
                                    <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="forum">
                    <div className="title"><strong>컴퓨터 게시판</strong>
                        {
                            listdivide(2).map((post)=>{
                                return(
                                    <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="forum">
                    <div className="title"><strong>음악 게시판</strong>
                        {
                            listdivide(3).map((post)=>{
                                return(
                                    <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="forum">
                    <div className="title"><strong>깔깔유머 게시판</strong>
                        {
                            listdivide(4).map((post)=>{
                                return(
                                    <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="forum">
                    <div className="title"><strong>게임 게시판</strong>
                        {
                            listdivide(5).map((post)=>{
                                return(
                                    <Link to={'/'+ post.id} onClick={()=>setPostid(post.id)} key={post.id}><div className="post">{post.title}</div></Link>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
            <div className='footer'></div>
            
        </div>
        </>
    );
}

export default FrontPage;
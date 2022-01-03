import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from './component/frontpage';
import PostPage from './component/postpage';
import Posting from './component/posting';
import SignUp from './component/signup';
import NFTPage from './component/nftpage';
import NotFound from './component/notfound';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

    const [isLogin, setIsLogin] = useState(false);
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [loginClick, setLoginClick] = useState(false);
    const [myPageClick, setMyPageClick] = useState(false);
    const [postid, setPostid] = useState('');
    const [nowPosting, setNowPosting]= useState([])
    const [nftprice, setNftprice]= useState(0)
    const [symbole, setSymbole] = useState('')

    useEffect(()=>{
        loadPosting();
    },[postid])

    useEffect(()=>{
       getNFTprice();
       getsymbol();
    },[])


    function loginModal() {
        setLoginClick(!loginClick);
    }

    function myPageModal() {
        setMyPageClick(!myPageClick);
    }

    async function loadPosting(){
     
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
        const params = new URLSearchParams();
        params.append('id',postid);
            await axios.post('http://localhost:3000/loadpost/posting',params,{headers}).then((res)=>{
              setNowPosting(res.data)
            })
    
    }

    function getNFTprice(){
            axios.get('http://localhost:3000/mintERC721/getnftprice').then((res)=>{
                setNftprice(res.data.price)
            })
    
    }


    async function getsymbol(){ 
        await axios.get('http://localhost:3000/userinfo/getsymbol').then((res)=>{
            setSymbole(res.data.data)
        })
}

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage loginClick={loginClick} loginModal={loginModal} setLoginClick={setLoginClick} myPageClick={myPageClick} myPageModal={myPageModal}
                    setIsLogin={setIsLogin} appusername={setUserName} userpassword={setPassword} isLogin={isLogin}
                    mainUsername={userName} mainPassword={password} setPostid={setPostid} symbole={symbole}
                    />}/>
                    <Route path='/:id' element={<PostPage nowPosting={nowPosting}/>}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/posting' element={<Posting postlogin={isLogin} postname={userName} postpassword={password}/>}/>
                    <Route path="/nftpage" element={<NFTPage nftprice={nftprice} symbole={symbole} userName={userName} password={password}/>}/>
                    <Route path="/*" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from './component/frontpage';
import Posting from './component/posting';
import SignUp from './component/signup';
import NotFound from './component/notfound'
import React, { useState, useEffect } from 'react'

function App() {

    const [isLogin, setIsLogin] = useState(false);
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [loginClick, setLoginClick] = useState(false);
    const [myPageClick, setMyPageClick] = useState(false);

    function loginModal() {
        setLoginClick(!loginClick);
    }

    function myPageModal() {
        setMyPageClick(!myPageClick);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage loginClick={loginClick} loginModal={loginModal} setLoginClick={setLoginClick} myPageClick={myPageClick} myPageModal={myPageModal}
                    setIsLogin={setIsLogin} appusername={setUserName} userpassword={setPassword} isLogin={isLogin}
                    mainUsername={userName} mainPassword={password} 
                    />}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/posting' element={<Posting postlogin={isLogin} postname={userName} postpassword={password}/>}/>
                    <Route path="/*" element={<NotFound />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
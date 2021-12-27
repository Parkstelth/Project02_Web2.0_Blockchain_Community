
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
    
    function change(){
        setLoginClick(!loginClick)
    }

    return (

        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage loginClick={loginClick} change={change}
                    setIsLogin={setIsLogin} appusername={setUserName} userpassword={setPassword} isLogin={isLogin} LoginClick={change}
                    />}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/posting' element={<Posting postlogin={isLogin} postname={userName} postpassword={password}/>}/>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
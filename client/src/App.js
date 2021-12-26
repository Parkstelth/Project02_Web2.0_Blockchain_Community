
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from './component/frontpage';
import LoginPage from './component/loginpage';
import Posting from './component/posting';
import SignUp from './component/signup';
import NotFound from './component/notfound'
import React, { useState, useEffect } from 'react'

function App() {


    const [isLogin, setIsLogin] = useState(false);
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    

    return (

        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<FrontPage />}/>
                    <Route path='/login' element={<LoginPage setIsLogin={setIsLogin} username={setUserName} userpassword={setPassword} isLogin={isLogin}/>}/>
                    <Route path='/signup' element={<SignUp />}/>
                    <Route path='/posting' element={<Posting postlogin={isLogin} postname={userName} postpassword={password}/>}/>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
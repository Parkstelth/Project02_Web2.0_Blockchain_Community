import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from './component/frontpage';
import Posting from './component/posting';
import SignUp from './component/signup';
import NotFound from './component/notfound'
import React, {useEffect, useState} from 'react'

function App() {


    const [isLogin, setIsLogin] = useState(false)
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<FrontPage isLogin={isLogin} presentuserName={userName} presentpassword={password} 
                postlogin={setIsLogin} postname={setUserName} postpassword={setPassword}/>}/>
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/posting' element={<Posting postlogin={isLogin} postname={userName} postpassword={password}/>}/>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPage from './component/frontpage';
import Posting from './component/posting';
import SignUp from './component/signup';
import NotFound from './component/notfound'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<FrontPage />}/>
                <Route path='/signup' element={<SignUp />}/>
                <Route path='/posting' element={<Posting />}/>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

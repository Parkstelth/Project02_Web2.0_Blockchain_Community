import React, {useState} from 'react'
import axios from 'axios';


function Posting({postlogin,postname,postpassword}) {
    
    const [text,setText] = useState('')
    const [message, setMessage] = useState('')

    async function save(){
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    
        const params = new URLSearchParams();
        params.append('userName',postname);
        params.append('text',text)

        const params2 = new URLSearchParams();
        params2.append('userName',postname);
        params2.append('password',postpassword)

            await axios.post('http://localhost:3000/posting',params,{headers}).then(async (res)=>{
            setMessage(res.data.data)
            await axios.post('http://localhost:3000/serveToken',params2,{headers}).then((result)=>{
            console.log(result)
            })
            })
    }

    return (
        <>  
            <div>유저이름 : {postname}</div>
            <textarea onChange={(e)=>setText(e.target.value)} placeholder="내용을 적어주세요"></textarea>
            <div>RESULT : {message}</div>
            {postlogin
            ? <button onClick={()=>save()}>send</button>
            : <button disabled>로그인이 필요합니다.</button>
            }
        </>
    )
}

export default Posting;
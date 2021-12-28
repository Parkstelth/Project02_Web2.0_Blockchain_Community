import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './userinfo.css';

function UserInfo({ myPageModal }) {
    const onCloseModal = (e) => {
        if (e.target === e.currentTarget) {
            myPageModal();
        }
    }
    return (
        <div className="wrapper" onClick={onCloseModal}>
            <div className="myPageDiv">마이페이지
            <button className="myPageBack" onClick={myPageModal}>뒤로가기</button>  
                <div className="myPageContents">
                    <div className="tokenCheck">
                        <div>보유 토큰 확인</div>
                        <div>1000</div>
                        <button className="userInfoButton" onClick={''}>새로고침</button>
                    </div>
                    <div className="tokenSendDiv">토큰 보내기        
                        <input className="tokenSendInput" type="text" placeholder='보내는 사람'></input>
                        <input className="tokenSendInput" type="text" placeholder='수량'></input>
                        <button className="userInfoButton" onClick={''}>토큰 보내기</button>              
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default UserInfo;
import './postpage.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostPage({nowPosting}) {

    return (
        <div className="postWrapper">
            <div className="postContents addoption">  
                <div className="postText">{nowPosting.class}</div>
                <div className="textarea">
                <div className="postTitle addoption">{`< 제 목 >`} {nowPosting.title}</div>
                <div className="postArticle addoption">{nowPosting.text}</div>
                </div>
                <Link to="/" className="to">뒤로가기</Link>

            </div>
        </div>
    
    );
}

export default PostPage;
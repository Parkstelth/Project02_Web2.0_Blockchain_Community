import './postpage.css';
import { Link } from 'react-router-dom';

function PostPage({nowPosting}) {

    return (
        <div className="thispostWrapper">
            <div className="thispostContents">  
                <Link to="/" className="back">뒤로가기</Link>
                <div className="thispostTitle ">{'' + nowPosting.title}</div>
                <div className="thispostInfo">
                    <div className="thispostName">{'작성자 : ' + nowPosting.userName}</div>
                    <div className="thispostTime">{'작성시간 : ' + nowPosting.updatedAt}</div>
                </div>
                <div className="thispostText">{'' + nowPosting.text}</div>
            </div>
        </div>
    
    );
}

export default PostPage;
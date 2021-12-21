import { Link } from 'react-router-dom';

function FrontPage() {
    return (
        <div>
            <div>front page</div>
            <Link to="posting">
                <button>posting</button>
            </Link>
            <Link to="signup">
                <button>signup</button>
            </Link>
        </div>
    );
}

export default FrontPage;
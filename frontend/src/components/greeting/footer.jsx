import React from 'react';

import './footer.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className = 'links'>
                    <i className="fab fa-github-alt"></i>
                    <div className="linked-in" >
                        <i className="fab fa-linkedin"></i>
                        <a href="https://www.linkedin.com/in/patrick-wang-8943a958/">Patrick Wang</a>
                        <a href="https://www.linkedin.com/in/valerie-sui/">Valerie Sui</a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
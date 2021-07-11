import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <article className="footer__copyright">© {new Date().getFullYear()} Mesto Russia</article>
        </footer>
    );
}

export default Footer;
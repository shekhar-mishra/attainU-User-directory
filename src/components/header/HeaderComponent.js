import attainLogo from '../../images/attainU-logo.png'

function Header() {
    return (
        <div className="header">
            <nav className="navbar navbar-expand-sm  navbar-dark attainU-bg">
            <img src={attainLogo} width="35px" height="35px" />
                <a className="navbar-brand attainU-text" href="#">AttainU</a>
            </nav>
        </div>
    );
}

export default Header;

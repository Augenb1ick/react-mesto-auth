import headerLogo from "../images/logo.svg";
import { Route, Routes, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__contaner">
        <img className="header__logo" src={headerLogo} alt="лого" />
        <div className="header__link-contaner">
          <p className="header__email">{props.userEmail}</p>
          <Routes>
            <Route
              path="/"
              element={
                <Link
                  to="/sign-in"
                  onClick={props.onSignOut}
                  className="header__link"
                >
                  Выйти
                </Link>
              }
            ></Route>
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              }
            ></Route>
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </header>
  );
}

export default Header;

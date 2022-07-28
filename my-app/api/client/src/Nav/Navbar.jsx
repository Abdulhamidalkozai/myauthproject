import "../Nav/navbar.css"
import { useState, useContext } from "react";
import { Context } from "../context/Context";

export default function Navbar() {
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {

    dispatch({ type: "LOGIN_LOGOUT" });

  }



  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        {user ? <p>Howdy!  &nbsp;{user.data.userName}</p> : <p></p>}
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}

      >
        {<svg viewBox="0 0 100 80" width="30" height="30">
          <rect width="100" height="20" rx="8"></rect>
          <rect y="30" width="100" height="20" rx="8"></rect>
          <rect y="60" width="100" height="20" rx="8"></rect>
        </svg>}
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          {user ? <li>
            <a href="/home">HOME</a>
          </li> : <p></p>}

          {user ? <li>
            <a href="" onClick={handleLogout}>LOGOUT</a>
          </li> : <p></p>}

        </ul>
      </div>
    </nav>
  );
}
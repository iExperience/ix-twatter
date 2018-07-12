import * as React from "react"
import { Link } from "react-router-dom"
import "./navigation.css"

interface Props {
  history: any
}

class Navigation extends React.Component<Props> {
  handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.props.history.push("/login")
  }

  render() {
    const isLoggedIn = localStorage.getItem("token")
    const rawUser = localStorage.getItem("user")
    const user = rawUser && JSON.parse(rawUser)
    return (
      <div className="navigation">
        <div className="nav-actions">
          <span style={{ marginRight: "15px" }}>
            <Link to="/">FEED</Link>
          </span>

          {isLoggedIn && <button onClick={this.handleLogout}>LOGOUT</button>}
          {!isLoggedIn && <Link to="/login">LOGIN</Link>}
        </div>

        {user && (
          <div className="user-info">
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        )}

        {user && (
          <div className="user-profile">
            <Link to={`${user.username}`}>ME PROFILE!</Link>
          </div>
        )}
      </div>
    )
  }
}

export default Navigation

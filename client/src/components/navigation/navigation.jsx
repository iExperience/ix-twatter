import * as React from "react"
import { Link } from "react-router-dom"
import "./navigation.css"

class Navigation extends React.Component {
  onLogout = () => {
    localStorage.removeItem("token")
    this.props.history.push("/login")
  }

  render() {
    const token = localStorage.getItem("token")
    return (
      <div className="navigation">
        <div>
          <Link to="/">HOMEPAGE</Link>
        </div>

        <Link to="/myprofile">My Profile Page</Link>

        <div>
          {token ? (
            <button onClick={this.onLogout}> logout</button>
          ) : (
            <Link to="/login">login</Link>
          )}
        </div>
        {token ? null : <Link to="/signup">signup</Link>}
      </div>
    )
  }
}

export default Navigation

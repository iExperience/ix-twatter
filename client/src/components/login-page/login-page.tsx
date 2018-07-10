import * as React from "react"
import Navigation from "../navigation/navigation"
import "./login-page.css"

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="login-form" />
      </div>
    )
  }
}

export default LoginPage

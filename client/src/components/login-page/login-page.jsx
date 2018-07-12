import * as React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Navigation from "../navigation/navigation"
import "./login-page.css"

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        username
      }
    }
  }
`

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <Mutation mutation={LOGIN}>
          {login => {
            return (
              <div className="login-form">
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    try {
                      const { data } = await login({
                        variables: {
                          email: this.state.email,
                          password: this.state.password
                        }
                      })
                      localStorage.setItem("token", data.login.token)
                      localStorage.setItem(
                        "user",
                        JSON.stringify(data.login.user)
                      )
                      this.props.history.push(`/${data.login.user.username}`)
                    } catch (error) {
                      localStorage.removeItem("token")
                      localStorage.removeItem("user")
                    }
                  }}
                >
                  <input
                    placeholder="email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <button type="submit">LOGIN!</button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default LoginPage

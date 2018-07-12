import * as React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Navigation from "../navigation/navigation"

const SIGNUP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $name: String!
    $username: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      username: $username
    ) {
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

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    username: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <Mutation mutation={SIGNUP}>
          {signup => {
            return (
              <div className="login-form">
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    try {
                      const { data } = await signup({
                        variables: {
                          email: this.state.email,
                          password: this.state.password,
                          name: this.state.name,
                          username: this.state.username
                        }
                      })
                      localStorage.setItem("token", data.signup.token)
                      localStorage.setItem(
                        "user",
                        JSON.stringify(data.signup.user)
                      )
                      this.props.history.push(`/${data.signup.user.username}`)
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

                  <input
                    placeholder="name"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="username"
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                  <button type="submit">SIGNUP!</button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default SignUp

import * as React from "react"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import Navigation from "../navigation/navigation"

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    name: ""
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
                          name: this.state.name
                        }
                      })
                      localStorage.setItem("token", data.signup.token)
                      this.props.history.push(`/myprofile`)
                    } catch (error) {
                      localStorage.removeItem("token")
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

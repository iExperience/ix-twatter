import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Navigation from "../navigation/navigation"
import Tweet from "../tweet/tweet"

const GET_MY_PROFILE = gql`
  query getMyProfile {
        me {
            id
            name
            email
            tweets {
                id
                text
            
            }
        }
    }
  }
`

class MyProfile extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="profile-page">
          <h1>THIS IS THE PROFILE PAGE {this.props.match.params.username}</h1>

          <Query query={GET_MY_PROFILE}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "LOading..."
              }

              if (error) {
                return "OOps, somehing blew up."
              }

              return (
                <div>
                  {data.me.tweets.map(tweet => {
                    return (
                      <Tweet
                        key={tweet.id}
                        text={tweet.text}
                        author={tweet.author}
                      />
                    )
                  })}
                </div>
              )
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default MyProfile

import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Navigation from "../navigation/navigation"
import Tweet from "../tweet/tweet"

const GET_TWEETS = gql`
  query getTweets {
    me {
      tweets {
        id
        text
        author {
          id
          name
        }
      }
    }
  }
`

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <div className="profile-page">
          <h1>THIS IS THE PROFILE PAGE {this.props.match.params.username}</h1>

          <Query query={GET_TWEETS}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "LOading..."
              }
              if (error && error.message === "GraphQL error: Not authorized") {
                return (
                  <div>
                    <div>You are not authorized here!</div>
                    <img src="http://www.icge.co.uk/languagesciencesblog/wp-content/uploads/2014/04/you_shall_not_pass1.jpg" />
                  </div>
                )
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

export default ProfilePage

import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Navigation from "../navigation/navigation"
import Tweet from "../tweet/tweet"

const GET_TWEETS = gql`
  query getTweets($where: TweetWhereInput) {
    tweets(orderBy: createdAt_DESC, where: $where) {
      id
      text
      author {
        id
        name
      }
    }
  }
`

class ProfilePage extends React.Component {
  render() {
    console.log({
      username: this.props.match.params
    })
    return (
      <div>
        <Navigation />
        <div className="profile-page">
          <h1>THIS IS THE PROFILE PAGE {this.props.match.params.username}</h1>

          <Query 
          variables={{
            where: {
              author: {
                email: this.props.match.params.username
              }
            }
          }}
          query={GET_TWEETS}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return "LOading..."
              }

              if (error) {
                return "OOps, somehing blew up."
              }

              return (
                <div>
                  {data.tweets.map(tweet => {
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

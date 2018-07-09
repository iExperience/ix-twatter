import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"

const GET_TWEETS = gql`
  query {
    tweets {
      id
      text
      author {
        id
        name
      }
    }
  }
`

// interface Data {
//   tweets: Array<Tweet>
// }

// interface Tweet {
//   id: string
//   text: string
//   author: User
// }

// interface User {
//   id: string
//   name: string
//   email: string
// }

class Feed extends React.Component {
  render() {
    return (
      <div>
        <Query query={GET_TWEETS}>
          {({ loading, error, data }) => {
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
                    <div>
                      {tweet.text}
                      <div className="tweet-author">{tweet.author.name}</div>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default Feed

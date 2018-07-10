import * as React from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import CreateTweetForm from "../create-tweet-form/create-tweet-form"
import Tweet from "../tweet/tweet"

const GET_TWEETS = gql`
  query {
    tweets(orderBy: createdAt_DESC) {
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
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return "LOading..."
            }

            if (error) {
              return "OOps, somehing blew up."
            }

            return (
              <div>
                <CreateTweetForm refetchFeedTweets={refetch} />

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
    )
  }
}

export default Feed

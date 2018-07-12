import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

const CREATE_TWEET = gql`
  mutation createTweet($data: TweetCreateInput!) {
    createTweet(data: $data) {
      text
    }
  }
`

class CreateTweetForm extends React.Component {
  render() {
    let input
    const raw_user = localStorage.getItem("user")
    const user = JSON.parse(raw_user)
    return (
      <div>
        <Mutation mutation={CREATE_TWEET}>
          {(createTweet, { data }) => {
            return (
              <div>
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    await createTweet({
                      variables: {
                        data: {
                          author: {
                            connect: {
                              email: user.email
                            }
                          },
                          text: input.value
                        }
                      }
                    })
                    this.props.refetchFeedTweets()
                    input.value = ""
                  }}
                >
                  <input
                    ref={node => {
                      input = node
                    }}
                  />
                  <button type="submit">Tweet!</button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default CreateTweetForm

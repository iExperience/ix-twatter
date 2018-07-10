import * as React from "react"

interface Props {
  text: string
  id: string
  author: User
}
interface User {
  id: string
  name: string
  email: string
}

class Tweet extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.text}
        <div className="tweet-author">{this.props.author.name}</div>
      </div>
    )
  }
}

export default Tweet

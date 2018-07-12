import * as React from "react"
import Navigation from "../navigation/navigation"
import Feed from "../feed"

interface Props {
  history: any
}

class HomePage extends React.Component<Props> {
  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <Feed />
      </div>
    )
  }
}

export default HomePage

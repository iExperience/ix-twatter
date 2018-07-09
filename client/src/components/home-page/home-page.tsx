import * as React from "react"
import Navigation from "../navigation/navigation"
import Feed from "../feed"

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <Feed />
      </div>
    )
  }
}

export default HomePage

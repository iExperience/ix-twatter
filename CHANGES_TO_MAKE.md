# Changes to make before you continue your workshop.

1.
inside your `/client` folder, change `name` in package.json from "ix-twatter-front" to "ix-tweeter-front".

2.
Completely replace the contents of `tslint.json` with the following:
```json
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "linterOptions": {
    "exclude": ["config/**/*.js", "node_modules/**/*.ts"]
  },
  "rules": {
    "ordered-imports": false,
    "object-literal-sort-keys": false,
    "member-access": false,
    "interface-name": [true, "never-prefix"],
    "align": [true, "parameters", "statements"],
    "ban": false,
    "class-name": true,
    "comment-format": [true, "check-space"],
    "curly": true,
    "eofline": false,
    "forin": true,
    "indent": [true, "spaces"],
    "jsdoc-format": true,
    "jsx-no-lambda": false,
    "jsx-no-multiline-js": false,
    "jsx-wrap-multiline": false,
    "label-position": true,
    "max-line-length": [true, 120],
    "member-ordering": [
      true,
      "public-before-private",
      "static-before-instance",
      "variables-before-functions"
    ],
    "no-any": false,
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [
      false,
      "log",
      "error",
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-consecutive-blank-lines": true,
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-variable": true,
    "no-empty": true,
    "no-eval": true,
    "no-shadowed-variable": true,
    "no-string-literal": true,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": false,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "one-line": [
      true,
      "check-catch",
      "check-else",
      "check-open-brace",
      "check-whitespace"
    ],
    "quotemark": [true, "double", "jsx-double"],
    "radix": true,
    "semicolon": [false, "always"],
    "switch-default": true,

    "trailing-comma": [false],

    "triple-equals": [true, "allow-null-check"],
    "typedef": [true, "parameter", "property-declaration"],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "variable-name": [
      true,
      "ban-keywords",
      "check-format",
      "allow-leading-underscore",
      "allow-pascal-case"
    ]
  }
}
```

3.
 If you would like the code for the Feed component you saw in class, here it is:
 ```jsx
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
```

Remember to import this and use it in your `home-page` folder!


4. 
Inside your `README.md` file in the root of your application, change "# ix-twatter" to "# ix-tweeter" 
 
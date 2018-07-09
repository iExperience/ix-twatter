import { Context } from "../utils"

export default {
  viewer: () => ({}),
  tweets: async (parent, args, ctx: Context, info) => {
    console.log({ info })
    return ctx.db.query.tweets(
      {
        ...args
      },
      info
    )
  }
}

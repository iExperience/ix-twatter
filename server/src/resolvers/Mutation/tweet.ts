import { Context } from "../../utils"
export default {
  createTweet: async (parent, args, ctx: Context, info) => {
    return await ctx.db.mutation.createTweet(
      {
        data: args.data
      },
      info
    )
  }
}

import { Ctx } from "@blitzjs/next"
import { QueryClient } from "@blitzjs/rpc"

type QueryResolver<Params, Result> = {
  // Will be (
  params: Params
  ctx: Ctx
} // will be )

const PrefetchQueryClient = () => {
  const a = 2
}

export default PrefetchQueryClient

// class PrefetchQueryClient {
//   queryClient: QueryClient
//   context: InvokeWithMiddleWareConfig
//
//   constructor(context: InvokeWithMiddlewareConfig) {
//     this.queryClient = new QueryClient()
//     this.context = context
//   }
// }

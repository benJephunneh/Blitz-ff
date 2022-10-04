import deleteStaleStash from "./staleStashCron"

const setupStashDelete = async (req, res) => {
  const stash = req.body
  // await deleteStaleStash.enqueue(
  //   stash,
  //   {
  //     id: stash,
  //     delay: '32h'
  //   }
  // )
  res.status(200).end()
}

export default setupStashDelete

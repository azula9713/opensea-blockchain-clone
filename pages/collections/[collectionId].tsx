import React, { FC } from 'react'
import { useRouter } from 'next/router'

const Collection: FC = () => {
  const router = useRouter()
  const collectionId = router.query.collectionId as string

  return <div>{collectionId}</div>
}

export default Collection

import { FC } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const ArticleDetail: FC = () => {

  // const params = useParams()
  const [params] = useSearchParams()
  const id = params.get('id')
  return <>{id}</>
}

export default ArticleDetail

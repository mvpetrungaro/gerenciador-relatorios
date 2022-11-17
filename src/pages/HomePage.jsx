import { useState, useEffect } from 'react'
import Loading from '../components/Loading'

export default function HomePage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      setLoading(false)
    } catch (err) {
      setError(err.message ?? err)
    }
  }, [])

  let content = <></>

  if (error) {
    content = <div className="text-center">{error}</div>
  } else if (loading) {
    content = <Loading />
  } else {
    content = (
      <>
        <div className="text-center">
          <h4>Home Page</h4>
        </div>
      </>
    )
  }

  return <div>{content}</div>
}

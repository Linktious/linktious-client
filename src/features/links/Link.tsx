import React, { useEffect } from 'react'
import { fetchLinks } from '~/features/links'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import { selectAllLinks } from '~/features/links/slice'

const Link = () => {
  const dispatch = useAppDispatch()
  const links = useAppSelector(selectAllLinks)

  useEffect(() => {
    dispatch(fetchLinks())
  }, [])


  return (
    <div>Link {links[0]?.description}</div>
  )
}

export default Link

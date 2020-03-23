import React from 'react'
import Header from '../components/Header'

const DocsLayout = ({ children, ...props }) => {
  return (
    <>
      <Header title={props.pageContext.frontmatter.title} />
      {children}
    </>
  )
}

export default DocsLayout

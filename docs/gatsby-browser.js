const React = require('react')
const DocsPageWrapper = require('./src/layouts/DocsPageWrapper')
  .default

export const wrapPageElement = ({ element, props }) => {
  if (props.path !== '/') {
    return (
      <DocsPageWrapper {...props}>
        {element}
      </DocsPageWrapper>
    )
  } else {
    return element
  }
}

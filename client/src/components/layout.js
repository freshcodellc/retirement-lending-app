/** @jsxImportSource @emotion/react */
function Layout({children, className}) {
  return (
    <div
      className={className}
      css={{
        width: '100%',
        display: 'flex',
        margin: '0 auto',
        padding: '5rem 1rem',
        flexDirection: 'column',
        maxWidth: 'calc(var(--grid-base-width)*1px)',
      }}
    >
      {children}
    </div>
  )
}

export {Layout}

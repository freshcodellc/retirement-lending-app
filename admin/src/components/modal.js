/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {Dialog, IconButton, VisuallyHidden} from '@solera/ui'
import {FiX} from 'react-icons/fi'

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach(fn => fn && fn(...args))

const ModalContext = React.createContext()

function ModalProvider(props) {
  const [isOpen, setIsOpen] = React.useState(false)

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />
}

function ModalDismissButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

function ModalOpenButton({children: child}) {
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

function ModalContentsBase({id, ...props}) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog
      css={{
        width: '50vw',
        padding: '2rem',
      }}
      isOpen={isOpen}
      aria-labelledby={id}
      onDismiss={() => setIsOpen(false)}
      {...props}
    />
  )
}

function ModalContents({title, children, ...props}) {
  return (
    <ModalContentsBase {...props}>
      <div css={{position: 'relative'}}>
        <ModalDismissButton>
          <IconButton css={{position: 'absolute', top: 0, right: 0}}>
            <VisuallyHidden>Close</VisuallyHidden>
            <FiX size="1.8em" />
          </IconButton>
        </ModalDismissButton>
        <h3
          id={props.id}
          css={{
            margin: 0,
            fontSize: '2rem',
            padding: '1rem 0',
            textAlign: 'center',
          }}
        >
          {title}
        </h3>
      </div>
      {children}
    </ModalContentsBase>
  )
}

function useModal() {
  const context = React.useContext(ModalContext)

  if (context === undefined) {
    throw new Error(`useModal must be used within a ModalProvider`)
  }

  return context
}

export {
  ModalProvider,
  ModalDismissButton,
  ModalOpenButton,
  ModalContents,
  useModal,
}

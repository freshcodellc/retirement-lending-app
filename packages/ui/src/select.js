/** @jsx jsx */
import { jsx } from '@emotion/react'
import {
  ListboxList,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxOption as SelectOption
} from '@reach/listbox'
import * as colors from './styles/colors'
import { FaCaretDown } from 'react-icons/fa'

import '@reach/listbox/styles.css'

function Select({ children, label, name, css, ...props }) {
  return (
    <div
      css={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <label htmlFor={name}>{label}</label>
      <ListboxInput {...props}>
        <ListboxButton
          arrow={<FaCaretDown size='2em' />}
          css={{
            border: 'none',
            width: '100%',
            padding: '0.5rem 0',
            alignSelf: 'stretch',
            borderBottom: `2px solid ${colors.text}`
          }}
        />
        <ListboxPopover>
          <ListboxList>{children}</ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

export { Select, SelectOption }

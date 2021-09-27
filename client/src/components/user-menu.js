/** @jsxImportSource @emotion/react */
import React, {useState} from 'react'
import {FiUser} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {Button, colors} from '@solera/ui'
import {useAuth} from '../context/auth-context'

function UserMenu() {
  const [open, setOpen] = useState(false)
  const {logout} = useAuth()

  return (
    <div>
      <div
        css={{
          visibility: open ? 'unset' : 'hidden',
          position: 'absolute',
          top: '82px',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#EEEEEE',
          opacity: open ? `0.95` : '0',
        }}
        onClick={() => setOpen(false)}
      />
      <div css={{position: 'relative'}}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white',
            borderRadius: '100%',
            backgroundColor: 'transparent',
            width: '2.8rem',
            height: '2.8rem',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          <FiUser size="1.8rem" color="white" />
        </button>
        <div
          css={{
            opacity: open ? 1 : 0,
            position: 'absolute',
            zIndex: open ? '10' : '0',
            top: '40px',
            right: 0,
            padding: '50px',
            border: `2px solid ${colors.primary}`,
            backgroundColor: 'white',
          }}
        >
          <p
            css={{
              color: colors.text,
              margin: 0,
              padding: 0,
              fontSize: '20px',
              lineHeight: '26px',
              fontWeight: 500,
            }}
          >
            Account
          </p>
          <Link to="/profile/update">
            <Button
              variant="secondary"
              css={{width: '250px', marginTop: '35px'}}
              onClick={() => setOpen(false)}
            >
              Update Profile
            </Button>
          </Link>
          <Button
            variant="secondaryOutline"
            css={{width: '250px', marginTop: '35px'}}
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  )
}

export {UserMenu}

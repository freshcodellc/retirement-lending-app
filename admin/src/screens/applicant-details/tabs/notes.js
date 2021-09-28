/** @jsxImportSource @emotion/react */
import * as React from 'react'
import {useForm} from 'react-hook-form'
import {FiTrash2, FiEdit2} from 'react-icons/fi'
import {useQueryClient} from 'react-query'
import {Button, colors, Textarea} from '@solera/ui'
import {join, initial, isoDate} from 'utils/format'
import {useAuth} from 'context/auth-context'
import {queryKeys} from 'utils/query-client'
import {useAddNote} from 'hooks/use-add-note'
import {useEditNote} from 'hooks/use-edit-note'
import {useRemoveNote} from 'hooks/use-remove-note'

export function NotesTab({application}) {
  const {user} = useAuth()
  const queryClient = useQueryClient()
  const [noteInEdit, setNoteInEdit] = React.useState()
  const {handleSubmit, register, formState, setValue, reset} = useForm({
    mode: 'onChange',
  })
  const {mutate: addNote, isLoading: adding} = useAddNote({
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
      reset()
    },
  })
  const {mutate: editNote} = useEditNote({
    onSuccess() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
      reset()
      setNoteInEdit()
    },
  })
  const {mutate: removeNote} = useRemoveNote({
    onSettled() {
      queryClient.invalidateQueries(queryKeys.application(application.uuid))
    },
  })

  const handleSaveNote = handleSubmit(({body}) => {
    if (noteInEdit) {
      editNote({uuid: noteInEdit, body})
    } else {
      addNote({body, loan_application_uuid: application.uuid})
    }
  })

  const handleEditNote =
    ({uuid, body}) =>
    () => {
      setNoteInEdit(uuid)
      setValue('body', body, {shouldValidate: true})
    }

  const handleRemoveNote = noteUuid => () => {
    removeNote(noteUuid)
  }

  return (
    <div
      css={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        '&>div': {
          width: '100%',
          minWidth: '300px',
          maxWidth: 'calc((100% - 1rem)/2)',
        },
      }}
    >
      <div css={{border: `1px solid ${colors.gray20}`}}>
        <form
          name="notes"
          onSubmit={handleSaveNote}
          css={{
            margin: 0,
            height: '100%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Textarea
            rows="21"
            id="body"
            name="body"
            placeholder="Start typing your note here..."
            {...register('body', {required: true})}
          />
          <Button
            type="submit"
            isLoading={adding}
            css={{margin: '1rem auto'}}
            disabled={!formState.isValid}
          >
            {noteInEdit ? 'Update' : 'Save'}
          </Button>
        </form>
      </div>
      <div
        css={{
          border: `1px solid ${colors.gray20}`,
          maxHeight: '500px',
          minHeight: '500px',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {(application.notes || []).map(note => {
          //TODO: check admin is preload form backend for this to work
          const {first_name, last_name, uuid} = note?.admin?.profile ?? {}
          const adminName = join(first_name, initial(last_name))
          const notedDate = isoDate(note.updated_at, 'MM.dd.yy')
          const yourNotes = user.uuid === uuid

          return (
            <div
              key={note.uuid}
              css={{
                margin: '1rem',
                padding: '1rem',
                border: `1px solid ${colors.text}`,
              }}
            >
              <div
                css={{
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>{`${notedDate}—${adminName}`}</div>
                {yourNotes ? (
                  <div css={{display: 'flex', gap: '1rem'}}>
                    <FiEdit2
                      onClick={handleEditNote(note)}
                      title="Edit your note"
                      css={{cursor: 'pointer'}}
                    />
                    <FiTrash2
                      onClick={handleRemoveNote(note.uuid)}
                      title="Remove your note"
                      css={{cursor: 'pointer'}}
                    />
                  </div>
                ) : null}
              </div>
              <p>{note.body}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

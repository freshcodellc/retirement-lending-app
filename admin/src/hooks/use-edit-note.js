import {useMutation} from 'react-query'

import noteService from 'services/note-service'

function useEditNote(config) {
  return useMutation(noteService.edit, config)
}

export {useEditNote}

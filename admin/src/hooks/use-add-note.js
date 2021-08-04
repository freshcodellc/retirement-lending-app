import {useMutation} from 'react-query'

import noteService from 'services/note-service'

function useAddNote(config) {
  return useMutation(noteService.add, config)
}

export {useAddNote}

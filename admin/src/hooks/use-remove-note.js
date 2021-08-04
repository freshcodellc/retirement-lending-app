import {useMutation} from 'react-query'

import noteService from 'services/note-service'

function useRemoveNote(config) {
  return useMutation(noteService.remove, config)
}

export {useRemoveNote}

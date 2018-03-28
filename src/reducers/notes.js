const initialState = {
  notes: [],
  error: '',
  fetching: false,
};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case 'POST_NOTE_REQUEST':
      return {...state, fetching: true, error: ''};

    case 'DELETE_NOTE_REQUEST':
      return {...state, fetching: true, error: ''};

    case 'GET_NOTES_REQUEST':
      return {...state, fetching: true, error: ''};

    case 'UPDATE_NOTE_REQUEST':
      return {...state, fetching: true, error: ''};

    case 'GET_NOTES_SUCCESS':
      return {...state, notes: action.payload, fetching: false, error: ''};

    case 'GET_NOTES_ERROR':
      return {...state, notes: [], error: action.payload, fetching: false};

    default:
      return state;
  }
}

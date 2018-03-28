const initialState = {
  timelines: {},
  error: '',
  fetching: false,
};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case 'GET_TIMELINE_REQUEST':
      return { ...state, fetching: true, error: '' };

    case 'GET_TIMELINE_SUCCESS':
      return { ...state, timelines: action.payload, fetching: false, error: '' };

    case 'GET_TIMELINE_ERROR':
      return { ...state, timelines: {}, error: action.payload, fetching: false };

    default:
      return state;
  }
}

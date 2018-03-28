export const getTimelines = (tag) => (dispatch) => {
  dispatch({
    type: 'GET_TIMELINE_REQUEST',
  });

  fetch(`/search/${tag}`)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: 'GET_TIMELINE_SUCCESS',
        payload: res,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'GET_TIMELINE_ERROR',
        payload: error,
      });
    });
};
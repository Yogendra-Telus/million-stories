export const loadNews = () => dispatch => {
  fetch(`http://localhost:3000/news`)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: 'LOAD_NEWS', payload: data });
    });
};

export const updateNews = id => dispatch => {
  dispatch({ type: 'UPDATE_NEWS', id });
};

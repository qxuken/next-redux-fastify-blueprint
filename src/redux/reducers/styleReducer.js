const initialStyles = {
  loaderDisplay: 'flex',
  mainContainerMaxWidth: '1920px',
};

export default function styleReducer(state = initialStyles, action) {
  switch (action.type) {
    case 'CHANGE_LOADER_STATE': {
      return {
        ...state,
        loaderDisplay: action.payload,
      };
    }
    default:
      return state;
  }
}

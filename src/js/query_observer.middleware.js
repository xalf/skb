import { throttle } from 'throttle-debounce';
import {
  sendSearchRequest,
  hidePendingIndicator,
  showSearchRequest,
  sendSearchRequestError
} from './combobox.actions';
import {
  SEARCH_REQUEST_MIN_INTERVAL,
  CHANGE_QUERY,
  SEARCH_REQUEST_SERVER_ERROR,
  UPDATE_LIST
} from './combobox.constants';
import mockFull from '../kladr.json';

const queryObserverMiddleware = store => next => {
  let searchRequestPendingNumber = 0;

  const doAlways = () => {
    searchRequestPendingNumber--;
    if (searchRequestPendingNumber === 0) {
      store.dispatch(hidePendingIndicator());
    }
  };

  const throttledSearchRequest = throttle(SEARCH_REQUEST_MIN_INTERVAL, requestParams => {
    searchRequestPendingNumber++;
    store.dispatch(sendSearchRequest());

    //here can be ajax
    const isImitationServerError = Math.random() > 0.9;

    isImitationServerError ? 
      store.dispatch(sendSearchRequestError(SEARCH_REQUEST_SERVER_ERROR)) :
      store.dispatch(showSearchRequest(mockFull));

    doAlways();
  });

  return action => {
    if (action.name !== 'search' || (action.type !== CHANGE_QUERY || 
      store.getState().query === action.payload.query
      || !action.payload.query) &&
      action.type !== UPDATE_LIST ) {
      return next(action);
    }

    throttledSearchRequest();

    return next(action);
  };
};

export default queryObserverMiddleware;
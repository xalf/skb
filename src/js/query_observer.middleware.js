import { throttle } from 'throttle-debounce';
import {
  
} from './combobox.actions';
import {
  SEARCH_REQUEST_MIN_INTERVAL
} from './combobox.constants';

const queryObserverMiddleware = store => next => {
  let searchRequestPendingNumber = 0;

  // Send search request only once in specified time
  const throttledSearchRequest = throttle(SEARCH_REQUEST_MIN_INTERVAL, requestParams => {
    searchRequestPendingNumber++;
    store.dispatch(sendSearchRequest());
    API.post({
      url: '/search',
      ...requestParams
    });
  });

  return action => {
    if (action.type !== CHANGE_QUERY || store.getState().search.query === action.payload.query) {
      return next(action);
    }

    const { query } = action.payload;

    if (query && query.length >= MIN_QUERY_LENGTH_FOR_REQUEST) {
      const doAlways = () => {
        searchRequestPendingNumber--;
        if (searchRequestPendingNumber === 0) {
          store.dispatch(hidePendingIndicator());
        }
      };

      throttledSearchRequest({
        data: { match: query },
        onSuccess: result => {
          const matches = [
            ...result.success.catalog.map((item) => ({ ...item, type: 'category' })),
            ...result.success.producer.map((item) => ({ ...item, type: 'company' })),
            ...result.success.goods.map((item) => ({ ...item, type: 'product' })),
          ];
          store.dispatch(showSearchResults(matches));
          doAlways();
        },
        onError: () => {
          doAlways();
        }
      });
    }

    return next(action);
  };
};

export default queryObserverMiddleware;
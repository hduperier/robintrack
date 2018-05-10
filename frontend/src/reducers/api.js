import * as R from 'ramda';

import {
  QUOTE_FETCHED,
  TOP_SYMBOLS_FETCHED,
  BOTTOM_SYMBOLS_FETCHED,
  POPULARITY_HISTORY_FETCHED,
  QUOTE_HISTORY_FETCHED,
  LARGEST_POPULARITY_CHANGES_FETCHED,
} from 'src/actions/api';

const getInitialState = () => ({
  quotes: {},
  popularityHistory: {},
  quoteHistory: {},
  topSymbols: [],
  bottomSymbols: [],
});

export default (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case QUOTE_FETCHED: {
      return R.set(
        R.lensPath(['quotes', action.symbol]),
        R.omit(['symbol'], action.quote),
        state
      );
    }

    case TOP_SYMBOLS_FETCHED: {
      const topSymbols = R.clone(state.topSymbols);
      action.payload.forEach((datum, i) => {
        topSymbols[action.startIndex + i] = datum;
      });

      return { ...state, topSymbols };
    }

    case BOTTOM_SYMBOLS_FETCHED: {
      const bottomSymbols = R.clone(state.bottomSymbols);
      action.payload.forEach((datum, i) => {
        bottomSymbols[action.startIndex + i] = datum;
      });

      return { ...state, bottomSymbols };
    }

    case POPULARITY_HISTORY_FETCHED: {
      return R.set(
        R.lensPath(['popularityHistory', action.symbol]),
        action.payload,
        state
      );
    }

    case QUOTE_HISTORY_FETCHED: {
      return R.set(
        R.lensPath(['quoteHistory', action.symbol]),
        action.payload,
        state
      );
    }

    case LARGEST_POPULARITY_CHANGES_FETCHED: {
      const { payload, suffix, hoursAgo, relative, minPopularity } = action;
      return R.set(
        R.lensPath([
          'api',
          'largestPopularityChanges',
          suffix,
          hoursAgo,
          relative,
          minPopularity,
        ]),
        payload,
        state
      );
    }

    default: {
      return state;
    }
  }
};

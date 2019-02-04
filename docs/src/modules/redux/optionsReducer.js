import { ACTION_TYPES, CODE_VARIANTS, LANGUAGES } from 'docs/src/modules/constants';
import memoize from '@material-ui/system/memoize';

const req = require.context('docs/translations', false, /translations.*\.json$/);

const translations = {};
req.keys().forEach(filename => {
  const match = filename.match(/-([a-z]{2})\.json$/);

  if (match && LANGUAGES.indexOf(match[1]) !== -1) {
    translations[match[1]] = req(filename);
  } else {
    translations.en = req(filename);
  }
});

const getT = memoize(userLanguage => key => translations[userLanguage][key]);

const mapping = {
  [ACTION_TYPES.OPTIONS_CHANGE]: (state, action) => {
    const newState = {
      codeVariant: action.payload.codeVariant || state.codeVariant,
      userLanguage: action.payload.userLanguage || state.userLanguage,
    };
    newState.t = getT(newState.userLanguage);
    return newState;
  },
};

const initialState = {
  codeVariant: CODE_VARIANTS.JS,
  userLanguage: 'en',
  t: getT('en'),
};

function optionsReducer(state = initialState, action) {
  let newState = state;

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action);
  }

  return newState;
}

export default optionsReducer;

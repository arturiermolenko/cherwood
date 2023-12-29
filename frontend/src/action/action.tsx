export const SET_LANGUAGE = 'SET_LANGUAGE';

export const setLanguage = (isEnglish:boolean) => ({
  type: SET_LANGUAGE,
  payload: isEnglish,
});

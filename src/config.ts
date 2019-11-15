export const config = {
  apiBaseURL:
    process.env.NODE_ENV !== 'production'
      ? 'https://enigmatic-sea-34337.herokuapp.com'
      : ''
};

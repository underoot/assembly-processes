import qs from 'query-string';

export const setURLSearch = (params: object) => {
  const { location, history } = window;

  history.pushState(
    null,
    '',
    `${location.pathname}?${qs.stringify({
      ...qs.parse(location.search),
      ...params
    })}`
  );
};

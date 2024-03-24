const BASE_URL = 'https://rickandmortyapi.com/api/';

export enum EndpointSuffixes {
  CHARACTER = 'character',
  EPISODE = 'episode',
}

export const sendRequest = async (
  urlSuffix: string,
  pageNo?: number,
  idSuffix?: string,
) => {
  const requestUrl =
    BASE_URL +
    urlSuffix +
    (pageNo
      ? '/?' +
        new URLSearchParams({
          page: pageNo.toString(),
        })
      : '/' + idSuffix);

  const response = await fetch(requestUrl);
  const jsonData = await response.json();
  return jsonData;
};

const BASE_URL = 'https://rickandmortyapi.com/api/';
export const SUFFIX_CHARACTER = 'character';
export const SUFFIX_EPISODE = 'episode';

export const sendRequest = async (urlSuffix: string, pageNo: number) => {
  const requestUrl =
    BASE_URL +
    urlSuffix +
    '/?' +
    new URLSearchParams({
      page: pageNo.toString(),
    });

  const response = await fetch(requestUrl);
  const jsonData = await response.json();
  return jsonData;
};

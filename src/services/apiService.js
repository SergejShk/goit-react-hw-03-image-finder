import axios from 'axios';

export const getArticles = async (searchQuery, page) => {
  const URL = 'https://pixabay.com/api/';
  const options = new URLSearchParams({
    key: '28235725-b16522b9eec7ff45ba66b04d5',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: '12',
  });

  try {
    const response = await axios.get(`${URL}?${options}`);
    if (response.data.hits.length === 0) {
      throw new Error('error');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

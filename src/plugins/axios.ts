// axiosのファイル
import axios from 'axios';

axios.defaults.withCredentials = true

const fetchCsrfToken = async () => {
  try {
    const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://example.com'
    const token = await axios.get(`${baseURL}/csrf`, { withCredentials: true })
    return token.data.token
  } catch (error) {
    console.error('CSRFトークンの取得に失敗しました。', error);
  }
};
const token = await fetchCsrfToken();
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'https://example.com';
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': token
  },
});

export default instance;

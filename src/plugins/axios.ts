// axiosのファイル
import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';

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
    'X-CSRF-Token': token,
    'access-token': getCookie('access-token'),
    'client': getCookie('client'),
    'uid': getCookie('uid')
  },
});

instance.interceptors.response.use(
  response => response,
  error => {
    // グローバルなエラーハンドリング。configにignoreGlobalCatchがある場合はエラーハンドリングを無視する
    if (!error.config.ignoreGlobalCatch) {
      if (error.response.status === 401) {
        deleteCookie('uid')
        deleteCookie('client')
        deleteCookie('access-token')
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

import axios from '../../plugins/axios';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useState } from 'react';

// トークンがある場合はconditionsにリダイレクトする。
// 万が一access_tokenが異なっている場合はバックエンド側でエラーが発生してログイン画面に遷移する
const token = getCookie('access-token');
if (token) {
  window.location.href = '/conditions'
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div>
      {isError ? (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{errorMessage}</span>
        </div>
      ) : null}
      <h2>ログイン</h2>

      <section className="mb-8">
        <div className="mb-8">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">メールアドレス</label>
          <input onChange={(e) => {
              setEmail(e.target.value)
            }}
            autoFocus
            type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test@example.com" required />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">パスワード</label>
          <input onChange={(e) => {
              setPassword(e.target.value)
            }}
            type='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
        </div>
      </section>

      {/* tyoeErrorをなんとかしたいね〜 */}
      <button onClick={() => {
        axios.post('/auth/sign_in', {
          email: email,
          password: password
        }, {
          ignoreGlobalCatch: true
        }).then((response) => {
          setCookie('uid', response.headers["uid"])
          setCookie('client', response.headers["client"])
          setCookie('access-token', response.headers["access-token"])
          // conditionsにリダイレクトする
          window.location.href = '/conditions'
        }).catch((error) => {
          deleteCookie('uid')
          deleteCookie('client')
          deleteCookie('access-token')
          setIsError(true);
          setErrorMessage(error.response.data.errors[0]);
        })
      }}>ログイン</button>
    </div>
  );
}
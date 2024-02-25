import axios from '../../plugins/axios';
import { setCookie, deleteCookie } from 'cookies-next';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>ログイン</h2>

      <section className="mb-8">
        <div className="mb-8">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">メールアドレス</label>
          <input onChange={(e) => {
              setEmail(e.target.value)
            }}
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

      <button onClick={() => {
        axios.post('/auth/sign_in', {
          email: email,
          password: password
        }).then((response) => {
          setCookie('uid', response.headers["uid"])
          setCookie('client', response.headers["client"])
          setCookie('access-token', response.headers["access-token"])
          console.log(response);
        }).catch((error) => {
          deleteCookie('uid')
          deleteCookie('client')
          deleteCookie('access-token')
        })
      }}>ログイン</button>
    </div>
  );
}
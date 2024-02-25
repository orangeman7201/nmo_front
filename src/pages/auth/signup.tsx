import axios from '../../plugins/axios';
import { useState } from 'react';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div>
      {isError ? (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span className="font-medium">{errorMessage}</span>
        </div>
      ) : null}
      <h2>ユーザー作成</h2>

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
        <div className="mb-8">
          <label htmlFor="password-confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">パスワード確認</label>
          <input onChange={(e) => {
              setPasswordConfirmation(e.target.value)
            }}
            type='password' id="password-confirmation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
        </div>
      </section>

      <button onClick={() => {
        axios.post('/auth', {
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation
        }).then((response) => {
          console.log(response);
          // ログイン画面に遷移しているが、メール認証を実装したら調整する
          window.location.href = '/auth/login';
        }).catch((error) => {
          setIsError(true);
          setErrorMessage(error.response.data.errors[0]);
        })
      }}>ユーザー作成</button>
    </div>
  );
}
import React, { useState } from 'react'
import Link from 'next/link'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Domain, api_key } from './domain'

export default function Login() {

  const cookies = new Cookies();

  const initialState = {
    email: '',
    password: '',
  }

  const [form, setForm] = useState(initialState);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { email, password } = form;

    // will change later vvv
    const URL = Domain + '/user/login'

    let config = {
      headers: { 'api_key': api_key }
    }

    let data = {
      'email': email,
      'password': password,
    }

    await axios.post(URL, data, config).then(response => { console.log(response.status) });

    // window.location.reload();

  }

  return (
    <div className="min-h-screen bg-gray-900 pt-10 pb-40">
      <a href="/">
        <BsFillArrowLeftCircleFill className="h-10 w-10 ml-6 lg:ml-20 text-gray-100 hover:text-blue-600" />
      </a>
      <div className="min-h-full lg:w-1/2 w-5/6 mx-auto mt-10 lg:mt-20 flex flex-col justify-center rounded-md shadow-md pb-20 pt-10 px-4 lg:px-8 bg-gray-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white mx-auto py-8 px-4 shadow rounded-lg lg:w-3/4 sm:px-10">
            <form className="space-y-6" action="#" onSubmit={handleSubmit} method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <Link href="/dashboard">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">don't have an account?</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <div>
                  <Link href="/register" passHref>
                    <a
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      Register
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

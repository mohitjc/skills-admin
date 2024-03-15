import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login_success } from '../../actions/user';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Link } from 'react-router-dom';
import './style.scss';
import AuthLayout from '../../components/AuthLayout';

const Login = () => {
  const history = useHistory();
  const user = useSelector((state:any) => state.user)
  useEffect(() => {
    if (user && user?.loggedIn) {
      history.push('/dashboard')
    }
  }, [])

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState('');
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });

  useEffect(() => {
    loader(true)
    setTimeout(() => {
      loader(false)
    }, 500);
    let r = localStorage.getItem('remember')
    if (r) {
      let data = JSON.parse(r)
      setUsername(data.email)
      setPassword(data.password)
      setRemember(true)
    }
  }, [])

  const hendleSubmit = (e:any) => {
    e.preventDefault()
    const data = {
      email: username,
      password
    };
    loader(true)
    ApiClient.post('api/login/admin', data).then(res => {
      loader(false)
      if (res.success == true) {
        if (remember) {
          localStorage.setItem('remember', JSON.stringify(data))
        } else {
          localStorage.removeItem('remember')
        }
        // toast.success(res.message)
        localStorage.setItem('token', res.data.access_token)
        dispatch(login_success(res.data))


        let permissions:any = res.data?.role?.permissions?.[0]
        let url = '/profile'
        // if (!permissions?.readDashboard) url = '/profile'
        history.push(url);
      }
    })
  };
  return (
    <>
      <AuthLayout>
      <form className="" onSubmit={hendleSubmit}>
                <h4 className="text-typo mb-6 text-2xl font-bold">Sign in</h4>
                <input type="email" onChange={e => setUsername(e.target.value)} className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-6 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-blue-500 focus:border-blue-500" placeholder="Email address" required value={username} />
                <div className="relative mb-6">
                  <input type={eyes.password ? 'text' : 'password'} className="shadow-box border-1 border-gray-300 relative bg-gray-100 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-blue-500 focus:border-blue-500" placeholder="Password" onChange={e => setPassword(e.target.value)} required value={password} />

                  <div className='absolute right-2 inset-y-0 flex items-center text-gray-500 text-sm'>
                    <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>

                  </div>

                </div>
                <div className='flex'>
                <label className='flex items-center pointer'><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2 h-4 w-4" /> <span className='text-md text-gray-600'>Remember Me</span></label>
                  <Link className="sign_up ml-auto text-primary" to="/forgotpassword"> Forgot Password</Link>
                </div>
                

                <div className="mt-8">
                  <button type="submit" className="px-4 w-full text-sm font-normal text-white h-12 flex items-center justify-center gap-2 !bg-primary rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed">Sign in</button>
                </div>

                <p className='accopuntt'></p>
              </form>
      </AuthLayout>
    </>
  );
};

export default Login;
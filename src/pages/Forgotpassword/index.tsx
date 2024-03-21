import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    ToastsStore,
} from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';


const Forgotpassword = () => {
    const history = useHistory();

    const user = useSelector((state:any) => state.user)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard')
          }
    }, [])

    const [form, setForm] = useState({ email: '' });

    useEffect(() => {

    }, [])

    const hendleSubmit = (e:any) => {
        e.preventDefault();
        loader(true)

        ApiClient.post('api/forgot/password/admin', form).then(res => {
            if (res.success) {
                history.push('/login');
                setTimeout(() => {
                  ToastsStore.success(res.message)
                }, 100);
            }
            loader(false)
        })
    };

    return (
        <>

<AuthLayout>
<form
                className="centerLogin"
                onSubmit={hendleSubmit}
              >  
                <div className="text-center mb-4">
                  <h3 className="text-left lgtext">Forgot Password</h3> 
                </div>
                <p className='para_forget'>No worriest! Just enter your email and we’ll send you a reset password link.</p>
                <div className="mb-3">
                  <div className="inputWrapper">
                  <input
                                        type="email"
                                        className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2  mb-0 bginput w-full" placeholder='Email*'
                                        value={form.email}
                                        required
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />
                 
                  </div>
                </div>

                
                <div className="buttons">
              
                  <button type="submit" className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center loginclass mb-4">
                  Send Recovery Email
                  </button>
                </div>

                <p className='accopuntt mt-0'> Just Remember?<Link className="sign_up" to="/login"> Sign In</Link></p>
              </form>
</AuthLayout>


        </>
    );
};

export default Forgotpassword;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    ToastsStore,
} from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';
import './style.scss';
import AuthLayout from '../../components/AuthLayout';

const Resetpassword = () => {
    const history = useHistory();

    const user = useSelector((state:any) => state.user)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard')
        }
    }, [])

    const formValidation = [
        { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'newPassword'] },
        { key: 'newPassword', minLength: 8 },
    ]

    const [form, setForm]:any = useState({ confirmPassword: '', newPassword: '', code: '',id:'' });
    const [submitted, setSubmitted] = useState(false)
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });

    const getError = (key:any) => {
        return methodModel.getError(key, form, formValidation)
    }

    useEffect(() => {
        let prm = {
            // email: methodModel.getPrams('email'),
            id: methodModel.getPrams('id'),
            code: methodModel.getPrams('code'),
        }

        setForm({ ...form, ...prm })
    }, [])

    const hendleSubmit = (e:any) => {
        e.preventDefault();
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        loader(true)
        let payload = {
            password: form.newPassword,
            verificationCode: form.code,
            id: form.id
        }
        ApiClient.put('api/user/reset/password', payload).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
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
                                <div className="text-center mb-2">
                                    <h3 className="text-left lgtext">New Password</h3>

                                    <p className='para_forget_new'>Please create a new password that you don’t use on any other site.</p>
                                </div>

                                <div className="mb-3">
                                    {/* <div className="inputWrapper mb-3">
                 <label>Code</label>
                               
                                    <input
                                        type="text"
                                        className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 mb-0 bginput w-full"
                                        value={form.code}
                                        onChange={e => setForm({ ...form, code: e.target.value })}
                                        placeholder="Code"
                                        required
                                    />
                  </div> */}
                                    {/* <label>New Password<span className="start">*</span></label> */}

                                    <div className="mb-3">
                                        <div className="inputWrapper">
                                            <input
                                                type={eyes.password ? 'text' : 'password'}
                                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 mb-0 bginput w-full"
                                                value={form.newPassword}
                                                min="12"
                                                onChange={e => setForm({ ...form, newPassword: e.target.value })}
                                                placeholder="New Password"
                                                required
                                            />
                                            <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                                        </div>

                                        {submitted && getError('newPassword').invalid ? <div className="invalid-feedback d-block">Min Length must be 8 characters long</div> : <></>}
                                    </div>
                                    <div className="inputWrapper">
                                        {/* <label>Confirm Password<span className="start">*</span></label> */}

                                        <div className="inputWrapper">
                                            <input
                                                type={eyes.confirmPassword ? 'text' : 'password'}
                                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 mb-0 bginput w-full"
                                                value={form.confirmPassword}
                                                maxLength={50}
                                                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                                placeholder="Confirm Password"
                                                required
                                            />
                                            <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
                                        </div>
                                        {submitted && getError('confirmPassword').err.confirmMatch ? <div className="invalid-feedback d-block">Confirm Password is not matched with New Password</div> : <></>}
                                    </div>
                                </div>


                                <div className="buttons">

                                    <button type="submit" className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center loginclass mb-4">
                                       
                                       Save
                                    </button>
                                </div>

                                {/* <p className='accopuntt'> Just Remember?<a class="sign_up" href="/login"> Sign Up</a></p> */}
                            </form>
        </AuthLayout>
        

        </>
    );
};

export default Resetpassword;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login_success } from '../../actions/user';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Link } from 'react-router-dom';
import './style.scss';
import AuthLayout from '../../components/AuthLayout';
import { toast } from 'react-toastify';

const Login = () => {
  const history = useNavigate();
  const user = useSelector((state:any) => state.user)
  useEffect(() => {
    if (user && user?.loggedIn) {
      history('/dashboard')
    }
  }, [])

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState('');
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });
  const [step, setStep] = useState(1);
  const [otp, setOTP] = useState('');
  const [resp, setRes]:any = useState();
  const [ip, setIp]:any = useState();

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

     // Using an HTTP GET request to ipinfo.io/json

     fetch('https://api.ipify.org?format=json')
     .then(response => response.json())
     .then(data => {
       let ip = data.ip
       localStorage.setItem('IP', ip)
       setIp(ip)
     })
     .catch(error => console.error('Error fetching IP address:', error));
  }, [])

  const setLogin=(data:any)=>{
    localStorage.setItem('token', data.access_token)
    dispatch(login_success(data))
    let url = '/profile'
    history(url);
  }

  const hendleSubmit = (e:any) => {
    e.preventDefault()
    let data:any = {
      email: username,
      password
    };

    let url='api/login/admin'
    if(step==2){
      url='api/two-factor/auth'
      data={
        id:resp?._id,
        otp:otp,
        ip_address: ip
      }
    }

    loader(true)
    ApiClient.post(url, data).then(res => {
      loader(false)
      if (res.success == true) {
        localStorage.setItem('id', res?.data?._id)
        if (remember) {
          localStorage.setItem('remember', JSON.stringify(data))
        } else {
          localStorage.removeItem('remember')
        }

        if (res.data.two_factor_email_sent || step==1) {
          setStep(2)
          setRes(res.data)
          // setLogin(res.data)
        } else {
          setLogin(resp)
        }
        const loginTime = new Date();
        localStorage.setItem('loginTime', loginTime.toISOString());
      }
    })
  };
  let userId = localStorage.getItem("id")
  
  const resendOtp =()=>{
    let url  = 'api/resendOtp' ,
  data: any = {
 id:userId
};
  ApiClient.post(url, data)
  .then((res) => {
  
   toast(res?.message)
  })
   
   }
  return (
    <>
      <AuthLayout>
      <form className="" onSubmit={hendleSubmit}>
                <h4 className="text-typo mb-6 text-2xl font-bold">Sign in</h4>
                {step==1?<>
                    <input
                    type="email"
                    className="shadow-box bg-white mb-6 w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                    placeholder="Email address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <div className="relative mb-6">
                    <input
                      type={eyes.password ? "text" : "password"}
                      className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      required
                    />
                    {eyes.password ? (
                      <i
                        className="fa fa-eye top-3 right-3 absolute text-gray-600"
                        onClick={() =>
                          setEyes({ ...eyes, password: !eyes.password })
                        }
                      />
                    ) : (
                      <i
                        className="fa fa-eye-slash top-3 right-3 absolute text-gray-600"
                        onClick={() =>
                          setEyes({ ...eyes, password: !eyes.password })
                        }
                      />
                    )}
                  </div>
                  </>:<>
                  <p className="mb-2">OTP sent on email</p>
                  <input
                    type="text"
                    maxLength={6}
                    minLength={6}
                    className="shadow-box bg-white mb-6 w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                  </>}
                <div className='flex'>
                
                  {step == 1 ? <><label className='flex items-center pointer'><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2 h-4 w-4" /> <span className='text-md text-gray-600'>Remember Me</span></label>
                  <Link className="sign_up ml-auto text-orange-500" to="/forgotpassword"> Forgot Password</Link> </>: <p className="sign_up ml-auto text-orange-500 cursor-pointer " onClick={resendOtp} > Resend OTP</p>} 
                </div>
                

                <div className="mt-8">
                  <button type="submit" className="px-4 w-full text-sm font-normal text-white h-12 flex items-center justify-center gap-2  rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed">Sign in</button>
                </div>

                <p className='accopuntt'></p>
              </form>
      </AuthLayout>
    </>
  );
};

export default Login;
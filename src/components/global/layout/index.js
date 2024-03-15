import React, { useEffect, useState } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Sidebar from '../sidebar';
import Header from '../header';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import permissionModel from '../../../models/permisstion.model';
import ApiClient from '../../../methods/api/apiClient';
import { login_success } from '../../../actions/user';


const Layout = ({ children }) => {
  const user = useSelector(state => state.user)
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsopen] = useState(false)


  useEffect(() => {
    if (user && !user.loggedIn) {
      history.push('/login');
    } else {
      let permissions = user.roleDetail?.permissions?.[0]
      if (!permissionModel.urlAllow(permissions)) {
        // history.push("/profile")
      }
      let browseload = localStorage.getItem('browseload')
      if (!browseload) {
        ApiClient.get('api/user/detail', { id: user._id }).then(res => {
          if (res.success) {
            let data = { ...user, ...res.data }
            dispatch(login_success(data))
            localStorage.setItem('browseload', 'true')
          }
        })
      }
    }
  }, [])

  const logo = () => {
    let value = '/assets/img/logo.png'
    return value
  }

  const logos = () => {
    let value = '/assets/img/logo-small.png'
    return value
  }

  const router = () => {
    let route = localStorage.getItem('route')
    history.push(route);
  }

  const [state, setstate] = useState(false)
  useEffect(() => {
    setstate(localStorage.getItem("sidebar"))
  }, [localStorage.getItem("sidebar")])

  return (
    <>
      <div component="layout">
        <div onClick={e => router()} id="routerDiv"></div>
        <Header isOpen={isOpen} setIsOpen={setIsopen} />
        <div className={`main-wrapper flex ${isOpen ? "active-sidebar" : ""
          }`}>

          <div className="main-sidebar scrollbar transition-[width] duration-300">
            <div
              className="sidebar-brand p-3 pt-4 pl-5 text-left">
              <label className="editLogo">
                <img src={logo()} width="250" height="35" className="pl-3 show-logo" />
                <img src={logos()} className="hide-logo" />
              </label>
            </div>
            {user?.logo ? (
              <div
                className="flex justify-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <img
                  src={methodModel.userImg(user?.logo || "")}
                  alt="photo"
                  width="40"
                  height="40"
                  style={{
                    width: "40px",
                    marginBottom: "2px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ) : null}
            <Sidebar isOpen={isOpen} />
          </div>



          {/* <div className="main-sidebar  d-md-block">

            <div className="sidebar-brand p-3 pt-4  text-left pl-5">
              <label className='editLogo'>
                <img src={logo()} className="logocls show-logo" />
                <img src={logos()} className=" hide-logo" />
              </label>

            </div>
            <Sidebar />
          </div> */}
          <main className="main">
            <div className="mainarea">{children}</div>
          </main>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};
export default Layout;

/*
 * @file: main.tsx
 * @description: App Configration
 * @date: 27 Feb 2024
 * @author: Mohit
 * */

import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import configureStore from './config';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import Profile from './pages/Profile'
import Settings from './pages/Settings';

import "react-pagination-js/dist/styles.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-phone-input-2/lib/style.css'
import './scss/main.scss';

import ContactDetails from './pages/Settings/ContactDetails';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Users from './pages/Users';
import AddEditUser from './pages/Users/AddEditUser';
import UserDetail from './pages/Users/Profiledetail';
import Roles from './pages/Roles';
import AddEditRole from './pages/Roles/AddEdit';
import LogoSetting from './pages/Setting/index';
import Categories from './pages/Categories';
import AddEditCategory from './pages/Categories/AddEdit';
import CategoryDetail from './pages/Categories/Detail';
import Types from './pages/CategoriesType';
import AddEditTypes from './pages/CategoriesType/AddEdit';
import Features from './pages/Features';
import AddEditFeature from './pages/Features/AddEdit';
import Plans from './pages/Plans';
import AddEditPlan from './pages/Plans/AddEdit';
import Currency from './pages/CurrencyPages';
import AddEditCurrency from './pages/CurrencyPages/AddEditCurrency';
import CurrencyDetail from './pages/CurrencyPages/Detail';
import ApplyCurrency from './pages/CurrencyPages/Applycurrencys';
import Customer from "./pages/Customers";
import AddEditCustomer from "./pages/Customers/AddEdit";
import ViewCustomer from "./pages/Customers/Profiledetail";
import ParticipantType from "./pages/ParticipantType";
import AddEditParticipantType from "./pages/ParticipantType/AddEdit";
import Skills from "./pages/Skills";
import AddEditSkills from "./pages/Skills/AddEdit";
import Group from "./pages/Group";
import AddEditGroup from "./pages/Group/AddEdit";
import Certification from "./pages/Certification";
import AddEditCertification from "./pages/Certification/AddEdit";
import Content from "./pages/Content";
import AddEditContent from "./pages/Content/AddEdit";
import SkillsRoles from "./pages/SkillsRoles";
import AddEditSkillsRoles from "./pages/SkillsRoles/AddEdit";
import Event from "./pages/Events";
import AddEditEvent from "./pages/Events/AddEdit";
import ViewEvent from "./pages/Events/View";
import Member from './pages/Group/view';
import { ToastContainer } from 'react-toastify';
import AboutUs from './pages/ContactUs';


/************ store configration *********/
const { persistor, store } = configureStore();

export default () => {

    return (<>
     <Provider store={store}>
        <PersistGate loading={"loading ..."} persistor={persistor}>
        <Router>
                    <Routes>
                            <Route exact={true} path="/dashboard" Component={Dashboard} />
                            <Route exact={true} path="/dashboardpage" Component={DashboardPage} />
                            <Route exact={true} path="/setting" Component={LogoSetting} />
                            <Route exact={true} path="/settings/appointment/contact-details" Component={ContactDetails} />
                            <Route exact={true} path="/users"  Component={Users} />
                            
                            <Route exact={true} path="/roles" Component={Roles} />
                            <Route exact={true} path="/roles/add"  Component={AddEditRole} />
                            <Route exact={true} path="/roles/edit/:userid"  Component={AddEditRole} />
                            <Route exact={true} path="/users/add"  Component={AddEditUser} />
                            <Route exact={true} path="/users/:role"  Component={Users} />
                            <Route exact={true} path="/users/edit/:userid"  Component={AddEditUser} />
                            <Route exact={true} path="/users/:role/add"  Component={AddEditUser} />
                            <Route exact={true} path="/users/:role/edit/:id"  Component={AddEditUser} />
                            <Route exact={true} path="/userDetail/:id"  Component={UserDetail} />
                            <Route exact={true} path="/profile"  Component={Profile} />
                            <Route exact={true} path="/profile/:tab"  Component={Settings} />
                            <Route exact={true} path="/login"  Component={Login} />
                            <Route exact={true} path="/forgotpassword"  Component={Forgotpassword} />
                            <Route exact={true} path="/resetpassword"  Component={Resetpassword} />

                            <Route exact={true} path="/categories" Component={Categories} />
                            <Route exact={true} path="/categories/add" Component={AddEditCategory} />
                            <Route exact={true} path="/categories/edit/:userid" Component={AddEditCategory} />
                            <Route exact={true} path="/category/:type" Component={Categories} />
                            <Route exact={true} path="/category/:type/add" Component={AddEditCategory} />
                            <Route exact={true} path="/category/:type/edit/:id" Component={AddEditCategory} />
                            <Route exact={true} path="/categoryDetail/:id" Component={CategoryDetail} />
                            {/* Categories Type */}
                            <Route exact={true} path="/types" Component={Types} />
                            <Route exact={true} path="/types/add" Component={AddEditTypes} />
                            <Route exact={true} path="/types/edit/:typeid" Component={AddEditTypes} />
                             {/* Feature */}
                             <Route exact={true} path="/features" Component={Features} />
                            <Route exact={true} path="/features/add" Component={AddEditFeature} />
                            <Route exact={true} path="/features/edit/:userid" Component={AddEditFeature} />
                            {/* Plans */}
                            <Route exact={true} path="/plans" Component={Plans} />
                            <Route exact={true} path="/plans/add" Component={AddEditPlan} />
                            <Route exact={true} path="/plans/edit/:planid/:copy" Component={AddEditPlan} />
                            {/* Participent Type */}
                            <Route exact={true} path="/participant-type" Component={ParticipantType} />
                            <Route exact={true} path="/participant-type/add" Component={AddEditParticipantType} />
                            <Route exact={true} path="/participant-type/edit/:editid" Component={AddEditParticipantType} />
                            {/* Skills */}
                            <Route exact={true} path="/skills" Component={Skills} />
                            <Route exact={true} path="/skills/add" Component={AddEditSkills} />
                            <Route exact={true} path="/skills/edit/:editid" Component={AddEditSkills} />
                            {/* Skills Roles*/}
                            <Route exact={true} path="/skill-roles" Component={SkillsRoles} />
                            <Route exact={true} path="/skill-roles/add" Component={AddEditSkillsRoles} />
                            <Route exact={true} path="/skill-roles/edit/:rolesid" Component={AddEditSkillsRoles} />
                            {/* Group */}
                            <Route exact={true} path="/group" Component={Group} />
                            <Route exact={true} path="/group/add" Component={AddEditGroup} />
                            <Route exact={true} path="/group/edit/:editid" Component={AddEditGroup} />
                            <Route exact={true} path="/member/:viewid" Component={Member} />
                            {/* Certification */}
                            <Route exact={true} path="/certification" Component={Certification} />
                            <Route exact={true} path="/certification/add" Component={AddEditCertification} />
                            <Route exact={true} path="/certification/edit/:editid" Component={AddEditCertification} />
                            {/* Events */}
                            <Route exact={true} path="/event" Component={Event} />
                            <Route exact={true} path="/event/add" Component={AddEditEvent} />
                            <Route exact={true} path="/event/edit/:editid" Component={AddEditEvent} />
                            <Route exact={true} path="/event/detail/:detailid" Component={ViewEvent} />
                            {/* Content */}
                            <Route exact={true} path="/content" Component={Content} />
                            <Route exact={true} path="/content/add" Component={AddEditContent} />
                            <Route exact={true} path="/content/edit/:editid" Component={AddEditContent} />
                             {/* Currency */}
                             <Route exact={true} path="/currency" Component={Currency} />
                            <Route exact={true} path="/currency/add" Component={AddEditCurrency} />
                            <Route exact={true} path="/currency/edit/:editid" Component={AddEditCurrency} />
                            <Route exact={true} path="/currency/:id" Component={CurrencyDetail} />
                            {/* Apply Currency */}
                            <Route exact={true} path="/applycurrency" Component={ApplyCurrency} />
                            <Route exact={true} path="/customer" Component={Customer} />
                            <Route exact={true} path="/customer/add" Component={AddEditCustomer} />
                            <Route exact={true} path="/customer/edit/:editid" Component={AddEditCustomer} />
                            <Route exact={true} path="/customer/view/:viewid" Component={ViewCustomer} />
                            <Route exact={true} path="/aboutus" Component={AboutUs} />
                            <Route exact path="/" element={<Navigate to="/login" />} />
                            </Routes>
                    </Router>
    </PersistGate>
    </Provider>
     <div id="loader" className="loaderDiv d-none">
            <div>
                <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
            </div>
        </div>
        <ToastContainer position="top-right" />
       
    </>
    );
};

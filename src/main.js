/*
 * @file: main.tsx
 * @description: App Configration
 * @date: 27 Feb 2024
 * @author: Mohit
 * */

import React from 'react';
import {
    ToastsContainer,
    ToastsStore,
    ToastsContainerPosition
} from 'react-toasts';
import { PersistGate } from 'redux-persist/es/integration/react';
import "react-datepicker/dist/react-datepicker.css";
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import configureStore from './config';
import { createBrowserHistory } from 'history';
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


export const history = createBrowserHistory();
/************ store configration *********/
const { persistor, store } = configureStore(history);

export default () => {

    return (<>
        <Provider store={store}>
            <PersistGate loading={'loading ...'} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Router>
                        <Switch>
                            <Route exact={true} path="/dashboard" component={Dashboard} />
                            <Route exact={true} path="/dashboardpage" component={DashboardPage} />
                            <Route exact={true} path="/setting" component={LogoSetting} />
                            <Route exact={true} path="/settings/appointment/contact-details" component={ContactDetails} />
                            <Route exact={true} path="/users"  component={Users} />
                            
                            <Route exact={true} path="/roles" component={Roles} />
                            <Route exact={true} path="/roles/add"  component={AddEditRole} />
                            <Route exact={true} path="/roles/edit/:id"  component={AddEditRole} />
                            <Route exact={true} path="/users/add"  component={AddEditUser} />
                            <Route exact={true} path="/users/:role"  component={Users} />
                            <Route exact={true} path="/users/edit/:id"  component={AddEditUser} />
                            <Route exact={true} path="/users/:role/add"  component={AddEditUser} />
                            <Route exact={true} path="/users/:role/edit/:id"  component={AddEditUser} />
                            <Route exact={true} path="/userDetail/:id"  component={UserDetail} />
                            <Route exact={true} path="/profile"  component={Profile} />
                            <Route exact={true} path="/profile/:tab"  component={Settings} />
                            <Route exact={true} path="/login"  component={Login} />
                            <Route exact={true} path="/forgotpassword"  component={Forgotpassword} />
                            <Route exact={true} path="/resetpassword"  component={Resetpassword} />

                            <Route exact={true} path="/categories" component={Categories} />
                            <Route exact={true} path="/categories/add" component={AddEditCategory} />
                            <Route exact={true} path="/categories/edit/:id" component={AddEditCategory} />
                            <Route exact={true} path="/category/:type" component={Categories} />
                            <Route exact={true} path="/category/:type/add" component={AddEditCategory} />
                            <Route exact={true} path="/category/:type/edit/:id" component={AddEditCategory} />
                            <Route exact={true} path="/categoryDetail/:id" component={CategoryDetail} />
                            {/* Categories Type */}
                            <Route exact={true} path="/types" component={Types} />
                            <Route exact={true} path="/types/add" component={AddEditTypes} />
                            <Route exact={true} path="/types/edit/:id" component={AddEditTypes} />
                             {/* Feature */}
                             <Route exact={true} path="/features" component={Features} />
                            <Route exact={true} path="/features/add" component={AddEditFeature} />
                            <Route exact={true} path="/features/edit/:id" component={AddEditFeature} />
                            {/* Plans */}
                            <Route exact={true} path="/plans" component={Plans} />
                            <Route exact={true} path="/plans/add" component={AddEditPlan} />
                            <Route exact={true} path="/plans/edit/:id/:copy" component={AddEditPlan} />
                            {/* Participent Type */}
                            <Route exact={true} path="/participant-type" component={ParticipantType} />
                            <Route exact={true} path="/participant-type/add" component={AddEditParticipantType} />
                            <Route exact={true} path="/participant-type/edit/:id" component={AddEditParticipantType} />
                            {/* Skills */}
                            <Route exact={true} path="/skills" component={Skills} />
                            <Route exact={true} path="/skills/add" component={AddEditSkills} />
                            <Route exact={true} path="/skills/edit/:id" component={AddEditSkills} />
                            {/* Skills Roles*/}
                            <Route exact={true} path="/skill-roles" component={SkillsRoles} />
                            <Route exact={true} path="/skill-roles/add" component={AddEditSkillsRoles} />
                            <Route exact={true} path="/skill-roles/edit/:id" component={AddEditSkillsRoles} />
                            {/* Group */}
                            <Route exact={true} path="/group" component={Group} />
                            <Route exact={true} path="/group/add" component={AddEditGroup} />
                            <Route exact={true} path="/group/edit/:id" component={AddEditGroup} />
                            {/* Certification */}
                            <Route exact={true} path="/certification" component={Certification} />
                            <Route exact={true} path="/certification/add" component={AddEditCertification} />
                            <Route exact={true} path="/certification/edit/:id" component={AddEditCertification} />
                            {/* Events */}
                            <Route exact={true} path="/event" component={Event} />
                            <Route exact={true} path="/event/add" component={AddEditEvent} />
                            <Route exact={true} path="/event/edit/:id" component={AddEditEvent} />
                            <Route exact={true} path="/event/detail/:id" component={ViewEvent} />
                            {/* Content */}
                            <Route exact={true} path="/content" component={Content} />
                            <Route exact={true} path="/content/add" component={AddEditContent} />
                            <Route exact={true} path="/content/edit/:id" component={AddEditContent} />
                             {/* Currency */}
                             <Route exact={true} path="/currency" component={Currency} />
                            <Route exact={true} path="/currency/add" component={AddEditCurrency} />
                            <Route exact={true} path="/currency/edit/:id" component={AddEditCurrency} />
                            <Route exact={true} path="/currency/:id" component={CurrencyDetail} />
                            {/* Apply Currency */}
                            <Route exact={true} path="/applycurrency" component={ApplyCurrency} />
                            <Route exact={true} path="/customer" component={Customer} />
                            <Route exact={true} path="/customer/add" component={AddEditCustomer} />
                            <Route exact={true} path="/customer/edit/:id" component={AddEditCustomer} />
                            <Route exact={true} path="/customer/view/:id" component={ViewCustomer} />

                            <Route exact path="/">
                                <Redirect to="/login" />
                            </Route>
                        </Switch>
                    </Router>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
        <div id="loader" className="loaderDiv d-none">
            <div>
                <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
            </div>
        </div>
        <ToastsContainer
            position={ToastsContainerPosition.TOP_RIGHT}
            store={ToastsStore}
        />
    </>
    );
};

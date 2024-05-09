import React from 'react';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Html from './Html';
import permissionModel from '../../../models/permisstion.model';
import environment from '../../../environment';

const Sidebar = ({ isOpen }) => {
  const user = useSelector(state => state.user)
  const history = useNavigate()
  const menus = {
    user: ['roles', 'users'],
    catalogue: ['types', 'categories', 'category/'],
    plan: ['features', 'plans'],
    api: ['bookingSystem', 'pos', 'reviews', 'accountingSystem'],
    geo: ['continents', 'countries', 'regions', 'cities'],
    dynamicPricing: ['dynamicprice'],
    skills: ['skills','skill-roles'],
    customer: ['customer','skill-roles'],
  }

  const ListItemLink = ({ to, type = 'link', disabled = false, ...rest }) => {
    let url = location.href
    const host = location.host
    url = url.split(host)[1]
    return (<>
      {type == 'link' ? <li className={`nav-item ${url.includes(to) ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
        {/* {...rest} */}
        <Link to={to} {...rest} className="" />
      </li> : <li className={`nav-item main ${url.includes(to) ? 'active' : ''}`} {...rest}></li>}
    </>
    );
  };

  const tabclass = (tab) => {
    let url = location.href
    let value = false
    menus[tab].map(itm => {
      if (url.includes(itm)) value = true
    })
    return value
  }

  const isAllow = (url = '') => {
    let permissions = user.roleDetail?.permissions
    let arr = url.split(',')
    let value = false
    arr.map(itm => {
      if(permissions?.[itm]) value = permissions?.[itm]
    })

    if(user.roleDetail?._id==environment.adminRoleId)value=true
    return value
}

  const route = (p) => {
    history(p)
  }

  return <>
    <Html
      route={route}
      user={user}
      tabclass={tabclass}
      urlAllow={isAllow}
      ListItemLink={ListItemLink}
      isOpen={isOpen}
    />
  </>
};

export default Sidebar;

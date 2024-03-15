import React from 'react';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Html from './Html';
import permissionModel from '../../../models/permisstion.model';

const Sidebar = ({ isOpen }) => {
  const user = useSelector(state => state.user)
  const history = useHistory()
  const menus = {
    user: ['roles', 'users'],
    catalogue: ['types', 'categories', 'category/'],
    plan: ['features', 'plans'],
    api: ['bookingSystem', 'pos', 'reviews', 'accountingSystem'],
    geo: ['continents', 'countries', 'regions', 'cities'],
    dynamicPricing: ['dynamicprice'],
    skills: ['skills','skill-roles'],
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

  const urlAllow = (url) => {
    let permissions = user.roleDetail?.permissions?.[0]
    let arr = url.split(',')
    let value = false
    arr.map(itm => {
      if (permissionModel.urlAllow(permissions, itm)) value = true
    })

    // return value
    return true
  }

  const route = (p) => {
    history.push(p)
  }

  return <>
    <Html
      route={route}
      tabclass={tabclass}
      urlAllow={urlAllow}
      ListItemLink={ListItemLink}
      isOpen={isOpen}
    />
  </>
};

export default Sidebar;

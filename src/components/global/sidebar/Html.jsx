import React from "react";
import { Disclosure, Transition } from "@headlessui/react";
import styles from "./index.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { RiHome6Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";
import { RiPresentationLine } from "react-icons/ri";
import { GrCatalogOption, GrUserExpert } from "react-icons/gr";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdCurrencyExchange, MdOutlineContentPaste, MdOutlineEmojiEvents, MdOutlineSubscriptions } from "react-icons/md";
import { PiCertificateLight } from "react-icons/pi";


const Html = ({ ListItemLink, tabclass, urlAllow, route, isOpen,user }) => {
  const location = useLocation();


  const menus = [
    {
      name: 'Main Menu',
    },
    {
      name:'Dashboard',
      icon:<RiHome6Line className="text-[#fff] shrink-0 text-lg" />,
      url:'/dashboard',
      key:'readDashboard',
    },
    {
      name: 'Staff',
      icon: <FiUsers className="text-[#fff] shrink-0 text-lg" />,
      key: 'readUsers,readRoles',
      tab: 'user',
      menu: [
        {
          name: 'Staff Roles',
          url: '/roles',
          key: 'readRoles'
        },
        {
          name: 'Staff',
          url: '/users',
          key: 'readUsers'
        },
      ]
    },
    {
      name: 'Catalogue',
      icon: <GrCatalogOption className="text-[#fff] shrink-0 text-lg" />,
      key: 'readCategory',
      tab: 'catalogue',
      menu: [
        {
          name: 'Types',
          url: '/types',
          key: 'readCategory'
        },
        {
          name: 'Categories',
          url: '/categories',
          key: 'readCategory'
        },
      ]
    },
    {
      name: 'Subscription Plan',
      icon: <MdOutlineSubscriptions className="text-[#fff] shrink-0 text-lg" />      ,
      key: 'readPlan',
      tab: 'plan',
      menu: [
        {
          name: 'Features',
          url: '/features',
          key: 'readPlan'
        },
        {
          name: 'Plans',
          url: '/plans',
          key: 'readPlan'
        },
      ]
    },
    {
      name: 'Currency',
      icon:<MdCurrencyExchange className="text-[#fff] shrink-0 text-lg" />      ,
      url: '/currency',
      key: 'readCurrency',
    },
    {
      name: 'Frontend Users',
      icon: <RiPresentationLine className="text-[#fff] shrink-0 text-lg" />,
      key: 'readCustomers',
      tab: 'customer',
      menu: [
        // {
        //   name: 'Frontend User Roles',
        //   url: '/skill-roles',
        //   key: 'readCustomers'
        // },
        {
          name: 'Frontend Users',
          url: '/customer',
          key: 'readCustomers'
        },
      ]
    },
    {
      name: 'Participant Type',
      icon: <RiHome6Line className="text-[#fff] shrink-0 text-lg" />,
      url: '/participant-type',
      key: 'readParticipantTypes',
    },
    {
      name: 'Skills',
      icon: <GrUserExpert className="text-[#fff] shrink-0 text-lg" />,
      url: '/skills',
      key: 'readSkills',
    },
    {
      name: 'Group',
      icon: <AiOutlineUsergroupAdd className="text-[#fff] shrink-0 text-lg" /> ,
      url: '/group',
      key: 'readGroup',
    },
    {
      name: 'Certification',
      icon: <PiCertificateLight className="text-[#fff] shrink-0 text-lg" />      ,
      url: '/certification',
      key: 'readCertification',
    },
    {
      name: 'Content Management',
      icon: <MdOutlineContentPaste className="text-[#fff] shrink-0 text-lg" />      ,
      url: '/content',
      key: 'readContent',
    },
    {
      name: 'Events',
      icon: <MdOutlineEmojiEvents className="text-[#fff] shrink-0 text-lg" />,
      url: '/event',
      key: 'readEvents',
    },
    {
      name: 'Contact Us',
      icon: <AiOutlineUsergroupAdd className="text-[#fff] shrink-0 text-lg" /> ,
      url: '/contactus',
      key: 'readGroup',
    },
  ]

  return (
    <>

      <div className={`px-[8px] ${isOpen && styles.sm_sidebar}`} component="siderbar">

        <ul className="space-y-2 px-2" >
          {menus.map(itm => {
            return <>
              {itm.icon ? <>
                <li>
                  {itm.menu ? <>
                  {urlAllow(itm.key)?<>
                    <Disclosure as="div" defaultOpen={tabclass(itm.tab)}>
                      {({ open }) => (
                        <>
                          <Tooltip placement="right" title={itm.name}>
                            <Disclosure.Button className="w-full p-2.5 rounded-md flex items-center justify-between text-[#4A545E]  hover:!text-[#5577FF] gap-[12px] hover:bg-[#5577FF]/10 transition-all duration-300">

                              <span className="text-sm font-normal text-inherit flex items-center gap-[12px] crm">
                                {itm.icon}
                                <span className=" text-white leading-none sidebar_text"> {itm.name}</span>

                              </span>

                              <TiArrowSortedDown
                                className={`${open ? "" : "-rotate-90 transform"
                                  } h-4 w-4 transition-all duration-500  text-[#7E8B99]`}
                              />
                            </Disclosure.Button>
                          </Tooltip>
                          <Transition
                            enter="transition duration-300 ease-in-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-300 opacity-300"
                            leave="transition duration-300 ease-in-out"
                            leaveFrom="transform scale-300 opacity-300"
                            leaveTo="transform scale-95 opacity-0">
                            <Disclosure.Panel className="pl-[30px] mt-[4px] ">
                              <ul className="space-y-2">
                                {itm.menu.map(sitm => {
                                  return <>
                                    {urlAllow(sitm.key) ? <li> <NavLink className={(isActive) =>
                                      "p-2.5 rounded-md block text-sm font-normal text-[#ef7a2b] cursor-pointer hover:!text-[#fff ] hover:bg-[#5577FF]/10 !no-underline transition-all " +
                                      (location?.pathname == sitm.url &&
                                        " !text-[#ef7a2b] !bg-[#ef7a2b]/10 !font-medium")
                                    } to={sitm.url}>

                                      <span className="text-inherit leading-none sidebar_text" title={sitm.name}> {sitm.name}</span>
                                    </NavLink></li> : null}
                                  </>
                                })}
                              </ul>


                            </Disclosure.Panel>
                          </Transition>
                        </>
                      )}
                    </Disclosure>
                  </>:<></>}
               
                  </> : <>
                    {urlAllow(itm.key) ? <>
                      <Tooltip placement="right" title={itm.name}>
                        <NavLink
                          to={itm.url}
                          className={(isActive) =>
                            "p-2.5 rounded-md flex items-center gap-[12px] text-sm font-normal text-[#fff] hover:!text-[#fff] hover:bg-[#00b884]/10 !no-underline transition-all " +
                            (location?.pathname == itm.url && " !text-[#fff] !bg-[#ef7a2b] !font-medium")
                          }>

                          {itm.icon}
                          <span className="!text-white leading-none sidebar_text">{itm.name}</span>

                        </NavLink>
                      </Tooltip>
                    </> : <></>}
                  </>}
                </li>
              </> : <>
                <li>
                  <h6
                    className={`${isOpen ? "py-[12px] text-center " : "p-[12px]"
                      } text-md font-medium text-[#fff] mt-[20px] text-center`} t>
                    <span className=" sidebar_text"> {itm.name} </span>
                  </h6>
                </li>
              </>}

            </>
          })}

        </ul>
      </div>
    </>
  );
}

export default Html
import React, { useEffect, useState } from 'react';
import Layout from '../../components/global/layout';
import './style.scss';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import SelectDropdown from '../../components/common/SelectDropdown';
import { Tooltip } from "antd";
import { PiFileCsv } from "react-icons/pi";
import { HiOutlineArrowDown } from "react-icons/hi";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { BsEnvelope, BsTrash3 } from "react-icons/bs";
import Table from '../../components/Table';
import shared from './shared';
import environment from '../../environment';
import Modal from "../../components/common/Modal";
import SendEmail from './SendEmail';
import ApiClient from '../../methods/api/apiClient';
import { IoEyeOutline } from "react-icons/io5";
import RolesList from './RolesList';


const Html = ({
    approveDecline,
    sorting,
    statusChange,
    pageChange,
    deleteItem,
    filters,
    filter,
    loaging,
    data,
    exportfun,
    edit,
    view,
    total,
    reset,
    isAllow,count
}) => {
    const blockDateChange = (e) => {
        console.log("e", e)
        filter({
            endDate: datepipeModel.datetostring(e.endDate),
            startDate: datepipeModel.datetostring(e.startDate),
        })
    }

    const [modal, setModel] = useState(false)
    const [isRModal, setIsRModal] = useState(false)
    const [roleList ,setRolesList] = useState("")
    const [item, setItem] = useState()

    // const columns = [
    //     {
    //         key: 'fullName', name: 'Name', sort: true,
    //         render: (itm) => {
    //             return <>
    //                 <div className='user_detail'>
    //                     <img src={methodModel.userImg(itm.image)} className="user_imgs" />
    //                     <div className='user_name'>
    //                         <h4 className='user capitalize'>
    //                             {itm.fullName}
    //                         </h4>
    //                         <p className='user_info'>
    //                             {itm.email}
    //                         </p>
    //                         <p className='user_info'>
    //                             {itm.mobileNo ? <>+{itm.mobileNo}</> : ''}
    //                         </p>
    //                     </div>
    //                 </div>
    //             </>
    //         }
    //     },
    //     {
    //         key: 'customerRole', name: 'Role',
    //         render: (row) => {
    //             return <>
    //                 {row.customerRoleDetails?.name}
    //             </>
    //         }
    //     },
    //     {
    //         key: 'loginId', name: 'Login Id',
    //         render: (row) => {
    //             return <>
    //                 {row?.loginId}
    //             </>
    //         }
    //     },
    //     {
    //         key: 'groupId', name: 'Group',
    //         render: (row) => {
    //             return <span className='capitalize'>
    //                 {row.groupIdDetails?.name}
    //             </span>
    //         }
    //     },
        
    //     {
    //         key: 'Planname', name: 'Plan Name',
    //         render: (row) => {
    //             return <span className='capitalize'>
    //                 {row?.planName}
    //             </span>
    //         }
    //     },
    //     {
    //         key: 'validUpTo', name: 'valid Up To ',
    //         render: (row) => {
    //             return <span className='capitalize'>
                  
    //                 {datepipeModel.date(row.planDetails?.validUpTo)}
    //             </span>
    //         }
    //     },
    //     {
    //         key: 'Approve/Decline', name: 'Approve/Decline',
    //         render: (row) => {
    //             return <>
    //                 {row.customerRole == environment.glRoleId ? <>
    //                     {row.verifiedGroupLeader ? <>
    //                         {row.verifiedGroupLeader == 'approved' ? <>
    //                             <div className='text-green-600'>Approved</div>
    //                         </> : <>
    //                             <div className='text-red-600'>Declined</div>
    //                         </>}
    //                     </> : <>
    //                         <div className='flex gap-2'>
    //                             <button type="button" onClick={() => approveDecline(row, 'approved')} class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-5 py-2 px-3 text-center">Approve</button>
    //                             <button type="button" onClick={() => approveDecline(row, 'declined')} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs py-2 px-3 text-center">Decline</button>
    //                         </div>
    //                     </>}

    //                 </> : <>
    //                     <div className='text-green-600'>Approved</div>
    //                 </>}
    //             </>
    //         }
    //     },
    //     {
    //         key: 'createdAt', name: 'Created At', sort: true,
    //         render: (row) => {
    //             return <>
    //                 {datepipeModel.date(row?.createdAt)}
    //             </>
    //         }
    //     },
     
    //     // {
    //     //     key: 'updatedAt', name: 'Updated At',sort: true,
    //     //     render: (row) => {
    //     //         return <>
    //     //             {datepipeModel.datetime(row?.updatedAt)}
    //     //         </>
    //     //     }
    //     // },
    
    //     {
    //         key: 'status', name: 'Status',
    //         render: (row) => {
    //             return <>
    //                 <div className='w-32' onClick={() => statusChange(row)}>
    //                     <Tooltip placement="top" title="Active / Inactive">
    //                         <span className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB]  text-white !rounded capitalize ${row.status === 'active' ? 'bg-green-400' : 'bg-red-400 '}`}>
    //                             {row.status == 'deactive' ? 'inactive' : 'active'}
    //                         </span>
    //                     </Tooltip>
    //                 </div>
    //             </>
    //         }
    //     },
    //     {
    //         key: 'action', name: 'Action',
    //         render: (itm) => {
    //             return <>
    //                 <div className="flex items-center justify-start gap-1.5">
    //                     <Tooltip placement="top" title="View">
    //                         <a className="border cursor-pointer border-[#ff7641] hover:opacity-70 rounded-lg bg-[#ff764114] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => view(itm.id)}>
    //                             <span class="material-symbols-outlined">visibility</span>
    //                         </a>
    //                     </Tooltip>
    //                     {isAllow(`edit${shared.check}`) ?
    //                         <Tooltip placement="top" title="Edit">
    //                             <a className="border cursor-pointer border-[#ff7641] hover:opacity-70 rounded-lg bg-[#ff764114] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => edit(itm.id)}>
    //                                 <FiEdit3 />
    //                             </a>
    //                         </Tooltip>
    //                         : <></>}
    //                     {isAllow(`delete${shared.check}`) ? <Tooltip placement="top" title="Delete"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl ' onClick={() => deleteItem(itm.id)}>
    //                         <BsTrash3 />
    //                     </span> </Tooltip> : <></>}

    //                     <Tooltip placement="top" title="Send Email"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl ' onClick={() => sendEmail(itm)}>
    //                         <BsEnvelope />
    //                     </span> </Tooltip>
    //                 </div>
    //             </>
    //         }
    //     },
    // ]
    const columns = [
        {
                    key: 'fullName', name: 'Name', sort: true,
                    render: (itm) => {
                        return <>
                            <div className='user_detail'>
                                <img src={methodModel.userImg(itm.image)} className="user_imgs" />
                                <div className='user_name'>
                                    <h4 className='user capitalize'>
                                        {itm.fullName}
                                    </h4>
                                    <p className='user_info'>
                                        {itm.email}
                                    </p>
                                    <p className='user_info'>
                                        {itm.mobileNo ? <>+{itm.mobileNo}</> : ''}
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                },
                {
                    key: 'customerRole', name: 'Role',
                    render: (row) => {
                        return <>
                           <div className='flex flex-col items-center gap-2'>
                           {row.customerRoleDetails?.name ?<> {row.customerRoleDetails?.name} <p className='bg-gray-200  rounded-sm inline-flex px-2 py-1 text-[12px] 'onClick={e=>{setIsRModal(true), setRolesList(row?.allGroupDetails)}}>See More</p> </>:""}
                           {/* {row.customerRoleDetails?.name} <p className='bg-gray-200  rounded-sm inline-flex px-2 py-1 text-[12px] 'onClick={e=>{setIsRModal(true), setRolesList(row?.allGroupDetails)}}>See More</p> */}
                           </div>
                        </>
                    }
                },
                {
                    key: 'loginId', name: 'Login Id',
                    render: (row) => {
                        return <>
                            {row?.loginId}
                        </>
                    }
                },
                {
                    key: 'groupId', name: 'Group',
                    render: (row) => {
                        return <span className='capitalize flex flex-col items-center gap-2'>
                            {row.groupIdDetails?.name ?<> {row.groupIdDetails?.name} <p className='bg-gray-200  rounded-sm inline-flex px-2 py-1 text-[12px] 'onClick={e=>{setIsRModal(true), setRolesList(row?.allGroupDetails)}}>See More</p> </>:""}
                        </span>
                    }
                },
        ...(filters?.customerRole === environment?.glRoleId
            ? [
                {
                    key: 'Planname', name: 'Plan Name',
                    render: (row) => {
                        return <span className='capitalize'>{row?.planName ? row?.planName : "--"}</span>;
                    }
                },
                {
                    key: 'Purchase', name: 'Plan Purchase Date',
                    render: (row) => {
                        return <span className='capitalize !w-24 inline-flex'>{datepipeModel.date(row.planDetails?.createdAt)}</span>;
                    }
                },
                {
                    key: 'validUpTo', name: 'Valid Up To',
                    render: (row) => {
                        return <span className='capitalize !w-24 inline-flex'>{datepipeModel.date(row.planDetails?.validUpTo)}</span>;
                    }
                }
            ]
            : []
        ),
        {
            key: 'Approve/Decline', name: 'Approve/Decline',
            render: (row) => {
                return <>
                    {row.customerRole == environment.glRoleId ? <>
                        {row.verifiedGroupLeader ? <>
                            {row.verifiedGroupLeader == 'approved' ? <>
                                <div className='text-green-600'>Approved</div>
                            </> : <>
                                <div className='text-red-600'>Declined</div>
                            </>}
                        </> : <>
                            <div className='flex gap-2'>
                                <button type="button" onClick={() => approveDecline(row, 'approved')} class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs px-5 py-2 px-3 text-center">Approve</button>
                                <button type="button" onClick={() => approveDecline(row, 'declined')} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs py-2 px-3 text-center">Decline</button>
                            </div>
                        </>}

                    </> : <>
                        <div className='text-green-600'>Approved</div>
                    </>}
                </>
            }
        },
        {
            key: 'createdAt', name: 'Created At', sort: true,
            render: (row) => {
                return <>
                  <div className='!w-24 '>  {datepipeModel.date(row?.createdAt)}</div>
                </>
            }
        },
     
        // {
        //     key: 'updatedAt', name: 'Updated At',sort: true,
        //     render: (row) => {
        //         return <>
        //             {datepipeModel.datetime(row?.updatedAt)}
        //         </>
        //     }
        // },
    
        {
            key: 'status', name: 'Status',
            render: (row) => {
                return <>
                    <div className='w-32' onClick={() => statusChange(row)}>
                        <Tooltip placement="top" title="Active / Inactive">
                            <span className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB]  text-white !rounded capitalize ${row.status === 'active' ? 'bg-green-400' : 'bg-red-400 '}`}>
                                {row.status == 'deactive' ? 'inactive' : 'active'}
                            </span>
                        </Tooltip>
                    </div>
                </>
            }
        },
        {
            key: 'action', name: 'Action',
            render: (itm) => {
                return <>
                    <div className="flex items-center justify-start gap-1.5">
                        <Tooltip placement="top" title="View">
                            <a className="border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md" onClick={e => view(itm.id)}>
                            <IoEyeOutline />

                            </a>
                        </Tooltip>
                        {isAllow(`edit${shared.check}`) ?
                            <Tooltip placement="top" title="Edit">
                                <a className="border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md" onClick={e => edit(itm.id)}>
                                    <FiEdit3 />
                                </a>
                            </Tooltip>
                            : <></>}
                        {isAllow(`delete${shared.check}`) ? <Tooltip placement="top" title="Delete"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md ' onClick={() => deleteItem(itm.id)}>
                            <BsTrash3 />
                        </span> </Tooltip> : <></>}

                        <Tooltip placement="top" title="Send Email"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md ' onClick={() => sendEmail(itm)}>
                            <BsEnvelope />
                        </span> </Tooltip>
                    </div>
                </>
            }
        },
    ];
    
    const sendEmail = (itm) => {
        // setItem(itm)
        // setModel(true)
        window.open(`mailto:${itm.email}`)
    }

    const [groups, setGroup] = useState([])

    const getGroups = () => {
        let f = {
            page: 1,
            count: 10
        }
        ApiClient.get('api/group/list', f).then(res => {
            if (res.success) {
                setGroup(res.data)
            }
        })
    }

    const [roles, setRoles] = useState([])

    const getRoles = () => {
        let f = {
            page: 1,
            count: 10
        }
        ApiClient.get('api/skillRole/list', f).then(res => {
            if (res.success) {
                setRoles(res.data)
            }
        })
    }

    useEffect(() => {
        getGroups()
        getRoles()
    }, [])

    return (
        <>
            <Layout>
                <div className="flex justify-between items-center mb-6">


                    <div>
                        <h3 className="text-2xl font-semibold text-[#111827]">
                            {shared.title}
                        </h3>
                        <p class="text-sm font-normal text-[#75757A]">Here you can see all about your {shared.title}</p>
                    </div>


                    <div className="flex">
                        <div className="buttons_Section filterFlex">

                            <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                                <PiFileCsv className="text-typo text-xl" />  Export CSV
                            </button>
                            {isAllow(`add${shared.check}`) ? <>
                                <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to={`/customer/add`}>
                                    <FiPlus className="text-xl text-white" />  Create new
                                </Link>
                            </> : <></>}



                        </div>

                    </div>
                </div>


                <div className='bg-white shadow-box rounded-lg w-full mt-6'>
                    <div className='selcitng p-4'>
                        <div className='flex justify-between items-center gap-4'>

                            <div className='flex items-stretch gap-4'>
                                {/* <div className='w-80'>
                                <SelectDropdown
                                    isSingle={true}
                                    id="plansDropdown"
                                    displayValue="name"
                                    placeholder='All Plans'
                                    intialValue={filters.plan}
                                    theme='search'
                                    result={e => filter({ plan: e.value })}
                                    options={plans}
                                />

                            </div> */}
                                <SelectDropdown
                                    isSingle={true}
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder='All Status'
                                    intialValue={filters.status}
                                    theme='search'
                                    result={e => filter({ status: e.value })}
                                    options={[
                                        { id: 'active', name: 'Active' },
                                        { id: 'deactive', name: 'Inactive' },
                                    ]}
                                />
                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder='All Groups'
                                    intialValue={filters.groupId}
                                    theme="search"
                                    result={e => filter({ groupId: e.value })}
                                    options={groups}
                                />

                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder='All Customer Role'
                                    intialValue={filters.customerRole}
                                    theme="search"
                                    result={e => filter({ customerRole: e.value })}
                                    options={roles} 
                                />

                                {filters.groupId || filters.status || filters.customerRole ? <>
                                    <button className='bg-primary leading-10  h-10 shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg ' onClick={reset}>Reset</button>
                                </> : <></>}

                            </div>

                            {/* <div className='flex '>
                            <div className='w-80'>
                                <DateRangePicker
                                    value={filters.startDate ? { startDate: new Date(filters.startDate), endDate: new Date(filters.endDate) } : { startDate: '', endDate: '' }}
                                    id="daterange"
                                    onChange={e => blockDateChange(e)}
                                />
                            </div>
                        </div> */}
                        </div>

                    </div>

                    {!loaging ? <>
                        <Table
                            className='mb-3'
                            data={data}
                            columns={columns}
                            page={filters.page}
                            count={filters.count}
                            total={total}
                            result={(e) => {
                                if (e.event == 'page') pageChange(e.value)
                                if (e.event == 'sort') sorting(e.value)
                                if(e.event == 'count') count(e.value)
                            }}
                        />

                    </> : <></>}

                    {
                        loaging ? <div className="text-center py-4">
                            <img src="/assets/img/loader.gif" className="pageLoader" />
                        </div> : <></>
                    }


                </div>
            </Layout>
            {modal ? <>
                <Modal
                    title='Send Email'
                    body={<SendEmail
                        result={e => {
                            if (e.event == 'submit') setModel(false)
                        }}
                    />}
                    result={e => {
                        if (e.event == 'close') setModel(false)
                    }}
                />
            </> : <></>}
            {isRModal  ? <>
        <Modal
          title="Detail"
          body={<>
            <RolesList
              list ={roleList}
            
            />
          </>}
          result={e => {
            setIsRModal(false)
          }}
        />
      </> : <></>}
        </>

    );
};

export default Html;

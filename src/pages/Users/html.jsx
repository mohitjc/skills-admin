import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import rolesModel from '../../models/roles.model';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import environment from '../../environment';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { PiFileCsv } from 'react-icons/pi';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { BsTrash3 } from 'react-icons/bs';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import SelectDropdown from '../../components/common/SelectDropdown';
import statusModel from '../../models/status.model';

const Html = ({
    sorting,
    view,
    edit,
    reset,
    add,
    ChangeRole,
    ChangeStatus,
    statusChange,
    pageChange,
    deleteItem,
    dynamicStyle = false,
    className = null,
    filters,
    loaging,
    data,
    exportfun,
    roles,
    role,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="flex justify-between items-center">


                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">
                        {role ? rolesModel.name(role) : 'Users'}
                    </h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Users</p>
                </div>

                <div className="flex filterFlex phView">


                    <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button>

                    {isAllow('addUsers') ? <>
                        <a className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" onClick={e => add()}>
                            <FiPlus className="text-xl text-white" />  Add {role ? rolesModel.name(role) : 'User'}
                        </a>
                    </> : <></>}
                </div>


            </div>

            <div className="shadow-box w-full bg-white rounded-lg mt-6">

                <div className='flex justify-end p-4 gap-2'>
                <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { ChangeStatus(e.value) }}
                            options={statusModel.list}
                        />
                    {!role ? <div className="dropdown1 addDropdown1 chnagesg">


                        <Menu as="div" className="relative list_box_active_state ml-auto">
                            <div>
                                <Menu.Button className="inline-flex w-full border justify-center gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-sm font-normal  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200">
                                    {filters.role ? methodModel.find(roles, filters.role, 'id')?.name : 'All User'}
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className={`${dynamicStyle ? "" : "max-h-60"}  focus:!outline-[#6956e5] focus:!outline text-sm absolute z-40 ${className ? className : " min-w-[260px]"
                                    }  right-0 shadow-lg !py-2 !mt-1.5 overflow-auto bg-white  rounded-lg scrollbar`}>
                                    <div className="mt-2">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a className={filters.role == '' ? 'text-gray-700 block px-4 py-2 text-sm active' : 'text-gray-700 block px-4 py-2 text-sm'} onClick={() => ChangeRole('')}>All User</a>

                                            )}
                                        </Menu.Item>
                                        <Menu.Item className="divide-y-1 divide-gray-800 pt-1  mt-2">
                                            <p className="border-t"></p>
                                        </Menu.Item>
                                        {roles && roles.map(itm => itm.id != environment.userRoleId ? <Menu.Item>
                                            {({ active }) => (
                                                <a className={filters.role == itm.id ? 'text-gray-700 block px-4 py-2 text-sm active' : 'text-gray-700 block px-4 py-2 text-sm'} onClick={() => ChangeRole(itm.id)}>{itm.name}</a>
                                            )}
                                        </Menu.Item> : null)}


                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>



                    </div> : <></>}


                    {filters.status || filters.role ? <>
                        <a className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" onClick={e => reset()}>
                            Reset
                        </a>
                    </> : <></>}
                </div>


            
                <div className=" w-full bg-white rounded-lg ">
                        <div className="scrollbar w-full overflow-auto">


                            <table class="w-full">
                                <thead className='border-b border-[#EAECF0]'>
                                    <tr className='border-b border-[#EAECF0]'>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('fullName')}>Name <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('roleName')}>Role<span className='ml-2'> <HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('lastLogin')}>Last Login<span className='ml-2'> <HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Account Status</th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('createdAt')}>Date Created<span className='ml-2'> <HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('updatedAt')}>Last Modified <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!loaging && data && data.map((itm, i) => {
                                        return <tr className=''>


                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>

                                                <div className='user_detail'>
                                                    <img src={methodModel.userImg(itm.image)} className="user_imgs" />

                                                    <div className='user_name'>
                                                        <h4 className='user'>
                                                            {itm.fullName}
                                                        </h4>
                                                        <p className='user_info'>
                                                            {itm.email}
                                                        </p>
                                                    </div>
                                                </div></td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm.role?.name}</td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm.lastLogin)}</td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>
                                                <div onClick={() => statusChange(itm)}>
                                                    <Tooltip placement="top" title="Active / Inactive">
                                                        <span className={`${itm.status == 'deactive' ? 'bg-[#EEE] text-[#3C3E49A3]' : 'bg-[#0fac80] text-white'} text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB] !rounded`}>
                                                            {itm.status == 'deactive' ? 'Inactive' : 'Active'}
                                                        </span>
                                                    </Tooltip>
                                                </div></td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm.createdAt)}</td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm.updatedAt)}</td>



                                            {/* dropdown */}
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {isAllow('editUsers') ? <>
                                                        <Tooltip placement="top" title="Edit">
                                                            <a className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' title="Edit" onClick={e => edit(itm.id)}>
                                                                <FiEdit3 />
                                                            </a>
                                                        </Tooltip>
                                                    </> : <></>}

                                                    {isAllow('deleteUsers') ? <>
                                                        <Tooltip placement="top" title="Delete">
                                                            <span className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' onClick={() => deleteItem(itm.id)}>
                                                                <BsTrash3 />
                                                            </span>
                                                        </Tooltip>
                                                    </> : <></>}
                                                </div>
                                            </td>

                                        </tr>

                                    })
                                    }
                                </tbody>
                            </table>



                        </div>
                    </div>




                {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

                {
                    !loaging && total > filters.count ? <div className='paginationWrapper  mt-15'>
                        <span className='text-sm text-gray-600'>Show {filters.count} from {total} Sub Admin’s</span>
                        <Pagination
                            currentPage={filters.page}
                            totalSize={total}
                            sizePerPage={filters.count}
                            changeCurrentPage={pageChange}
                        />
                    </div> : <></>
                }

                {loaging ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}

            </div>
        </Layout>
    );
};

export default Html;

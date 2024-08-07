import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import environment from '../../environment';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from 'antd';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { BsTrash3 } from 'react-icons/bs';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import SelectDropdown from '../../components/common/SelectDropdown';
import statusModel from "../../models/status.model";
const Html = ({
    clear,
    sortClass,
    sorting,
    view,
    edit,
    reset,
    add,
    colClick,
    tab,
    tabChange,
    ChangeRole,
    dynamicStyle = false,
    className = null,
    ChangeStatus,
    openModal,
    statusChange,
    pageChange,
    addCol,
    deleteItem,
    exportCsv,
    uTableCols,
    removeCol,
    filters,
    tableCols,
    blockunblock,
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
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">Staff Roles</h3>
                    <p className="text-sm font-normal text-[#75757A]">Here you can see all about your Staff Roles</p>
                </div>
                <div className="flex items-center gap-2">

                    {isAllow('addRoles') ? <Link className="bg-primary leading-10 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to="/roles/add">
                        <FiPlus className="text-xl text-white" /> Add Staff Role
                    </Link> : <></>}

                    <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { ChangeStatus(e.value) }}
                            options={statusModel.list}
                        />
                        {filters.status ? <>
                            <button
                                className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
                                onClick={() => clear()}>
                                Reset
                            </button>
                        </> : <></>}


                </div>


            </div>


            {tab == 'grid' ? <>

            </> : <>

                <div className="shadow-box w-full bg-white rounded-lg">
                    <div className="scrollbar w-full overflow-auto">

                        <table className="w-full">
                            <thead className='text-xs text-gray-700 capitalize bg-gray-50  border-b border-[#EAECF0]'>
                                <tr className='border-b border-[#EAECF0]'>
                                    <th scope="col" className='!px-3.5 py-3 capitalize cursor-pointer text-left' onClick={e => sorting('name')}>Role Name <span className='ml-1'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                    <th scope="col" className='!px-3.5 py-3 capitalize cursor-pointer text-left'>Status</th>
                                    <th scope="col" className='!px-3.5 py-3 capitalize cursor-pointer text-left'>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {!loaging && data && data.map((itm, i) => {
                                    if (itm.id != environment.adminRoleId && itm.id != environment.userRoleId)
                                        return <tr className=''>
                                            <td className='!text-typo capitalize !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>{itm.name}</td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'> 
                                                <div className='w-32' onClick={() => statusChange(itm)}>
                                                        <Tooltip placement="top" title="Active / Inactive">
                                                            <span className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB]  text-white !rounded capitalize ${itm.status === 'active' ? 'bg-green-400' : 'bg-red-400 '}`}>
                                                                {itm.status == 'deactive' ? 'inactive' : 'active'}
                                                            </span>
                                                        </Tooltip>
                                                </div>
                                            </td>

                                            {/* dropdown */}
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>
                                                <div className="flex items-center justify-start gap-1.5">
                                                    {isAllow('editRoles') ? <>
                                                        <Tooltip placement="top" title="Edit">
                                                            <a className="border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md" onClick={e => edit(itm.id)}>
                                                                <FiEdit3 />
                                                            </a>
                                                        </Tooltip>
                                                    </> : <></>}


                                                    {itm.id != environment.adminRoleId && itm.id != environment.userRoleId && isAllow('deleteRoles')? <> <Tooltip placement="top" title="Delete"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md' onClick={() => deleteItem(itm.id)}>
                                                        <BsTrash3 />
                                                    </span></Tooltip>
                                                    </> : <></>}

                                                </div>

                                            </td>

                                            {/* end */}

                                        </tr>

                                })
                                }
                            </tbody>
                        </table>

                    </div>


                </div>

            </>}


            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {
                !loaging && total > filters.count ? <div className='paginationWrapper  mt-15 '>
                    {/* <span className='text-sm text-gray-600'>Show {filters.count} from {total} Categories</span> */}
                    <Pagination
                        currentPage={filters.page}
                        totalSize={total}
                        sizePerPage={filters.count}
                        changeCurrentPage={pageChange}
                    />
                </div> : <></>
            }

            {
                loaging ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>
            }



        </Layout >
    );
};

export default Html;

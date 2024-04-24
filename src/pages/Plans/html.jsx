import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import SelectDropdown from '../../components/common/SelectDropdown';
import planTypeModel from '../../models/planType.model';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { PiFileCsv } from 'react-icons/pi';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import statusModel from '../../models/status.model';


const Html = ({
    sortClass,
    sorting,
    tab,
    edit,
    reset,
    filter,
    currencys,
    view,
    tabChange,
    colClick,
    ChangeRole,
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
    dynamicStyle = false,
    className = null,
    tableCols,
    loaging,
    data,
    types,
    exportfun,
    total,
    dragStart,
    dragEnter,
    drop,
    dargIndex,
    dargEnterIndex,
    isAllow,
    showData
}) => {
    return (
        <Layout>
            <div className="flex justify-between items-center">

                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">
                        Plans
                    </h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Plans</p>
                </div>



                <div className="flex filterFlex phSpace">
                    {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}
                    {isAllow('addPlan') ?
                        <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to="/plans/add">
                            <FiPlus className="text-xl text-white" /> Add Plan
                        </Link>
                        : <></>}


                </div>
            </div>

            <div className='shadow-box w-full bg-white rounded-lg mt-6'>
                <div className='flex justify-end items-center gap-3 p-4'>
                <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { ChangeStatus(e.value) }}
                            options={statusModel.list}
                        />
                    {filters.status ? <>
                        <button className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" onClick={reset}>
                            Reset
                        </button>
                    </> : <></>}
                </div>


                {tab == 'grid' ? <>
                </> : <>
                    <div className="w-full bg-white rounded-lg">
                        <div className="scrollbar w-full overflow-auto">
                            <table class="w-full">
                                <thead className='text-xs text-gray-700 capitalize bg-gray-50  border-b border-[#EAECF0]'>
                                    <tr className='border-b border-[#EAECF0]'>
                                        <th scope="col" className='!px-3.5 py-3 capitalize cursor-pointer text-left' onClick={e => sorting('name')}>Name <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='!px-3.5 py-3 capitalize cursor-pointer text-left'>Status</th>
                                        <th scope="col" className='!px-3.5 py-3 capitalize cursor-pointer text-left'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='planDrag'>
                                    {!loaging && data && showData().map((itm, index) => {
                                        return <tr className={` ${dargIndex == index ? 'dragStart' : ''} ${dargEnterIndex == index ? 'dragEnter' : ''}`} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={e => drop(e)} key={index} draggable>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]' onClick={e => edit(itm.id, 'false')}>{itm.name}</td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                                <Tooltip placement="top" title={itm.status != 'deactive' ? 'Inactive' : 'Active'}>
                                                    <span className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB] w-32  text-white !rounded capitalize ${itm.status === 'active' ? 'bg-green-400' : 'bg-red-400 '}`}>
                                                        {itm.status == 'deactive' ? 'Inactive' : 'Active'}
                                                    </span>
                                                </Tooltip>

                                            </div></td>

                                            {/* dropdown */}
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>
                                                <div className="flex items-center justify-start gap-1.5">
                                                    {isAllow('editPlan') ?
                                                        <Tooltip placement="top" title="Edit">
                                                            <a className="border cursor-pointer border-[#ff7641] hover:opacity-70 rounded-lg bg-[#ff764114] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => edit(itm.id, 'false')}>
                                                                <FiEdit3 />
                                                            </a>
                                                        </Tooltip>
                                                        : <></>}

                                                    {!itm.activeSubscription ? <>
                                                        {isAllow('deletePlan') ?
                                                            <Tooltip placement="top" title="Delete">
                                                                <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl ' onClick={() => deleteItem(itm.id)}>
                                                                    <BsTrash3 />
                                                                </span>
                                                            </Tooltip>
                                                            : <></>}


                                                    </> : <></>}
                                                    <Tooltip placement="top" title="Copy">
                                                        <a className="border !border-[#94D5AE] rounded-lg bg-[#ECF4EF] hover:opacity-70 w-10 h-10 text-[#b4b7fb] flex items-center justify-center text-xls" onClick={e => edit(itm.id, 'true')}>
                                                            <FaCopy />
                                                        </a>
                                                    </Tooltip>

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
                    !loaging && total > filters.count ? <div className='paginationWrapper  mt-15'>
                        {/* <span className='text-sm text-gray-600'>Show {filters.count} from {total} Categories</span> */}
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

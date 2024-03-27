import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import userTableModel from '../../models/table.model';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import SelectDropdown from '../../components/common/SelectDropdown';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { PiFileCsv } from 'react-icons/pi';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import statusModel from "../../models/status.model";


const Html = ({
    clear,
    sortClass,
    sorting,
    tab,
    edit,
    view,
    tabChange,
    colClick,
    ChangeRole,
    ChangeStatus,
    openModal,
    statusChange,
    pageChange,
    addCol,
    dynamicStyle = false,
    className = null,
    deleteItem,
    exportCsv,
    uTableCols,
    removeCol,
    filters,
    filter,
    categories,
    tableCols,
    loaging,
    data,
    types,
    exportfun,
    dragStart,
    dragEnter,
    drop,
    dargEnterIndex,
    dargIndex,
    showData,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="flex justify-between items-center">

                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">
                        Plan Features
                    </h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Plan Features</p>
                </div>




                <div className="flex">
                        {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                            <PiFileCsv className="text-typo text-xl" />  Export CSV
                        </button> */}
                    {isAllow('addPlan') ?
                        <Link className="bg-primary flex items-center gap-2 leading-10 mr-3 h-10 shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg mr-2" to="/features/add">
                            <FiPlus className="text-xl text-white" />  Add Plan Feature
                        </Link>
                        : <></>}


                </div>


            </div>



            <div className='shadow-box w-full bg-white rounded-lg mt-6'>
                <div className='flex items-center p-4 justify-end gap-2'>
                <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder='All Category'
                                intialValue={filters.category}
                                result={e => filter({ category: e.value })}
                                options={categories}
                            />
                    <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { ChangeStatus(e.value) }}
                            options={statusModel.list}
                        />
                        {filters.status||filters.category ? <>
                            <button
                                className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
                                onClick={() => clear()}>
                                Reset
                            </button>
                        </> : <></>}
                </div>



                {tab == 'grid' ? <>
                </> : <>

                    <div className="w-full bg-white rounded-lg ">
                        <div className="scrollbar w-full overflow-auto">


                            <table class="w-full">
                                <thead className='border-b border-[#EAECF0]'>
                                    <tr className='border-b border-[#EAECF0]'>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3' onClick={e => sorting('name')}>Name<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3' onClick={e => sorting('categoryName')}>Category <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3'>Status</th>
                                        <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3'>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {!loaging && data && showData().map((itm, index) => {
                                        return <tr className={` ${dargIndex == index ? 'dragStart' : ''} ${dargEnterIndex == index ? 'dragEnter' : ''}`} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={e => drop(e)} key={index} draggable>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]' onClick={e => edit(itm.id)}>{itm.name}</td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm.category ? itm.category.name : ''}</td>
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                                <Tooltip placement="top" title="Active / Inactive">
                                                    <span className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB] w-32 mx-auto  text-white !rounded capitalize ${itm.status === 'active' ? 'bg-green-400' : 'bg-red-400 '}`}>
                                                        {itm.status == 'deactive' ? 'Inactive' : 'Active'}
                                                    </span>
                                                </Tooltip>
                                            </div></td>

                                            {/* dropdown */}
                                            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {isAllow('editPlan') ?
                                                        <Tooltip placement="top" title="Edit">
                                                            <a className="border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => edit(itm.id)}>
                                                                <FiEdit3 />
                                                            </a>
                                                        </Tooltip>
                                                        : <></>}
                                                    {isAllow('deletePlan') ?
                                                        <Tooltip placement="top" title="Delete">
                                                            <span className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' onClick={() => deleteItem(itm.id)}>
                                                                <BsTrash3 />
                                                            </span>
                                                        </Tooltip>
                                                        : <></>}
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
                    !loaging && total > filters.count ? <div className='paginationWrapper flex items-center justify-between mt-15'>
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

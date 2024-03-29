import React, { useState } from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { HiOutlineArrowDown } from 'react-icons/hi';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import { PiFileCsv } from 'react-icons/pi';
import SelectDropdown from '../../components/common/SelectDropdown';
import statusModel from '../../models/status.model';

const Html = ({
    sortClass,
    sorting,
    type,
    add,
    edit,
    ChangeRole,
    statusChange,
    pageChange,
    deleteItem,
    exportfun,
    filters,
    loaging,
    data,
    statuschange,
    reset,
    cattype,
    dynamicStyle = false,
    className = null,
    total,
    dragStart,
    dragEnter,
    drop,
    dargEnterIndex,
    dargIndex,
    isAllow,
    showData,
}) => {
    const [status, setstatus] = useState("")

    const TableRow = ({ itm, className, index, parentCategory }) => {
        return <tr className={` ${className || ''} ${dargIndex == index ? 'dragStart' : ''} ${dargEnterIndex == index ? 'dragEnter' : ''}`} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={e => drop(e)} key={index} draggable={parentCategory ? false : true}>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]' onClick={e => edit(itm.id)}> <div className='user_detail'>
                <img src={methodModel.noImg(itm.banner)} className="cat_img" />
            </div></td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]' >{itm.name || '--'}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm.parentCategory?.name || '--'}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm.catType?.name}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm.createdAt)}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm.updatedAt)}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm?.updatedBy?.fullName || '--'}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                <Tooltip placement="top" title={itm.status != 'deactive' ? 'Inactive' : 'Active'}>
                    <span className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB]  text-white !rounded capitalize ${itm.status === 'active' ? 'bg-green-400' : 'bg-red-400 '}`}>
                        {itm.status == 'deactive' ? 'Inactive' : 'Active'}
                    </span>
                </Tooltip>
            </div></td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>
                <div className="flex items-center justify-center gap-1.5">
                    {isAllow('editCategory') ?
                        <Tooltip placement="top" title="Edit">
                            <a className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' title="Edit" onClick={e => edit(itm.id)}>
                                <FiEdit3 />
                            </a>
                        </Tooltip>

                        : <></>}
                    {isAllow('deleteCategory') ?
                        <Tooltip placement="top" title="Delete">
                            <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl ' onClick={() => deleteItem(itm.id)}>
                                <BsTrash3 />
                            </span>
                        </Tooltip>
                        : <></>}
                </div>
            </td>
        </tr>
    }

    return (
        <Layout>
            <div className="flex justify-between items-center">

                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">
                        {type ? 'Reseller' : ''} Categories
                    </h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Categories</p>
                </div>

                <div className="flex filterFlex phSpace">

                    {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-2" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}


                    {isAllow('addCategory') ?
                        <a className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" onClick={e => add()}>
                            <FiPlus className="text-xl text-white" /> Add {type ? 'Reseller' : ''} Category
                        </a>
                        : <></>}




                </div>
            </div>


            <div className="shadow-box w-full bg-white rounded-lg mt-6">
                <div className='flex items-center justify-end p-4 gap-2'>
                    {!type ? <>

                    <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Type'
                            intialValue={filters.catType}
                            result={e => { ChangeRole(e.value) }}
                            options={cattype}
                        />

                    </> : <></>}

                    

                    <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { statuschange(e.value) }}
                            options={statusModel.list}
                        />
                    {filters.search || filters.parentCategory || filters.status || (filters.catType && !type) ? <>
                        <a className="bg-primary leading-10 h-10 shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg mr-2" onClick={e => reset()}>
                            Reset
                        </a>
                    </> : <></>}
                </div>


                <div className="scrollbar w-full overflow-auto">


                    <table class="w-full">
                        <thead className='border-b border-[#EAECF0]'>
                            <tr className='border-b border-[#EAECF0]'>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' >Image</th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')} >Category Name  <span className='mr-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Parent Category</th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('catTypeName')} >Category Type <span className='mr-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('createdAt')}>Date Created <span className='mr-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('updatedAt')}>Last Modified <span className='mr-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Last Modified by</th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Status</th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Action</th>
                            </tr>
                        </thead>
                        <tbody id='tableBodycat'>
                            {!loaging && data && showData().map((itm, i) => {
                                return <>
                                    <TableRow itm={itm} index={i} />
                                    {itm?.childCategories && itm?.childCategories.map(citm => {
                                        return <>
                                            <TableRow itm={{ ...citm, id: citm._id }} index={i} className="subCategory" parentCategory={itm} />
                                            {citm.childCategories && citm.childCategories.map(sitm => {
                                                return <TableRow itm={{ ...sitm, id: citm._id }} index={i} className="subSubCategory" parentCategory={citm} />
                                            })}
                                        </>
                                    })}
                                </>
                            })
                            }
                        </tbody>
                    </table>
                </div>



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

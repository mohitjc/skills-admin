import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { PiFileCsv } from 'react-icons/pi';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { FiPlus } from 'react-icons/fi';

const Html = ({
    sortClass,
    sorting,
    edit,
    search,
    reset,
    statusChange,
    ChangeStatus,
    pageChange,
    deleteItem,
    dynamicStyle = false,
    className = null,
    filters,
    loaging,
    data,
    checkedItems,
    handlecheckbox,
    exportfun,
    isAllow,
    total = { total }
}) => {

    return (
        <Layout>
            <div className="flex justify-between items-center">

                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">
                        Currency
                    </h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Currency</p>
                </div>


                <div className="flex">

                    {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}
                    {isAllow('addCurrency') ?
                        <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to="/currency/add">
                            <FiPlus className="text-xl text-white" />   Add Currency
                        </Link>
                        : <></>}
                    <div className="dropdown1 addDropdown1 chnages_status mr-2">

                        <Menu as="div" className="relative list_box_active_state ml-auto">
                            <div>
                                <Menu.Button className="inline-flex border w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200">
                                    {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
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
                                                <a className={filters.status == '' ? 'text-gray-700 block px-4 py-2 text-sm active' : 'text-gray-700 block px-4 py-2 text-sm'} onClick={() => ChangeStatus("")}>All Status</a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a className={filters.status == 'active' ? 'text-gray-700 block px-4 py-2 text-sm active' : 'text-gray-700 block px-4 py-2 text-sm'} onClick={() => ChangeStatus("active")} >Active</a>
                                            )}
                                        </Menu.Item>

                                        <Menu.Item className="divide-y-1 divide-gray-800 pt-1  mt-2">
                                            <p className="border-t"></p>
                                        </Menu.Item>

                                        <Menu.Item className="">
                                            {({ active }) => (
                                                <a className={filters.status == 'Inactive' ? 'text-gray-700 block px-4 py-2 text-sm active' : 'text-gray-700 block px-4 py-2 text-sm'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                                            )}
                                        </Menu.Item>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>




                    </div>
                    {/* <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.country ? methodModel.find(allcountry,filters.country,'id')?.name : 'All Country'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.country == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => Country('')}>All Country</a>
                            {allcountry && allcountry.map(itm => {
                                return <a className={filters.country == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => Country(itm.id)}>{itm.name}</a>
                            })}
                        </div>
                    </div> */}
                    {filters.country || search ?
                        <a className="bg-danger leading-10 mr-3 h-10 shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg mr-2" onClick={e => reset()}>
                            Reset
                        </a>

                        : <></>}
                    {/* <div className='icons_tab'>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class={`nav-link ${tab == 'grid' ? 'active' : ''}`} id="employee-tab" onClick={e => tabChange('grid')}>
                                    <i className="fa fa-th"></i>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class={`nav-link staff ${tab == 'list' ? 'active' : ''}`} id="staff-tab" onClick={e => tabChange('list')}>
                                    <i className="fa fa-list"></i>
                                </button>
                            </li>
                        </ul>
                    </div> */}
                </div>

            </div>

            <div className="shadow-box w-full bg-white rounded-lg mt-6">
                <div className="scrollbar w-full overflow-auto">

                    <table class="w-full">
                        <thead className='border-b border-[#EAECF0]'>
                            <tr className='border-b border-[#EAECF0]'>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('symbol')}>Name<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                {/* <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 '>Country</th> */}
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('symbol')}>Symbol <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('isoCode')}>ISO <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Apply Currency for Plans</th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Status</th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 '>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && data.map((itm, i) => {
                                return <tr className=''>

                                    <td className='!text-typo !border-l-0 hover:text-blue-600 hover:underline cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]' >
                                        <div className='user_detail'>
                                            {/* <img src={methodModel.userImg(itm.image)} className="user_imgs" /> */}
                                            <div className=''><h4 className='user' onClick={e => edit(itm.id)}>{itm.currency}</h4></div>
                                        </div>
                                    </td>
                                    {/* <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0] pointer'>{itm.country?itm.country.name:''}</td> */}
                                    <td className='!text-typo !border-l-0 !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0] pointer'>{itm.symbol}</td>
                                    <td className='!text-typo !border-l-0 !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0] pointer'>{itm.isoCode}</td>
                                    <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0] pointer'>
                                        <input
                                            type="checkbox"
                                            className="ml-1"
                                            name="course"
                                            value={itm.currency}
                                            onClick={e => handlecheckbox(itm.id)}
                                            checked={checkedItems.includes(itm.id)}
                                        />
                                    </td>
                                    <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                        <Tooltip placement="top" title="Active / Inactive">
                                            <span className='contract'>
                                                {itm.status == 'deactive' ? 'inactive' : 'active'}
                                            </span>
                                        </Tooltip>
                                    </div></td>

                                    {/* dropdown */}
                                    <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>
                                        <div className="">
                                            <div className="flex items-center justify-center gap-1.5">
                                                {isAllow('editCurrency') ?
                                                    <Tooltip placement="top" title="Edit">
                                                        <a className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' title="Edit" onClick={e => edit(itm.id)}>
                                                            <svg stroke="#6956E5" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                        </a>
                                                    </Tooltip>
                                                    : <></>}
                                                {isAllow('deleteCurrency') ?
                                                    <Tooltip placement="top" title="Delete">
                                                        <span className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' onClick={() => deleteItem(itm.id)}>
                                                            <svg stroke="#E0173C" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path></svg>
                                                        </span>
                                                    </Tooltip>
                                                    : <></>}
                                            </div>
                                            {/* <button className="btn btn-secondary dropdown-toggle dotdrop" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-h" ></i>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" onClick={e => edit(itm.id)}>Edit</a>
                                                    <a className="dropdown-item" onClick={() => deleteItem(itm.id)}>Delete</a>
                                                </div> */}
                                        </div>
                                    </td>
                                    {/* end */}
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>



                {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}
                {
                    !loaging && total > filters.count ? <div className='paginationWrapper p-4  mt-15'>
                        {/* <span className='text-sm text-gray-600'>Show {filters.count} from {total} Countries</span> */}
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

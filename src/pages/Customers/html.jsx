import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import SelectDropdown from '../../components/common/SelectDropdown';
import DateRangePicker from '../../components/common/DateRangePicker';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { PiFileCsv } from "react-icons/pi";
import { HiOutlineArrowDown } from "react-icons/hi";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";


const Html = ({
    sortClass,
    sorting,
    tab,
    tabChange,
    ChangeStatus,
    statusChange,
    pageChange,
    deleteItem,
    filters,
    filter,
    loaging,
    data,
    exportfun,
    edit,
    countries,
    view,
    total,
    plans,
    reset
}) => {
    const blockDateChange = (e) => {
        console.log("e", e)
        filter({
            endDate: datepipeModel.datetostring(e.endDate),
            startDate: datepipeModel.datetostring(e.startDate),
        })
    }
    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">


                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]">
                        Customers
                    </h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your Customers</p>
                </div>


                <div className="flex">
                    <div className="buttons_Section filterFlex">

                        <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                            <PiFileCsv className="text-typo text-xl" />  Export CSV
                        </button>
                        <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to={`/customer/add`}>
                            <FiPlus className="text-xl text-white" />  Create new
                        </Link>


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
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder='All Countries'
                                    intialValue={filters.country}
                                    theme='search'
                                    result={e => filter({ country: e.value })}
                                    options={countries}
                                />

                            </div> */}
                            <div className='w-80'>
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

                            </div>
                            <div className='w-80'>
                                <SelectDropdown
                                    isSingle={true}
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder='All Status'
                                    intialValue={filters.planStatus}
                                    theme='search'
                                    result={e => filter({ planStatus: e.value })}
                                    options={[
                                        { id: 'active', name: 'Active' },
                                        { id: 'inactive', name: 'Inactive' },
                                        { id: 'trial', name: 'Trial' },
                                    ]}
                                />
                            </div>
                            <button className='bg-primary leading-10  h-10 shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg ' onClick={reset}>Reset</button>

                        </div>

                        <div className='flex '>
                            <div className='w-80'>
                                <DateRangePicker
                                    value={filters.startDate ? { startDate: new Date(filters.startDate), endDate: new Date(filters.endDate) } : { startDate: '', endDate: '' }}
                                    id="daterange"
                                    onChange={e => blockDateChange(e)}
                                />
                            </div>
                        </div>
                    </div>


                    {/* <div className="dropdown addDropdown">
                            <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                            </button>
                            <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                                <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                                <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                                <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                            </div>
                        </div> */}

                </div>

                <div className='all_dat_style'>
                <div className=" w-full bg-white rounded-lg ">
                            <div className="scrollbar w-full overflow-auto">


                                <table class="w-full">
                                    <thead className='border-b border-[#EAECF0]'>
                                        <tr className='border-b border-[#EAECF0]'>
                                            <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3' onClick={e => sorting('fullName')}>Name<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                            <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3' >Start Date</th>
                                            <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3' >End Date</th>
                                            <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3' >Current Plan</th>
                                            <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3' >Status</th>
                                            {/* <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3'  onClick={e=>sorting('companyAddress')}>Compnay Address <i className={sortClass('companyAddress')} /></th> */}
                                            {/* <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3' onClick={e=>sorting('Website')}>Website <i className={sortClass('Website')} /></th> */}
                                            <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3' >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!loaging && data && data.map((itm, i) => {
                                            return <tr className=''>
                                                <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]' onClick={e => view(itm.id)}>
                                                    <div className='user_detail'>
                                                        <img src={methodModel.userImg(itm.image)} className="user_imgs" />
                                                        <div className='user_name'>
                                                            <h4 className='user'>
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
                                                </td>
                                                <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm?.plan?.createdAt)}</td>
                                                <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm?.plan?.validUpTo)}</td>
                                                <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm.plan?.planId?.name || '--'}</td>
                                                <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm.plan?.on_trial ? 'Trial' : itm?.plan?.status||'No Plan'}</td>
                                                {/* <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>{itm.companyAddress || '--'}</td> */}
                                                {/* <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>{itm.website||'--'}</td> */}
                                                <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <Tooltip placement="top" title="View">
                                                            <a className='border border-[#EBEBEB] rounded-lg bg-[#FAFAFA] hover:opacity-70 w-10 h-10 text-typo flex items-center justify-center text-xl' title="View" onClick={e => view(itm.id)}>
                                                                <AiOutlineEye />
                                                            </a>
                                                        </Tooltip>
                                                        <Tooltip placement="top" title="Edit">
                                                            <a className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' title="Edit" onClick={e => edit(itm.id)}>
                                                                <FiEdit3 />
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
                </div>

                {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}
                {
                    !loaging && total > filters.count ? <div className='paginationWrapper p-4  mt-15'>
                        {/* <span>Show {filters.count} from {total} Customers</span> */}
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

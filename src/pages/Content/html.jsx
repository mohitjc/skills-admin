import React from 'react';
import Layout from '../../components/global/layout';
import './style.scss';
import { Link } from 'react-router-dom';
import environment from '../../environment';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { PiFileCsv } from 'react-icons/pi';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import Table from "../../components/Table";
import SelectDropdown from '../../components/common/SelectDropdown';
import statusModel from '../../models/status.model';
import datepipeModel from '../../models/datepipemodel';

const Html = ({
    sorting,
    edit,
    statusChange,
    pageChange,
    deleteItem,
    clear,
    filters,
    loaging,
    data,
    exportfun,
    changestatus,
    isAllow,
    total = { total }
}) => {

    const columns = [
        {
            key: 'title', name: 'Title', sort: true,
            render: (row) => {
                return <>{row?.title}</>
            }
        },
        // {
        //     key: 'slug', name: 'Slug', sort: true,
        //     render: (row) => {
        //         return <>{row?.slug}</>
        //     }
        // },
        // {
        //     key: 'createdAt', name: 'Created At', sort: true,
        //     render: (row) => {
        //         return <>{datepipeModel.date(row.createdAt)}</>
        //     }
        // },
        // {
        //     key: 'status', name: 'Status',
        //     render: (row) => {
        //         return <>
        //             <div className='w-32' onClick={() => statusChange(row)}>
        //                 <Tooltip placement="top" title="Active / Inactive">
        //                     <span className='bg-[#EEE] text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB] text-[#3C3E49A3] !rounded capitalize'>
        //                         {row.status == 'deactive' ? 'inactive' : 'active'}
        //                     </span>
        //                 </Tooltip>
        //             </div>
        //         </>
        //     }
        // },
        {
            key: 'action', name: 'Action',
            render: (itm) => {
                return <>
                    <div className="flex items-center justify-start gap-1.5">
                        {isAllow('editContent') ?
                            <Tooltip placement="top" title="Edit">
                                <a className="border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => edit(itm.slug)}>
                                    <FiEdit3 />
                                </a>
                            </Tooltip>
                            : <></>}
                    </div>
                </>
            }
        },
    ]


    return (
        <Layout>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]"> Content Management</h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your Content Management</p>
                </div>

                <a id='downloadFile'></a>

                <div className="flex">


                    {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}

                    {/* {isAllow('addContent') ?
                        <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to="/content/add">
                            <FiPlus className="text-xl text-white" />   Add Content Management
                        </Link>
                        : <></>} */}
                </div>


            </div>



            <div className='shadow-box w-full bg-white rounded-lg mt-6'>
                <div className='flex p-4 justify-end'>
                    <div className="flex gap-2">
                        {/* <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { changestatus(e.value) }}
                            options={statusModel.list}
                        /> */}
                        {filters.status ? <>
                            <button
                                className="bg-primary leading-10 h-10 inline-block shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg"
                                onClick={() => clear()}>
                                Reset
                            </button>
                        </> : <></>}


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
                        }}
                    />

                </> : <></>}

                {
                    loaging ? <div className="text-center py-4">
                        <img src="/assets/img/loader.gif" className="pageLoader" />
                    </div> : <></>
                }

            </div>
        </Layout >
    );
};

export default Html;

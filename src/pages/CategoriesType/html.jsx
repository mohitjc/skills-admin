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
    count,
    exportfun,
    changestatus,
    isAllow,
    total = { total }
}) => {

    const columns = [
        {
            key: 'name', name: 'Name', sort: true,
            render: (row) => {
                return <><p className='capitalize'>{row?.name}</p></>
            }
        },
        {
            key: 'status', name: 'Status',
            render: (row) => {
                return <>
                    <div className='w-32 ' onClick={() => statusChange(row)}>
                        <Tooltip placement="top" title="Active / Inactive">
                            <span className={`text-sm !px-3 h-[30px] flex items-center justify-center border border-[#EBEBEB]  text-white !rounded capitalize cursor-pointer ${row.status === 'active' ? 'bg-green-400' : 'bg-red-400 '}`}>
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
                        {isAllow('editCategory') ?
                            <Tooltip placement="top" title="Edit">
                                <a className="border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md" onClick={e => edit(itm.id)}>
                                    <FiEdit3 />
                                </a>
                            </Tooltip>
                            : <></>}
                        {itm.id != environment.planTypeId && itm.id != environment.professionType && isAllow('deleteCategory') ? <Tooltip placement="top" title="Delete"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-md bg-[#fff] w-9 h-9 text-[#E92531] flex items-center justify-center text-md ' onClick={() => deleteItem(itm.id)}>
                            <BsTrash3 />
                        </span> </Tooltip> : <></>}
                    </div>
                </>
            }
        },
    ]


    return (
        <Layout>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-semibold text-[#111827]"> Types</h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Types</p>
                </div>

                <a id='downloadFile'></a>

                <div className="flex ">


                    {isAllow('addCategory') ?
                        <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to="/types/add">
                            <FiPlus className="text-xl text-white" />   Add Type
                        </Link>
                        : <></>}


<div className="flex gap-2">
                        <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { changestatus(e.value) }}
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


            </div>



            <div className='shadow-box w-full bg-white rounded-lg mt-6'>
            

                {!loaging ? <>
                    <Table
                        className='mb-3 '
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
        </Layout >
    );
};

export default Html;

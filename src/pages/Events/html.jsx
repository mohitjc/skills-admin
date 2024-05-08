import React from 'react';
import Layout from '../../components/global/layout';
import './style.scss';
import { Link } from 'react-router-dom';
import { Tooltip } from "antd";
import { FiEdit3, FiPlus } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import Table from "../../components/Table";
import SelectDropdown from '../../components/common/SelectDropdown';
import statusModel from '../../models/status.model';
import datepipeModel from '../../models/datepipemodel';
import shared from "./shared";
const Html = ({
    sorting,
    edit,
    view,
    statusChange,
    pageChange,
    deleteItem,
    clear,
    filter,
    filters,
    loaging,
    data,
    count,
    changestatus,
    changeGroup,
    isAllow,
    groupdata,setFilter,
    total = { total }
}) => {

    const columns = [
        {
            key: 'title', name: 'Title', sort: true,
            render: (row) => {
                return <> <p className='capitalize'>{row?.title}</p></>
            }
        },
        {
            key: 'date', name: 'Event Date',
            render: (row) => {
                return <>
                    {datepipeModel.datetime(row?.date)}
                </>
            }
        },
        {
            key: 'groupId', name: 'Group',
            render: (row) => {
                return <>{row?.groupDetails?.name}</>
            }
        },
        {
            key: 'timezone', name: 'Timezone',
            render: (row) => {
                return <>{row?.timezone}</>
            }
        },
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
                                <a className="border cursor-pointer border-[#ff7641] hover:opacity-70 rounded-lg bg-[#ff764114] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => view(itm.id)}>
                                <span class="material-symbols-outlined">visibility</span>
                                </a>
                            </Tooltip>
                        {isAllow(`edit${shared.check}`) ?
                            <Tooltip placement="top" title="Edit">
                                <a className="border cursor-pointer border-[#ff7641] hover:opacity-70 rounded-lg bg-[#ff764114] w-10 h-10 !text-primary flex items-center justify-center text-xl" onClick={e => edit(itm.id)}>
                                    <FiEdit3 />
                                </a>
                            </Tooltip>
                            : <></>}
                        {isAllow(`delete${shared.check}`) ? <Tooltip placement="top" title="Delete"> <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl ' onClick={() => deleteItem(itm.id)}>
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
                    <h3 className="text-2xl font-semibold text-[#111827]"> {shared.title}s</h3>
                    <p class="text-sm font-normal text-[#75757A]">Here you can see all about your {shared.title}s</p>
                </div>

                <a id='downloadFile'></a>

                <div className="flex">


                    {/* <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button> */}

                    {isAllow(`add${shared.check}`) ?
                        <Link className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2" to="/event/add">
                            <FiPlus className="text-xl text-white" />   Add {shared.title}
                        </Link>
                        : <></>}
                </div>


            </div>

<div>

</div>

            <div className='shadow-box w-full bg-white rounded-lg mt-6'>
                <div className='flex items-center justify-between p-4 '>
                    
                    {/* search filter */}
                    <form class="flex items-center max-w-sm" onSubmit={e => {
                        e.preventDefault()
                        filter()
                    }}>
                        <label for="simple-search" class="sr-only">Search</label>
                        <div class="relative w-full">
                            {/* <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div> */}
                            <input type="text" id="simple-search"
                                value={filters.search}
                                onChange={e => {
                                    setFilter({ ...filters, search: e.target.value })
                                }}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required 
                            
                                />
                                {filters?.search && (
                            <i
                            className="fa fa-times absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
                            aria-hidden="true"
                            onClick={(e) => clear()}
                            ></i>
                            )}
                    </div>
                        <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-orange-500  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span class="sr-only">Search</span>
                        </button>
                    </form>
                    {/*  */}
                    <div className="flex gap-2">

                        {/* group i search */}
                    <div className=" flex items-center gap-2 mb-3">
                         
                          
                            <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='Select Group'
                            initialValue={filters.groupId}
                            result={e => { changeGroup(e.value) }}
                            options={groupdata}
                        />

                    </div>
                    {/*  */}



                        <SelectDropdown
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Status'
                            intialValue={filters.status}
                            result={e => { changestatus(e.value) }}
                            options={statusModel.list}
                        />
                        {filters.status || filters.groupId ? <>
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

import { React, useState, useEffect } from 'react'
import Layout from '../../components/global/layout'
import Table from "../../components/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Tooltip } from "antd";
import datepipeModel from '../../models/datepipemodel';
const Member = () => {
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', catType: '' })
    const [data, setData] = useState([])
    const [loaging, setLoader] = useState(true)
    const [total, setTotal] = useState(0)
    const { id } = useParams()
    const columns = [
        {
            key: 'name', name: 'Name',
            render: (row) => {
                return <span className='capitalize'>{row?.fullName}</span>
            }
        },
        {
            key: 'email', name: 'E-mail',
            render: (row) => {
                return <span>{row?.email}</span>
            }
        },
        // {
        //     key: 'lastLogin', name: 'Last Login',
        //     render: (row) => {
        //         return <span> { row?.addedByDetail?.lastLogin ?  datepipeModel.datetime(row?.addedByDetail?.lastLogin):"N/A"}</span>
        //     }
        // },
        {
            key: 'status', name: 'Status',
            render: (row) => {
                return <span className='capitalize'>  { row?.inviteStatus}</span>
            }
        },
                {
            key: 'role', name: 'Role',
            render: (row) => {
                return <span className='capitalize'> { row?.role}</span>
            }
        },
    ]
    const sorting = (key) => {
        let sorder = 'asc'
        if (filters.key == key) {
            if (filters.sorder == 'asc') {
                sorder = 'desc'
            } else {
                sorder = 'asc'
            }
        }

        let sortBy = `${key} ${sorder}`;
        setFilter({ ...filters, sortBy, key, sorder })
        getData({ sortBy, key, sorder })
    }
   
    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const changestatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    const getData = (p = {}) => {
        loader(true)
        setLoader(true)
        let filter = { ...filters, ...p, groupId: id }
        ApiClient.get('api/members/list', filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm._id
                    return itm
                }))
                setTotal(res.total)
            }
            setLoader(false)
            loader(false)
        })
    }
    const filter = (p={}) => {
        let f={
            page:1,
            ...p
        }
        setFilter({ ...filters, ...f})
        getData({ ...f})
    }
    const clear = () => {
        setFilter({ ...filters, search: '',status:'', page: 1 })
        getData({ search: '', status:'',page: 1 })
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <Layout>
            
          
            <div className='flex items-center gap-2 mb-4 justify-between'>
            <div className='flex items-center gap-2'>
            <Tooltip placement="top" title="Back">
                  <Link to="/group" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all    mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                </Tooltip>
              
            <h2 className='font-bold text-xl'>Member List</h2>
            </div>

            {/* search */}
            <form className="flex items-center max-w-sm p-6 pb-0" onSubmit={e => {
                        e.preventDefault()
                        filter()
                    }}>
                        <label for="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
                                </svg>
                            </div> */}
                            <input type="text" id="simple-search"
                                value={filters.search}
                                onChange={e => {
                                    setFilter({ ...filters, search: e.target.value })
                                }}
                                className="bg-gray-50 pr-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Search" required 
                            
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
           
           
        </Layout>
    )
}

export default Member
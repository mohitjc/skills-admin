import { React, useState, useEffect } from 'react'
import Layout from '../../components/global/layout'
import Table from "../../components/Table";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';

import { Tooltip } from "antd";
import datepipeModel from '../../models/datepipemodel';
const Member = () => {
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', catType: '' })
    let user = useSelector(state => state.user)
    const [data, setData] = useState([])
    const [loaging, setLoader] = useState(true)
    const [total, setTotal] = useState(0)
    const { id } = useParams()
    const searchState = useSelector((state) => state.search);
    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])
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
            key: 'role', name: 'Role',
            render: (row) => {
                return <span className='capitalize'> { row?.role}</span>
            }
        },
        {
            key: 'status', name: 'Status',
            render: (row) => {
                return <span className='capitalize'>  { row?.inviteStatus}</span>
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
    const count = (e) => {
        setFilter({ ...filters, count:e })
        getData({ ...filters ,count: e })
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
           
           
        </Layout>
    )
}

export default Member
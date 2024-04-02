import { Tooltip } from "antd";
import Table from "../../components/Table";
import datepipeModel from "../../models/datepipemodel";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { BsTrash3 } from "react-icons/bs";
import { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import AddAttendee from "./AddAttendee";
import loader from "../../methods/loader";
import SelectDropdown from "../../components/common/SelectDropdown";
import { useSelector } from "react-redux";

export default function AttendeeList({ eventId, eventDetail }) {
    const [data, setData] = useState([])
    const [loading, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const [tab, setTab] = useState('list')
    const [role, setRole] = useState()
    const user = useSelector((state) => state.user);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', eventId: eventId })

    const attendPremit=(row)=>{
        let value=true
        // if(row?.addedBy === user._id||eventDetail?.addedBy===user._id) value=true
        // if(role=='meetManager'||role=='assistent')value=true
        return value
    }

    const deletePremit=(row)=>{
        let value=true
        // if(row?.addedBy === user._id||eventDetail?.addedBy===user._id) value=true
        // if(role=='assistent')value=true
        return value
    }

    const columns = [
        {
            key: 'fullName', name: 'Name', sort: true,
            render: (row) => {
                return <>{row?.fullName}</>
            }
        },
        {
            key: 'email', name: 'Email',
            render: (row) => {
                return <>{row?.email}</>
            }
        },
        {
            key: 'isConnectedMeating', name: 'Connect Meet',
            render: (row) => {
                return <>
                    
                    <label class={`inline-flex items-center cursor-pointer ${attendPremit(row)?'':'opacity-50'}`}>
                        <input type="checkbox" value="" class="sr-only peer" 
                        disabled={attendPremit(row)?false:true}
                        onChange={e=>connectToggle(row)} checked={row.isConnectedMeating} />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                </>
            }
        },
        {
            key: 'registered', name: 'Registered',
            render: (row) => {
                return <>
                   {row?.invitedUser?'Yes':'No'}
                </>
            }
        },
        {
            key: 'attended', name: 'Attended',
            render: (row) => {
                return <>
                    <label class={`inline-flex items-center cursor-pointer ${attendPremit(row)?'':'opacity-50'}`}>
                        <input type="checkbox" value="" class="sr-only peer" 
                        disabled={attendPremit(row)?false:true}
                        onChange={e=>attend(row)} checked={row.attended} />
                        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                    </label>
                </>
            }
        },
        {
            key: 'role', name: 'Role',
            render: (row) => {
                return <>
                    <SelectDropdown
                    placeholder="Select Role"
                    intialValue={row.attendeeRole}
                    // disabled={(eventDetail?.addedBy===user._id)?false:true}
                    options={
                        [
                            {id:'assistent',name:'Assistent'},
                            {id:'meetManager',name:'Meet Manager'},
                            {id:'member',name:'Member'},
                        ]
                    }
                    result={e=>{
                        roleUpdate(row,e.value)
                    }}
                    />
                </>
            }
        },
        {
            key: 'createdAt', name: 'Created At',
            render: (row) => {
                return <>
                    {datepipeModel.datetime(row?.createdAt)}
                </>
            }
        },
        {
            key: 'action', name: 'Action',
            render: (itm) => {
                return <>
                    <div className="flex items-center justify-start gap-1.5">
                        {/* <Tooltip placement="top" title="View">
                                <a className="border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl">
                                <span class="material-symbols-outlined">visibility</span>
                                </a>
                            </Tooltip> */}
                        {/* <Tooltip placement="top" title="Edit">
                                <a className="border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl">
                                    <FiEdit3 />
                                </a>
                            </Tooltip> */}
                        {deletePremit(itm)? <>
                            <Tooltip placement="top" title="Delete"> <span onClick={() => deleteItem(itm.id)} className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl'>
                                <BsTrash3 />
                            </span> </Tooltip>
                        </> : <></>}

                    </div>
                </>
            }
        },
    ]


    const connectToggle=(row)=>{
        let isConnectedMeating=row.isConnectedMeating?false:true
        loader(true)
        ApiClient.put('api/attendees/update',{id:row.id,isConnectedMeating:isConnectedMeating}).then(res=>{
            if(res.success){
                getData()
            }
            loader(false)
        })
    }

    const attend=(row)=>{
        let attended=row.attended?false:true
        loader(true)
        ApiClient.put('api/attendees/update',{id:row.id,attended:attended}).then(res=>{
            if(res.success){
                getData()
            }
            loader(false)
        })
    }

    const roleUpdate=(row,role)=>{
        loader(true)
        ApiClient.put('api/attendees/update',{id:row.id,attendeeRole:role}).then(res=>{
            if(res.success){
                getData()
            }
            loader(false)
        })
    }

    const getData = (p = {}) => {
        let f = { ...filters, ...p}
        setLoader(true)
        ApiClient.get('api/attendees/list', f).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const getRole=()=>{
        let f={
            search:user.email,
            count:1
        }
        ApiClient.get('api/attendees/list',f).then(res=>{
            if(res.success){
                let data=res.data?.[0]
                setRole(data?.attendeeRole||'member')
            }
        })
    }

    useEffect(() => {
        getData()
        getRole()
    }, [])

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

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

    const clear = () => {
        let f = {
            search: '',
            page: 1
        }
        setFilter({ ...filters, ...f })
        getData({ ...f })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/attendees', { id: id }).then(res => {
                if (res.success) {
                    clear()
                }
                loader(false)
            })
        }
    }

    return <>
        <div className="flex justify-end gap-2">
            {tab == 'list' ? <>
            <button onClick={() => setTab('add')} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                    <FiPlus className="text-xl text-white" /> Add Attendee
                </button>
                
            </> : <>
                <button onClick={() => { setTab('list');}} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                    Back
                </button>
            </>}

            {filters.search ? <>
                <button onClick={() => clear()} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                    Reset
                </button>
            </> : <></>}


        </div>

        {tab == 'add' ? <>
            <AddAttendee eventId={eventId} result={e => {
                if (e.event == 'submit') {
                    clear()
                    setTab('list')
                }
            }} />
        </> : <>
            {loading ? <>
                <div className="text-center">Loading...</div>
            </> : <>
                <Table
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
            </>}

        </>}


    </>
}
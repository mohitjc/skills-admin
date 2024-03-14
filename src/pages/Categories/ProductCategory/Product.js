import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../../components/global/layout';
import environment from '../../../environment';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import methodModel from '../../../methods/methods';
import datepipeModel from '../../../models/datepipemodel';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Tooltip } from "antd";
import { HiOutlineArrowDown } from 'react-icons/hi';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import { PiFileCsv } from 'react-icons/pi';

const productCategory = ({

    dynamicStyle = false,
    className = null

}) => {
    const [loaging, setLoader] = useState(true)

    let user = useSelector(state => state.user)
    const [total, setTotal] = useState(0)
    const searchState = useSelector((state) => state.search);
    const [data, setdata] = useState([])
    const history = useHistory()
    const { type } = useParams()
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: type ? type : '', parentCategory: '', status: '' })

    const getProducts = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get(`api/categories/listing`, filter).then(res => {
            if (res.success) {
                setdata(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }
    useEffect(() => {
        getProducts()
    }, [])

    const sortClass = (key) => {
        let cls = 'fa-sort'
        if (filters.key == key && filters.sorder == 'asc') cls = 'fa-sort-up'
        else if (filters.key == key && filters.sorder == 'desc') cls = 'fa-sort-down'
        return 'fa ' + cls
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
        getProducts({ sortBy, key, sorder })
    }


    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getProducts({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const statusChange = (itm) => {
        let modal = 'category'
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
            loader(true)
            ApiClient.put(`api/category/status/change`, { id: itm.id, status }).then(res => {
                if (res.success) {
                    // toast.success(res.message)
                    getProducts()
                }
                loader(false)
            })
        }
    }

    const edit = (id) => {
        history.push(`/category/product/${type}/edit/${id}`)
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/category/delete', { id: id }).then(res => {
                if (res.success) {
                    // toast.success(res.message)
                    getProducts()
                }
                loader(false)
            })
        }
    }

    const TableRow = ({ itm, className, index, parentCategory }) => {
        return <tr className={` ${className || ''}`} >
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]' onClick={e => edit(itm.id)}> <div className='user_detail'>
                <img src={methodModel.noImg(itm.banner)} className="cat_img" />
            </div></td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]'>{itm.name || '--'}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{parentCategory?.name || '--'}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm.catTypeName}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm.createdAt)}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{datepipeModel.date(itm.updatedAt)}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>{itm?.updatedBy?.fullName || '--'}</td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                <Tooltip placement="top" title="Active / Inactive">
                    <span className='contract'>
                        {itm.status == 'deactive' ? 'Inactive' : 'Active'}
                    </span>
                </Tooltip>
            </div></td>
            <td className='!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-center border-[#EAECF0]'>
                <div className="flex items-center justify-center gap-1.5">
                    <Tooltip placement="top" title="Edit">
                        <a className='border cursor-pointer border-[#6956E5] hover:opacity-70 rounded-lg bg-[#6956E514] w-10 h-10 !text-primary flex items-center justify-center text-xl' title="Edit" onClick={e => edit(itm.id)}>
                            <FiEdit3 />
                        </a>
                    </Tooltip>
                    <Tooltip placement="top" title="Delete">
                        <span className='border cursor-pointer !border-[#E9253129] hover:opacity-70 rounded-lg bg-[#FDE9EA] w-10 h-10 text-[#E92531] flex items-center justify-center text-xl ' onClick={() => deleteItem(itm.id)}>
                            <BsTrash3 />
                        </span>
                    </Tooltip>
                </div>
            </td>
        </tr>
    }

    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/categories/export?catType=${type}`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Product Category.xlsx`;
        link.click();
    }

    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getProducts({ status: e, page: 1 })
    }

    const showData = () => {
        let value = data
        // if (dragItems && dragItems.current) value = dragItems.current
        return value
    }

    return (
        <Layout>
            <div className="flex justify-between items-center">


                <div className='flex items-center '>

                    <div>
                        <h3 className="text-2xl font-semibold text-[#111827]">
                            Product Categories
                        </h3>
                        <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Product Category</p>
                    </div>
                </div>




                <div className="flex filterFlex phSpace">
                    <button className="!px-2.5 text-[#3C3E49] text-sm font-normal py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed mr-3" onClick={() => exportfun()}>
                        <PiFileCsv className="text-typo text-xl" />  Export CSV
                    </button>
                    <Link to={`/category/product/${type}/add`} className="bg-primary leading-10 mr-3 h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">
                        <FiPlus className="text-xl text-white" />  Add Product Category
                    </Link>


                </div>
            </div>

            <div className="shadow-box w-full bg-white rounded-lg mt-6">

                <span className='flex p-4 justify-end'>
                    <div className="dropdown1 addDropdown1 region_status">

                        <Menu as="div" className="relative list_box_active_state ml-auto">
                            <div>
                                <Menu.Button className="inline-flex w-ful border justify-center gap-x-1.5 rounded-md bg-white px-3 py-2.5 text-sm font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200">
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
                </span>


                <div className="scrollbar w-full overflow-auto">
                    <table class="w-full">
                        <thead className='border-b border-[#EAECF0]'>
                            <tr className='border-b border-[#EAECF0]'>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' >Image</th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')} >Category Name <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('parentCategory')}>Parent Category<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('catTypeName')} >Category Type<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('createdAt')}>Date Created<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('updatedAt')}>Last Modified<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
                                <th scope="col" className='cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-center bg-[#F7FAFF] !py-3 ' onClick={e => sorting('ModifyBy')}>Last Modified by<span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span></th>
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
                    !loaging && total > filters.count ? <div className='paginationWrapper p-4'>
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
    )
}

export default productCategory
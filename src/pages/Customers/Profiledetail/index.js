import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import datepipeModel from "../../../models/datepipemodel";
import SelectDropdown from '../../../components/common/SelectDropdown';
import { toast } from 'react-toastify';
import moment from 'moment';
import methodModel from '../../../methods/methods';
import pipeModel from '../../../models/pipeModel';

const UserDetail = (p) => {
    const history = useNavigate()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const [planDetails, setplanDetails] = useState()
    const [trailDays, settrailDays] = useState()
    const [invoices, setInvoices] = useState([])

    const getDetail = (did) => {
        loader(true)
        ApiClient.get(`api/user/detail`, { id: did }).then(res => {
            if (res.success) {
                setData(res.data)
                settrailDays('')
            }
            loader(false)
        })
    }
    const back = () => {
        history(-1)
    }
    const getPlanDetails = () => {
        ApiClient.get(`api/my/plan?id=${id}`).then(res => {
            if (res.success) {
                setplanDetails(res.data)
            }
        })
    }

    useEffect(() => {
        getDetail(userId ? userId : id)
        // getPlanDetails()
        // getInvoices()
    }, [id, userId])

    const cancelPlan = () => {
        if (window.confirm('Do you really want to cancel the plan')) {
            ApiClient.delete(`api/cancel/subscription?id=${planDetails?.id}&userId=${id}`).then(res => {
                if (res.success) {
                    getDetail(userId ? userId : id)
                    getPlanDetails()
                }
            })
        }
    }

    const handleTrailDays = () => {
        let payload = {
            user_id: userId ? userId : id,
            extend_days: Number(trailDays)
        }
        ApiClient.put(`api/extend-trial`, payload).then(res => {
            if (res.success) {
                // toast.success(res.message)
                getPlanDetails()
                getDetail(userId ? userId : id)
            }
        })
    }

    const getInvoices = () => {
        let f = { userId: userId ? userId : id }
        ApiClient.get('api/invoices/list', f).then(res => {
            if (res.success) {
                setInvoices(res.data)
            }
        })
    }

    const Column=({data='',label=''})=>{
        return <>
        <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">{label}</label>
                                <div className='profiledetailscls'>{data || '--'}</div>
                            </div>
        </>
    }

    return (
        <Layout>
            <div className='bg-white shadow-box rounded-lg w-full p-4 mt-6'>
                <div className="text-right">
                    <div>
                        <a to="/users" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="sideclass col-span-12 md:col-span-12">
                        <h3 className="mt-3 mb-6 py-2 bg-gray-300 px-3">Frontend User Details</h3>
                        <div className="grid grid-cols-12 gap-4 ">
                            <Column className="capitalize" data={data && data.fullName} label="Name" />
                            <Column data={data && data.email} label="Email" />
                            <Column data={data?.mobileNo ? <>+{data && data.mobileNo}</> : <>--</>} label="Mobile No" />
                            {/* <Column data={data && data.email} label="Mobile No" /> */}
                            <Column data={data && data.company} label="Company" />
                            <Column data={data && data.address} label="Address" />
                            <Column data={data && data.address2} label="Address2" />
                            <Column data={data && data.country} label="Country" />
                            <Column data={data && data.state} label="State" />
                            <Column data={data && data.zinpcode} label="PinCode" />
                            <Column data={data && data.city} label="City" />
                            <Column data={data && data.timezone} label="Timezone" />
                            <Column data={data && data.customerRole?.name} label="Customer Role" />
                            <Column data={data && data.adminComment} label="Admin Comment" />
                            <Column data={data && data.linkedInUrl} label="Linkedin Profile Url" />
                            <Column data={data && data.certification?.name} label="Certification" />
                            <Column data={data && data.skills1} label="skills" />
                            <Column data={data && data.networkingGroup} label="Networking Groups" />
                            <Column data={data && data.category?.name} label="Profession Category" />
                            <Column data={data && data.subCategory?.name} label="Profession Sub Category" />
                            <Column data={data && data.subSubCategory?.name} label="Profession Sub Sub Category" />
                            <Column data={data && data.groupId?.name} label="Group" />
                            <Column data={data && data.aboutUs} label="Short Bio" />
                        </div>

                    
                        {/* <h3 className='mt-3 mb-6 py-2 bg-gray-300 px-3'>Plan Details {planDetails?.isActive ? <i className='fa fa-trash text-danger ml-2' onClick={e => cancelPlan()}></i> : null}</h3>
                        <div className='grid grid-cols-12 gap-4'>
                            <div className='col-span-12 md:col-span-6'>
                                <label className="profileheddingcls">Plan Active</label>
                                <div className='profiledetailscls'>{planDetails && planDetails?.isActive ? 'Yes' : 'No'}</div>
                            </div>
                            {planDetails?.on_trial ?
                                <>
                                    <div className='col-md-4 mb-3'>
                                        <label className="profileheddingcls">Extend Trail Period (Days)</label>
                                        <input type='text' value={trailDays} minLength="1" maxLength="3" onChange={e => settrailDays(methodModel.isNumber(e))} className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" placeholder='Enter days to Extend Trail Period' />
                                    </div>
                                    <div className='col-md-2 mb-3'>
                                        <button className='btn btn-primary mt-4' onClick={e => handleTrailDays()}>Save</button>
                                    </div>
                                    <div className='col-span-12 md:col-span-6'>
                                        <label className='profileheddingcls'>Valid Upto</label>
                                        <div className='profiledetailscls'>{moment(planDetails && planDetails?.validUpTo).format('DD MMM YYYY')}</div>
                                    </div>
                                </>
                                :
                                null
                            }
                            {planDetails?.isActive ?
                                <>
                                    <div className='col-span-12 md:col-span-6'>
                                        <label className="profileheddingcls">Plan</label>
                                        <div className='profiledetailscls'>{planDetails && planDetails?.planId?.name || '--'}</div>
                                    </div>
                                    {!planDetails?.on_trial ?
                                        <div className='col-span-12 md:col-span-6'>
                                            <label className="profileheddingcls">Months</label>
                                            <div className='profiledetailscls'>{planDetails && planDetails?.planInterval || '--'}</div>
                                        </div>
                                        : null}
                                    <div className='col-span-12 md:col-span-6'>
                                        <label className="profileheddingcls">Payments Made</label>
                                        <div className='profiledetailscls'>{planDetails && datepipeModel.date(planDetails?.updatedAt)}</div>
                                    </div>

                                    <div className='col-span-12 md:col-span-6'>
                                        <label className="profileheddingcls">Next Payment Due</label>
                                        <div className='profiledetailscls'>{planDetails && datepipeModel.date(planDetails?.validUpTo)}</div>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div> */}

                        {/* <h3 className='mt-3 mb-6 py-2 bg-gray-300 px-3'>Plan Invoices</h3>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Invoice Number</th>
                                    <th>Paid At</th>
                                    <th>Paid Amount</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(itm => {
                                    return <tr>
                                        <td>{itm.invoiceNumber}</td>
                                        <td>{datepipeModel.date(itm.createdAt)}</td>
                                        <td>{pipeModel.currency(itm.paidAmount)}</td>
                                        <td>{itm.description}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        {invoices.length ? <></> : <>
                            <div className='text-center mt-3'>No Data</div>
                        </>} */}


                    </div>
                </div>
            </div>



        </Layout >

    );
};

export default UserDetail;

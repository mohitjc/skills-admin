import {  useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";

import { decryptId } from "../../components/common/Encryption/encryption";
const View = () => {
    const [data, setData] = useState()
    const [host, setHost] = useState()
    const history = useNavigate()
    const {detailid}=useParams()
const id = decryptId(detailid)

   

    const getDetail=()=>{
        ApiClient.get("api/contactus",{id:id}).then(res=>{
            if(res.success){
                setData(res.data)
             
            }
        })
    }

    useEffect(()=>{
        getDetail()
    },[])

    return <>
        <Layout>
            <div className="text-right">
                <div>
                    <a to="/users" onClick={() => history(-1)}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className='bg-white shadow-box rounded-lg w-full p-4 mt-6'>

                <div className="grid grid-cols-12 gap-4">
                    <div className="sideclass col-span-12 md:col-span-12">
                        <h3 className="mt-3 mb-6 py-2 bg-gray-300 px-3">ContactUs Details</h3>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls ">First Name</label>
                                <div className='profiledetailscls capitalize'>{data?.firstName || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Last Name</label>
                                <div className='profiledetailscls capitalize'>{data?.lastName || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Full Name</label>
                                <div className='profiledetailscls capitalize'>{data?.fullName}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">E-mail</label>
                                <div className='profiledetailscls '>{data?.email || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Message</label>
                                <div className='profiledetailscls capitalize'>{data?.message || '--'}</div>
                            </div>
                          
                        </div>


                    </div>
                </div>
            </div>
            {/* <div className='bg-white shadow-box rounded-lg w-full p-4 mt-6'>
                <div className="grid grid-cols-12 gap-4">
                    <div className="sideclass col-span-12 md:col-span-12">
                        <h3 className="mt-3 mb-6 py-2 bg-gray-300 px-3">Attendeee</h3>
                       <AttendeeList eventId={id} eventDetail={data} />
                    </div>
                </div>
            </div> */}
        </Layout>
    </>
}

export default View;
import {  useNavigate } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useEffect, useState } from "react";
import datepipeModel from "../../models/datepipemodel";
import ApiClient from "../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import shared from "./shared";
import AttendeeList from "./AttendeeList";
import { decryptId } from "../../components/common/Encryption/encryption";
const View = () => {
    const [data, setData] = useState()
    const [host, setHost] = useState()
    const history = useNavigate()
    const {detailid}=useParams()
const id = decryptId(detailid)

    const getHostDetail=(id)=>{
        ApiClient.get('api/user/detail',{id:id}).then(res=>{
            if(res.success){
                setHost(res.data)
               
            }
        })
    }

    const getDetail=()=>{
        ApiClient.get(shared.detailApi,{id:id}).then(res=>{
            if(res.success){
                setData(res.data)
                getHostDetail(res.data.addedBy._id)
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
                    <a to="/users" onClick={() => history(`/${shared.url}`)}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className='bg-white shadow-box rounded-lg w-full p-4 mt-6'>

                <div className="grid grid-cols-12 gap-4">
                    <div className="sideclass col-span-12 md:col-span-12">
                        <h3 className="mt-3 mb-6 py-2 bg-gray-300 px-3">{shared.title} Details</h3>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Title</label>
                                <div className='profiledetailscls'>{data?.title || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Type</label>
                                <div className='profiledetailscls capitalize'>{data?.type || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Event Date</label>
                                <div className='profiledetailscls'>{datepipeModel.date(data?.date)}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Timezone</label>
                                <div className='profiledetailscls'>{data?.timezone || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Max Capacity</label>
                                <div className='profiledetailscls'>{data?.capacity || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Deadline</label>
                                <div className='profiledetailscls'>{datepipeModel.date(data?.deadline)}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">External Link</label>
                                <div className='profiledetailscls'>{data?.externalLink || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Location</label>
                                <div className='profiledetailscls'>{data?.address || '--'}</div>
                            </div>
                            <div className="col-span-12 col-span-full">
                                <label className="profileheddingcls">Description</label>
                                <div className='profiledetailscls' dangerouslySetInnerHTML={{__html:data?.description || '--'}}></div>
                            </div>
                           
                           
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Host</label>
                                <div className='profiledetailscls'>{host?.fullName || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Group</label>
                                <div className='profiledetailscls'>{host?.groupId?.name || '--'}</div>
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
import { useHistory } from "react-router-dom";
import Layout from "../../components/global/layout";
import { useState } from "react";
import datepipeModel from "../../models/datepipemodel";

const View = () => {
    const [data, setData] = useState()
    const history = useHistory()
    return <>
        <Layout>
            <div className="text-right">
                <div>
                    <a to="/users" onClick={() => history.push('/event')}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className='bg-white shadow-box rounded-lg w-full p-4 mt-6'>

                <div className="grid grid-cols-12 gap-4">
                    <div className="sideclass col-span-12 md:col-span-12">
                        <h3 className="mt-3 mb-6 py-2 bg-gray-300 px-3">Event Details</h3>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Title</label>
                                <div className='profiledetailscls'>{data?.title || '--'}</div>
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
                                <label className="profileheddingcls">Description</label>
                                <div className='profiledetailscls'>{data?.description || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">External Link</label>
                                <div className='profiledetailscls'>{data?.externalLink || '--'}</div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <label className="profileheddingcls">Location</label>
                                <div className='profiledetailscls'>{data?.address || '--'}</div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </Layout>
    </>
}

export default View;
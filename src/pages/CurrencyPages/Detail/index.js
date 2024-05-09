import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux'; 

const CurrencyDetail = (p) => {
    const history = useNavigate()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(``, { id: did }).then(res => {
            if (res.success) {
                setData(res.data)
            }
            loader(false)
        })
    };

    const back = () => {
        history(-1)
    }

    useEffect(() => {
        getDetail( id)
    }, [id, userId])

    return (
        <Layout>
            <div className="text-right">
                <div>
                    <a to="/curency" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className="row">
                <div className="sideclass col-md-12">
                    <h3 className="Profilehedding mt-3 ">
                    Country Detail
                    </h3>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Name</label>
                            <div className='profiledetailscls'>{data && data.name}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Symbol</label>
                            <div className='profiledetailscls'>{data && data.symbol}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">ISO</label>
                            <div className='profiledetailscls'>{data && data.iso}</div>
                        </div>
                         
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Status</label>
                            <div className='profiledetailscls'>{data && data.status}</div>
                        </div>
                        
                    
                        
                    </div>
                </div>
            </div>
        </Layout >

    );
};

export default CurrencyDetail;

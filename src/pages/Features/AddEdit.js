import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";
import { Tooltip } from "antd";
import environment from "../../environment";
import { decryptId } from "../../components/common/Encryption/encryption";

const AddEditFeature = () => {
    const [images, setImages] = useState({ image: '', banner: '', icon: '' });
    const [features, setFeatures] = useState([{ name: 'Option 1️⃣', id: 1 }, { name: 'Option 2️⃣', id: 2 }])

    const { userid } = useParams()
    const id = decryptId(userid)
    const [form, setform] = useState({id:'',name:'',description:'',status:'active'})
    const history = useNavigate()
    const [submitted, setSubmitted] = useState(false)
    const [categories, setcategories] = useState()
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true },
        // { key: 'category', required: true },
        {key :'description' ,required: true },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/feature'
        let value = {
            ...form
        }
        if (value.id) {
            method = 'put'
            url = 'api/feature'
        } else {
            value.addedBy=user._id
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                history("/features")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/feature/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = form

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (value.category?._id) {
                        payload.category = value.category._id
                    }
                    payload.id=id
                    setform({
                        ...payload
                    })
                }
                loader(false)
            })
        }

    }, [id])

    // const onSelect = (e) => {
    //     console.log("onSelect", e)
    // }

    // const onRemove = (e) => {
    //     console.log("onRemove", e)
    // }

    const getCategoires = () => {
        ApiClient.get(`api/categorie/list`, { catType: environment.planTypeId, status: 'active' }).then(res => {
            setcategories(res.data)
        })
    }

    useEffect(() => {
        getCategoires()
    }, [])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">


                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">
                            <Link to="/features" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all   mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'} Plan Feature
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Plan Feature</p>
                        </div>
                    </div>




                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        {/* <div className="col-span-12 md:col-span-6">
                            <label>Categories<span className="star">*</span></label>
                            <div className="custom_dropdown">
                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Category"
                                    intialValue={form.category}
                                    result={e => { setform({ ...form, category: e.value }) }}
                                    options={categories}
                                />
                                {submitted && !form.category ? <div className="text-danger">Categories is Required</div> : <></>}
                            </div>
                        </div> */}
                        <div className="col-span-12 md:col-span-6">
                            <label>Status<span className="star">*</span></label>
                            <div className="custom_dropdown">
                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Status"
                                    intialValue={form.status}
                                    result={e => { setform({ ...form, status: e.value }) }}
                                    options={statusModel.list}
                                />
                                {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label>Tooltip<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.description}
                                onChange={e => setform({ ...form, description: e.target.value })}
                            />
                             {submitted && !form.description ? <div className="text-danger">Description is Required</div> : <></>}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">

                        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </div>




                </div>


            </form>
        </Layout>
    </>
}

export default AddEditFeature
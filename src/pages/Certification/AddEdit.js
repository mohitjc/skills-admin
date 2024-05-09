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
import ImageUpload from "../../components/common/ImageUpload";

const AddEdit = () => {
    const { id } = useParams()
    const [images, setImages] = useState({ image: ''});
    const [form, setform] = useState({ id: '', name: '', image:'',description:'',status: 'active' })
    const history = useNavigate()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/certificate'
        let value = {
            ...form,
            ...images
        }
        if (value.id) {
            method = 'put'
            url = 'api/certificate/update'
        } else {
            value.addedBy=user._id
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                history("/certification")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/certificate/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = form

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })

                    payload.id=id
                    setform({
                        ...payload
                    })

                    let img=images
                    Object.keys(img).map(itm => {
                        img[itm] = value[itm]
                    })
                    setImages({...img})


                }
                loader(false)
            })
        }

    }, [id])

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">


                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">

                            <Link to="/certification" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'}  Certification
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your Certification</p>
                        </div>
                    </div>



                    <h3 className="ViewUser mb-3"></h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Status<span className="star">*</span></label>
                            <div className="custom_dropdown">
                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    intialValue={form.status}
                                    result={e => { setform({ ...form, status: e.value }) }}
                                    options={statusModel.list}
                                />
                                {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
                            </div>
                        </div>
                     
                        <div className="">
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} />
                            </div>
                    </div>
                    <div className="text-right">

                        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEdit
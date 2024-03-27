import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import statusModel from "../../models/status.model";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import timezoneModel from "../../models/timezone.model";
import shared from "./shared";
import { useSelector } from "react-redux";

const AddEdit = () => {
    const { id } = useParams()
    const [images, setImages] = useState({ image: ''});
    const [form, setform] = useState({ id: '', title: '', date:'',timezone:'',capacity:'',description:'',deadline:'',externalLink:'',address:'',status: 'active' })
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true },
        { key: 'timezone', required: true }
    ]

    const timezones=timezoneModel.list

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = shared.addApi
        let value = {
            ...form,
            ...images
        }
        if (value.id) {
            method = 'put'
            url = shared.editApi
        } else {
            value.addedBy=user._id
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                history.push(`/${shared.url}`)
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get(shared.detailApi, { id }).then(res => {
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

    const getError = (key) => {
        return submitted?methodModel.getError(key, form, formValidation)?.message:''
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">


                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">

                            <Link to="/event" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'}  {shared.title}
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your {shared.title}</p>
                        </div>
                    </div>



                    <h3 className="ViewUser mb-3"></h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="text"
                                name="title"
                                label="Title"
                                value={form.title}
                                onChange={e => setform({ ...form, title: e })}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                        <FormControl
                                type="select"
                                name="status"
                                label="Status"
                                displayValue="name"
                                placeholder="Select Status"
                                value={form.status}
                                onChange={e => setform({ ...form, status: e })}
                                options={statusModel.list}
                                required
                                error={getError('status')}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="datetime-local"
                                name="date"
                                label="Event Date"
                                value={form.date}
                                onChange={e => setform({ ...form, date: e })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                        <FormControl
                                type="select"
                                name="timezone"
                                label="Timezone"
                                displayValue="name"
                                placeholder="Select Timezone"
                                value={form.timezone}
                                onChange={e => setform({ ...form, timezone: e })}
                                options={timezones}
                                theme="search"
                                required
                                error={getError('timezone')}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="number"
                                name="capacity"
                                label="Max Capacity"
                                value={form.capacity}
                                maxlength="8"
                                onChange={e => setform({ ...form, capacity: e })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormControl
                               type="datetime-local"
                                name="deadline"
                                label="RSVP Deadline"
                                value={form.deadline}
                                maxlength="8"
                                onChange={e => setform({ ...form, deadline: e })}
                                required
                            />
                        </div>

                        

                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="text"
                                name="externalLink"
                                label="External Link"
                                value={form.externalLink}
                                onChange={e => setform({ ...form, externalLink: e })}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="text"
                                name="address"
                                label="Location"
                                value={form.address}
                                onChange={e => setform({ ...form, address: e })}
                                required
                            />
                        </div>


                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="editor"
                                name="description"
                                label="Description"
                                value={form.description}
                                onChange={e => setform({ ...form, description: e })}
                                required
                            />
                        </div>

                        {/* <div className="col-span-12 md:col-span-6">
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} />
                            </div> */}
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
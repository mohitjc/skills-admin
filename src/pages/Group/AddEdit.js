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
import { Editor } from "@tinymce/tinymce-react";
import tinymcModel from "../../models/tinymc.model";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AddEdit = () => {
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
    ];

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'color'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };
    const { id } = useParams()
    const [images, setImages] = useState({ image: '' });
    const [form, setform] = useState({ id: '', name: '', image: '', description: '', status: 'active' })
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
        let url = 'api/group'
        let value = {
            ...form,
            ...images,
        }
        if (value.id) {
            method = 'put'
            url = 'api/group'
        } else {
            value.addedBy = user._id
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                history("/group")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/group/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = form

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    payload.id = id
                    setform({
                        ...payload
                    })
                    let img = images
                    Object.keys(img).map(itm => {
                        img[itm] = value[itm]
                    })
                    setImages({ ...img })
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

                            <Link to="/group" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'}  Group
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your Group</p>
                        </div>
                    </div>



                    <h3 className="ViewUser mb-3"></h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
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
                        <div className="col-span-12 md:col-span-6 quills">
                            <label className='lablefontcls'>Description</label>
                            {/* <Editor
                            textareaName="description"
                            value={form?.description}
                            className="tuncketcls"
                            onEditorChange={(newValue, editor) => {
                              setform({ ...form, description: newValue });
                            }}
                            apiKey={tinymcModel.apiKey}
                            init={{
                              selector: "textarea#autocompleter-cardmenuitem",
                              height: 250,
                              plugins: tinymcModel.plugins,
                              toolbar: tinymcModel.toolbar,
                            }}
                            required
                          /> */}

                            <ReactQuill
                                formats={formats}
                                modules={modules}
                                theme="snow"
                                value={form?.description}
                                onChange={e => setform({ ...form, description: e })}
                                required
                                className=" "
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
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
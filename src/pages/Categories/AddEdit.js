import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import ImageUpload from "../../components/common/ImageUpload";
import { CategoryType } from "../../models/type.model";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model"
import { Tooltip } from "antd";
import { toast } from "react-toastify";
import { decryptId } from "../../components/common/Encryption/encryption";

const AddEditCategory = () => {
    const [images, setImages] = useState({ image: '', banner: '', icon: '' });
    const defaultvalue = CategoryType
    const { userid, type } = useParams()
    const id = decryptId(userid)
    const [form, setform] = useState({ defaultvalue, catType: type ? type : '' })
    const [categories, setCategories] = useState([])
    const [tab, setTab] = useState('info')
    const history = useNavigate()
    const [submitted, setSubmitted] = useState(false)
    const [Types, setTypes] = useState()
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'name', required: true },
        { key: 'status', required: true },
        { key: 'catType', required: true },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (tab == 'seo' && (invalid)) {
            toast.error("Please fill Required Fields")
        }

        if (invalid) return
        let method = 'post'
        let url = 'api/categorie'
        let value = {
            ...form,
            ...images,
            bannerOverlayBody: form.tiny_bannerOverlayBody,
            subParentCategory: CategoryChange(form.parentCategory),
            description: form.tiny_description,
            parentCategory: form.parentCategory ? form.parentCategory : null
        }
        if (value.id) {
            method = 'put'
            url = 'api/categorie/update'
        } else {
            value.addedBy=user._id
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                if (type) {
                    history(`/category/${type}`)
                } else {
                    history("/categories")
                }

            }
            loader(false)
        })
    }

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
      
    }

    const getCategory = (t = type) => {
        ApiClient.get("api/categorie/list", { page: 1, count: 100, catType: t, status: 'active' }).then(res => {
            if (res.success) {
                setCategories(res.data)
            }
        })
    }

    const CategoryChange = (e) => {
        let ext = categories.find(itm => itm.id == e)
        let value = null
        if (ext && ext.parentCategory) value = ext.parentCategory._id
        return value
    }

    const back = () => {
        history(-1)
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/categorie/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = defaultvalue
                    let oarr = Object.keys(defaultvalue)
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                    if(payload.parentCategory._id) payload.parentCategory = payload.parentCategory._id
                    if(payload.catType._id) payload.catType = payload.catType._id
                  
                    // if (payload.subParentCategory) payload.subParentCategory = payload.subParentCategory._id
                    payload.id=id
                    setform({
                        ...payload,
                        tiny_bannerOverlayBody: payload.bannerOverlayBody,
                        tiny_description: payload.description,
                    })
                    Object.keys(images).map(itm => {
                        images[itm] = value?.[itm]
                    })
                    setImages(images)
                }
                loader(false)
            })
        } else {
            let payload = defaultvalue
            Object.keys(defaultvalue).map(itm => {
                payload[itm] = ''
            })
            if (type) payload.catType = type
            payload.status = 'active'
            payload.featured = 'No'
            setform(payload)
        }
        getCategory()
    }, [id])

    const getTypes = () => {
        ApiClient.get(`api/categorytype/listing`, { status: 'active' }).then(res => {
            if (res.success) {
                setTypes(res.data)
            }
        })
    }
    useEffect(() => {
        getTypes();
    }, [])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">


                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">
                            <button type="button" onClick={e => back()} className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all   discard mr-3"><i className='fa fa-angle-left text-lg'></i></button>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'} {type ? 'Reseller' : ''} Category
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Category</p>
                        </div>
                    </div>






                    <div className="grid grid-cols-12 gap-4">
                        

                        {tab == 'info' ? <>
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


                            {!type ? <div className="col-span-12 md:col-span-6">
                                <label>Type<span className="star">*</span></label>
                                <div className="custom_dropdown">
                                    <SelectDropdown
                                        id="statusDropdown"
                                        displayValue="name"
                                        placeholder="Select Type"
                                        intialValue={form.catType}
                                        theme="search"
                                        result={e => { setform({ ...form, catType: e.value, parentCategory: '' }); getCategory(e.value) }}
                                        options={Types && Types.map(itm => { return { id: itm.id, name: itm.name } })}
                                    />
                                    {submitted && !form.catType ? <div className="text-danger">Type is Required</div> : <></>}
                                </div>

                            </div> : <></>}


                          

                            <div className="col-span-12 md:col-span-6">
                                <label>Parent Category</label>
                                <div className="custom_dropdown">
                                    <SelectDropdown
                                        id="statusDropdown"
                                        displayValue="name"
                                        placeholder="Set as Parent"
                                        intialValue={form.parentCategory}
                                        result={e => { setform({ ...form, parentCategory: e.value }) }}
                                        options={categories}
                                        theme="search"
                                    />
                                </div>
                            </div>

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
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} multiple={false} />

                            </div>
                           
                        </> : <>
                            <div className="col-span-12 md:col-span-12">
                                <label>URL Key</label>
                                <input
                                    type="text"
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                    value={form.urlKey}
                                    onChange={e => setform({ ...form, urlKey: e.target.value })}
                                />
                                <div className="small">Leave empty to auto generate</div>
                            </div>
                            <div className="col-span-12 md:col-span-12">
                                <label>Meta Title<span className="star">*</span></label>
                                <input
                                    type="text"
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                    value={form.metaTitle}
                                    onChange={e => setform({ ...form, metaTitle: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-12">
                                <label>Meta Description<span className="star">*</span></label>
                                <textarea
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                    value={form.metaDescription}
                                    onChange={e => setform({ ...form, metaDescription: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-span-12 md:col-span-12">
                                <label>Keywords<span className="star">*</span></label>
                                <input
                                    type="text"
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                    value={form.keywords}
                                    onChange={e => setform({ ...form, keywords: e.target.value })}
                                    required
                                />
                            </div>
                        </>}


                    </div>
                    <div className="flex justify-end">

                        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEditCategory
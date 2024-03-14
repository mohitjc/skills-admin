import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import { toast } from "react-toastify";
import { Tooltip } from "antd";

const AddEditCurrency = () => {
    const [form, setform] = useState({ currency: '' })
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const { id } = useParams()
    const user = useSelector((state) => state.user);
    const [country, setcountry] = useState([])
    const formValidation = [
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form?.countryFlagImage) {
            toast.error('Add Country Flag')
            return
        }
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        //  URL Please
        let url = 'api/currency'
        let value = {
            ...form,
        }
        if (value.id) {
            method = 'put'
            url = 'api/currency/update'
            value = {
                ...form, id: id
            }
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                history.push("/currency")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            getdetail()
        }
    }, [id])

    const getdetail = () => {
        loader(true)
        ApiClient.get(`api/currency/detail?id=${id}`).then(res => {
            if (res.success) {
                setform(res.data)
            }
            loader(false)
        })
    }

    useEffect(() => {
        getCountries()
    }, [])

    const getCountries = () => {
        ApiClient.get(`api/country/listing?page=1&count=50`).then(res => {
            if (res.success) {
                setcountry(res.data)
            }
        })
    }

    const uploadImage = (e) => {
        setform({ ...form, baseImg: e.target.value })
        let files = e.target.files
        let file = files.item(0)
        loader(true)
        ApiClient.postFormData('api/upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
            if (res.fileName) {
                let image = res.fileName
                setform({ ...form, countryFlagImage: image, baseImg: '' })
            } else {
                setform({ ...form, baseImg: '' })
            }
            loader(false)
        })
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">

                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">
                            <Link to="/currency" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all   mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'} Currency
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Currency</p>
                        </div>
                    </div>


                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.currency}
                                onChange={e => setform({ ...form, currency: e.target.value })}
                                required
                            />
                        </div>
                        {/* <div className="col-span-12 md:col-span-6">
                            <label>Country<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                intialValue={form.country}
                                result={e => {setform({...form,country:e.value})}}
                                options={country}
                                onChange={(e) => setcountry({...form, country: e.target.value})}
                            />
                        </div> */}
                        <div className="col-span-12 md:col-span-6">
                            <label>Symbol<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.symbol}
                                onChange={e => setform({ ...form, symbol: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label>ISO<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.isoCode}
                                onChange={e => setform({ ...form, isoCode: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <label>Upload Country Flag<span className="star">*</span></label>
                            <div className="flex">
                                {form?.countryFlagImage ?
                                    <div className="relative">
                                        <img src={methodModel.userImg(form && form.countryFlagImage)} width='160px' />
                                        <i className="fa fa-trash text-danger icon-css" onClick={e => setform({ ...form, countryFlagImage: '' })}></i>
                                    </div>
                                    :
                                    <div>
                                        <label className="btn btn-primary edit ml-2 inline-block">
                                            <input
                                                id="bannerImage"
                                                type="file"
                                                className="d-none"
                                                accept="image/*"
                                                value={form.baseImg ? form.baseImg : ''}
                                                onChange={(e) => { uploadImage(e); }}
                                            />{form.countryFlagImage ? 'Change' : 'Upload'} Image</label>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">

                        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </div>


                </div>
            </form>
        </Layout>
    </>
}

export default AddEditCurrency
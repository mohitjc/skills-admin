import React, { useState, useEffect, useRef } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { planType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import statusModel from "../../models/status.model";
import SelectDropdown from "../../components/common/SelectDropdown";
import requiredModel from "../../models/required.model";
import { Tooltip } from "antd";

const AddEditPlan = () => {
    const [features, setFeatures] = useState([])
    const [currencys, setCurrencys] = useState([])

    const defaultvalue = () => {
        let keys = { ...planType }
        Object.keys(planType).map(itm => {
            keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id, copy } = useParams()
    const [form, setform] = useState(planType);
    const [checkedItems, setCheckedItems] = useState([]);
    const [startIndex, setStartIndex] = useState(-1);
    const [enterIndex, setEnterIndex] = useState(-1);
    const [selectedItem, setSelectedItem] = useState('');
    const [pricing, setPricing] = useState([]);
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const dragItem = useRef();
    const dragItems = useRef();
    const dragOverItem = useRef();
    const formValidation = [
        // { key: 'feature', required: true },
        { key: 'status', required: true },
        // { key: 'recommended', required: true },
    ]

    const trailPeriodDays = [
        { id: 1, name: '1' },
        { id: 2, name: '2' },
        { id: 3, name: '3' },
        { id: 4, name: '4' },
        { id: 5, name: '5' },
        { id: 6, name: '6' },
        { id: 7, name: '7' },
        { id: 8, name: '8' },
        { id: 9, name: '9' },
        { id: 10, name: '10' },
        { id: 11, name: '11' },
        { id: 12, name: '12' },
        { id: 13, name: '13' },
        { id: 14, name: '14' },
        { id: 15, name: '15' },
        { id: 16, name: '16' },
        { id: 17, name: '17' },
        { id: 18, name: '18' },
        { id: 19, name: '19' },
        { id: 20, name: '20' },
        { id: 21, name: '21' },
        { id: 22, name: '22' },
        { id: 23, name: '23' },
        { id: 24, name: '24' },
        { id: 25, name: '25' },
        { id: 26, name: '26' },
        { id: 27, name: '27' },
        { id: 28, name: '28' },
        { id: 29, name: '29' },
        { id: 30, name: '30' },
    ]

    const selectfeatures = (value, key, index) => {
        if (checkedItems.includes(value)) {
            const updatedCheckedItems = checkedItems.filter(item => item !== value);
            setCheckedItems(updatedCheckedItems);
        }
        else {
            setCheckedItems([...checkedItems, value]);
        }

        let checked = features[key][index].checked
        features[key][index].checked = checked ? false : true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/plan'
        let value = {
            ...form,
            feature: features
        }

        let fpricing = []

        const getStripeId = (itm) => {
            let ext = pricing.find(pitm => (pitm.interval_count == itm.interval_count && pitm.currency == itm.currency))
            return ext ? ext.stripe_price_id : ''
        }

        if (form.monthlyPrice) {
            let oarr = Object.keys(form.monthlyPrice)
            let val = form.monthlyPrice
            let interval_count = 1
            oarr.map(itm => {
                let payload = {
                    interval: "month",
                    interval_count: interval_count,
                    currency: itm,
                    unit_amount: val[itm],
                    stripe_price_id: getStripeId({ interval_count: interval_count, currency: itm })
                }
                fpricing.push(payload)
            })
        }

        if (form.threeMonthPrice) {
            let oarr = Object.keys(form.threeMonthPrice)
            let val = form.threeMonthPrice
            let interval_count = 3
            oarr.map(itm => {
                let payload = {
                    interval: "month",
                    interval_count: interval_count,
                    currency: itm,
                    unit_amount: val[itm],
                    stripe_price_id: getStripeId({ interval_count: interval_count, currency: itm })
                }
                fpricing.push(payload)
            })
        }

        if (form.sixMonthPrice) {
            let oarr = Object.keys(form.sixMonthPrice)
            let val = form.sixMonthPrice
            let interval_count = 6
            oarr.map(itm => {
                let payload = {
                    interval: "month",
                    interval_count: interval_count,
                    currency: itm,
                    unit_amount: val[itm],
                    stripe_price_id: getStripeId({ interval_count: interval_count, currency: itm })
                }
                fpricing.push(payload)
            })
        }

        if (form.yearlyPrice) {
            let oarr = Object.keys(form.yearlyPrice)
            let val = form.yearlyPrice
            let interval_count = 12
            oarr.map(itm => {
                let payload = {
                    interval: "month",
                    interval_count: interval_count,
                    currency: itm,
                    unit_amount: val[itm],
                    stripe_price_id: getStripeId({ interval_count: interval_count, currency: itm })
                }
                fpricing.push(payload)
            })
        }
        // return 
        if (value.id && copy == 'false') {
            method = 'put'
            url = 'api/plan'
            value.pricing = fpricing
        } else {
            value.addedBy=user._id
            delete value.id
        }
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                history.push("/plans")
            }
            loader(false)
        })
    }

    const getFeatures = (feature = {}) => {
        let f = feature
        ApiClient.get('api/grouped/features', { page: 1, count: 100, status: 'active' }).then(res => {
            if (res.success) {
                let data = res.data
                const checked = (id) => {
                    let value = { checked: false, index: 1000 }
                    if (f) {
                        Object.keys(f).map(oitm => {
                            f[oitm].map((itm, i) => {
                                if (itm.id == id) {
                                    value = { checked: itm.checked || false, index: i }
                                }
                            })
                        })
                    }
                    return value
                }
                Object.keys(data).map(oitm => {
                    data[oitm].map((itm, i) => {
                        let ext = checked(itm.id)
                        data[oitm][i].checked = ext.checked
                        data[oitm][i].index = ext.index
                    })
                })
                Object.keys(data).map(oitm => {
                    data[oitm].sort(function (a, b) { return a.index - b.index })
                })
                setFeatures(data)
            }
        })
    }

    const getCurrency = () => {
        ApiClient.get('api/currency/applied', { page: 1, count: 100, status: 'active' }).then(res => {
            if (res.success) {
                setCurrencys(res.data.map(itm => {
                    itm.isoCode = itm.isoCode.toLowerCase()
                    return itm
                }))
            }
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/plan/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = planType

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })

                    if (payload.category) {
                        payload.category = value.category.id
                    }
                    payload.id = value._id
                    if (copy == 'true') {
                        payload.name = `Copy of ${value.name}`
                    }
                    payload.stripe_product_id = value.stripe_product_id
                    payload.trial_period_days = value?.trial_period_days
                    payload.id = id
                    setPricing(value.pricing||[])
                    getFeatures(value.feature||[])
                    setform({
                        ...payload
                    })
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
        }
        if (!id) {
            getFeatures()
        }
        getCurrency()
    }, [id])

    const dragStart = (e, position, key = '') => {
        dragItem.current = position;
        setStartIndex(position)
        setSelectedItem(key)
    };

    const dragEnter = (e, position, key = '') => {
        dragOverItem.current = position;
        setEnterIndex(position)
        const copyListItems = [...features[key]];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItems.current = { ...dragItems.current, [key]: copyListItems }
    };

    const drop = (e, key = '') => {
        setStartIndex(-1)
        setEnterIndex(-1)
        setSelectedItem('')
        const copyListItems = [...features[key]];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        // dragItems.current={...dragItems.current,[key]:copyListItems}
        setFeatures({ ...features, [key]: copyListItems });
    };

    const requiredCheck = (key) => {
        let value = false
        currencys.map(itm => {
            if (form?.[key]?.[itm.isoCode]) value = true
        })
        return value
    }

    const showData = (key) => {
        let value = features[key]
        if (dragItems && dragItems.current?.[key]) {
            value = dragItems.current?.[key]
        }
        return value
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">

                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">
                            <Link to="/plans" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all   mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id && copy == 'false' ? 'Edit' : 'Add'} Plan
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Plan</p>
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
                            <label>Price<span className="star">*</span></label>
                            <input
                                type="text"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                value={form.price}
                                maxLength="10"
                                disabled={id ? true : false}
                                onChange={e => setform({ ...form, price: methodModel.isNumber(e) })}
                                required
                            />
                        </div> */}
                        <div className="col-span-12 md:col-span-6">
                            <label>Status<span className="star">*</span></label>
                            <div className="custom_dropdown">
                                <SelectDropdown
                                    isSingle={true}
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
                        {/* <div className="col-span-12 md:col-span-6">
                            <label>Recommended<span className="star">*</span></label>
                            <div className="custom_dropdown">
                                <SelectDropdown
                                    isSingle={true}
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Recommendation"
                                    intialValue={form.recommended}
                                    result={e => { setform({ ...form, recommended: e.value }) }}
                                    options={requiredModel.list}
                                />
                                {submitted && !form.recommended ? <div className="text-danger">Recommended is Required</div> : <></>}
                            </div>
                        </div> */}
                        {/* <div className="col-span-12 md:col-span-6">
                            <label>Trail Period<span className="star">*</span></label>
                            <div className="custom_dropdown">
                                <SelectDropdown
                                    isSingle={true}
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Days"
                                    intialValue={form.trial_period_days}
                                    result={e => { setform({ ...form, trial_period_days: e.value }) }}
                                    options={trailPeriodDays}
                                />
                            </div>
                        </div> */}
                        <div className="col-span-12 md:col-span-12">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 1 Month<span className="star">*</span></h5>
                            <div className="grid grid-cols-12 gap-4">
                                {currencys && currencys.map((item, index) => {
                                    return (
                                        <div className="col-spam-12 md:col-span-4 pl-3 mb-3">
                                            <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                            <input className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" name={item.isoCode} value={form.monthlyPrice ? form.monthlyPrice[item.isoCode] : ''} required={requiredCheck('monthlyPrice')} maxLength="10" onChange={e => { setform({ ...form, monthlyPrice: { ...form.monthlyPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 3 Months<span className="star">*</span></h5>
                            <div className="grid grid-cols-12 gap-4">
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-spam-12 md:col-span-4 pl-3 mb-3">
                                        <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                        <input className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" name={item.isoCode} value={form.threeMonthPrice ? form.threeMonthPrice[item.isoCode] : ''} required={requiredCheck('threeMonthPrice')} maxLength="10" onChange={e => { setform({ ...form, threeMonthPrice: { ...form.threeMonthPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 6 Months<span className="star">*</span></h5>
                            <div className="grid grid-cols-12 gap-4">
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-spam-12 md:col-span-4 pl-3 mb-3">
                                        <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                        <input className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" name={item.isoCode} value={form.sixMonthPrice ? form.sixMonthPrice[item.isoCode] : ''} required={requiredCheck('sixMonthPrice')} maxLength="10" onChange={e => { setform({ ...form, sixMonthPrice: { ...form.sixMonthPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`}></input>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 12 Months<span className="star">*</span></h5>
                            <div className="grid grid-cols-12 gap-4">
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-spam-12 md:col-span-3 pl-3 mb-3">
                                        <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                        <input className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" name={item.isoCode} value={form.yearlyPrice ? form.yearlyPrice[item.isoCode] : ''} required={requiredCheck('yearlyPrice')} maxLength="10" onChange={e => { setform({ ...form, yearlyPrice: { ...form.yearlyPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`}></input>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className="col-span-12 md:col-span-12">
                            <hr className="borderHr" />
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12 md:col-span-12 pl-3">
                                    <label>Number Of Products Allowed</label>
                                    <input className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" value={form.allowedProducts} onChange={e => setform({ ...form, allowedProducts: e.target.value })} placeholder="Number Of Products Allowed"></input>
                                </div>
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-spam-12 md:col-span-3 pl-3 mb-3">
                                        <label>Extra Product Price [{item.isoCode.toUpperCase()}]<span className="star">*</span></label>
                                        <input className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" name={item.isoCode} value={form.extraProductPrice ? form.extraProductPrice[item.isoCode] : ''} maxLength="10" onChange={e => { setform({ ...form, extraProductPrice: { ...form.extraProductPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Extra Product Price ${item.isoCode.toUpperCase()}`} />
                                    </div>
                                ))}
                            </div>
                        </div> */}
                        <div className="col-span-12 md:col-span-12">
                            <hr className="borderHr" />
                            <div className="mt-3 mb-6">
                                <h5 className="text-2xl font-semibold text-[#111827]">Features </h5>
                            </div>
                            {/* <Multiselect
                                options={features}
                                selectedValues={form.feature}
                                onSelect={e => setform({...form,feature:e})}
                                onRemove={e => setform({...form,feature:e})}
                                displayValue="name"
                                id="featuresDropdown"
                            /> */}
                            <div className="grid grid-cols-12 gap-4">
                                {Object.keys(features).map((oitm, i) => {
                                    return <div className="mb-3 col-spam-12 md:col-span-4">
                                        <label className="mb-2 d-block text-uppercase"><b>{oitm}</b></label>
                                        {features && showData(oitm)?.map((item, index) => {
                                            return <>
                                                {/* <div className={`col-md-11 mt-2 ml-2 cursor-pointer DragDrop ${startIndex == index && selectedItem == oitm ? 'dragStart' : ''} ${enterIndex == index && selectedItem == oitm ? 'dragEnter' : ''}`} onDragStart={(e) => dragStart(e, index, oitm)} onDragEnter={(e) => dragEnter(e, index, oitm)} onDragEnd={e => drop(e, oitm)} key={index} draggable={id && copy == 'false' ? false : true}> */}
                                                <div className={`col-spam-12 md:col-span-11 mt-2 ml-2`}>
                                                    <label class="form-check-label pointer">
                                                        <input class="form-check-input" type="checkbox" value={form.feature} onChange={e => selectfeatures(item.id, oitm, index)} checked={item.checked ? true : false} />
                                                        {item.name}
                                                    </label>
                                                </div>
                                            </>
                                        })}
                                    </div>
                                })}
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

export default AddEditPlan
import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../../methods/methods";
import Html from "./Html";
import { useHistory, useParams } from "react-router-dom";
import addressModel from "../../../models/address.model";
import environment from "../../../environment";

const AddEdit = () => {
    const { role, id } = useParams()
    const [images, setImages] = useState({ image: '', logo: '' });
    const [form, setform] = useState({
         id:id,
         password:'',
         confirmPassword:'',
         email:'', 
         mobileNo:'',
         fullName:'',
         multiAddress:[],
         profession:'',
         company:'',
         companyUrl:'',
         address:'',
         address2:'',
         state:'',
         postal_code:'',
         city:'',
         timezone:'America/Los_Angeles',
         customerRole:'',
         adminComment:'',
         linkedInUrl:'',
         certification:'',
         skills:[],
         networkingGroup:'',
         category:'',
         subCategory:'',
         aboutUs:'',
         country:'usa'
        })
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()
    const [roles, setRoles] = useState([])
    const [emailLoader, setEmailLoader] = useState(false) 
    const [emailErr, setEmailErr] = useState('') 
    const [detail, setDetail] = useState() 
    const [timezoneLoader, setTimezoneLoader] = useState(false)
    const [addressSellected, setAddressSellected] = useState(true)
    const [currency, setcurrency] = useState([])
    const [categories, setCategories] = useState([])
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'mobileNo', minLength: 10 }, 
        { key: 'customerRole', required: true },
        { key: 'email', email: true },
        { key: 'certification', required: true },
        { key: 'state', required: true },
        { key: 'password', minLength: 8 },
        { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'password'] }
    ]

    const getError = (key="") => {
        return methodModel.getError(key, form, formValidation)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid || emailErr) return
        if(!methodModel.emailvalidation(form?.email)){
            setEmailErr('Enter a valid email')
            return
        }
        let method = 'post'
        let url = 'api/add/user'
        let value = {
            ...form,
            ...images,
            role:environment.userRoleId
        }
        if (value.id) {
            method = 'put'
            url = 'api/user'
        } else {
            value.addedBy=user._id
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                let url='/customer'
                history.push(url)
            }
            loader(false)
        })
    }

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
        console.log("imageResult", e)
    }

    const back=()=>{
        history.goBack()
    }


    const getRoles=()=>{
        ApiClient.get('api/skillRole/list',{status:'active'}).then(res=>{
            if(res.success){
                setRoles(res.data)
            }
        })
    }


    const emailCheck=(email)=>{
        return
        let isValid=methodModel.emailvalidation(email)
        if(isValid){
            setEmailLoader(true)
            ApiClient.get('api/check/email',{email:email}).then(res=>{
                if(!res.success){
                    console.log("detail",detail)
                    if(id){
                        if(detail){
                            if(detail?.email!=email){
                                setEmailErr(res.error.message)
                            }
                        }
                    }else{
                        setEmailErr(res.error.message)
                    }
                }else{
                    setEmailErr('')
                }
                setEmailLoader(false)
            })
        }
    }

    useEffect(() => {
        setSubmitted(false)
       
        if (id) {
            loader(true)
            ApiClient.get("api/user/detail", { id }).then(res => {
                if (res.success) {
                    let value=res.data
                    setDetail(value)
                    let payload = form
                    let oarr = Object.keys(form)
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                    // payload.role=value.role._id
                    payload.password=''
                    payload.id=id
                    if(payload.customerRole?._id) payload.customerRole=payload.customerRole._id
                    let multiAddress=value.multiAddress||[]
                    payload.multiAddress=multiAddress.length?multiAddress:[]
                    setform({ ...payload })
                    images.image = payload?.image
                    images.logo = payload?.logo
                    setImages(images)
                }
                loader(false)
            })
        }
        getRoles()
        // getCurrency()
        // getCategories()
    }, [id])

    const addressResult = async (e) => {
        let address = {}
        if (e.place) {
          address = addressModel.getAddress(e.place)
          setAddressSellected(true)
        } else {
          setAddressSellected(false)
        }
        setform({
          ...form,
          companyAddress: e.value,
          country: address.country || '',
          city: address.city || '',
          state: address.state || '',
          zipcode: address.zipcode || '',
          lat: address.lat || '',
          lng: address.lng || ''
        })
        if (e.place) {
          setTimezoneLoader(true)
          const apires = await addressModel.gettimeZone(e.place)
          setTimezoneLoader(false)
          setform({
            ...form,
            companyAddress: e.value,
            country: address.country || '',
            city: address.city || '',
            state: address.state || '',
            zipcode: address.zipcode || '',
            lat: address.lat || '',
            lng: address.lng || '',
            companytimezone: apires?.data?.timeZoneId || ''
          })
        }
      }

      const getCategories = () => {
        ApiClient.get('api/categories/listing', { catType: environment.productTypeId, status: 'active' }).then(res => {
          if (res.success) {
            setCategories(res.data)
          }
        })
      }
    
      const getCurrency = () => {
        ApiClient.get(`api/currency/listing`, { status: 'active' }).then(res => {
          if (res.success) {
            setcurrency(res.data)
          }
        })
      }

    return <>
        <Html
        addressResult={addressResult}
        currency={currency}
        categories={categories}
        timezoneLoader={timezoneLoader}
        addressSellected={addressSellected}
            form={form}
            detail={detail}
            emailCheck={emailCheck}
            emailLoader={emailLoader}
            emailErr={emailErr}
            back={back}
            setEyes={setEyes}
            eyes={eyes}
            role={role}
            setform={setform}
            roles={roles}
            submitted={submitted}
            images={images}
            handleSubmit={handleSubmit}
            imageResult={imageResult}
            getError={getError}
        />
    </>
}

export default AddEdit
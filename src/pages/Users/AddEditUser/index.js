import React, { useState, useEffect } from "react";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../../methods/methods";
import { userType } from "../../../models/type.model";
import Html from "./Html";
import { useNavigate, useParams } from "react-router-dom";
import environment from "../../../environment";
import { decryptId } from "../../../components/common/Encryption/encryption";

const AddEditUser = () => {
    const { role, userid } = useParams()
    const id = decryptId(userid)
    const [images, setImages] = useState({ image: '', logo: '' });
    const defaultvalue = userType
    const [form, setform] = useState({ role })
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });
    const [submitted, setSubmitted] = useState(false)
    const history = useNavigate()
    const [roles, setRoles] = useState([])
    const [emailLoader, setEmailLoader] = useState(false)
    const [emailErr, setEmailErr] = useState('')
    const [detail, setDetail] = useState()
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'mobileNo', minLength: 10 },
        { key: 'email', email: true },
        { key: 'role', required: true },
        { key: 'ic_number', minLength: 6 },
        { key: 'password', minLength: 8 },
        { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'password'] },
        { key: 'dialCode', dialCode: true },
    ]

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/add/user'
        let value = {
            ...form,
            ...images
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
                let url = '/users'
                if (role) url = "/users/" + role
                history(url)
            }
            loader(false)
        })
    }

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
        console.log("imageResult", e)
    }

    const addressResult = (e) => {
        setform({ ...form, address: e.value })
    }

    const back = () => {
        history(-1)
    }


    const getRoles = () => {
        ApiClient.get('api/roles/listing', { status: 'active' }).then(res => {
            if (res.success) {
                let data = res.data
                data = data.filter(itm => itm.id != environment.userRoleId)
                setRoles(data)
            }
        })
    }


    const emailCheck = (email) => {
        return
        let isValid = methodModel.emailvalidation(email)
        if (isValid) {
            setEmailLoader(true)
            ApiClient.get('api/check/email', { email: email }).then(res => {
                if (!res.success) {
                    if (detail?.email != email) {
                        setEmailErr(res.error.message)
                    }
                } else {
                    setEmailErr('')
                }
                setEmailLoader(false)
            })
        }
        else{ 
        }
    }

    useEffect(() => {
        setSubmitted(false)

        if (id) {
            loader(true)
            ApiClient.get("api/user/detail", { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    setDetail(value)
                    let payload = defaultvalue
                    let oarr = Object.keys(defaultvalue)
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                    payload.id = id
                    if(payload.role._id) payload.role=payload.role._id
                    setform({ ...payload })
                    images.image = payload?.image
                    images.logo = payload?.logo
                    setImages(images)
                }
                loader(false)
            })
        }
        getRoles()
    }, [id])

    return <>
        <Html
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
            addressResult={addressResult}
            handleSubmit={handleSubmit}
            imageResult={imageResult}
            getError={getError}
        />
    </>
}

export default AddEditUser
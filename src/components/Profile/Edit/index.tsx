import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import { ToastsStore } from 'react-toasts';
import { login_success } from '../../../actions/user';
import './style.scss';
import { userType } from '../../../models/type.model';
import Html from './Html';
import { useHistory } from 'react-router-dom';
import formModel from '../../../models/form.model';

const EditProfile = () => {
  const user = useSelector((state:any) => state.user);
  const [data, setData] = useState('');
  const [form, setForm]:any = useState(userType);
  const dispatch = useDispatch();
  const history=useHistory()
  const [submitted, setSubmitted] = useState(false)

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`api/user/profile`,{id:user._id}).then(res => {
      if (res.success) {
        setForm({form,...res.data,role:res.data.role.name})
        setData(res.data)
      }
      loader(false)
    })
  };

  const getError = (key:any) => {
    return formModel.getError('profileForm',key)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setSubmitted(true)
    let invalid = formModel.getFormError('profileForm')
    if (invalid) return

    let value = { fullName: form.fullName, dialCode: '', mobileNo: form.mobileNo, image: form.image, id: user._id }
    if(form?.mobileNo<10){
      return
    }

    loader(true)
    ApiClient.put('api/user/profile', value).then(res => {
      if (res.success) {
        let uUser = { ...user, ...value }
        dispatch(login_success(uUser))
        history.push("/profile")
        // ToastsStore.success(res.message)
      }
      loader(false)
    })
  };

  const uploadImage = (e:any) => {
    setForm({ ...form, baseImg: e.target.value })
    let files = e.target.files
    let file = files.item(0)
    loader(true)
    ApiClient.postFormData('api/upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
      if (res.fileName) {
        let image = res.fileName
        setForm({ ...form, image: image, baseImg: '' })
      } else {
        setForm({ ...form, baseImg: '' })
      }
      loader(false)
    })
  }

  useEffect(
    () => {
      if (user && user.loggedIn) {
        gallaryData();
        let forms:any=document.forms
        let field=forms['profileForm'].elements['fullName']
        console.log("field",field.minLength)
      }
    },[]);

  return (
    <>
     <Html
     handleSubmit={handleSubmit}
     setForm={setForm}
     form={form}
     uploadImage={uploadImage}
     getError={getError}
     submitted={submitted}
     />
    </>
  );
};

export default EditProfile;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import { login_success } from '../../../actions/user';
import './style.scss';
import { userType } from '../../../models/type.model';
import Html from './Html';
import { useNavigate } from 'react-router-dom';
import formModel from '../../../models/form.model';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const user = useSelector((state:any) => state.user);
  const [data, setData] = useState('');
  const [form, setForm]:any = useState(userType);
  const dispatch = useDispatch();
  const history=useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [images, setImages]:any = useState({ image: '' });
  const gallaryData = () => {
    loader(true)
    ApiClient.get(`api/user/detail`,{id:user._id}).then(res => {
      if (res.success) {
        let payload = form
        let value = res.data
        let oarr = Object.keys(form)
        oarr.map(itm => {
            payload[itm] = value[itm] || null
        })
        setForm({form,...res.data,role:res.data.role.name})
        let img=images
      
        Object.keys(images).map(itm=>{
          img[itm]=value[itm]
        })
        setImages({...img})
        setData(value)
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

    let value = { fullName: form.fullName, dialCode: '', mobileNo: form.mobileNo, image: form.image, id: user._id ,addedBy: user._id , ...images}
    if(form?.mobileNo.length<10){
      return
    }
    Object.keys(value).map(itm=>{
      if(!value[itm]) value[itm]=null
     })
    loader(true)
    ApiClient.put('api/user', value).then(res => {
      if (res.success) {
        let uUser = { ...user, ...value }
        dispatch(login_success(uUser))
        history("/profile")
        toast.success(res.message)
      }
      loader(false)
    })
  };
  const imageResult = (e:any, key:any) => {
    images[key] = e.value
    setImages(images)
    console.log("imageResult", e)
}
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
     imageResult={imageResult}
     images={images}
     uploadImage={uploadImage}
     getError={getError}
     submitted={submitted}
     />
    </>
  );
};

export default EditProfile;

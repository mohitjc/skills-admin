import React, { useState } from 'react';
import Layout from '../../components/global/layout';

import 'react-phone-input-2/lib/style.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import methodModel from '../../methods/methods';
import ApiClient from '../../methods/api/apiClient';
import { Tooltip } from "antd";

const Html = ({ handleSubmit }) => {
  const History = useNavigate()
  const review = JSON.parse(localStorage.getItem('review'))
  console.log(review)
  const param = useParams()
  console.log(param.id)
  const [loading, setloading] = useState(false)
  const [form, setForm] = useState({ ...review, name: review?.name || review?.platform || '' });
  const [img, setimg] = useState(review?.logo);
  const UploadImage = (e) => {
    let image = e.target.files;
    let file = image.item(0);
    console.log(file);
    setloading(true)
    ApiClient.postFormData('api/upload/image?modelName=logo', {
      file: file,
      modelName: 'logo',

    }).then((res) => {
      if (res.fileName) {
        let image = res.fileName;
        setloading(false)

        if (image) {
          setimg(image);
        }
        console.log(res);
      }
    });
  };

  const UpdateReview = (e) => {

    ApiClient.put('api/review/platform', { name: form.name, logo: img, id: param.id }).then((res) => {
      console.log(res)
      if (res.success) {
        history('/reviews')
      }
    })

  }




  return (
    <>
      <Layout>

        <div className="pprofile1">



          <div className='flex items-center mb-8'>
            <Tooltip placement="top" title="Back">
              <NavLink to={'/reviews'} className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all    mr-3"><i className='fa fa-angle-left text-lg'></i></NavLink>
            </Tooltip>
            <div>
              <h3 className="text-2xl font-semibold text-[#111827]">
                {form && form.id ? 'Edit' : 'Upload'} Logo
              </h3>
              <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Logo</p>
            </div>
          </div>





          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <input type='text' className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="flex items-center ">
                {
                  loading ? <label className='mr-5 ' style={{ color: 'green' }}>Uploading...</label> : <label className="profileImageLabel">
                    <img
                      src={methodModel.userImg(img)}
                      className="profileImage ml-2"
                    />
                  </label>
                }

                <div className="profile_btn">
                  <div>

                    <label className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 cursor-pointer edit ml-3">

                      <input
                        id="bannerImage"
                        type="file"
                        className="d-none"
                        accept="image/*"
                        onChange={(e) => {
                          UploadImage(e);
                        }}
                      />
                      Upload Image
                    </label>{
                      img ? <label className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 cursor-pointer py-2.5 text-center me-2 mb-2 delete ml-3" onClick={() => {
                        setimg('')
                      }}>Remove Image</label> : null
                    }
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end">

            <button type="submit" onClick={UpdateReview} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
          </div>

        </div>

      </Layout>
    </>
  );
};

export default Html;

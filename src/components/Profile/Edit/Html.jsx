import React from 'react';
import methodModel from '../../../methods/methods';
import { Link } from 'react-router-dom';
import './style.scss';
import PhoneInput from 'react-phone-input-2';

const Html = ({ handleSubmit, setForm, form, getError, uploadImage, submitted }) => {
  return (
    <>

      <div className='wrapper_section'>
        <div className='flex items-center  justify-between'>
          <h3 className='text-2xl font-semibold text-[#111827]'>Edit Profile </h3>

        </div>


        <form name="profileForm" className="" onSubmit={handleSubmit} >


          <div className='inner_part sm:mt-3 md:mt-8 p-6 shadow-box overflow-hidden rounded-lg bg-white'>
            <div className='grid items-center grid-cols-12 gap-4'>
              <div className='col-span-12 md:col-span-2'>
                <div className='text_head'>
                  <label className='font-bold text-gray-600 text-md' >Image</label>
                </div>
              </div>
              <div className='col-span-12 md:col-span-10'>
                <div className='sub_fatch flex items-center'>
                  <label className=" mr-6">
                    <img src={methodModel.userImg(form && form.image)} className="h-28 w-28 rounded-lg object-cover" />
                  </label>
                  <div className='profile_btn '>

                    <div>
                      <label className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 cursor-pointer">
                        <input
                          id="bannerImage"
                          type="file"
                          className="d-none"
                          accept="image/*"
                          value={form.baseImg ? form.baseImg : ''}
                          onChange={(e) => { uploadImage(e); }}
                        />{form.image ? 'Change' : 'Upload'} Image</label>
                    </div>
                    <div>
                      {form.image ? <label className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 cursor-pointer py-2.5 text-center me-2 mb-2" onClick={e => setForm({ ...form, image: "" })}>Remove Image</label> : <></>}
                    </div>
                    {/* <input type="hidden" name='image' required value={form.image} /> */}
                    {submitted && getError('image')?.invalid ? <div className="invalid-feedback d-block">Image is required</div> : <></>}
                  </div>
                </div>
              </div>


              <div className='col-span-12 md:col-span-2'>
                <div className='text_head'>
                  <label className='font-bold text-gray-600 text-md'>Name</label>
                </div>
              </div>
              <div className='col-span-12 md:col-span-10'>
                <div className='sub_fatch'>
                  <div>
                    <input
                      type="text"
                      className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                      placeholder="Enter Name"
                      name='fullName'
                      value={form.fullName}
                      onChange={e => setForm({ ...form, fullName: e.target.value })}
                      required
                    />
                    {submitted && getError('fullName')?.invalid ? <div className="invalid-feedback d-block">Name is required</div> : <></>}
                  </div>
                </div>
              </div>


              <div className='col-span-12 md:col-span-2'>
                <div className='text_head'>
                  <label className='font-bold text-gray-600 text-md'>Email</label>
                </div>
              </div>
              <div className='col-span-12 md:col-span-10'>
                <div className='sub_fatch'>
                  <div>
                    <input
                      type="email"
                      className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                      placeholder="Enter Name"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      value={form.email ? form.email : ''}
                      disabled
                    />
                  </div>
                </div>
              </div>


              <div className='col-span-12 md:col-span-2'>
                <div className='text_head'>
                  <label className='font-bold text-gray-600 text-md'>Mobile No</label>
                </div>
              </div>
              <div className='col-span-12 md:col-span-10'>
                <div className='sub_fatch'>
                  <div className='reactphone'>
                    <PhoneInput
                      className="w-full"
                      country={'us'}
                      value={form.mobileNo}
                      enableSearch={true}
                      limitMaxLength
minLength={10}
                      required
                      onChange={e => setForm({ ...form, mobileNo: e })}
                      countryCodeEditable={true}
                    />
                    {/* <div className="phoneInput">
                <input
                  type="text"
                  className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" placeholder='+60'
                  name='dialCode'
                  value={form && form.dialCode || ''}
                  dialCode="true"
                  title="Phone number with + and remaing 9 digit with 0-9"
                  maxLength={4}
                  onChange={e => setForm({ ...form, dialCode: e.target.value })}
                  required
                />
                <input
                  type="text"
                  name='mobileNo'
                  className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" placeholder='Mobile No.'
                  value={form && form.mobileNo}
                  minLength="10"
                  maxLength={12}
                  onChange={e => setForm({ ...form, mobileNo: methodModel.isNumber(e) })}
                  required
                />
              </div> */}
                    {submitted && form?.mobileNo<10 ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
                  </div>
                </div>
              </div>


              {/* <div className='col-span-12 md:col-span-2'>
                <div className='text_head'>
                  <label className='font-bold text-gray-600 text-md'>Role</label>
                </div>
              </div> */}
              {/* <div className='col-span-12 md:col-span-10'>
                <div className='sub_fatch'>
                  <div>
                    <input
                      type="text"
                      className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                      placeholder="Enter Name"
                      value={form.role}
                      disabled
                    />
                  </div>
                </div>
              </div> */}




              <div className='col-span-12 sm:mt-4 md:mt-4'>
                <div className='flex justify-end  items-end'>

                  <Link to="/profile" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                    Discards
                  </Link>
                  <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Update
                  </button>
                </div>
              </div>

            </div>
          </div>

        </form>





      </div>


    </>
  );
};

export default Html;

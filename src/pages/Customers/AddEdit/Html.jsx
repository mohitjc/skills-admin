import React, { useEffect, useState } from "react";
import methodModel from "../../../methods/methods";
import ImageUpload from "../../../components/common/ImageUpload";
import GooglePlaceAutoComplete from "../../../components/common/GooglePlaceAutoComplete"
import Layout from "../../../components/global/layout";
import SelectDropdown from "../../../components/common/SelectDropdown";
import MultiSelectDropdown from "../../../components/common/MultiSelectDropdown";
import datepipeModel from "../../../models/datepipemodel";
import PhoneInput from "react-phone-input-2";
import { Tooltip } from "antd";
import ApiClient from "../../../methods/api/apiClient";

const Html = ({ form, handleSubmit, setform, roles, submitted, images, imageResult, getError, setEyes, eyes, back, emailCheck, emailErr, emailLoader }) => {

  const editAddress = (i, v, key = 'value') => {
    let arr = form.multiAddress || []
    arr[i][key] = v
    setform({ ...form, multiAddress: [...arr] })
  }

  const addAddress = () => {
    let arr = form.multiAddress || []
    let aid=String(new Date().getTime())
    arr.push({ id:aid})
    setform({ ...form, multiAddress: [...arr] })
  }

  const removeAddress = (i) => {
    let arr = form.multiAddress || []
    arr = arr.filter((itm, index) => index != i)
    setform({ ...form, multiAddress: [...arr] })
  }

  const [certificate, setCertificate] = useState([])


  const getCertificates = () => {
    ApiClient.get('api/certificate/list', { status: 'active' }).then(res => {
      if (res.success) {
        setCertificate(res.data)
      }
    })
  }

  const getSkills = () => {
    ApiClient.get('api/certificate/list', { status: 'active' }).then(res => {
      if (res.success) {
        setCertificate(res.data)
      }
    })
  }

  useEffect(() => {
    getCertificates()
  }, [])

  useEffect(() => {
    getSkills()
  }, [form.customerRole])

  return <>
    <Layout>
      <form onSubmit={handleSubmit} autoComplete="false">
        <div className="pprofile1">


          <div className='flex items-center mb-8'>
            <Tooltip placement="top" title="Back">
              <button onClick={e => back()} className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all    mr-3"><i className='fa fa-angle-left text-lg'></i></button>
            </Tooltip>
            <div>
              <h3 className="text-2xl font-semibold text-[#111827]">
                {form && form.id ? 'Edit' : 'Add'} Customer
              </h3>
              <p class="text-sm font-normal text-[#75757A]">Here you can see all about your Customer</p>
            </div>
          </div>




          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <label>Name<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.fullName}
                onChange={e => setform({ ...form, fullName: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Profession Title<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.profession}
                onChange={e => setform({ ...form, profession: e.target.value })}
                required
              />
            </div>



            <div className="col-span-12 md:col-span-6">
              <label>Mobile No<span className="star">*</span></label>
              <PhoneInput
                country={'us'}
                value={form.mobileNo}
                enableSearch={true}
                limitMaxLength
                required
                onChange={e => setform({ ...form, mobileNo: e })}
                countryCodeEditable={true}
              />
              {submitted && getError('mobileNo').invalid ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Email  {emailLoader ? <span><i className="fa fa-spinner fa-spin"></i></span> : <></>}</label>
              <input
                type="email"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.email}
                autoComplete="false"
                onChange={e => { setform({ ...form, email: e.target.value }); emailCheck(e.target.value) }}
                required
              />
              {emailErr ? <div className="invalid-feedback d-block">{emailErr}</div> : <></>}

            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Password</label>
              <div className="inputWrapper">
                <input
                  type={eyes.password ? 'text' : 'password'}
                  className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                  value={form.password}
                  autoComplete="new-password"
                  onChange={e => setform({ ...form, password: e.target.value })}

                />
                <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
              </div>
              {submitted && getError('password').invalid ? <div className="invalid-feedback d-block">Password minimum length should be 8</div> : <></>}
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Confirm Password {form.password ? <span className="star">*</span> : <></>}</label>
              <div className="inputWrapper">
                <input
                  type={eyes.confirmPassword ? 'text' : 'password'}
                  className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                  value={form.confirmPassword}
                  onChange={e => setform({ ...form, confirmPassword: e.target.value })}
                  required={form.password ? true : false}
                />
                <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
              </div>
              {submitted && getError('confirmPassword').invalid ? <div className="invalid-feedback d-block">Confirm Password is not matched with Password</div> : <></>}
            </div>


            <div className="col-span-12 md:col-span-6">
              <label className='lablefontcls'>Image</label><br></br>
              <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} multiple={false} />
            </div>


            <div className="col-span-12 md:col-span-6">
              <label>Company<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.company}
                onChange={e => setform({ ...form, company: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Company Url<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.companyUrl}
                onChange={e => setform({ ...form, companyUrl: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Address<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.address}
                onChange={e => setform({ ...form, address: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Address 2<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.address2}
                onChange={e => setform({ ...form, address2: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>State/Province<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select State/Province"
                intialValue={form.state}
                result={e => { setform({ ...form, state: e.value }) }}
                options={roles}
                theme="search"
              />
              {submitted && !form.state ? <div className="invalid-feedback d-block">State/Province Title is Required</div> : <></>}
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Zip/Postal Code<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.postal_code}
                onChange={e => setform({ ...form, postal_code: e.target.value })}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>City<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.city}
                onChange={e => setform({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Timezone<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Timezone"
                intialValue={form.timezone}
                result={e => { setform({ ...form, timezone: e.value }) }}
                options={roles}
                theme="search"
              />
              {submitted && !form.timezone ? <div className="invalid-feedback d-block">State/Province Title is Required</div> : <></>}
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Customer Role<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Customer Role"
                intialValue={form.customerRole}
                result={e => { setform({ ...form, customerRole: e.value }) }}
                options={roles}
                theme="search"
              />
              {submitted && !form.customerRole ? <div className="invalid-feedback d-block">Customer Role is Required</div> : <></>}
            </div>

            <div className="col-span-full">
              <label>Admin Comment</label>
              <textarea
                className="relative shadow-box bg-white w-full rounded-lg flex items-center gap-2 overflow-hidden px-2"
                value={form.adminComment}
                onChange={e => setform({ ...form, adminComment: e.target.value })}

              ></textarea>
            </div>
            <div className="col-span-full">
              <h4 className="text-1xl font-semibold text-[#111827]">Public Profile Info</h4>
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Linkedin Profile Url</label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.linkedInUrl}
                onChange={e => setform({ ...form, linkedInUrl: e.target.value })}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Certification</label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Certification"
                intialValue={form.certification}
                result={e => { setform({ ...form, certification: e.value }) }}
                options={certificate}
                theme="search"
              />
              {submitted && !form.certification ? <div className="invalid-feedback d-block">Certification is Required</div> : <></>}
            </div>




            {form.customerRole ? <>
              <div className="col-span-12 md:col-span-6">
                <label>Skills</label>
                <MultiSelectDropdown
                  displayValue="name"
                  placeholder="Select Skills"
                  intialValue={form.skills}
                  result={e => {
                    setform({ ...form, skills: e.value })
                    console.log("e", e)
                  }}
                  options={roles}
                  theme="search"
                />
                {submitted && !form.skills?.length ? <div className="invalid-feedback d-block">Skills is Required</div> : <></>}
              </div>
            </> : <></>}

            <div className="col-span-full">
              <label>Networking Groups</label>
              <textarea
                className="relative shadow-box bg-white w-full rounded-lg flex items-center gap-2 overflow-hidden px-2"
                value={form.networkingGroup}
                onChange={e => setform({ ...form, networkingGroup: e.target.value })}

              ></textarea>
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Profession Category</label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Profession Category"
                intialValue={form.category}
                result={e => { setform({ ...form, category: e.value }) }}
                options={roles}
                theme="search"
              />
              {submitted && !form.category ? <div className="invalid-feedback d-block">Profession Category is Required</div> : <></>}
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Profession Sub Category</label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Profession Sub Category"
                intialValue={form.subCategory}
                result={e => { setform({ ...form, subCategory: e.value }) }}
                options={roles}
                theme="search"
              />
              {submitted && !form.subCategory ? <div className="invalid-feedback d-block">Profession Sub Category is Required</div> : <></>}
            </div>


            <div className="col-span-full">
              <label>Short Bio</label>
              <textarea
                className="relative shadow-box bg-white w-full rounded-lg flex items-center gap-2 overflow-hidden px-2"
                value={form.aboutUs}
                onChange={e => setform({ ...form, aboutUs: e.target.value })}

              ></textarea>
            </div>

            <div className="col-span-full ">
              <h4 className="text-1xl font-semibold text-[#111827]">Addresses</h4>
              <div className="">
                {form?.multiAddress?.map((itm, i) => {
                  return <>
                    <div className="grid grid-cols-2 gap-2 shadow-2xl p-3 mb-3 bg-white rounded-md">
                      <div className="">
                        <label>First Name</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.firstName}
                          onChange={(e) => editAddress(i, e.target.value, 'firstName')}
                          required
                        />
                      </div>
                      <div className="">
                      <label>Last Name</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.lastName}
                          onChange={(e) => editAddress(i, e.target.value, 'lastName')}
                        />
                      </div>
                      <div className="">
                        <label>Email</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.email}
                          onChange={(e) => editAddress(i, e.target.value, 'email')}
                          required
                        />
                      </div>
                      <div className="">
                        <label>Phone Number</label>
                        <PhoneInput
                          country={'us'}
                          value={itm.mobileNo}
                          enableSearch={true}
                          limitMaxLength
                          required
                          onChange={e =>editAddress(i, e, 'mobileNo')}
                          countryCodeEditable={true}
                        />
                      </div>
                      <div className="">
                      <label>Address</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.address}
                          onChange={(e) => editAddress(i, e.target.value, 'address')}
                          required
                        />
                      </div>
                      <div>
                        <span class="material-symbols-outlined cursor-pointer text-red-500" onClick={() => removeAddress(i)}>close</span>
                      </div>
                    </div>
                  </>
                })}


              </div>
              <div className="text-right mt-3">
                <button type="button" onClick={addAddress} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Address</button>
              </div>
            </div>

          </div>



          <div className="flex justify-end mt-6">
            <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
          </div>
        </div>

      </form>
    </Layout>
  </>
}

export default Html
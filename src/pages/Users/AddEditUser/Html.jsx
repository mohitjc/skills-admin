import React from "react";
import methodModel from "../../../methods/methods";
import ImageUpload from "../../../components/common/ImageUpload";
import Layout from "../../../components/global/layout";
import rolesModel from "../../../models/roles.model";
import SelectDropdown from "../../../components/common/SelectDropdown";
import PhoneInput from "react-phone-input-2";
import { Tooltip } from "antd";

const Html = ({ role, form, handleSubmit, setform, roles, addressResult, submitted, images, imageResult, getError, setEyes, eyes, back, emailCheck, emailErr, emailLoader, detail }) => {

    return <>
        <Layout>
            <form onSubmit={handleSubmit} autoComplete="false" name="addUser">
                <div className="pprofile1">

                    <div className='flex items-center mb-8'>
                        <Tooltip placement="top" title="Back">
                            <button type="button" onClick={e => back()} className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all    mr-3"><i className='fa fa-angle-left text-lg'></i></button>
                        </Tooltip>
                        <div>
                            <h3 className="text-2xl font-semibold text-[#111827]">
                                {form && form.id ? 'Edit' : 'Add'} {role ? rolesModel.name(role) : 'User'}
                            </h3>
                            <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Users</p>
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

                        {role ? <></> : <div className="col-span-12 md:col-span-6 ">
                            <label>Role<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Role"
                                intialValue={form.role}
                                country="1"
                                disabled={form.id ? true : false}
                                result={e => { setform({ ...form, role: e.value }) }}
                                options={roles}
                            />
                            {submitted && !form.role ? <div className="invalid-feedback d-block">Role is Required</div> : <></>}
                        </div>}

                        {/* <div className="col-span-12 md:col-span-6 ">
                            <label>Address<span className="star">*</span></label>
                            <GooglePlaceAutoComplete
                                value={form.address}
                                result={addressResult}
                                id="address"
                                placeholder=""
                            />
                        </div> */}

                        <div className="col-span-12 md:col-span-6 ">
                            <label>Mobile No<span className="star">*</span></label>
                            <div className="mobile_number">
                                <PhoneInput
                                    value={form.mobileNo||''}
                                    country={'us'}
                                    enableSearch={true}
                                    limitMaxLength
                                    required
                                    onChange={e => setform({ ...form, mobileNo: e })}
                                    countryCodeEditable={true}
                                />
                            </div>
                            {/* <div className="phoneInput">
                                <input
                                    type="text"
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" placeholder='+1'
                                    value={form && form.dialCode}
                                    maxLength={4}
                                    onChange={e => setform({ ...form, dialCode: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" placeholder='Mobile No.'
                                    value={form && form.mobileNo}
                                    maxLength={12}
                                    onChange={e => setform({ ...form, mobileNo: methodModel.isNumber(e) })}
                                    required={form.dialCode?true:false}
                                />
                            </div> */}
                            {submitted && getError('dialCode').invalid ? <div className="invalid-feedback d-block">invalid country code</div> : <></>}
                            {submitted && getError('mobileNo').invalid && !getError('dialCode').invalid ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
                        </div>
                        <div className="col-span-12 md:col-span-6 ">
                            <label>Email  {emailLoader ? <span><i className="fa fa-spinner fa-spin"></i></span> : <></>}</label>
                            <input
                                type="email"
                                pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
                                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                autoComplete="false"
                                value={form.email}
                                onChange={e => { setform({ ...form, email: e.target.value }); emailCheck(e.target.value) }}
                                required
                            />
                            {emailErr ? <div className="invalid-feedback d-block">{emailErr}</div> : <></>}

                        </div>
                        <div className="col-span-12 md:col-span-6 ">
                            <label>Password</label>
                            <div className="inputWrapper">
                                <input
                                    type={eyes.password ? 'text' : 'password'}
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                    value={form.password}
                                    autoComplete="new-password"
                                    onChange={e => setform({ ...form, password: e.target.value })}

                                />
                                <i className={eyes.password ? 'fa fa-eye text-gray-200 text-xs' : 'fa fa-eye-slash text-gray-200 text-xs'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                            </div>
                            {submitted && getError('password').invalid ? <div className="invalid-feedback d-block">Password minimum length should be 8</div> : <></>}
                        </div>
                        <div className="col-span-12 md:col-span-6 ">
                            <label>Confirm Password {form.password ? <span className="star">*</span> : <></>}</label>
                            <div className="inputWrapper">
                                <input
                                    type={eyes.confirmPassword ? 'text' : 'password'}
                                    className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                    value={form.confirmPassword}
                                    onChange={e => setform({ ...form, confirmPassword: e.target.value })}
                                    required={form.password ? true : false}
                                />
                                <i className={eyes.confirmPassword ? 'fa fa-eye text-gray-200 text-xs' : 'fa fa-eye-slash text-gray-200 text-xs'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
                            </div>
                            {submitted && getError('confirmPassword').invalid ? <div className="invalid-feedback d-block">Confirm Password is not matched with Password</div> : <></>}
                        </div>

                        {/* <div className="col-md-12 mb-3">
                                    <label>AboutUs<span className="star">*</span></label>
                                    <textarea
                                        className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                                        value={form.aboutUs}
                                        onChange={e => setform({ ...form, aboutUs: e.target.value })}
                                        required
                                    />
                                </div> */}
                        <div className="col-span-12 md:col-span-6 ">
                            <label className='lablefontcls'>Image</label><br></br>
                            <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} multiple={false} />
                        </div>

                    </div>


                    <div className="flex justify-end mt-6">

                        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
                    </div>
                </div>

            </form>
        </Layout>
    </>
}

export default Html
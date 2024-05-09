import React, { useEffect, useState } from 'react';
import Layout from '../../components/global/layout';
import EditProfile from '../../components/Profile/Edit';
import ChangePassword from '../../components/Profile/ChangePassword';
import ApiClient from '../../methods/api/apiClient';
import AppointmentReminder from '../../components/Profile/AppointmentReminder';
import methodModel from '../../methods/methods';
import { useParams } from 'react-router-dom';

const Settings = () => {
  const [tabs, setTabs] = useState('profile');
  const [form, setForm]:any = useState();

  const { tab }:any = useParams()

  const handleSubmit = (e:any) => {
    e.preventDefault();
    let value = {
      rescheduleTime: form.rescheduleTime,
      id: form.id
    }

    ApiClient.put('setting', value).then(res => {
      if (res.success) {
      }
    })
  };


  useEffect(() => {
    if (tab) {
      setTabs(tab)
    } else {
      setTabs('profile')
    }
  }, [tab])

  return (
    <>
      <Layout>
        {!tab ? <>
          <h3 className="mb-3">Settings</h3>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={tabs == 'profile' ? 'nav-link active' : 'nav-link'}
                href="#"
                onClick={() => setTabs('profile')}
              >
                Edit Profile
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  tabs == 'change-pass' ? 'nav-link active' : 'nav-link'
                }
                href="#"
                onClick={() => setTabs('change-pass')}
              >
                Change Password
              </a>
            </li>
          </ul> </> : <></>}


        <div>
          {tabs === 'edit' ? <EditProfile /> : <></>}
          {tabs === 'change-password' ? <ChangePassword /> : <></>}
          {tabs === 'reminder' ? <AppointmentReminder /> : <></>}
          {tabs === 'reschedule-time' ? <div className="">
            <h3 className='mb-3'>Reschedule Time</h3>
            <form className="form-row" onSubmit={handleSubmit}>
              <div className="col-md-12 mb-3">
                <label>Hours <span className="start">*</span></label><br />
                <p className='small'>Set up a minimum number of hours that is required for an appointment to be rescheduled</p>
                <input
                  type="number"
                  className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 mt-2"
                  value={form && form.rescheduleTime}
                  maxLength={2}
                  onChange={e => { setForm({ ...form, rescheduleTime: methodModel.isNumber(e) }) }}
                  required
                />

                <div className="mt-3 text-right">
                  <button type="submit" className="text-white bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-blue-800 inline-block">Submit</button>
                </div>
              </div>

            </form>
          </div> : <></>}
        </div>
      </Layout>
    </>
  );
};

export default Settings;

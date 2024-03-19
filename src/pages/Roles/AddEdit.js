import React, { useState, useEffect } from 'react';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
import { rolePermission, rolePermissions, roleType } from '../../models/type.model';
import { Link, useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/global/layout';
import { Tooltip } from "antd";

const AddEditRole = () => {

  const permissions = rolePermissions
  const permission = rolePermission

  const defaultvalue = () => {
    let keys = { ...roleType };
    Object.keys(roleType).map((itm) => {
      if (itm != 'permissions') keys[itm] = '';
    });
    Object.keys(roleType.permissions).map((itm) => {
      keys.permissions[itm] = false;
    });
    keys.status = 'active';
    return keys;
  };
  const { id } = useParams();
  const [form, setform] = useState({...roleType});
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const formValidation = [
    { key: 'status', required: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;
    let method = 'post';
    let url = 'api/role';
    let value = {
      ...form,
    };
    if (value.id) {
      method = 'put';
      url = 'api/role/update';
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message);
        history.push('/roles');
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get('api/role', { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = roleType;
          let permissions=value.permissions?.[0]||[]

          Object.keys(payload).map((itm) => {
            if(itm!='permissions') payload[itm] = value[itm];
          });
  
          Object.keys(roleType.permissions).map((itm) => {
            payload.permissions[itm] = permissions[itm]||false;
          });
          console.log('payload', payload);
          console.log('permissions', permissions);
          payload.id=id
          setform({
            ...payload,
          });
        }
        loader(false);
      });
    } else {
      setform(defaultvalue());
    }
  }, [id]);

  const HandleAll = (check) => {
    let value = check ? true : false;
    let permissions = form.permissions;
    Object.keys(permissions).map((itm) => {
      permissions[itm] = value;
    });
    setform({ ...form, permissions: permissions });
  };

  const isAllChecked = () => {
    let value = true;
    let permissions = form.permissions;
    Object.keys(permissions).map((itm) => {
      if (!permissions[itm]) value = false;
    });
    return value;
  };

  const handleAllPermission = (e) => {
    let key = e.name
    let checked = e.checked

    let keys = {};
    permission.map(itm => {
      keys = { ...keys, [`${itm.key}${key}`]: checked }
    })

    setform({
      ...form,
      permissions: {
        ...form.permissions,
        ...keys
      },
    });
  }

  const HandleAllRead = (check, key = 'read') => {
    let value = check ? true : false;

    let keys = {};
    permissions.map(itm => {
      keys = { ...keys, [`${key}${itm.key}`]: value }
    })

    setform({
      ...form,
      permissions: {
        ...form.permissions,
        ...keys
      }
    })
  };


  const isCheckAll = (key) => {
    let value = true
    permission.map(itm => {
      if (!form.permissions[`${itm.key}${key}`]) value = false
    })
    return value
  }

  const setpermission = (key, value) => {
    setform({
      ...form,
      permissions: {
        ...form.permissions,
        [key]: value,
      },
    });
  };

  const isAllPCheck = (key = 'read') => {
    let value = true;
    permissions.map(itm => {
      if (!form.permissions[`${key}${itm.key}`]) value = false
    })
    return value
  };


  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">


            <div className='flex justify-between items-center mb-8'>

              <div className='flex items-center'>
                <Tooltip placement="top" title="Back">
                  <Link to="/roles" className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border  transition-all    mr-3"><i className='fa fa-angle-left text-lg'></i></Link>
                </Tooltip>
                <div>
                  <h3 className="text-2xl font-semibold text-[#111827]">   {form && form.id ? 'Edit' : 'Add'} Role</h3>
                  <p class="text-sm font-normal text-[#75757A]">Here you can see all about your  Roles</p>
                </div>
              </div>

              <div className="w-80">
                <label>
                  Name<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="relative shadow-box bg-white min-w-[320px] rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                  value={form.name}
                  onChange={(e) => setform({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="shadow-box w-full bg-white rounded-lg mb-6">
              <div className="scrollbar w-full overflow-auto">

                <div class="table_section tablepadding">
                  <p className='text-xl font-semibold text-[#111827] px-4 pb-2'>Permissions</p>
                  <table class="w-full">
                    <thead class="table_head roleTable">
                      <tr class="border-b border-[#EAECF0]">
                        <th scope="col" class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}"></th>
                        <th scope="col" class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}">
                          <input
                            type="checkbox" 
                            onChange={(e) => HandleAll(e.target.checked)}
                          checked={isAllChecked()}
                            />

                          All</th>
                        {permission.map(itm => {
                          return <>
                            <th scope="col" class="cursor-pointer text-[#82838B] !border-l-0 font-normal text-sm !border border-[#EAECF0] px-3.5 text-left bg-[#F7FAFF] !py-3 ' onClick={e => sorting('name')}">
                              <input
                                type="checkbox"
                                onChange={(e) => HandleAllRead(e.target.checked, itm.key)}
                                checked={isAllPCheck(itm.key)}
                              />{itm.name}
                            </th>
                          </>
                        })}


                      </tr>
                    </thead>
                    <tbody className='roleTable'>

                      {permissions.map(itm => {
                        return <>
                          <tr>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              {itm.name}
                            </td>
                            <td className="!text-typo !border-l-0 cursor-pointer !px-5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                              <input
                                type="checkbox"
                                className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                name={itm.key}
                                onChange={(e) =>
                                  handleAllPermission(e.target)
                                }
                                checked={isCheckAll(itm.key)}
                              />
                            </td>
                            {permission.map(pitm => {
                              return <td className="!text-typo !border-l-0 cursor-pointer !px-5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
                                <div Name="checkList">
                                  <label className="mb-0">
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 green_check cursor-pointer shrink-0 rounded-[4px] !border !border-[#3C3E49A3] !text-white"
                                      checked={form.permissions[`${pitm.key}${itm.key}`]}
                                      onChange={(e) =>
                                        setpermission(`${pitm.key}${itm.key}`, e.target.checked)
                                      }
                                    />
                                  </label>
                                </div>
                              </td>
                            })}
                          </tr>
                        </>
                      })}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-end">

              <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                Save
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEditRole;

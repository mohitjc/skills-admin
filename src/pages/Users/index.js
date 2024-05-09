import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import Html from './html';
import { userType } from '../../models/type.model';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';
import Swal from 'sweetalert2';
const Users = (p) => {
  const user = useSelector((state) => state.user);
  const { role } = useParams();
  const searchState = useSelector((state) => state.search);
  const [filters, setFilter] = useState({
    page: 1,
    count: 50,
    search: '',
    role: role || '',
    isDeleted: false,
  });
  const [data, setData] = useState([]);
  const [tab, setTab] = useState('list');
  const [total, setTotal] = useState(0);
  const [loaging, setLoader] = useState(true);
  const [tableCols, setTableCols] = useState([]);
  const [form, setform] = useState(userType);
  const [roles, setRoles] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data, role });
      getData({ search: searchState.data, role, page: 1 });
    }
  }, [searchState, role]);

  const uTableCols = () => {
    let exp = [];
    if (tableCols) exp = tableCols;
    let value = [];
    userTableModel.list.map((itm) => {
      if (itm != exp.find((it) => it.key == itm.key)) {
        value.push(itm);
      }
    });
    return value;
  };

  const addCol = (itm) => {
    setTableCols([...tableCols, itm]);
  };

  const removeCol = (index) => {
    let exp = tableCols;
    exp.splice(index, 1);
    setTableCols([...exp]);
  };

  const getData = (p = {}) => {
    setLoader(true);
    let filter = { ...filters, ...p };
    let url = 'api/users/admin';
    if (filter.role) url = 'api/users/listing';
    ApiClient.get(url, filter).then((res) => {
      if (res.success) {
        setData(res.data);
        setTotal(res?.total||0);
      }
      setLoader(false);
    });
  };

  const clear = () => {
    setFilter({ ...filters, search: '', page: 1 });
    getData({ search: '', page: 1 });
  };

  const getRoles = () => {
    ApiClient.get('api/roles/listing', { status: 'active' }).then((res) => {
      if (res.success) {
        setRoles(res.data);
      }
    });
  };

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text:`Do you want to delete this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
          loader(true)
          ApiClient.delete('api/delete/user', { id: id }).then((res) => {
                if (res.success) {
                  clear();
                }
                loader(false);
              });
      }
    });
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    getData({ page: e });
  };

  const openModal = (itm) => {
    let extra = new Date().getTime();
    setform({ ...itm, extra, role });
    document.getElementById('openuserModal').click();
  };

  const ChangeRole = (e) => {
    setFilter({ ...filters, role: e, page: 1 });
    getData({ role: e, page: 1 });
  };
  const ChangeStatus = (e) => {
    setFilter({ ...filters, status: e, page: 1 });
    getData({ status: e, page: 1 });
  };
  const exportCsv = () => {
    loader(true);
    ApiClient.get('user/csv').then((res) => {
      if (res.success) {
        let url = res.path;
        let downloadAnchor = document.getElementById('downloadJS');
        downloadAnchor.href = url;
        downloadAnchor.click();
      }
      loader(false);
    });
  };

  const colClick = (col, itm) => {
    if (col.key == 'healthClinicId') {
    }
  };

  const statusChange = (itm) => {
    if(!isAllow('editUsers')){
      return
  }
    let modal = 'users';
    let status = 'active';
    if (itm.status == 'active') status = 'deactive';

    // if (
    //   window.confirm(
    //     `Do you want to ${
    //       status == 'active' ? 'Activate' : 'Deactivate'
    //     } this user`
    //   )
    // ) {
    //   loader(true);
    //   ApiClient.put(`api/user/status/change`, { status, id: itm.id }).then(
    //     (res) => {
    //       if (res.success) {
    //         getData();
    //       }
    //       loader(false);
    //     }
    //   );
    // }
    Swal.fire({
      title: "Are you sure?",
      text:`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
          loader(true)
          ApiClient.put(`api/user/status/change`, { status, id: itm.id }).then(
                (res) => {
                  if (res.success) {
                    getData();
                  }
                  loader(false);
                }
              );
      //   Swal.fire({
      
      //     // text: `Sucessfully ${status == 'active' ? 'Activate' : 'Deactivate'} this`,
      //     icon: "success"
      //   });
      }
    });
  };

  const blockunblock = (itm) => {
    if (
      window.confirm(
        `Do you want to ${!itm.isBlock ? 'Block' : 'Un-block'} this user`
      )
    ) {
      loader(true);
      ApiClient.put(`edit-profile`, {
        id: itm.id,
        isBlock: itm.isBlock ? false : true,
      }).then((res) => {
        if (res.success) {
          getData();
        }
        loader(false);
      });
    }
  };

  const view = (id) => {
    history('/userDetail/' + id);
  };

  const edit = (id) => {
    let url = `/users/edit/${id}`;
    if (role) url = `/users/${role}/edit/${id}`;
    history(url);
  };

  const add = () => {
    let url = `/users/add`;
    if (role) url = `/users/${role}/add`;
    history(url);
  };

  const tabChange = (tab) => {
    setTab(tab);
  };

  const exportfun = async () => {
    const token = await localStorage.getItem('token');
    const req = await axios({
      method: 'get',
      url: `${environment.api}api/export/user`,
      responseType: 'blob',
      body: { token: token },
    });
    var blob = new Blob([req.data], {
      type: req.headers['content-type'],
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Users.xlsx`;
    link.click();
  };

  const reset = () => {
    let filter = {
      status: '',
      role: '',
      page: 1,
    };
    setFilter({ ...filters, ...filter });
    getData({ ...filter });
    // dispatch(search_success(''))
  };

  const isAllow = (key = '') => {
    let permissions = user.roleDetail?.permissions;
    let value = permissions?.[key];
    if (user?.roleDetail?._id == environment.adminRoleId) value = true;
    return value;
  };

  const sortClass = (key) => {
    let cls = 'fa-sort';
    if (filters.key == key && filters.sorder == 'asc') cls = 'fa-sort-up';
    else if (filters.key == key && filters.sorder == 'desc')
      cls = 'fa-sort-down';
    return 'fa ' + cls;
  };

  const sorting = (key) => {
    let sorder = 'asc';
    if (filters.key == key) {
      if (filters.sorder == 'asc') {
        sorder = 'desc';
      } else {
        sorder = 'asc';
      }
    }

    let sortBy = `${key} ${sorder}`;
    setFilter({ ...filters, sortBy, key, sorder });
    getData({ sortBy, key, sorder });
  };

  return (
    <>
      <Html
        sortClass={sortClass}
        sorting={sorting}
        colClick={colClick}
        exportfun={exportfun}
        isAllow={isAllow}
        tabChange={tabChange}
        tab={tab}
        reset={reset}
        add={add}
        roles={roles}
        view={view}
        edit={edit}
        role={role}
        ChangeRole={ChangeRole}
        ChangeStatus={ChangeStatus}
        openModal={openModal}
        pageChange={pageChange}
        addCol={addCol}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        uTableCols={uTableCols}
        removeCol={removeCol}
        filters={filters}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        blockunblock={blockunblock}
      />
    </>
  );
};

export default Users;

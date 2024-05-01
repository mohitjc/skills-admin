import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import loader from '../../methods/loader';
import Html from './html';
import { useHistory } from 'react-router-dom';
import environment from '../../environment';
import axios from 'axios';
import Swal from 'sweetalert2';
const Group = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const history = useHistory()

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])


    const sortClass = (key) => {
        let cls = 'fa-sort'
        if (filters.key == key && filters.sorder == 'asc') cls = 'fa-sort-up'
        else if (filters.key == key && filters.sorder == 'desc') cls = 'fa-sort-down'
        return 'fa ' + cls
    }


    const sorting = (key) => {
        let sorder = 'asc'
        if (filters.key == key) {
            if (filters.sorder == 'asc') {
                sorder = 'desc'
            } else {
                sorder = 'asc'
            }
        }

        let sortBy = `${key} ${sorder}`;
        setFilter({ ...filters, sortBy, key, sorder })
        getData({ sortBy, key, sorder })
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('api/group/list', filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm._id
                    return itm
                }))
                setTotal(res.total)
            }
            setLoader(false)
        })
    }


    const clear = () => {
        setFilter({ ...filters, search: '',status:'', page: 1 })
        getData({ search: '', status:'',page: 1 })
    }

    const deleteItem = (id) => {
        // if (window.confirm("Do you want to delete this")) {
        //     loader(true)
        //     ApiClient.delete('api/group', { id: id }).then(res => {
        //         if (res.success) {
        //             // ToastsStore.success(res.message)
        //             clear()
        //         }
        //         loader(false)
        //     })
        // }
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
                ApiClient.delete('api/group', { id: id }).then(res => {
                            if (res.success) {
                                // ToastsStore.success(res.message)
                                clear()
                            }
                            loader(false)
                        })
            //   Swal.fire({
            //     icon: "success"
            //   });
            }
          });
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const changestatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }


    const statusChange = (itm) => {
        let modal = 'category'
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

    //     if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
    //         loader(true)
    //         ApiClient.put(`api/group`, { id: itm.id, status }).then(res => {
    //             if (res.success) {
    //                 getData()
    //             }
    //             loader(false)
    //         })
    //     }
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
            ApiClient.put(`api/group`, { id: itm.id, status }).then(res => {
                            if (res.success) {
                                getData()
                            }
                            loader(false)
                        })
        //   Swal.fire({
        
        //     // text: `Sucessfully ${status == 'active' ? 'Activate' : 'Deactivate'} this`,
        //     icon: "success"
        //   });
        }
      });
}
    const edit = (id) => {
        history.push(`/group/edit/${id}`)
    }
const viewMember =(id)=>{
    console.log(id ,"idddddddddddd")
    history.push(`/member/${id}`)
}
    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/excel`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `group.xlsx`;
        link.click();
    }

    const isAllow = (key = '') => {
        let permissions = user.roleDetail?.permissions
        let value = permissions?.[key]
        if (user?.roleDetail?._id == environment.adminRoleId) value = true
        return value
    }

    return <><Html
        edit={edit}
        clear={clear}
        sortClass={sortClass}
        sorting={sorting}
        isAllow={isAllow}
        pageChange={pageChange}
        deleteItem={deleteItem}
        filters={filters}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        changestatus={changestatus}
        exportfun={exportfun}
        viewMember={viewMember}
    />
    </>;
};

export default Group;

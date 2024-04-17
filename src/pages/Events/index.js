import React, { useEffect, useState } from 'react';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import loader from '../../methods/loader';
import Html from './html';
import { useHistory } from 'react-router-dom';
import environment from '../../environment';
import axios from 'axios';
import shared from './shared';
import { useSelector } from 'react-redux';

const Events = () => {
    const user = useSelector((state) => state.user);
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', catType: '' ,groupId:"",search:""})
    const [data, setData] = useState([])
    const [groupdata, setgroupData] = useState([])
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
        let filter = { ...filters, ...p}
        ApiClient.get(shared.listApi, filter).then(res => {
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
    const filter = (p={}) => {
        let f={
            page:1,
            ...p
        }
        setFilter({ ...filters, ...f})
        getData({ ...f})
    }
    const getGroupData = (p = {}) => {
        let filter = {  page: 1, count: 50, search: '', catType: ''  }
        ApiClient.get(shared?.groupApi, filter).then(res => {
            if (res.success) {
                setgroupData(res?.data)
            }
        })
    }
    const clear = () => {
        setFilter({ ...filters, search: '',status:'', page: 1 ,groupId: '', })
        getData({ search: '', status:'',page: 1 , groupId: ''})
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete(shared.deleteApi, { id: id }).then(res => {
                if (res.success) {
                    // ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const changestatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    const changeGroup = (e) => {
        setFilter({ ...filters, groupId: e, page: 1 })
        getData({ groupId: e, page: 1 })
    }

    const statusChange = (itm) => {
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
            loader(true)
            ApiClient.put(shared.statusApi, { id: itm.id, status }).then(res => {
                if (res.success) {
                    getData()
                }
                loader(false)
            })
        }
    }

    const edit = (id) => {
        history.push(`/${shared.url}/edit/${id}`)
    }

    const view = (id) => {
        let url=`/${shared.url}/detail/${id}`
        history.push(url)
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
        link.download = `${shared.title}.xlsx`;
        link.click();
    }

    const isAllow = (key = '') => {
        let permissions = user.roleDetail?.permissions
        let value = permissions?.[key]
        if (user?.roleDetail?._id == environment.adminRoleId) value = true;
        return value
    }
useEffect(() => {
    getGroupData()
}, [])

    return <><Html
        edit={edit}
        view={view}
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
        changeGroup={changeGroup}
        exportfun={exportfun}
        groupdata={groupdata}
        filter={filter}
        setFilter={setFilter}
    />
    </>;
};

export default Events;

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import categoryType from '../../models/categoryType.model';
import Html from './html';
import { CategoryType } from '../../models/type.model';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { encryptId } from '../../components/common/Encryption/encryption';
const Features = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: '', category: '' })
    const [data, setData] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState(CategoryType)
    const [categories, setcategories] = useState()
    const types = categoryType.list
    const history = useNavigate()
    const dragItem = useRef();
    const dragOverItem = useRef();
    const dragItems = useRef();
    const [dargIndex, setDragIndex] = useState(-1)
    const [dargEnterIndex, setDargEnterIndex] = useState(-1)
    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 2; i++) {
            cols.push(userTableModel.category[i])
        }
        setTableCols(cols)
        // getCategoires()
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])


    const uTableCols = () => {
        let exp = []
        if (tableCols) exp = tableCols
        let value = []
        userTableModel.category.map(itm => {
            if (itm != exp.find(it => it.key == itm.key)) {
                value.push(itm)
            }
        })
        return value
    }

    const addCol = (itm) => {
        setTableCols([...tableCols, itm])
    }


    const removeCol = (index) => {
        let exp = tableCols
        exp.splice(index, 1);
        setTableCols([...exp])
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('api/feature/list', filter).then(res => {
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
        let f={
            search:'',
            status:'',
            category:'',
            page:1,
            
        }
        setFilter({ ...filters, ...f})
        getData(f)
    }

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
                ApiClient.delete('api/feature', { id: id }).then(res => {
                            if (res.success) {
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

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData({ page: 1 })
    }

    const modalResult = (e) => {

        modalClosed()
    }

    const openModal = (itm) => {
        let extra = new Date().getTime()
        setform({ ...itm, extra })
        document.getElementById("openuserModal").click()
    }

    const ChangeRole = (e) => {
        setFilter({ ...filters, catType: e, page: 1 })
        getData({ catType: e, page: 1 })
    }
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }

    const exportCsv = () => {
        loader(true)
        ApiClient.get('user/csv').then(res => {
            if (res.success) {
                let url = res.path
                let downloadAnchor = document.getElementById("downloadJS")
                downloadAnchor.href = url
                downloadAnchor.click()
            }
            loader(false)
        })
    }

    const colClick = (col, itm) => {
        if (col.key == 'healthClinicId') {
        }
    }

    const statusChange = (itm) => {
        let modal = 'category'
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        // if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
        //     loader(true)
        //     ApiClient.put(`api/feature`, { id: itm.id, status }).then(res => {
        //         if (res.success) {
        //             getData()
        //         }
        //         loader(false)
        //     })
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
                ApiClient.put(`api/feature`, { id: itm.id, status }).then(res => {
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
    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/features`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Features.xlsx`;
        link.click();
    }
    const view = (id) => {
        history("/features/" + id)
    }

    const edit = (id) => {
        history(`/features/edit/${encryptId(id)}`)
    }

    const tabChange = (tab) => {
        setTab(tab)
    }

    const getCategoires = () => {
        ApiClient.get(`api/categorie/list`, { catType: environment.planTypeId }).then(res => {
            setcategories(res.data)
        })
    }

    const filter = (p = {}) => {
        setFilter({ ...filters, page: 1, ...p })
        getData({ page: 1, ...p })
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
        setDragIndex(position)
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
        setDargEnterIndex(position)
    };

    const drop = (e) => {
        setDargEnterIndex(-1)
        setDragIndex(-1)
        const copyListItems = [...data];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setData(copyListItems);
        let orderdata = copyListItems.map((item, i) => {
            return {
                id: item.id,
                order: i
            }
        })
        loader(true)
        ApiClient.put('api/feature/drag/drop', { data: orderdata }).then(res => {
            if (res.success) {
                // toast.success(res.message)
            }
            loader(false)
        })
    };

    const showData = () => {
        let value = data
        if (dragItems && dragItems.current) value = dragItems.current
        return value
    }

    const isAllow = (key = '') => {
        let permissions = user.roleDetail?.permissions
        let value = permissions?.[key]
        if (user?.roleDetail?._id == environment.adminRoleId) value = true
        return value
    }



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

    return <><Html
    clear={clear}
        view={view}
        sortClass={sortClass}
        sorting={sorting}
        edit={edit}
        colClick={colClick}
        isAllow={isAllow}
        tabChange={tabChange}
        exportfun={exportfun}
        tab={tab}
        types={types}
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
        categories={categories}
        filter={filter}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        dragStart={dragStart}
        dragEnter={dragEnter}
        drop={drop}
        dargIndex={dargIndex}
        dargEnterIndex={dargEnterIndex}
        showData={showData}
    />
    </>;
};

export default Features;

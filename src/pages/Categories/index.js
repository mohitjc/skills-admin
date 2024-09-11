import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import categoryType from '../../models/categoryType.model';
import Html from './html';
import { CategoryType } from '../../models/type.model';
import { useNavigate, useParams } from 'react-router-dom';
import { search_success } from '../../actions/search';
import axios from 'axios';
import environment from '../../environment';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { encryptId } from '../../components/common/Encryption/encryption';
const Categories = (p) => {
    let user = useSelector(state => state.user)
    const { type } = useParams()
    const dispatch = useDispatch()
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: type ? type : '', parentCategory: '',sortBy: 'createdAt desc' })
    const [data, setData] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState(CategoryType)
    const [cattype, setcattype] = useState()
    const types = categoryType.list
    const history = useNavigate()
    const dragItem = useRef();
    const dragOverItem = useRef();
    const dragItems = useRef();
    const dargIndex = useRef(-1);
    const dargEnterIndex = useRef(-1);

    useEffect(() => {
        categoriestype()
        let cols = []
        for (let i = 0; i <= 2; i++) {
            cols.push(userTableModel.category[i])
        }
        setTableCols(cols)
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            let catType=localStorage.getItem('catType') || ''
            setFilter({ ...filters, search: searchState.data, catType: type ? type : catType })
            getData({ search: searchState.data, page: 1, catType: type ? type : catType })
        }
    }, [searchState, type])



    const sortClass=(key)=>{
        let cls='fa-sort'
        if(filters.key==key && filters.sorder=='asc') cls='fa-sort-up'
        else  if(filters.key==key && filters.sorder=='desc') cls='fa-sort-down'
        return 'fa '+cls
      }

      const sorting=(key)=>{
        let sorder='asc'
        if(filters.key==key){
          if(filters.sorder=='asc'){
            sorder='desc'
          }else{
            sorder='asc'
          }
        }
        
        let sortBy=`${key} ${sorder}`;
        setFilter({...filters,sortBy,key,sorder})
        getData({sortBy,key,sorder})
      }

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
        ApiClient.get('api/categorie/list', filter).then(res => {
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
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
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
                ApiClient.delete('api/categorie', { id: id }).then(res => {
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
        localStorage.setItem('catType',e)
        setFilter({ ...filters, catType: e, page: 1 })
        getData({ catType: e, page: 1 })
    }

    const ChangeCategory = (e) => {
        setFilter({ ...filters, parentCategory: e, page: 1 })
        getData({ parentCategory: e, page: 1 })
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
                ApiClient.put(`api/categorie/change-status`, { id: itm.id, status }).then(res => {
                            if (res.success) {
                                getData()
                            }
                            loader(false)
                        })
          
            }
          });
    }

    const view = (id) => {
        history("/categoryDetail/" + id)
    }

    const edit = (id) => {
        let url = "/categories/edit/" + encryptId(id)
        if (type) url = `/category/${type}/edit/${encryptId(id)}`
        history(url)
    }

    const tabChange = (tab) => {
        setTab(tab)
    }


    const add = () => {
        let url = "/categories/add"
        if (type) url = `/category/${type}/add`
        history(url)
    }

    const reset = () => {
        let filter = {
            search: '', page: 1, parentCategory: '',status:'',
            catType: type ? type : ''
        }
        localStorage.setItem('catType','')
        setFilter({ ...filters, ...filter })
        getData({ ...filter })
        dispatch(search_success(''))
    }

    const categoriestype = () => {
        ApiClient.get(`api/categorytype/listing`,{status:''}).then(res => {
            if (res.success) {
                setcattype(res.data)
            }
        })
    }
    const statuschange = (value) => {
        setFilter({ ...filters, status: value, page: 1 })
        getData({ status: value ,page: 1 });
    }

    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        let newtype = "";
        if (type == "Reseller") {
            newtype = "Reseller"
        }
        const req = await axios({
            method: "get",
            url: `${environment.api}api/categories/export?catType=${newtype}`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Categories.xlsx`;
        link.click();
    }

    const dragStart = (e, position) => {
        dragItem.current = position;
        dargIndex.current = position
    };

    const dragEnter = (e, position) => {
        let arr=document.querySelectorAll("#tableBodycat tr");
        arr.forEach((itm,i)=>{
            if(i==position){
                itm.classList.add("dragEnter")
            }else{
                itm.classList.remove("dragEnter")
            }
        })
    };

    const drop = (e) => {
        dargEnterIndex.current = -1
        dargIndex.current = -1
        const copyListItems = [...data];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;

        setData(copyListItems);
        let oarr = copyListItems.map((itm, i) => {
            return {
                id: itm.id,
                order: i
            }
        })
        loader(true)
        ApiClient.put('api/category/drag/drop', { data: oarr }).then(res => {
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

    return <><Html
        reset={reset}
        sortClass={sortClass}
        sorting={sorting}
        view={view}
        edit={edit}
        isAllow={isAllow}
        statuschange={statuschange}
        add={add}
        exportfun={exportfun}
        ChangeCategory={ChangeCategory}
        colClick={colClick}
        tabChange={tabChange}
        tab={tab}
        type={type}
        types={types}
        ChangeRole={ChangeRole}
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
        cattype={cattype}
        dragStart={dragStart}
        dragEnter={dragEnter}
        drop={drop}
        showData={showData}
        setFilter={setFilter}
        getData={getData}
        
        dargIndex={dargIndex.current}
        dargEnterIndex={dargEnterIndex.current}
    />
    </>;
};

export default Categories;

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import Html from './html';
import { useHistory } from 'react-router-dom';
import { search_success } from '../../actions/search';
import axios from 'axios';
import environment from '../../environment';
import { toast } from 'react-toastify';

const Currency = (p) => {
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', country: '' })
    const [data, setData] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState()
    const history = useHistory()
    const [search, setSearch] = useState('')
    const [checkedItems,setCheckedItems]=useState([])

    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 1; i++) {
            cols.push(userTableModel.Country[i])
        }
        setTableCols(cols)
        getapplied()
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
           
        }
        setSearch(searchState.data)
    }, [searchState])

    useEffect(
        () => {
            if (searchState.data) {
                dispatch(search_success(''))
            }
        },
        []
    );


    const uTableCols = () => {
        let exp = []
        if (tableCols) exp = tableCols
        let value = []
        userTableModel.relellerCategory.map(itm => {
            if (itm != exp.find(it => it.key == itm.key)) {
                value.push(itm)
            }
        })
        return value
    }

    const addCol = (itm) => {
        setTableCols([...tableCols, itm])
    }


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



    const removeCol = (index) => {
        let exp = tableCols
        exp.splice(index, 1);
        setTableCols([...exp])
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        // APi for Getting Currency
        ApiClient.get('api/currency/listing', filter).then(res => {
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
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/currency/delete', { id: id }).then(res => {
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

    const openModal = (itm) => {
        let extra = new Date().getTime()
        setform({ ...itm, extra })
        document.getElementById("openuserModal").click()
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
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
            loader(true)
            // Status Change APi For Country
            ApiClient.put(`api/currency/status/change`, { id: itm.id, status }).then(res => {
                if (res.success) {
                    getData()
                }
                loader(false)
            })
        }
    }

    const edit = (id) => {
        history.push(`/currency/edit/${id}`)
    }

    const tabChange = (tab) => {
        setTab(tab)
    }
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    const Country = (e) => {
        setFilter({ ...filters, country: e, page: 1 })
        getData({ country: e, page: 1 })
    }

    const searchChange = (e) => {
        setSearch(e)
        if (!e) {
            dispatch(search_success(''))
        }
    }

    const searchHandle = (e) => {
        e.preventDefault()
        dispatch(search_success(search))
    }

    const reset=()=>{
        let filter={
            page: 1, count: 50, search: '', country: ''
        }
        setFilter({ ...filters, ...filter})
        getData({ ...filter })
        setSearch('')
        dispatch(search_success(''))
    }
    const exportfun=async()=>{
  
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/currency`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Currencies.xlsx`;
          link.click();
    }


    const getapplied = () => {
        ApiClient.get(`api/currency/applied`).then((res) => {
          if (res.success) {
            setCheckedItems(res.data&&res.data.map(item=>item.id));
          }
        });
      };

    const handlecheckbox = (value) => {
        let data=checkedItems
        if (checkedItems.includes(value)) {
            data = checkedItems.filter(item => item !== value);
            setCheckedItems(data);
          } 
          else {
            data=[...checkedItems, value]
              setCheckedItems(data);
          }

          loader(true)
          ApiClient.post('api/currency/apply',{data}).then(res=>{
            if(res.success){
                // toast.success(res.message)
            }
            loader(false)
          })
    };

    const isAllow = (key = '') => {
        let permissions = user.roleDetail?.permissions
        let value = permissions?.[key]
        if (user?.roleDetail?._id == environment.adminRoleId) value = true
        return value
    }

    return <><Html
        tabChange={tabChange}
        sortClass={sortClass}
    sorting={sorting}
        tab={tab}
        isAllow={isAllow}
        handlecheckbox={handlecheckbox}
        checkedItems={checkedItems}
        edit={edit}
        exportfun={exportfun}
        Country={Country}
        colClick={colClick}
        openModal={openModal}
        pageChange={pageChange}
        ChangeStatus={ChangeStatus}
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
        searchChange={searchChange}
        searchHandle={searchHandle}
        reset={reset}
        search={search}
    />
    </>;
};

export default Currency;

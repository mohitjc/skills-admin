import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import rolesModel from '../../models/roles.model';
import Html from './html';
import { userType } from '../../models/type.model';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';
import Swal from 'sweetalert2';
import { encryptId } from '../../components/common/Encryption/encryption';
const Customer = (p) => {
    const user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 10, search: '', role:'', isDeleted: false })    
    const [data, setData] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState(userType)
    const [countries, setCountries] = useState([])
    const [plans, setPlans] = useState([])
    const roles=rolesModel.list
    const history=useNavigate()

    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 4; i++) {
            cols.push(userTableModel.list[i])
        }
        setTableCols(cols)
        // getCountry()
        // getPlans()
    }, [])

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


    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data})
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const getCountry=()=>{
        ApiClient.get('api/country/listing',{sortBy:'name asc'}).then(res=>{
            if(res.success){
                setCountries(res.data.map(itm=>{
                    return {id:itm.name,name:itm.name}
                }))
            }
        })
    }

    const getPlans=()=>{
        ApiClient.get('api/plan/listing',{sortBy:'name asc'}).then(res=>{
            if(res.success){
                setPlans(res.data)
            }
        })
    }


    const uTableCols = () => {
        let exp = []
        if (tableCols) exp = tableCols
        let value = []
        userTableModel.list.map(itm => {
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
        let filter = { ...filters, ...p ,role:environment.userRoleId}
        ApiClient.get('api/users/listing', filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.total)
            }
            setLoader(false)
        })
    }

    const filter=(p)=>{
        let f={
            page:1,
            ...p
        }
        setFilter({...filters,...f})
        getData(f)
    }


    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }
    const count = (e) => {
        setFilter({ ...filters, count:e })
        getData({ ...filters ,count: e })
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
                ApiClient.delete('api/delete/user', {id: id }).then(res => {
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

    const modalResult=(e)=>{
     
        modalClosed()
    }

    const openModal = (itm) => {
        let extra=new Date().getTime()
        setform({...itm,extra})
        document.getElementById("openuserModal").click()
    }

    const ChangeRole = (e) => {
        setFilter({ ...filters, role: e, page: 1 })
        getData({ role: e, page: 1 })
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

    const statusChange=(itm)=>{
        let modal='users'
        let status='active'
        if(itm.status=='active') status='deactive'

        // if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this user`)){
        //     loader(true)
        //     ApiClient.put(`api/user/status/change`,{status,id:itm.id}).then(res=>{
        //         if(res.success){
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
                ApiClient.put(`api/user/status/change`,{status,id:itm.id}).then(res=>{
                            if(res.success){
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

    const approveDecline=(itm,value)=>{
        // if(window.confirm(`Do you want to ${value=='approved'?'Approve':'Decline'} this user`)){
        //     loader(true)
        //     ApiClient.put(`api/user`,{verifiedGroupLeader:value,id:itm.id,addedBy:user._id}).then(res=>{
        //         if(res.success){
        //             getData()
        //         }
        //         loader(false)
        //     })
        // }
        Swal.fire({
            title: "Are you sure?",
            text:`Do you want to ${value=='approved'?'Approve':'Decline'} this user`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
                loader(true)
                ApiClient.put(`api/user`,{verifiedGroupLeader:value,id:itm.id,addedBy:user._id}).then(res=>{
                            if(res.success){
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

    const blockunblock=(itm)=>{
        if(window.confirm(`Do you want to ${!itm.isBlock?'Block':'Un-block'} this user`)){
            loader(true)
            ApiClient.put(`edit-profile`,{id:itm.id,isBlock:itm.isBlock?false:true}).then(res=>{
                if(res.success){
                    getData()
                }
                loader(false)
            })
        }
    }

    const view=(id)=>{
        history("/customer/view/"+encryptId(id))
    }

 
    const tabChange=(tab)=>{
        setTab(tab)
    }

    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/user?role=${environment.userRoleId}`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Customers.xlsx`;
          link.click();
    }
    const edit=(id)=>{
        history(`/customer/edit/${encryptId(id)}`)
    }

    const reset=()=>{
        let f={
            status:'',
            groupId:'',
            customerRole:''
        }
        filter(f)
    }

    const isAllow = (key = '') => {
        let permissions = user.roleDetail?.permissions
        let value = permissions?.[key]
        if (user?.roleDetail?._id == environment.adminRoleId) value = true
        return value
    }

    return <><Html
    isAllow={isAllow}
        colClick={colClick}
        sortClass={sortClass}
        approveDecline={approveDecline}
    sorting={sorting}
        exportfun={exportfun}
        tabChange={tabChange}
        tab={tab}
        roles={roles}
        plans={plans}
        reset={reset}
        view={view} 
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
        filter={filter}
        tableCols={tableCols}
        countries={countries}
        loaging={loaging}
        data={data}
        edit={edit}
        count={count}
        total={total}
        statusChange={statusChange}
        blockunblock={blockunblock}
    />
    </>;
};

export default Customer;

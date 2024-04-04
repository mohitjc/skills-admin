import React, { useState, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
import { Link, useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/global/layout';
import loader from "../../methods/loader";


const ApplyCurrency = () => {
const [ checkedItems,setCheckedItems]=useState([])
  const [form, setform] = useState();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.user);
//   const [loader, setLoader] = useState(true)
  const [currency, setcurrency] = useState()
  console.log(currency,'sdfsdf');
  const formValidation = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;
    let method = 'post';
    
    //  URL Please
    let url = 'api/currency/apply';
    let value = {
      data:checkedItems
    };
    
    if (value.id) {
      method = 'put';
      url = 'api/currency/update';
      value = {
        ...form,
        id: id,
      };
    } else {
      value.addedBy=user._id
      delete value.id;
    }
    console.log(value,"Vlaue");

    if ((checkedItems).length<=0) {
        alert('Please select currency fields');
        return;
      }

       // If validation is successful, proceed with form submission
console.log('Form submitted:', { checkedItems });


    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message);
        history.push('/currency');
      }
      loader(false);
    });
  };


  const getdetail = () => {
    loader(true)
    ApiClient.get(`api/currency/applied`).then((res) => {
      if (res.success) {
        setCheckedItems(res.data&&res.data.map(item=>item.id));
        console.log(res.data,"data is here");
      }
      loader(false)
    });
  };

  useEffect(() => {
    getCurrency();
    getdetail()
  }, []);

  const getCurrency = () => {
    loader(true)
    ApiClient.get(`api/currency/listing?page=1&count=50`).then((res) => {
      if (res.success) {
        setcurrency(res.data);
      }
      loader(false)
    });
  };



  
  var [selectedcourse, setselectedCourse] = useState([]);
  const handlecheckbox = (value) => {
      if (checkedItems.includes(value)) {
            const updatedCheckedItems = checkedItems.filter(item => item !== value);
            setCheckedItems(updatedCheckedItems);
        } 
        else {
            setCheckedItems([...checkedItems, value]);
        }
  };



  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1 pl-4">
            <h3 className="ViewUser mb-3">
              {form && form.id ? 'Edit' : 'Apply'} Currency
            </h3>

            <div className="row">

      {currency&&currency.map(item=>{
          return(
              <div className="col-md-4 mt-3">
                <input
                    type="checkbox"
                    className="ml-1"
                    name="course"
                    value={item.currency}
                    onClick={e=>handlecheckbox(item.id)}
                    checked={checkedItems.includes(item.id)}
                    />
                <label>{item.currency}</label>
            </div>
          )
      })} 
      {selectedcourse.map((course, index) => {
        return (
          <>
            <li key={index}>{course}</li>
            <br />
          </>
        );
      })}
    </div>
            <div className="text-right">
              <button type="button" className="btn btn-secondary discard mr-2">
                <Link to="/currency" className="discard">
                  Back
                </Link>
              </button>
              <button type="submit" className="btn btn-primary">
              Apply
              </button>
            </div>
          </div>
        </form>

     
      </Layout>
    </>
  );
};

export default ApplyCurrency;

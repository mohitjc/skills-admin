import { useState } from 'react';
import Layout from '../../components/global/layout';
import Html from './html';
import { useSelector } from 'react-redux';
import { userType } from '../../models/type.model';
const LogoSetting = (p) => {
  const [data, setdata] = useState({});

  const [img, setimg] = useState('');
  const [form, setForm] = useState({ ...userType });
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    // let invalid = methodModel.getFormError(formValidation, form)
    // if (invalid && (!addressSellected && form.address && tab == 'info') || timezoneLoader) return
    let value = { ...form };

    ApiClient.put('api/user/profile', value).then((res) => {
      console.log(res);
      if (res.success) {
        let uUser = { ...user, ...value };
        dispatch(login_success(uUser));
        // toast.success(res.message);
        setTab('');
      }
    });
  };

  const UploadImage = (e) => {
    let image = e.target.files;
    let file = image.item(0);
    console.log(file);

    ApiClient.postFormData('api/upload/image?modelName=logo', {
      file: file,
      modelName: 'logo',
    }).then((res) => {
      if (res.fileName) {
        let image = res.fileName;
        //   setForm({ ...form, logo: image, baseImg: '' })
        setimg(image);
        setdata({ ...data, logo: image });
        setForm({ ...form, logo: image });
        console.log(data);
        console.log(res);
      }
    });
  };

  return (
    <>
      <Html>
        UploadImage={UploadImage}
        img={img}
        user={user}
        handleSubmit={handleSubmit}
      </Html>
    </>
  );
};
export default LogoSetting;

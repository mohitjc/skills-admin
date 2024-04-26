import React from "react";
import methodModel from "../../../methods/methods";

const Html = ({ inputElement, uploadImage, img, remove, loader, model, multiple, required ,err,label=''}) => {
    return <>
        <label className={`inline-block text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${img && !multiple ? 'd-none' : ''}`}>
            <input type="file" className="d-none" ref={inputElement} accept="image/*" multiple={multiple ? true : false} disabled={loader} onChange={(e) => { uploadImage(e); }} />
            {label||'Upload Image'}
        </label>

        {loader ? <div className="text-success">Uploading... <i className="fa fa-spinner fa-spin"></i></div> : <></>}

        {multiple ? <>
            <div className="imagesRow">
                {img && img.map((itm, i) => {
                    return <div className="imagethumbWrapper">
                        <img src={methodModel.noImg(itm, model)} className="thumbnail" />
                        <i className="fa fa-times" title="Remove" onClick={e => remove(i)}></i>
                    </div>
                })}
            </div>
        </> : <>
            {img ? <div className="imagethumbWrapper">
                <img src={methodModel.noImg(img, model)} className="thumbnail" />
                <i className="fa fa-times" title="Remove" onClick={e => remove()}></i>
            </div> : <></>}
        </>}

        {required && !img ? <div className="text-danger">{err ? err : 'Image is Required'}</div> : <></>}
    </>
}
export default Html
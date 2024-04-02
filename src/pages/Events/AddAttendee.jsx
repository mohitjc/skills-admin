import { useEffect, useState } from "react";
import FormControl from "../../components/common/FormControl";
import methodModel from "../../methods/methods";
import loader from "../../methods/loader";
import ApiClient from "../../methods/api/apiClient";
import { useSelector } from "react-redux";

export default function AddAttendee({id,eventId,result=()=>{}}){
    const [form, setform] = useState({ id: '', fullName: '', email:'' })
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/attendees'
        let value = {
            ...form,
            eventId:eventId
        }
        if (value.id) {
            method = 'put'
            url = 'api/attendees/update'
        } else {
            value.isConnectedMeating=true
            value.attendeeRole='member'
            value.addedBy=user._id
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
                // history(`/${shared.url}`)
                result({event:'submit',value:res})
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/attendees/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = form

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })

                    payload.id=id
                    setform({
                        ...payload
                    })

                }
                loader(false)
            })
        }

    }, [id])

    const getError = (key) => {
        return submitted?methodModel.getError(key, form, formValidation)?.message:''
    }
    
    return <>
    <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                <h3 className="text-2xl font-semibold text-[#111827] mb-3">
                                {form && form.id ? 'Edit' : 'Add'}  Attendee
                            </h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="text"
                                name="fullName"
                                label="Name"
                                value={form.fullName}
                                onChange={e => setform({ ...form, fullName: e })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <FormControl
                                type="email"
                                name="email"
                                label="Email"
                                value={form.email}
                                onChange={e => setform({ ...form, email: e })}
                                required
                            />
                        </div>

                        {/* <div className="col-span-12 md:col-span-6">
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} />
                            </div> */}
                    </div>
                    <div className="text-right">

                        <button type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
                    </div>
                </div>


            </form>
    </>
}
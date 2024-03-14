import React, { useEffect, useState } from "react"
import Layout from "../../components/global/layout"
import ApiClient from "../../methods/api/apiClient"

const ContactDetails = () => {
    const [form, setform] = useState({ email: '', contactNo: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        ApiClient.post('contact/detail', { email: form.email, contactNo: form.contactNo }).then(res => {
            if (res.success) {
                // ToastsStore.success(res.message)
            }
        })
    }

    useEffect(() => {
        ApiClient.get('contact/detail').then(res => {
            if (res.success) {
                setform(res.data)
            }
        })
    }, [])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <h3>Contact Detail</h3>
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                        <label>Email</label>
                        <input type="email" className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" value={form.email} onChange={e => setform({ ...form, email: e.target.value })} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Mobile</label>
                        <input type="number" className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2" value={form.contactNo} onChange={e => setform({ ...form, contactNo: e.target.value })} />
                    </div>
                    <div className="col-md-12 text-right">
                        <button className="text-white bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 inline-block">Update</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default ContactDetails
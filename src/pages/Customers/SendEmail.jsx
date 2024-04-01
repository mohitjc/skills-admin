import { useState } from "react";
import FormControl from "../../components/common/FormControl";

export default function SendEmail(){
    const [form,setForm]=useState({body:''})
    return <>
    <form>
    <div className="grid gid-cols-2">
        <div>
            <FormControl
            type="editor"
            label="Body"
            value={form.body}
            onChange={e=>setForm({...form,body:e})}
            />
        </div>
    </div>
    <div className="mt-3 text-right">
        <button className="bg-primary leading-10 h-10 inline-flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg gap-2">Save</button>
    </div>
    </form>
    
    </>
}
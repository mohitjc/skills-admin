import React from 'react'

const RolesList = ({list}) => {
  return (
  
    <>

    <div className='tables_lists'>
        <table className='w-full'>
            <thead className='text-left border-y border-[#EAECF0]'>
                <tr className='border-y border-[#EAECF0]'>

             
                <th className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3 py-2  text-left bg-[#F7FAFF] capitalize'>Groups</th>
                <th className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3 py-2  text-left bg-[#F7FAFF] capitalize'>Roles</th>
                </tr>
            </thead>
            <tbody>
                {list?.map((ele)=>{
                    return( <tr>
                        <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3 text-left bg-[#F7FAFF] !py-2 capitalize'>
    {ele?.groupDetails?.name}
                    </td>
                    <td className='text-[#82838B] !border-l font-normal text-sm !border border-[#EAECF0] px-3 text-left bg-[#F7FAFF] !py-2 capitalize'>{ele?.role}</td>
                        </tr>)
                   
                })}
                
                
            </tbody>
        </table>
    </div>

</>
  )
}

export default RolesList
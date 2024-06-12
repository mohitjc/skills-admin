import React from 'react'

const RolesList = ({list}) => {
  return (
  
    <>

    <div className='tables_lists'>
        <table className='w-full'>
            <thead className='text-left'>
                <th>Groups</th>
                <th>Roles</th>
            </thead>
            <tbody>
                {list?.map((ele)=>{
                    return( <tr>
                        <td>
    {ele?.groupDetails?.name}
                    </td>
                    <td>{ele?.role}</td>
                        </tr>)
                   
                })}
                
                
            </tbody>
        </table>
    </div>

</>
  )
}

export default RolesList
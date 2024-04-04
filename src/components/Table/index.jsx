import { HiOutlineArrowDown } from "react-icons/hi";
import Pagination from "react-pagination-js";

const Table = ({ className='',data = [], columns = [],topHead=[], count = 50, total = 0, page = 1, result = (e) => { }, nodata = 'Data Not Found' }) => {

    const handlePaginate = (e) => {
        console.log("e", e)
        result({ event: 'page', value: e })
    }
    const view = (row) => {
        result({ event: 'row', row: row })
    }

    const headclick=(itm)=>{
        if(itm.sort){
            result({ event: 'sort', value: itm.key })
        }
    }

    return <>
    <div className={`${className}`}>
        {total ? <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        {topHead?.length?<>  
                        <tr className="bg-gray-200 border-b border-black">
                            {topHead.map((itm,i)=>{
                                return <>
                                <th scope="col" className={`px-6 py-3 text-center ${(topHead.length-1)==i?'':'border-r border-black'}`} colSpan={itm?.colSpan||0} key={i}>
                                        {itm.name}
                                    </th>
                                </>
                            })}
                        </tr>
                        </>:<></>}
                        <tr>
                            {columns.map(itm => {
                                return <>
                                    <th scope="col" className={`px-6 py-3 ${itm.sort?'cursor-pointer':''}`} onClick={()=>headclick(itm)} key={itm.key}>
                                        {itm.name} {itm.sort?<>
                                            <span className='ml-2'><HiOutlineArrowDown className="shrink-0 inline text-sm" /></span>
                                        </>:<></>}
                                    </th>
                                </>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((itm) => {
                            return <>
                                <tr onClick={() => view(itm)} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={itm.id}>
                                    {columns.map(citm => {
                                        return <>
                                            <td className="px-6 py-4">
                                                {citm.render(itm)||'--'}
                                            </td>
                                        </>
                                    })}
                                </tr>
                            </>
                        })}


                    </tbody>
                </table>
            </div>
        </> : <>

            <div className='p-4 text-center'>
                {nodata}
            </div>
        </>}


        {count < total ? <>
            <div className='paginationWrapper flex items-center justify-between mt-15'>
                        <span>Show {count} from {total} data</span>
                        <Pagination
                            currentPage={page}
                            totalSize={total}
                            sizePerPage={count}
                            changeCurrentPage={handlePaginate}
                        />
                    </div>
           
        </> : <></>}
        </div>
    </>
}

export default Table
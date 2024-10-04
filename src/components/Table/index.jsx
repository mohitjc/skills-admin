import React, { useState } from 'react';
import { HiOutlineArrowDown } from "react-icons/hi";
import Pagination from "react-pagination-js";

const Table = ({ className='',data = [], columns = [],topHead=[], count = 10, total = 0, page = 1, result = (e) => { }, nodata = 'Data Not Found' }) => {
    const [pageSize, setPageSize] = useState(count);
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
    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        result({ event: 'count', value: parseInt(e.target.value) });
    };
    const generateOptions = () => {
        const options = [];
        for (let i = 10; i <= total; i += 10) {
            options.push(i);
        }
        options.push(total); // Add total count as an option
        return options;
    };
    return <>
    <div className={`${className}`}>
        {total ? <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="border-b border-[#EAECF0] text-xs text-gray-700  capitalize bg-gray-50 ">
                        {topHead?.length?<>  
                        <tr className="border-b border-[#EAECF0]">
                            {topHead.map((itm,i)=>{
                                return <>
                                <th scope="col" className={`px-3.5 py-3 text-center capitalize ${(topHead.length-1)==i?'':'border-r border-black capitalize'}`} colSpan={itm?.colSpan||0} key={i}>
                                        {itm.name}
                                    </th>
                                </>
                            })}
                        </tr>
                        </>:<></>}
                        <tr>
                            {columns.map(itm => {
                                return <>
                                    <th scope="col" className={`px-3.5 py-3 capitalize ${itm.sort?'cursor-pointer':''}`} onClick={()=>headclick(itm)} key={itm.key}>
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
                                            <td className="!text-typo !border-l-0 cursor-pointer !px-3.5 text-sm font-normal !py-4 !border text-left border-[#EAECF0]">
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
            <div className='paginationWrapper mt-15'>
                        {/* <span>Show {count} from {total} data</span> */}
                        <p className="w-96 text-sm text-gray-500">Show{' '}
                                    <select value={pageSize} onChange={handlePageSizeChange} className="border rounded-md px-2 py-1">
                                        {/* Dynamically generated options */}
                                        {generateOptions().map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>{' '}
                                    from {total} data
                                </p>
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
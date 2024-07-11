import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FolderIcon from '@mui/icons-material/Folder';
import WorkIcon from '@mui/icons-material/Work';
import { LocationCity } from '@mui/icons-material';


const JobCard = ({ props, children, bg }) => {
    const [data, setData] = useState()
    const getProfile = async () => {
        try {
            const id = props.user
            const res = await fetch(`http://localhost:1616/api/companies/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className='bg-transparent p-4 rounded-lg flex flex-col gap-2.5'>
            <div className='flexBetween'>
                <h2 className='text-2xl font-semibold my-0'>
                    <Link to={`/jobs/${props._id}`}>{props.title}</Link>
                </h2>
                <time className="text-center text-[14px] text-slate-700 ">Posted On : {new Date(props.createdAt).toLocaleDateString()}</time>
            </div>

            <div className='flex items-center gap-4 '>
                <img src={data ? `${data.profilePic}` : `/profile.png`} className='w-[26px] rounded-full' />
                <h2 className='text-slate-800 font-normal text-sm my-0'>
                <Link to={data ? `/emp/${data._id}` : ""}>{data ? <>{data.cName}</> : <></>}</Link>
                </h2>
            </div>

            <div className='flexBetween flex-col md:flex-row gap-3 '>
                <div className='text-sm text-gray-800 flex flex-wrap gap-1 '>
                    <div className='mr-2 flex items-center gap-1 '><WorkIcon /> {props.type} </div>
                    /
                    <div className='mx-2 flex items-center gap-1'><FolderIcon /> {props.category}</div>
                    /
                    <div className='ml-2 flex items-center gap-1'><LocationCity /> Algeria, {props.state}, {props.mnplct}</div>
                </div>
                {children}
            </div>


        </div>
    )
}

export default JobCard
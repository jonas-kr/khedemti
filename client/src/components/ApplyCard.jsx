import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobdata } from '../controllers/JobController';


const ApplyCard = ({ props, children }) => {
    const [jb, setJb] = useState()
    const [cmp, setCmp] = useState()
    const jobId = props.job

    const handleJob = async (id) => {
        try {
            const data = await getJobdata(id)
            console.log(data);
            setJb(data[0])

        } catch (error) {
            console.log(error.mesasge)
        }
    }

    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:1616/api/companies/${props.company}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setCmp(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleJob(jobId)
        getProfile()

    }, [])
    return (
        <div className='bg-white p-4 rounded-lg flex flex-col gap-2.5'>
            <div className='flexBetween'>
                <h2 className='text-2xl font-semibold my-0'>
                    <Link to={`/jobs/${props.job}`}>{jb && jb.title}</Link>
                </h2>
                <time className="text-center text-[14px] text-slate-700 ">Applied On : {new Date(props.createdAt).toLocaleDateString()}</time>
            </div>


            <div className='flexBetween flex-col md:flex-row gap-3 '>
                <div className='flex items-center gap-4 '>
                    <img src={cmp ? `${cmp.profilePic}` : `/profile.png`} className='w-[26px] rounded-full' />
                    <h2 className='text-slate-800 font-normal text-sm my-0'>
                        <Link to={cmp && `/emp/${cmp._id}`} >{cmp ? <>{cmp.cName}</> : <></>}</Link>
                    </h2>
                </div>
                {children}
            </div>
        </div>
    )
}

export default ApplyCard
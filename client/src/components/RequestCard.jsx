import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getJobdata } from '../controllers/JobController';


const RequestCard = ({ props, children }) => {

    const [jb, setJb] = useState()
    const [wrkr, setWrkr] = useState()
    const jobId = props.job

    const handleJob = async (id) => {
        try {
            const data = await getJobdata(id)
            setJb(data[0])

        } catch (error) {
            console.log(error.mesasge)
        }
    }

    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:1616/api/workers/${props.worker}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setWrkr(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleJob(jobId)
        getProfile()
    }, [])
    return (
        <div className='bg-white py-4 rounded-lg flexBetween gap-2.5 w-full'>
            <div className='flexBetween items-start flex-col flex-1'>
                <h2 className='text-2xl font-semibold my-0'>
                    <Link to={`/jobs/${props.job}`}>{jb && jb.title}</Link>
                </h2>
                <time className="text-center text-[14px] text-slate-700 ">Applied On : {new Date(props.createdAt).toLocaleDateString()}</time>
            </div>


            <div className='flexBetween justify-start flex-col gap-3 flex-1'>
                <div className='flex items-center gap-4 '>
                    <Link to={wrkr ? `/wrkr/${wrkr._id}` : ""} className='flex items-center gap-4'>
                        <img src={wrkr ? `${wrkr.profilePic}` : `/profile.png`} className='w-[36px] rounded-full' />
                        <h2 className='text-slate-800 font-bold text-xl my-0'>{wrkr ? <>{wrkr.firstName} {wrkr.secondName}</> : <></>}</h2>
                    </Link>
                </div>
                <p className='text-center font-extralight'>" {props.desc} "</p>
                {children}
            </div>
        </div>)
}

export default RequestCard
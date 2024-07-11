import { LinkOffOutlined, LinkOutlined, Mail, Phone, WorkOutline } from "@mui/icons-material"
import { Link } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Profile = () => {

    const { id } = useParams()
    const [worker, setWorker] = useState()

    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:1616/api/Workers/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setWorker(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <main className="py-8">
            <section className="w-full md:w-5/6 mx-auto">
                <div className="pb-8">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-[130px] relative mb-12 rounded-2xl">
                        <img src={worker && `${worker.profilePic}`}
                            className=" w-[90px] absolute top-[70px] left-8 rounded-full bg-white" />
                    </div >
                    <div className="flex flex-col pl-8">
                        <h2 className="font-bold text-3xl">{worker ? worker.firstName : <></>} {worker ? worker.secondName : <></>}</h2>
                        <span className="text-xs font-extralight">{worker ? worker.state : <></>}, {worker ? worker.mnplct : <></>}</span>
                    </div>
                </div>
                <div className="flex items-start flex-col md:flex-row gap-4">
                    <div className="w-full md:w-3/4 bg-slate-50 p-6 py-8 rounded-2xl">
                        <h3 className="text-2xl font-semibold mb-2">Short Bio</h3>
                        <p className="mb-2">{worker ? worker.bio : <></>} </p>
                        <h3 className="text-2xl font-semibold my-6">Skills</h3>
                         <div className='w-full my-4 flex justify-center gap-2 flex-wrap'>
                            {worker ? worker.skills.map(s => (<span key={s} className='px-6 py-2 rounded-2xl
           text-white text-lg bg-[#7169a5]'>{s}</span>)) : <></>}
                        </div>
                    </div>
                    <div className="w-2/6 bg-slate-50 p-6 py-8 rounded-2xl flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Mail />
                            <div>
                                <h3>{worker ? worker.email : <></>}</h3>
                                <span>Contact Email</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <WorkOutline />
                            <div>
                                <h3><a href={worker ? `http://${worker.cvUrl}` : <></>} target="_blank" rel="noopener noreferrer">My Cv Here</a></h3>
                                <span>Curiculium vitae</span>
                            </div>
                        </div>
                        {/*                         <div className="flex items-center gap-3">
                            <Phone />
                            <div>
                                <h3>+213 554265298</h3>
                                <span>Contact Email</span>
                            </div>
                        </div> */}
                        <div className="flex items-center gap-3">
                            <LinkOutlined />
                            <div>
                                <h3><a href={worker ? `http://${worker.portfolioUrl}` : <></>} target="_blank" rel="noopener noreferrer">{worker ? worker.portfolioUrl : <></>}</a></h3>
                                <span>Portfolio</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Profile
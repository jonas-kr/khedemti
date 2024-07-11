import { Mail, Phone, WorkOutline } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getCompanyjobs } from "../../controllers/CompaniesController"
import JobCard from "../../components/JobCard"


const Profile = () => {

    const { id } = useParams()
    const [company, setCompany] = useState()
    const [cmpjob, setCmpjob] = useState([])
    const [loading, setLoading] = useState(true)


    const getProfile = async () => {
        try {
            const res = await fetch(`http://localhost:1616/api/companies/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            setCompany(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(async () => {
            getProfile()
            const jobs = await fetch(`http://localhost:1616/api/jobs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await jobs.json()
            setCmpjob(data)
        }, 500);
    }, [id])

    return (
        <main className="py-8 px-2 md:px-0">
            {company ? <>
                <section className="md:w-5/6 mx-auto">
                <div className="pb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-[130px] relative mb-12 rounded-2xl">
                        <img src={company && `${company.profilePic}` }
                            className=" w-[90px] absolute top-[70px] left-8 rounded-full bg-white" />
                    </div >
                    <div className="flex flex-col pl-8">
                        <h2 className="font-bold text-3xl">{company ? company.cName : <></>}</h2>
                        <span className="text-xs font-extralight">{company ? company.state : <></>}, {company ? company.mnplct : <></>}</span>
                    </div>
                </div>
                <div className="flex items-start flex-col md:flex-row gap-4">
                    <div className="w-full md:w-3/4 bg-slate-50 p-6 py-8 rounded-2xl">
                        {company ? <div className="w-full">                  
                              <h3 className="text-2xl font-semibold mb-2">Short Bio</h3>
                            <p className="mb-2">
                                {company.bio}
                            </p></div> : <></>}
                        <h3 className="text-2xl font-semibold my-6">Shared Jobs</h3>

                        <div className="grid grid-cols-1 gap-4 border-t-[1px] border-slate-500">
                            {cmpjob.length ?
                                (cmpjob.map((j) => {

                                    if (j.user == company._id) {
                                        return (<div key={j._id} className="border-b-[1px] border-slate-500">
                                            <JobCard props={j}>
                                                <Link to={`/jobs/${j._id}`}>
                                                    <span className=' px-8 py-1.5 
                            rounded-md bg-slate-600 text-white '>View Job</span>
                                                </Link>
                                            </JobCard>
                                        </div>)
                                    }

                                })) : <span className="text-center w-full">No Jobs to Show</span>}

                        </div>
                    </div>
                    <div className="w-full md:w-2/6 bg-slate-50 p-6 py-8 rounded-2xl flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <Mail />
                            <div>
                                <h3>{company ? company.email : <></>}</h3>
                                <span>Contact Email</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <WorkOutline />
                            <div>
                                <h3>{company ? company.nich : <></>}</h3>
                                <span>Job Functions</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone />
                            <div>
                                <h3>+213 {company ? company.contactNmbr : <></>}</h3>
                                <span>Contact Email</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </>
            
        :<span>There is no Company Under This Id</span>}

        </main>
    )
}

export default Profile
import { useEffect, useState } from "react"
import { getCompanydata, getCompanyjobs } from "../../controllers/CompaniesController"
import JobCard from "../../components/JobCard"
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { deleteJob } from "../../controllers/JobController";
import { Link } from "react-router-dom";
import { getWorkerData } from "../../controllers/WorkersController";
import ApplyCard from "../../components/ApplyCard";


const Dashboard = () => {
  document.title = 'Dashboard'

  const [wrkr, setWrkr] = useState([])
  const [loading, setLoading] = useState(true)
  const [applies, setApplies] = useState([])

  const getApplies = async () => {
    const res = await fetch(`http://localhost:1616/api/workers/appliesW`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await res.json()
    setApplies(data)
    if (!res.ok) {
      throw Error(data.error)
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await getWorkerData(localStorage.getItem('email'))
        setWrkr(res[0])
        await getApplies()
        setLoading(false)
      } catch (error) {
        console.log(error.message)
      }

    }, 1000)
  }, [])



  return (
    <section className='flex justify-center items-start flex-col sm:flex-row gap-6 p-2
     md:p-8 bg-[#D9D9D9] '>
      {loading ? <>
        <span className="animate-spin mx-auto text-slate-900 py-40"><HourglassBottomIcon fontSize="large" /></span>
      </> :
        <>
          <div className=" bg-white sm:w-[40%] shadow-md md:w-[33%] p-6 rounded-lg ">
            <div className="flexCenter flex-col">
              <img src={wrkr.profilePic} alt='Profile Pic'
                className="w-[85%] rounded-full bg-slate-400" />
              <h2 className="text-center mt-4 mb-2 text-2xl font-semibold ">
                {`${wrkr.secondName} ${wrkr.firstName}`}
              </h2>
              <span className="text-lg flexCenter flex-col">
                <p className="font-medium">My Portfolio</p>
                <a href={`http://${wrkr.portfolioUrl}`}
                  target="_blank" className="underline"> {wrkr.portfolioUrl}</a></span>

              <p className="font-medium w-full"><a href={`${wrkr.cvUrl}`}
                target="_blank" className="btn rounded-md flexCenter w-full "> My Cv</a></p>

            </div>
            <div className="h-[1px] bg-slate-700 rounded-4xl my-3"></div>
            <div className="mb-2">
              <h3 className="text-xl text-left mb-2 font-medium">About me</h3>
              <p className="text-center text-lg font-light">
                {wrkr.bio}
              </p>
            </div>

            <div className="mb-2">
              <h3 className="text-xl text-left mb-2 font-medium">Location</h3>
              <p className="text-center text-lg ">Algeria,  {wrkr.state},  {wrkr.mnplct}</p>
            </div>
            <div className="mb-2">
              {wrkr.education && <><h3 className="text-xl text-left mb-2 font-medium">Education</h3>
                <p className="text-center text-lg ">I have a <span className="font-semibold">{wrkr.education}</span> Degree</p></>}
            </div>
            <div className="mb-2">
              <h3 className="text-xl text-left mb-2 font-medium">My skills</h3>
              <div className='w-full my-4 flex justify-center gap-2 flex-wrap'>
                {wrkr.skills && wrkr.skills.map(s => (<span key={s} className='px-6 py-2 rounded-md
           text-white text-lg bg-[#7169a5]'>{s}</span>))}
              </div>
            </div>
            <div className="mt-16 flex justify-end items-end">
              <button className="bg-[#FF6A1E] px-4 py-2 rounded-lg w-1/2
               text-white font-medium">
                <Link to="/wrk/update" state={{ wrkr }}>
                  Update
                </Link>
              </button>
            </div>
          </div>

          <div className="bg-white sm:w-[60%] md:w-[67%] shadow-md rounded-lg p-3 lg:p-8 ">
            <h2 className="text-2xl font-semibold mb-6">Jobs Applied For</h2>
            <div className="grid grid-cols-1 gap-4 border-t-[1px] border-slate-500">
              {applies.length ? (
                applies.map((a) => {
                  if (a.status !== "Refused") {
                    if (a.status === "Waiting") {
                      return <div key={a._id} className="border-b-[1px] border-slate-500">
                        <ApplyCard props={a}>
                          <div className="bg-orange-600 px-4 py-2 text-white rounded-md">
                            Status : Waiting
                          </div>
                        </ApplyCard>
                      </div>
                    } else
                      if (a.status === "Accepted") {
                        return <div key={a._id} className="border-b-[1px] border-slate-500">
                          <ApplyCard props={a}>
                            <div className="bg-green-600 px-4 py-2 text-white rounded-md">
                              Status : Accepted
                            </div>
                          </ApplyCard>
                        </div>
                      }
                  }
                }
                )
              ): <span className="mx-auto">There is No Applies</span>
              }
            </div>
          </div>

        </>
      }

    </section>
  )
}

export default Dashboard
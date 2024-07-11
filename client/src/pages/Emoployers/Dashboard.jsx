import { useEffect, useState } from "react"
import { getCompanydata, getCompanyjobs } from "../../controllers/CompaniesController"
import JobCard from "../../components/JobCard"
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { deleteJob } from "../../controllers/JobController";
import { Link } from "react-router-dom";
import Requests from "./Requests";


const Dashboard = () => {
  document.title = 'Dashboard'

  const [cmp, setCmp] = useState([])
  const [cmpjob, setCmpjob] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState("Shared")


  const handleDelete = async (_id) => {
    if (confirm("Are You sure wanna delete the Job")
    ) {
      try {
        const data = await deleteJob(_id)
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      try {
        const res = await getCompanydata(localStorage.getItem('email'))
        const jobs = await getCompanyjobs()
        setCmpjob(jobs)
        setCmp(res[0])

      } catch (error) {
        console.log(error.message)
      }
      setLoading(false)

    }, 1000)
  }, [handleDelete])


  return (
    <section className='flex justify-center items-start flex-col sm:flex-row gap-6 p-4
     md:p-8 bg-[#D9D9D9] '>
      {loading ? <>
        <span className="animate-spin mx-auto text-slate-900 py-40"><HourglassBottomIcon fontSize="large" /></span>
      </> :
        <>
          <div className=" bg-white sm:w-[40%] shadow-md md:w-[33%] p-6 rounded-lg ">
            <div className="flexCenter flex-col">
              <img src={cmp.profilePic} alt='Profile Pic'
                className="w-[85%] rounded-full bg-slate-400" />
              <h2 className="text-center mt-4 mb-2 text-2xl font-semibold ">{cmp.cName}</h2>
              <span className="text-lg flexCenter flex-col">
                <p className="font-medium">Our Website :</p>
                <a href={`http://${cmp.cUrl}`}
                  target="_blank" className="underline"> {cmp.cUrl}</a></span>
            </div>
            <div className="h-[1px] bg-slate-700 rounded-4xl my-6"></div>
            <div>
              <h3 className="text-xl text-left my-2 font-medium">About us</h3>
              <p className="text-center text-lg font-light">{cmp.bio}</p>
            </div>
            <div>
              <h3 className="text-xl text-left my-2 font-medium">Contact Number</h3>
              <p className="text-center text-lg font-light">+213 {cmp.contactNmbr}</p>
            </div>
            <div>
              <h3 className="text-xl text-left my-2 font-medium">Location</h3>
              <p className="text-center text-lg ">Algeria,  {cmp.state},  {cmp.mnplct}</p>
            </div>
            <div className="mt-10 flex justify-end items-end">
              <button className="bg-[#FF6A1E] px-4 py-2 rounded-lg w-1/2
               text-white font-medium">
                <Link to="/emp/update" state={{ cmp }}>
                  Update
                </Link>
              </button>
            </div>
          </div>

          <div className="bg-white w-full md:w-[67%] shadow-md rounded-lg p-3 lg:p-8 ">
            <div className="flex gap-8">
              <h2 className=" text-2xl font-semibold mb-6  cursor-pointer"
                onClick={() => { setPage("Shared") }}
              >Shared Jobs</h2>
              <h2 className=" text-2xl font-semibold mb-6  cursor-pointer"
                onClick={() => { setPage(null) }}
              >Requests</h2>
            </div>

            {
              page ?
                <div className="grid grid-cols-1 gap-4 border-t-[1px] border-slate-500">
                  {cmpjob.length ?
                    cmpjob.map(j =>
                    (<div key={j._id} className="border-b-[1px] border-slate-500">
                      <JobCard props={j}>
                        <div className="text-white flex gap-2 font-medium">
                          <button className="bg-red-500 px-3 py-1 rounded-md"
                            onClick={() => { handleDelete(j._id) }}
                          >Delete</button>
                          <button className="bg-green-500 px-3 py-1 rounded-md">
                            <Link to={`/jobs/update`} state={{ j }}>
                              Update
                            </Link>
                          </button>
                        </div>
                      </JobCard>
                    </div>))

                    : <span className="text-center w-full">No Jobs to Show</span>
                  }

                </div> :
                <Requests />}
          </div>

        </>
      }

    </section>
  )
}

export default Dashboard
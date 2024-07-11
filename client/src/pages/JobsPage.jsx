import { useEffect, useState } from "react"
import { getAllJobs } from "../controllers/CompaniesController"
import JobCard from "../components/JobCard"
import { Link } from "react-router-dom"
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';



const JobsPage = () => {
    const [jobs, setJobs] = useState([])
    const [ctg, setCtg] = useState("all")
    const [state, setState] = useState("newest")
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setTimeout(async () => {
            const data = await getAllJobs()
            let newData = await data
            if (state === "oldest") {
                newData = data.reverse().slice(0, 4 * page)
            }
            if (ctg !== "all") {
                const filtered = newData.filter((item) =>
                    item.category.toLowerCase().includes(ctg)
                    // Assuming your data has a 'name' field to filter
                )
                setJobs(filtered.slice(0, 4 * page))
            } else {
                setJobs(newData.slice(0, 4 * page));
            }
            setLoading(false)
        }, 500)

    }, [ctg, state,page])
    document.title = "Available Jobs"
    let content
    if (loading) {
        content = <div className="flexCenter">
            <span className="animate-spin mx-auto text-slate-900 py-8"><HourglassBottomIcon fontSize="large" /></span>
        </div>

    } else {
        content = <div className="flex flex-col gap-4">
            {jobs.length ? (jobs.map(j =>
            (<div key={j._id} className="bg-white rounded-md">
                <JobCard props={j} >
                    <Link to={`/jobs/${j._id}`}>
                        <span className=' px-8 py-1.5 
                        rounded-md bg-slate-600 text-white '>View Job</span>
                    </Link>
                </JobCard>
            </div>))) : <span className="text-center">No Jobs to Show</span>
            }
            <button className="btn w-full bg-[#363062]"
                onClick={() => {
                    setPage(prevPage => prevPage + 1)
                }}
            >Load More</button>
        </div>
    }
    return (
        <section className="bg-[#D9D9D9]  flexCenter flex-col">
            <div className="w-full h-[350px] bg-[url('/jobspage.jpg')] bg-no-repeat bg-cover">
                <div className="bg-[url('/gradient.png')] bg-[rgba(54,48,98,0.85)] h-full flexCenter">
                    <h1 className=" text-center text-5xl md:text-[80px] font-bold text-white">Find Your Next Job!</h1>
                </div>
            </div>
            <div className='w-full lg:w-[840px] my-10 px-2'>
                <div className='flexBetween mb-4'>
                    <select className="py-3 px-4 text-lg
                     bg-white rounded-lg font-light cursor-pointer"
                        value={state}
                        onChange={(e) => {
                            setState(e.target.value)
                        }}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <select className="py-3 px-4 text-lg bg-white 
                    rounded-lg font-light cursor-pointer"
                        value={ctg}
                        onChange={(e) => {
                            setCtg(e.target.value)
                        }}
                    >
                        <option value="all">All</option>
                        <option value="developement">Developement</option>
                        <option value="marketing">Marketing</option>
                        <option value="education">Education</option>
                        <option value="communication">Communication</option>
                    </select>
                </div>
                <div className='rounded-lg'>
                    {content}
                </div>

            </div>
        </section>
    )
}

export default JobsPage
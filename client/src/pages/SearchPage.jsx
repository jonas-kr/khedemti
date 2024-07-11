import { useEffect, useState } from "react"
import { getAllJobs } from "../controllers/CompaniesController"
import JobCard from "../components/JobCard"
import { Link } from "react-router-dom"
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useLocation } from 'react-router-dom';


const JobsPage = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);

    const filterData = (searchTerm) => {
     
        return data.filter((item) => {
          // Customize this logic based on your data structure and search criteria
          // Example: Search by title and description
          const titleMatch = item.title.toLowerCase().includes(lowercaseTerm);
          const descriptionMatch = item.description?.toLowerCase()?.includes(lowercaseTerm);
          return titleMatch || descriptionMatch;
        });
      };

    useEffect(() => {
        setTimeout(async () => {
            const data = await getAllJobs()
            const searchTerm = new URLSearchParams(location.search).get('q');
            const lowercaseTerm = searchTerm.toLowerCase(); 
            const filtred = data.filter((item) =>
                item.title.toLowerCase().includes(lowercaseTerm)
            )
              setJobs(filtred)
            setLoading(false)
        }, 500)

    }, [page])
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
                    <h1 className="text-[80px] font-bold text-white">Find Your Next Job!</h1>
                </div>
            </div>
            <div className='w-full lg:w-[840px] my-10'>
            
                <div className='rounded-lg'>
                    {content}
                </div>

            </div>
        </section>
    )
}

export default JobsPage
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getJobdata } from "../controllers/JobController"
import HtmlRenderer from "../components/HtmlRender"
import { WorkerContext } from "../context/WorkerContext"
import { AddBusinessOutlined, BusinessCenter, BusinessCenterOutlined, Close, Email, ExitToAppOutlined, FolderCopyOutlined, FolderOff, Functions, HourglassBottom, House, MailLockTwoTone, MarkChatUnreadOutlined, Save, SaveAlt, SaveAs, SaveOutlined, SavingsRounded, VerifiedUser, Work, WorkspacePremium } from "@mui/icons-material"
import Folder from "@mui/icons-material/Folder"
import Profile from "./Workers/Profile"



const JobPage = () => {
  const { id } = useParams()
  const { worker } = useContext(WorkerContext)



  const [jb, setJb] = useState({})
  const [window, setWindow] = useState(false)
  const [desc, setDesc] = useState()
  const [company, setCompany] = useState()
  const [loading, setLoading] = useState(true)
  const [cmp, setCmp] = useState()
  const [err, setErr] = useState()

  const handleJob = async (id) => {
    try {
      const data = await getJobdata(id)
      setJb(data[0])
      const res = await fetch(`http://localhost:1616/api/companies/${data[0].user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data2 = await res.json()
      setCmp(data2)

    } catch (error) {
      console.log(error.mesasge)
    }
  }

  const handleApply = async (company, job, desc) => {
    setErr(null)
    if (!desc) {
      return alert("Please Enter a Description")
    }

    const info = JSON.stringify({ company, job, desc })

    try {
     const res =  await fetch('http://localhost:1616/api/workers/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          'Authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: info,
      })
     const data = await res.json()
     setErr(data.message)
    } catch (error) {
      console.log(error.message);
    }

  }

  useEffect(() => {
    setTimeout(async () => {
      await handleJob(id)
      document.title = jb.title
      setCompany(jb.user)
      setLoading(false)
    }, 100);
  }, [id, jb])

  return (
    <>
      <section className="pb-10 pt-2  px-2 md:px-20 ">
        <section >
          <Link to="/jobs">
            <input className='btn cursor-pointer w-[30%] rounded-md p-1' type="button" value="Back to Jobs Page" />
          </Link>
          <div className="rounded-md relative bg-gradient-to-r from-purple-500 to-pink-500 h-[130px]">
          </div>
          <img src={cmp && cmp.profilePic} className="w-20 h-20 bg-white rounded-[50%] absolute top-56 left-10 md:left-28" />
          <section className="flex items-end justify-between  ">
            <div>
              <h2 className="pt-10 text-3xl">{jb && jb.title}</h2>
              <h3 className="text-lg"><Link to={`/emp/${company}`}>{cmp && cmp.cName}</Link></h3>
              <div className="flex items-center text-sm">
                <p className="text-sm">{jb && jb.state}, {jb && jb.mnplct} </p>
                <time className="pl-4" datetime=""> {new Date(jb.createdAt).toLocaleDateString()} </time>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              {/*               <div className="flex items-center ">
                <input className='btn  px-6 text-black bg-gray-200 rounded-md p-1' type="button" value="Save" />
              </div> */}
              {worker &&
                <input className='btn px-14  bg-green-400 rounded-xl p-2 cursor-pointer'
                  type="button" value="Apply" onClick={() => { setWindow(true)
                    setErr(null)
                   }} />}
            </div>

          </section>
          {window &&

            <section className="absolute w-[700px] p-8 bg-slate-300 rounded-xl left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              {err && <p className="text-center text-black">{err}</p>}
              <div className="w-full flexBetween mb-4">
                <h2>Write something specializing you!</h2>
                <span className="text-2xl font-bold mb-4 cursor-pointer"
                  onClick={() => { setWindow(false) }}>X</span>
              </div>
              <textarea rows={6} className="w-full p-2 resize-none"
                value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>
              <input className='btn w-full mb-0 bg-green-400 rounded-xl p-2 
              cursor-pointer'
                type="button" value="Apply" onClick={() => { handleApply(company, id, desc) }} />
            </section>}

        </section>

        <section className="flex  gap-2 flex-col md:flex-row justify-between items-start pt-6 ">
          <div className="md:w-[68%]  p-8 bg-gray-50 rounded-md">
            <h2 className="pb-4">About the job</h2>

            {jb && <HtmlRenderer htmlString={jb.desc} />}
            {/*             <h2 className="pt-8 pb-2">Skills:</h2>
            <div className="">
              <ul className=" style-none flex justify-start gap-6">
                <li className="p-2 rounded-2xl bg-blue-200">Business</li>
                <li className="p-2 rounded-2xl bg-blue-200">Marketing</li>
                <li className="p-2 rounded-2xl bg-blue-200">Devlopment</li>
              </ul>

            </div> */}


          </div>

          <div className="bg-gray-100 w-full md:w-[30%] rounded-md md:ml-8 p-8">

            <div className="flex items-center gap-8 pt-8 pb-6">
              <Folder />
              <div className="">
                <h3 className="text-[16px]">{cmp && cmp.nich}</h3>
                <span className=" font-thin">Industry</span>
              </div>
            </div>

            <div className="flex items-center gap-8 pb-6 ">
              <BusinessCenter />
              <div>
                <h3 className="text-[16px]">{jb && jb.type}</h3>
                <span className=" font-thin">Employment type</span>
              </div>
            </div>
            <div className="flex items-center gap-8 pb-6 ">
              <WorkspacePremium />
              <div>
                <h3 className="text-[16px]">{jb && jb.category}</h3>
                <span className=" font-thin">Job functions</span>
              </div>
            </div>
            <div className="flex items-center gap-8 pb-6 ">
              <Email />
              <div>
                <h3 className="text-[16px]">{cmp && cmp.email}</h3>
                <span className=" font-thin">Contact e-mail</span>
              </div>
            </div>
          </div>

        </section>
      </section>




    </>















    /* <section className="flexCenter py-6">
    {!loading ? <>
      {!jb ?
        <h1 className="text-4xl text-center py-8 flexCenter">
          There Is no Job with This Id</h1> :
        <div className="w-[900px]">
          <h1 className="mb-4">{jb.title}</h1>
          <article className="prose">
            <HtmlRenderer htmlString={jb.desc} />
          </article>
          {worker && <button className="btn rounded-lg"
            onClick={() => { setWindow(!window) }}>Apply for This Job</button>}
          {window && <>
            <div className="absolute w-[900px] left-[50%] top-[50%] translate-x-[-50%]
          translate-y-[-50%] bg-[#D9D9D9] p-8 rounded-md flexCenter flex-col">
              <div className="w-full flexBetween mb-4">
                <h2 className="mb-4 inline-block">Write a letter</h2>
                <Close fontSize="large" onClick={() => { setWindow(!window) }} className="cursor-pointer" />
              </div>
              <textarea className="w-full resize-none rounded-md p-2 text-lg"
                value={desc} onChange={(e) => setDesc(e.target.value)}
                cols="40" rows="5" placeholder="Write something"></textarea>
              <button className="btn bg-[#363062]"
                onClick={() => {
                  setCompany(jb.user)
                  handleApply(company, id, desc)
                }}
              >Submit</button>
            </div>
          </>}
        </div>
      }
    </> :
      <span className="animate-spin mx-auto text-slate-900 py-40"><HourglassBottom fontSize="large" /></span>
    }
  </section> */
  )
}

export default JobPage
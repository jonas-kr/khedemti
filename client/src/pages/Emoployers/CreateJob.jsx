import { useState } from "react"
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { createJob } from "../../controllers/JobController"
import { useNavigate } from "react-router-dom"
import Error from "../../components/Error"
import { statesOfAlgeria } from "../../data"

const CreateJob = () => {
  document.title = "Create Job"
  const [title, setTitle] = useState()
  const [ctg, setCtg] = useState()
  const [desc, setDesc] = useState()
  const [type, setType] = useState()
  const [statee, setState] = useState()
  const [mnplct, setMnplct] = useState()



  const [err, setErr] = useState()
  const navigate = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await createJob(title, ctg, desc, type, statee, mnplct)
      navigate('/emp/dash')
    } catch (error) {
      setErr(error.message)
    }
  }


  return (
    <section className="bg-[#D9D9D9] flexCenter flex-col px-2 md:px-0 py-8">
      <h2 className="text-4xl text-slate-900 font-bold mb-6">Create a New Job</h2>
      {err && <Error error={err} />
      }
      <form className="bg-white flexCenter flex-col shadow-md
       w-full md:w-[800px] p-6 gap-4 rounded-xl">
        <div className="flex flex-col w-full gap-1">
          <h3 className="text-lg font-medium">Job Title</h3>
          <input type="text" placeholder="Job title" className="input" value={title}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex gap-4 w-full">

            <div className="flex flex-col w-full">
              <h3 className="text-lg font-medium">Category</h3>
              <select className="p-3 text-lg rounded-md font-light w-full"
                value={ctg}
                onChange={(e) => {
                  setCtg(e.target.value)
                }}
              >
                <option value="Uncategorized">Uncategorized</option>
                <option value="Developement">Developement</option>
                <option value="Marketing">Marketing</option>
                <option value="Education">Education</option>
                <option value="Communication">Communication</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <h3 className="text-lg font-medium">Type of Job</h3>
              <select className="p-3 text-lg rounded-md font-light w-full"
                value={type}
                onChange={(e) => {
                  setType(e.target.value)
                }}
              >
                <option >Uncategorized</option>
                <option value="Full time">Full time</option>
                <option value="Freelance">freelance</option>
              </select>
            </div>

          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-medium">State</h3>
            <select className="p-3 text-lg rounded-md font-light w-full"
              value={statee}
              onChange={(e) => {
                setState(e.target.value)
              }}
            >
              <option>State</option>
              {statesOfAlgeria && statesOfAlgeria.map((s) => <option value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-lg font-medium">Commune</h3>
            <input type="text" className='input w-full'
              placeholder='Commune' value={mnplct}
              onChange={(e) => {
                setMnplct(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="flex flex-col w-full gap-1">
          <h3 className="text-lg font-medium">Description</h3>
          <ReactQuill className="h-[200px] w-full mb-16" theme="snow"
            value={desc}
            onChange={setDesc}
          />
        </div>

        <button className="btn rounded-md"
          onClick={handleCreate}
        >Submit</button>
      </form>
    </section>
  )
}

export default CreateJob
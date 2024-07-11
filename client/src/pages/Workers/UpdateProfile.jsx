import { useEffect, useState } from 'react'
import { uploadImage } from '../../controllers/uploadImage'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateWorker } from '../../controllers/WorkersController'
import { statesOfAlgeria } from '../../data'
import axios from 'axios'


const UpdateProfile = () => {
  document.title = "Update Profile"
  const { state } = useLocation()
  const [image, setImage] = useState()
  const [cv, setCv] = useState()

  const navigate = useNavigate()
  const [bio, setBio] = useState(state.wrkr.bio)
  const [url, setUrl] = useState(state.wrkr.profilePic)
  const [statee, setState] = useState(state.wrkr.state)
  const [mnplct, setMnplct] = useState(state.wrkr.mnplct)
  const [cvUrl, setCvUrl] = useState(state.wrkr.cvUrl)
  const [portfolioUrl, setPortfolioUrl] = useState(state.wrkr.portfolioUrl)
  const [education, setEducation] = useState(state.wrkr.education)
  const [skills, setSkills] = useState(state.wrkr.skills)
  const [skill, setSkill] = useState("")



  const handleUpload = async (e) => {
    e.preventDefault()
/*     const ex = getFileExtension(image.name)
    if (ex != "jpg" || ex != "png" || ex != "jpeg") {
      return alert("Image format is not valid")
    } */
    const res = await uploadImage(image)
    alert("Upload done")
    setUrl(res)
  }

  const handleUpdate = async (e) => {
    if (skills.length > 5) {
      return alert("Only 5 Skills at max")
    }
    const data = await updateWorker(bio, url, cvUrl, portfolioUrl, education, skills, statee, mnplct)
    navigate('/wrk/dash')
  }
  function getFileExtension(filename) {
    return filename.split('.').pop()
  }
  const uploadCv = async (e) => {
    e.preventDefault()
    if (getFileExtension(cv.name) != "pdf") {
      return alert("Please add a pdf")
    }
    const dataForm = new FormData()
    dataForm.append('file', cv)
    const res = await axios.post('http://localhost:1616/api/uploadCv', dataForm)
    const data = res.data.cv
    console.log(data.url);
    const url = `http://localhost:1616/cv/${data.url}`
    setCvUrl(url)
    alert('Your Cv Is Uploaded')
  }
  useEffect(() => { }, [skill, skills, setSkills])
  return (
    <section className='flex flex-col gap-4 py-10 px-2 bg-[#D9D9D9]'>
      <div className='mx-auto w-full md:w-[800px] flex justify-end items-center flex-col p-4 rounded-lg bg-white'>
        <div className='flexBetween items-end flex-wrap w-full gap-4'>
          <div className='flexCenter flex-col w-full'>
            <p className='text-xl font-semibold my-2'>Profile Picture</p>
            {url && <img src={url} alt='Profile Pic'
              className="rounded-full bg-slate-500 w-[72px]" />}
            <input type="file" onChange={(e) => {
              setImage(e.target.files[0])
              console.log(image)
            }} />
            <button className='btn rounded-md bg-[#363062]'
              onClick={(e) => { handleUpload(e) }}>Upload Picture</button>
          </div>

          <div className='flexCenter flex-col w-full'>
            <p className='text-xl font-semibold my-2'>Upload your Cv here</p>

            <input type="file" onChange={(e) => {
              setCv(e.target.files[0])
            }} />
            <button className='btn rounded-md' onClick={uploadCv}>UploadCV</button>
          </div>

        </div>

        <p className='text-xl font-semibold my-4'>Your Bio</p>
        <textarea cols="30" rows="5" placeholder='Write Your Bio Here'
          className='input resize-none'
          value={bio} onChange={(e) => { setBio(e.target.value) }}
        />
        <p className='text-xl font-semibold my-4'>Your Location</p>

        <div className='flex w-full gap-4'>
          <select className="p-3 text-lg rounded-md font-light w-full"
            value={statee}
            onChange={(e) => {
              setState(e.target.value)
            }}
          >
            <option>State</option>
            {statesOfAlgeria && statesOfAlgeria.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input type="text" className='input w-full'
            placeholder='Commune' value={mnplct}
            onChange={(e) => {
              setMnplct(e.target.value)
            }}
          />
        </div>
        <p className='text-xl font-semibold my-4'>Education and Portfolio Url</p>
        <div className='flex w-full gap-4'>
          <select className="p-3 text-lg rounded-md font-light w-full"
            value={education}
            onChange={(e) => {
              setEducation(e.target.value)
            }}
          >
            <option>Education</option>
            <option value="Master">Master</option>
            <option value="Licence">Licence</option>
            <option value="Bachelor">Bachelor</option>
          </select>

          <input type="text" className='input w-full'
            placeholder='Portfolio Url' value={portfolioUrl}
            onChange={(e) => {
              setPortfolioUrl(e.target.value)
            }}
          />
        </div>
        <p className='text-xl font-semibold my-4'>Skills</p>
        <div className='w-full my-4 flex gap-2 flex-wrap justify-center'>
          {skills && skills.map(s => (<span key={s} className='px-6 py-2 rounded-md
           text-white text-lg bg-[#363062] cursor-pointer'
            onClick={(e) => {
              setSkills(skills.filter((el) => el != e.target.textContent))
            }}
          >{s}</span>))}
        </div>
        <div className='flex w-full gap-4'>
          <input className='input w-full'
            placeholder='Add a skill'
            type="text" value={skill} onChange={(e) => setSkill(e.target.value)} />
        </div>

        <div className='w-full flex gap-2'>
          <button className='btn w-full bg-[#363062] rounded-md cursor-pointer' onClick={() => {
            if (skills.length < 5) {
              setSkills([...skills, skill]);
              setSkill("")
            } else {
              alert("Only 5 skills is possible")
            }

          }}>Add</button>
          {/* <button className='btn w-full bg-red-600 rounded-md' onClick={async () => {
            skills.pop()
            setSkills(skills)
          }}>Delete</button> */}
        </div>

        <button onClick={handleUpdate}
          className='btn rounded-md mt-6'
        >Update Profile</button>
      </div>
    </section>
  )
}

export default UpdateProfile
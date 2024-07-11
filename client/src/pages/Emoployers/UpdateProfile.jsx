import { useState } from 'react'
import { uploadImage } from '../../controllers/uploadImage'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateCompany } from '../../controllers/CompaniesController'
import { statesOfAlgeria } from '../../data'
import Error from '../../components/Error'



const UpdateProfile = () => {
  document.title = "Update Profile"
  const { state } = useLocation()
  const [image, setImage] = useState()

  const navigate = useNavigate()
  const [bio, setBio] = useState(state.cmp.bio)
  const [url, setUrl] = useState(state.cmp.profilePic)
  const [statee, setState] = useState(state.cmp.state)
  const [mnplct, setMnplct] = useState(state.cmp.mnplct)
  const [contactNmbr, setContactNmbr] = useState(state.cmp.contactNmbr)
  const [nich, setNich] = useState(state.cmp.nich)

  const [error, setError] = useState(null)





  const handleUpload = async (e) => {
    e.preventDefault()
    const res = await uploadImage(image)
    alert("Upload done")
    setUrl(res)
  }
  const handleUpdate = async () => {
    try {
      if (bio.length > 200) {
        alert('Bio is longer than 250character')
      } else {
        const data = await updateCompany(bio, url, statee, mnplct, nich, contactNmbr)
        navigate('/emp/dash')
      }
    } catch (error) {
      setError(error.message)
      console.log(error.message)

    }
  }

  return (
    <section className='flex flex-col gap-4 py-10 bg-[#D9D9D9]'>
      <div className='mx-auto w-[800px] flexCenter flex-col p-4 rounded-lg bg-white'>
        {error && <Error error={error} />}

        <p className='text-xl font-semibold my-2'>Profile Picture</p>
        {url && <img src={url} alt='Profile Pic'
          className="rounded-full bg-slate-500 w-[72px]" />}
        <input type="file" onChange={(e) => {
          setImage(e.target.files[0])
        }} />
        <button className='btn rounded-md bg-[#363062]' 
        onClick={(e) => { handleUpload(e) }}>Upload Picture</button>
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
        <p className='text-xl font-semibold my-4'>Nich And Contact Number</p>

        <div className='flex w-full gap-4'>
          <select className="p-3 text-lg rounded-md font-light w-full"
            value={nich}
            onChange={(e) => {
              setNich(e.target.value)
            }}
          >
            <option>Nich</option>
            <option value="Developement">Developement</option>
            <option value="Marketing">Marketing</option>
            <option value="Education">Education</option>
            <option value="Communication">Communication</option>
          </select>

          <input type="number" className='input w-full'
            placeholder='Contact Number' value={contactNmbr}
            onChange={(e) => {
              setContactNmbr(e.target.value)
            }}
          />
        </div>
        <button onClick={handleUpdate}
          className='btn rounded-md mt-6'
        >Update Profile</button>
      </div>
    </section>
  )
}

export default UpdateProfile
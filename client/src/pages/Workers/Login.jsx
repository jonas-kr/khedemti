import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Error from '../../components/Error'
import { useContext } from 'react'
import { WorkerContext } from '../../context/WorkerContext'
import { login } from '../../controllers/WorkersController'

const Login = () => {
  document.title = "Workers Login"

  const { worker,setWorker } = useContext(WorkerContext)


  const navigate = useNavigate()
  const [error, setError] = useState(null)


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await login(email, password)
      //setting the state
      setWorker(res.secondName)
      //navigation
      navigate('/wrk/dash')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className='bg-[#F5E8C7] flexCenter flex-col py-20'>
      <h2 className='text-[#363062] text-4xl font-medium mb-8'>
        Login And start applying </h2>
      <div className='bg-white p-10 rounded-xl w-[500px] shadow-md flexCenter flex-col'>
        <p className='text-xl text-center font-thin mb-4'>Don’t have an Account?
          <Link to="/emp/register" className='font-semibold text-[#363062]'>
            Register</Link>
        </p>
        {error && <Error error={error} />}
        <form className='flex flex-col mt-4 w-full' onSubmit={handleLogin}>
          <input type="email" placeholder='Email' className='input'
            value={email}
            onChange={(e => setEmail(e.target.value))}
          />
          <input type="password" placeholder='Password' className='input mt-4'
            value={password}
            onChange={(e => setPassword(e.target.value))}
          />

          <button className='btn mt-4 rounded-md'>LogIn Now</button>
        </form>
      </div>
    </section>
  )
}

export default Login
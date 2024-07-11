import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Error from '../../components/Error'
import { useContext } from 'react'
import { register } from '../../controllers/WorkersController'
import { WorkerContext } from '../../context/WorkerContext'



const Register = () => {
    document.title = "Workers Register"
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const { worker, setWorker } = useContext(WorkerContext)

    const [check, setCheck] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")

    const handleRegister = async (e) => {
        setError(null)
        e.preventDefault()
        try {
            if (check === true) {
                await register(email, password, firstName, secondName)
                //setting the state
                setWorker(secondName)
                //navigation
                navigate('/wrk/dash')
            } else {
                alert('please confirm')
            }
        } catch (error) {
            setError(error.message)
        }
    }
    function cfl(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <section className="bg-[#F5E8C7] flexCenter flex-col py-20">
            <h2 className="text-[#363062] text-4xl font-medium mb-8">
                Start Applying for Jobs by SigningUp!</h2>
            <div className="bg-white w-[700px] shadow-md p-10 rounded-xl flexCenter
            flex-col">

                <p className='text-xl text-center font-thin '>Already have an acount?
                    <Link to="/emp/login" className='font-semibold text-[#363062]'>
                        Login</Link>
                </p>
                {error && <Error error={error} />}

                <form className=" grid grid-cols-2 gap-3 mt-8 w-[100%]">
                    <input className="input"
                        type="text"
                        required
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e => setFirstName(cfl(e.target.value)))}
                    />
                    <input className="input"
                        type="url"
                        required
                        placeholder="Second Name"
                        value={secondName}
                        onChange={(e => setSecondName(cfl(e.target.value)))}
                    />

                    <input className="input"
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e => setEmail(e.target.value))}
                    />
                    <input className="input"
                        type="password"
                        required
                        placeholder="Password"
                        value={password}
                        onChange={(e => setPassword(e.target.value))}
                    />
                </form>
                <div className='mt-4 flex items-center'>
                    <input type="checkbox" className='mr-2'
                        onChange={(e) =>
                            setCheck(e.target.checked)}
                    />
                    <span>I accept all the rights</span>
                </div>
                <button className="btn rounded-md mt-4" onClick={handleRegister}>SignUp Now</button>
            </div>
        </section>)
}

export default Register
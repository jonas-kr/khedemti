import { useContext, useState } from 'react'
import { CompanyContext } from '../context/CompanyContext'
import { WorkerContext } from '../context/WorkerContext'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const [isopened, setIsopened] = useState(false)
    const { company, setCompany } = useContext(CompanyContext)
    const { worker, setWorker } = useContext(WorkerContext)


    const navigate = useNavigate()
    let content
    if (company) {
        content = <nav>
            <ul className="flex gap-[15px] text-black">
                <li className=''>
                    <Link to="/emp/dash">
                        <img src="/dash.png" className='h-[36px]' />
                    </Link>
                </li>
                <li className=''>
                    <Link to="/emp/create">
                        <img src="/create.png" className='h-[36px]' />
                    </Link>
                </li>
                <button onClick={() => {
                    localStorage.clear()
                    setCompany('')
                    navigate('/')
                }}>
                    <img src="/logout.png" className='h-[36px]' />
                </button>
            </ul>
        </nav>
    } else {
        content = <nav>
            <ul className="flex gap-[15px] text-white">
                <li className='bg-[#FF6A1E] flexCenter py-[6px] px-4 rounded-lg font-medium '>
                    <Link to="/emp/login">For Employers</Link>
                </li>
                <li className='text-black flexCenter border-[1.5px] border-black py-[6px] px-4 rounded-lg'>
                    <Link to="/login">Login</Link>
                </li>
                <li className='bg-[#363062] flexCenter py-[6px] px-5 rounded-lg'>
                    <Link to="/register">Sign Up</Link>
                </li>
            </ul>
        </nav>
    }
    if (worker) {
        content =
            <ul className="flex gap-[15px] text-black">
                <li className=''>
                    <Link to="/wrk/dash" >
                        <img src="/dash.png" className='h-[36px]' />
                    </Link>
                </li>
                <button onClick={() => {
                    localStorage.clear()
                    setWorker('')
                    navigate('/')
                }}>
                    <img src="/logout.png" className='h-[36px]' />
                </button>
            </ul>
    }
    return (
        <>
            <header className="flexBetween h-[65px] z-10
                px-[30px] lg:px-[80px] sticky top-0 bg-white shadow-md">
                <Link to="/">
                    <h1 className="flexCenter text-[25px] font-bold text-[#363062]">
                    KHEDEMTI</h1>
                </Link>
                <div className='md:flex hidden'>
                    {content}
                </div>
                <span className="md:hidden cursor-pointer" onClick={() => {
                    setIsopened(!isopened)
                }}>MENU</span>
            </header>
            {isopened && <div className='absolute z-10 w-full top-[65px] md:hidden '>
                {content}
            </div>}
        </>

    )
}

export default Header
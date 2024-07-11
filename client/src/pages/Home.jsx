import SearchIcon from '@mui/icons-material/Search';
import Card from '../components/Card';
import { cards } from '../data';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Home() {
    document.title = "Home"
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchTerm}`); // navigate to search route with query param
      };

    return (
        <>
            <section className='h-[100vh] bg-[url("/main.png")] '>
                <div className='h-full bg-[rgba(0,0,0,0.2)] flexCenter flex-col gap-8 px-2'>
                    <h1 className='text-center text-[35px] md:text-[58px] font-bold text-white leading-tight'>
                        {/* The #1 job     site to find <br />
                    remote jobs - no ads, scams, or junk. */}
                        The #1  job site to Find<br /> real   remote jobs. Skip scams & ads.
                    </h1>
                    <div className='w-full lg:w-[700px] bg-white p-1  rounded-md flexCenter'>
                        <input type="text" placeholder='Search By Job Title'
                            value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }}
                            className='px-2 py-1 w-[100%] outline-none text-2xl md:text-[26px]' />
                        <button onClick={handleSearch}
                        className='bg-[#FF6A1E] h-[100%] w-[55px] rounded-md flexCenter text-white'>
                            <SearchIcon fontSize='large' />
                        </button>
                    </div>
                    <h2 className='text-white text-center text-[30px] font-light'> Find your next flexible, hybrid, or work from home job</h2>
                    <button className='bg-[#FF6A1E] flexCenter py-[8px] px-5 rounded-xl font-medium text-xl text-white '>
                        <Link to="/jobs">                    Start Looking for offers!
                        </Link>
                    </button>
                </div>
            </section>
            <section className='flex flex-col md:flex-row px-3 md:px-[100px] py-28
             bg-[#D9D9D9]'>
                <div className='flex-1 flex flex-col justify-center text-left gap-6'>
                    <h3 className='text-3xl md:text-4xl font-medium text-[#363062] text-center 
                    md:text-left mb-4'>
                        Why Using Our Platform?
                    </h3>
                    <ul className="list-disc pl-6 text-xl font-thin flex flex-col gap-3">
                        <li>Advanced Matching Algorithm</li>
                        <li>User-Friendly Interface.</li>
                        <li>We see every job before you do</li>
                        <li>Comprehensive Candidate Profiles</li>
                        <li>Transparent Communication</li>
                        <li>Data Security Measures</li>
                    </ul>
                </div>
                <div className='bg-[url("/why.png")] bg-center w-full bg-no-repeat
                 flex-1 '
                ></div>
            </section>
            <section className='py-14 bg-[#435585] flexCenter flex-col gap-6'>
                <h3 className='text-4xl mb-4 font-medium text-center text-white'>Check jobs by category</h3>
                <div className='px-3 md:px-[30px] xl:px-[70px] w-full grid grid-cols-2 lg:grid-cols-5 gap-4'>
                    {cards && cards.map((card) => (
                        <Card key={card.id} props={card} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home
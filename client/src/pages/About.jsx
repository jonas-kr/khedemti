
const About = () => {
    return (
        <main>
            <section className=' h-[350px] bg-no-repeat bg-cover bg-[url("/jobspage.jpg")] '>
                <div className=" flexCenter bg-[rgba(31,30,42,0.87)] h-full  ">
                    <div>
                        <h1 className='text-white text-5xl text-center '>ABOUT  <span className='text-orange-600'>US</span></h1>
                        <p className='text-white text-center pt-1'><span className='text-orange-600'>Home</span> / About Us</p>
                        <p className='text-xl text-center text-white pt-5'> #Welcome to our recruitememnt platform,
                            where & Talent meets & Opportunity.<br />
                            Join us in shaping the future of recruitement. </p>
                    </div>
                </div>
            </section>
            <section className='p-20 flex gap-2'>
                <div className=' w-full'>
                    <h2 className='font-bold text-3xl text-[#363062]'>About Company</h2>
                    <p className='pt-6'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#Welcome to our
                        cuttig-edge <span className='text-orange-600'>recruitememnt platform</span>,
                        where talent meets opportunity. Our mission is to connect top-tier
                        candidates with leading organisatons. with innovate technology and
                        a commitment to excellence, we streamline the hiring process for
                        both employers and job seekers. <br />
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='text-orange-600'>Join us </span>
                        on our mission to revolutionize th way talent is discovered
                        and cultivated, shaping a future where every connection sparks meaningful growth and succes.</p>
                </div>
                <div className='w-full bg-cover bg-[url("/about.png")]'>
                </div>
            </section>
        </main>
    )
}

export default About
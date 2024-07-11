import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LanguageIcon from '@mui/icons-material/Language';

const Contact = () => {
  document.title = "Contact Us"

  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [sub, setSub] = useState()

  return (
    <div>
      <section className='h-[350px] bg-no-repeat bg-cover bg-[url("/contactUs.webp")] '>
        <div className=" pt-28 px-44 bg-[rgba(31,30,42,0.87)] h-full  ">
          <h1 className='text-white text-5xl  '>CONTACT  <span className='text-orange-600'>US</span></h1>
          <p className='text-white'><span className='text-orange-600'>Home</span> / Contact Us</p>
        </div>
      </section>


      <section className='grid grid-cols-2 py-20 w-[95%]'>
        <div className='px-20 flex flex-col gap-4'>
          <h2 className='text-4xl'>Get In <span className='text-orange-600'>Touch</span></h2>
          <p className='w-[90% ]'>Don't hesitate to <span className='text-orange-600'>get in touch</span> with us for any questions, <span className='text-orange-600'>feedback</span> or support you need.</p>
          <div className='grid grid-cols-2 gap-10 pt-8 h-[200px]'>
            <div className=' flex gap-4'>
              <PhoneInTalkIcon fontSize='large' />
              <div>
                <h3 className=' font-medium '>Phone Number</h3>
                <p className=' font-thin '>+44-555-866-764</p>
              </div>
            </div>

            <div className=' flex gap-4'>
              <MailOutlineIcon fontSize='large' />
              <div>
                <h3 className=' font-medium '>Email Address</h3>
                <p className=' font-thin '>recrutservice@gmail.com</p>
              </div>
            </div>

            <div className=' flex gap-4'>
              <LanguageIcon fontSize='large' />
              <div>
                <h3 className=' font-medium '>WebSites</h3>
                <p className=' font-thin '>www.recrut.com</p>
              </div>
            </div>

            <div className=' flex gap-4'>
              <LocationOnIcon fontSize='large' />
              <div>
                <h3 className=' font-medium '>Address</h3>
                <p className=' font-thin '>115 bvd Reghaia, TiziOuzou</p>
              </div>
            </div>

          </div>


        </div>

        <form className='grid gap-4 px-6' >
          <div className='grid grid-cols-2 gap-2'>
            <input className='input' placeholder='Your Name' type="text" />
            <input className='input ' placeholder='Your Email' type="email"
              value={email} onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>
          <input className='input ' placeholder='Your subject' type="text" />
          <textarea className='input resize-none' placeholder='Your message' name="your message" rows="3"></textarea>
          <input className='btn w-[30%] rounded-md' value="Submit" type="button" 
          />
        </form>

      </section>

    </div>


  )


}

export default Contact
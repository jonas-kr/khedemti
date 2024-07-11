import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className=" bg-gray-100 ">
            <h2 className="flexCenter text-[25px] pt-6 font-bold text-[#363062]">
                KHEDEMTI</h2>

            <ul className=" flexCenter flex gap-7 pt-6 flex-wrap "  >
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/emp/login">EMPLOYER</Link></li>
                <li><Link to="/login">COMPANY</Link></li>
                <li><Link to="/contact">CONTACT US</Link></li>
                <li><Link to="/about">ABOUT US</Link></li>
                <li><Link to="/about">USER PERMISSIONS</Link></li>
            </ul>

            <div className='flexCenter flex gap-7 py-6'>
                <FacebookIcon fontSize='large' />
                <InstagramIcon fontSize='large' />
                <MailOutlineIcon fontSize='large' />
            </div>

            <p className=" flexCenter font-extralight text-base py-2 bg-black text-white">
                All rights reserved for the author
            </p>

        </footer>)
}

export default Footer
import '../index.css'

import LandingBG from '../assets/LandingBG.png'
import logo from "../assets/logo.png"

import { NavLink } from 'react-router-dom'

function Landing() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='flex gap-10 justify-center items-center'>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-5 flex-col'>
                        <img src={logo} alt="logo" className='w-[600px]'/>
                        <p className='w-[500px] font-poppins font-semibold text-xl text-primary-main'>Sistem pendukung keputusan wisata anda menggunakan metode SAW</p>
                    </div>
                    <NavLink to='/sequences'>
                        <div className='w-[154px] h-10 flex justify-center items-center bg-primary-main rounded-3xl'>
                            <p className='font-poppins font-normal text-lg text-white'>Home</p>
                        </div>
                    </NavLink>
                </div>
                <img src={LandingBG} alt="Landing Background" />
            </div>
        </div>
    )
}

export default Landing
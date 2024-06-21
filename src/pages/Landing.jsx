import '../index.css'

import LandingBG from '../assets/LandingBG.png'

import { NavLink } from 'react-router-dom'

function Landing() {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='flex gap-80 justify-center items-center'>
                <div className='flex flex-col gap-10'>
                    <div className='flex gap-2 flex-col'>
                        <p className='font-poppins font-bold text-5xl'>Sistem <br /> Pendukung <br /> Keputusan <br /> Metode SAW</p>
                        <p className='font-poppins font-normal text-lg text-primary-main'>Berbasis Website</p>
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
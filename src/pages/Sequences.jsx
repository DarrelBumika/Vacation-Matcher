import Tahap1 from '../assets/tahap1.svg'
import Tahap2 from '../assets/tahap2.svg'
import Tahap3 from '../assets/tahap3.svg'

import { NavLink } from 'react-router-dom'

export default function Sequences() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col gap-10 items-center justify-center">
                <p className="font-poppins font-semibold text-2xl">Langkah Perhitungan SAW</p>

                <div className='flex relative'>
                    <div className="flex p-10 gap-10 bg-primary-light rounded-3xl">

                        <div className="w-[200px] h-[340px] flex items-center flex-col relative">
                            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white border border-primary-main absolute -translate-y-5">
                                <p className="font-poppins font-semibold text-base">1</p>
                            </div>
                            <div className="flex flex-col w-full h-full rounded-3xl overflow-hidden">
                                <div className="w-full h-[240px] flex justify-center items-center bg-primary-main">
                                    <img src={Tahap1} alt="tahap 1" />
                                </div>
                                <div className="w-full h-[100px] flex justify-center items-center bg-white">
                                    <p className='font-poppins font-normal text-sm text-center'>Menentukan data kriteria dan bobot</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-[200px] h-[340px] flex items-center flex-col relative">
                            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white border border-primary-main absolute -translate-y-5">
                                <p className="font-poppins font-semibold text-base">2</p>
                            </div>
                            <div className="flex flex-col w-full h-full rounded-3xl overflow-hidden">
                                <div className="w-full h-[240px] flex justify-center items-center bg-white">
                                    <img src={Tahap2} alt="tahap 1" />
                                </div>
                                <div className="w-full h-[100px] flex justify-center items-center bg-primary-main">
                                    <p className='font-poppins font-normal text-sm text-center text-white'>Mengisi data alternatif & kriteria</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-[200px] h-[340px] flex items-center flex-col relative">
                            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-white border border-primary-main absolute -translate-y-5">
                                <p className="font-poppins font-semibold text-base">3</p>
                            </div>
                            <div className="flex flex-col w-full h-full rounded-3xl overflow-hidden">
                                <div className="w-full h-[240px] flex justify-center items-center bg-primary-main">
                                    <img src={Tahap3} alt="tahap 1" />
                                </div>
                                <div className="w-full h-[100px] flex justify-center items-center bg-white">
                                    <p className='font-poppins font-normal text-sm text-center'>Menampilkan Hasil Perhitungan SAW</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='w-[760px] h-[420px] bg-primary-surface rounded-3xl absolute -z-50 translate-y-3 translate-x-3' />
                </div>

                <NavLink to='/process'>
                    <div className='w-[228px] h-10 flex justify-center items-center bg-primary-main rounded-3xl'>
                        <p className='font-poppins font-normal text-lg text-white'>Mulai Perhitungan</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
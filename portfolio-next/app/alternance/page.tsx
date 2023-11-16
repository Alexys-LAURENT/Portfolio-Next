import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getFromApi } from '../utils/getFromApi';
import { AlternanceType } from '../types/AlternanceType';
import Footer from '../components/Footer'
const page = async () => {
    const alternances: AlternanceType[] = await getFromApi('alternance');


    return (
        <>
            <div className=" w-full">

                {/* Start */}
                <div className="flex flex-col gap-16 items-center justify-center w-full h-[calc(100vh-60px)]">
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-textDark dark:text-textLight">Mon alternance</h1>
                    </div>
                    <div>
                        <Link href='#alternance-0'>
                            <button className="bg-btnColor px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all text-textLight">Découvrir</button>
                        </Link>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full flex flex-col items-center gap-24 mb-16">
                    {
                        alternances && alternances.length > 0 && alternances.map((item, index) => (
                            <div id={`alternance-${index}`} key={`alternance-${index}`} className='flex flex-col ps-5 pe-5 pb-5 md:pb-0 md:ps-2 md:pe-8 bg-white dark:bg-opacity-10 rounded-lg  w-full md:flex-row md:max-w-[80%]'>
                                <div className='w-full md:w-3/12 flex justify-center items-center'>
                                    <Image className='w-4/12 md:w-full aspect-square object-contain' src={item.img} alt="cd2ri" width={50} height={50} />
                                </div>
                                <div className='flex flex-col justify-center gap-5 w-full md:w-9/12'>
                                    <p className='w-full text-base mt-4 font-bold text-textDark dark:text-textLight'>{item.titre}</p>
                                    <p className='w-full text-sm mb-4 font-semibold text-textDark dark:text-textLight'>{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default page;
import React from 'react';
import Link from 'next/link';
import { getFromApi } from '../utils/getFromApi';
import { ProjetType } from '../types/ProjetType';
import ProjetsWrapper from '../components/ProjetsWrapper';
import Footer from '../components/Footer'

const page = async () => {
    const projets: ProjetType[] = await getFromApi('projets');
    console.log(projets);
    return (
        <>
            <div className=" w-full">

                {/* Start */}
                <div className="flex flex-col gap-16 items-center justify-center w-full h-[calc(100vh-60px)]">
                    <div className="flex flex-col items-center gap-5">
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-textDark dark:text-textLight">Mes projets</h1>
                    </div>
                    <div>
                        <Link href='#alternance-0'>
                            <button className="bg-btnColor px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all text-textLight">Découvrir</button>
                        </Link>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full">
                    {projets && projets.length > 0 && <ProjetsWrapper projets={projets} />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default page;
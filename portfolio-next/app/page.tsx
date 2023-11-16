
import TimeLine from "./components/TimeLine"
import { getFromApi } from "./utils/getFromApi"
import { AProposType } from "./types/AProposType"
import Footer from './components/Footer'
export default async function Home() {
  const age = Math.floor((new Date().getTime() - new Date(2003, 5, 12).getTime()) / 3.15576e+10)
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

  const APropos: AProposType = await getFromApi('a_propos')

  return (
    <>
      <div className=" w-full">

        {/* Start */}
        <div className="flex flex-col gap-16 items-center justify-center w-full h-[calc(100vh-60px)]">
          <div className="flex flex-col items-center gap-5">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-textDark dark:text-textLight">Alexys LAURENT</h1>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-textDark dark:text-textLight">{APropos && APropos.subTitle ? APropos.subTitle : ''}</h2>
          </div>
          <div>
            <button className="bg-btnColor px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all text-textLight">Qui suis-je ?</button>
          </div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col items-center gap-44 md:gap-96">

          {/* about */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-0 items-center w-full max-w-[1000px] ">

            <div className="w-full md:w-8/12">
              <p className="font-semibold text-base lg:text-xl text-justify lg:pe-0 text-textDark dark:text-textLight">
                {APropos.description && APropos.description.replace('$age', age.toString())}
              </p>
            </div>

            <div className="w-full md:w-4/12 flex justify-center md:justify-end">
              <button className="bg-btnColor text-sm lg:text-base px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all text-textLight">TÉLÉCHARGER MON CV</button>
            </div>

          </div>

          {/* Compétences */}
          <div className="flex flex-col gap-14 w-full items-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-textDark dark:text-textLight">Mes compétences</h3>
            <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-14 justify-center">

              {APropos.competences && APropos.competences.length > 0 && APropos.competences.map((item) =>
              (
                <div key={`compétence-${item}`} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 aspect-square rounded-md bg-white"></div>
                  <p className="text-center font-semibold text-xs md:text-base lg:text-lg text-textDark dark:text-textLight">{item.nom}</p>
                </div>
              ))}

            </div>
          </div>

          {/* Experiences */}
          <div className="flex flex-col gap-14 w-full items-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-textDark dark:text-textLight">Mes expériences</h3>
            {APropos.experiences && APropos.experiences.length > 0 && <TimeLine experiences={APropos.experiences} />}
          </div>


        </div>
      </div>
      <Footer />
    </>
  )
}

import PresentationCompetences from "../components/PresentationCompetences";
import PresentationExperiences from "../components/PresentationExperiences";
import PresentationTexts from "../components/PresentationTexts";
import { AProposType } from "../types/AProposType"

export default function Presentation({ APropos }: { APropos: AProposType }) {

    console.log(APropos)


    return (
        <div className="min-h-[calc(100vh-65px)] flex flex-col lg:flex-row gap-4">
            <div className="lg:min-h-[calc(100vh-65px)] lg:w-7/12 w-full flex lg:flex-col gap-4 min-h-[300px]">

                <PresentationTexts AproposSubTitle={APropos.subTitle} AproposDescription={APropos.description} />
                <PresentationExperiences experiences={APropos.experiences} />
            </div>
            <div className="w-full flex-1">
                <PresentationCompetences competences={APropos.competences} />
            </div>
        </div>
    )
}

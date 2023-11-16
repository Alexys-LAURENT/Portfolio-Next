export type AProposType = {
    subTitle: string,
    description: string,
    competences: CompétenceType[],
    experiences: ExperienceType[]
}

export type CompétenceType = {
    id: number,
    nom: string,
    img: string
}

export type ExperienceType = {
    id: number,
    titre: string,
    description: string
}
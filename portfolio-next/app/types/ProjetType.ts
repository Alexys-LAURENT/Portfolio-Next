export type ProjetType = {
    id: number
    titre: string
    description: string,
    type: string,
    stacks: string,
    githubLink?: string,
    images: ImageType[],
    technos: TechnoType[]
    competences: CompetenceProjetType[]
}

export type ImageType = {
    id: number,
    url: string,
    alt: string
}

export type TechnoType = {
    id: number,
    titre: string,
    libelle: string
}

export type CompetenceProjetType = {
    id: number,
    libelle: string
}
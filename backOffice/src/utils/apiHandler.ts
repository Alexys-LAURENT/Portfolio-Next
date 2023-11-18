import { CompetenceProjetType, TechnoType } from "../types/ProjetType"

type Entity = 'projets' | 'alternances' | 'competences' | 'competences_projets' | 'experiences' | 'technos_projets' | 'a_propos'

type updateDataType =
    // a_propos
    {
        "subTitle": string,
        "description": string,
    } |
    // alternance
    {
        "img": string,
        "titre": string,
        "description": string
    } |
    // competence
    {
        "nom": string,
        "img": string
    } |
    // competenceProjet
    {
        "libelle": string,
        "projets": string
    } |
    // experience
    {
        "titre": string,
        "description": string
    } |
    // projet
    {
        "titre": string,
        "description": string,
        "githubLink": string,
        "type": string,
        "stacks": string
    } |
    // technoProjet
    {
        "titre": string,
        "libelle": string,
        "projets": string
    }


export async function getFromApi(entity: Entity) {
    let url = '';
    switch (entity) {
        case 'a_propos':
            url = `${import.meta.env.VITE_API_URL}/a_propos/1`
            break;
        case 'alternances':
            url = `${import.meta.env.VITE_API_URL}/alternances`
            break;
        case 'projets':
            url = `${import.meta.env.VITE_API_URL}/projets`
            break;
    }

    const result = await fetch(url, {
        headers: {
            'Accept': 'application/ld+json'
        }
    })
        .then((res) => res.json())
    return result
}

export async function updateItem(item: Entity, idItem: number, data: updateDataType) {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/${item}/${idItem}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/merge-patch+json',
            'Accept': 'application/ld+json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    return result['@type'] === "hydra:Error" ? false : true
}

export async function removeItem(item: Entity, idItem: number) {
    if (item === 'a_propos') return

    const result = await fetch(`${import.meta.env.VITE_API_URL}/${item}/${idItem}`, {
        method: 'DELETE',
        headers: {
            'Accept': '*/*'
        }
    })
        .then((res) => res.status === 204 ? true : false)
        .catch((err) => console.log(err))
    return result
}

export async function createCompetence(data: { nom: string, img: string }) {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/competences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/ld+json'
        },
        body: JSON.stringify({ ...data, aPropos: "/api/a_propos/1" })
    })
        .then((res) => res.status === 201 ? true : false)
        .catch((err) => console.log(err))
    return result
}

export async function createExperience(data: { titre: string, description: string }) {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/experiences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/ld+json'
        },
        body: JSON.stringify({ ...data, aPropos: "/api/a_propos/1" })
    })
        .then((res) => res.status === 201 ? true : false)
        .catch((err) => console.log(err))
    return result
}

export async function createAlternance(data: { titre: string, description: string, img: string }) {
    const result = await fetch(`${import.meta.env.VITE_API_URL}/alternances`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/ld+json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.status === 201 ? true : false)
        .catch((err) => console.log(err))
    return result
}

export async function createProjet(data: { titre: string, description: string, githubLink?: string, type: string, stacks: string }, projetTechnos: TechnoType[], projetCompetences: CompetenceProjetType[]) {

    try {
        // Effectuer la requête pour ajouter le projet
        const result = await fetch(`${import.meta.env.VITE_API_URL}/projets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/ld+json'
            },
            body: JSON.stringify(data)
        });

        const resultJson = await result.json();

        if (resultJson["@type"] === "hydra:Error") return false;


        // Créer un tableau de promesses pour les requêtes de technos
        const technoPromises = projetTechnos.map(async (element) => {
            await fetch(`${import.meta.env.VITE_API_URL}/technos_projets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/ld+json'
                },
                body: JSON.stringify({ ...element, projets: `${resultJson["@id"]}` })
            });
        });

        // Créer un tableau de promesses pour les requêtes de compétences
        const competencePromises = projetCompetences.map(async (element) => {
            await fetch(`${import.meta.env.VITE_API_URL}/competences_projets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/ld+json'
                },
                body: JSON.stringify({ ...element, projets: `${resultJson["@id"]}` })
            });
        });


        // Attendre que toutes les requêtes de technos soient terminées
        await Promise.all(technoPromises);
        await Promise.all(competencePromises);


        return true;
    } catch (err) {
        console.log(err);
        return false;
    }

}
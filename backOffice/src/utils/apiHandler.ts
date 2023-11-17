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
        "libelle": string
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
type Entity = 'a_propos' | 'projets' | 'alternance'
export async function getFromApi(entity: Entity) {
    let url = '';
    switch (entity) {
        case 'a_propos':
            url = `${import.meta.env.VITE_API_URL}/a_propos/1`
            break;
        case 'alternance':
            url = `${import.meta.env.VITE_API_URL}/alternances`
            break;
        case 'projets':
            url = `${import.meta.env.VITE_API_URL}/projets`
            break;
    }
    const result = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((res) => res.json())
    return result
}
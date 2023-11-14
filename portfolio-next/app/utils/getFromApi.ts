type Entity = 'a_propos' | 'projets' | 'alternance'

export async function getFromApi(entity: Entity) {
    var url = ''
    switch (entity) {
        case 'a_propos':
            url = `${process.env.API_URL}/a_propos/1`
            break;
        case 'alternance':
            url = `${process.env.API_URL}/alternances`
            break;
        case 'projets':
            url = `${process.env.API_URL}/projets`
            break;
    }
    const result = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        next: {
            revalidate: 1
        }
    })
        .then((res) => res.json())
    return result
}
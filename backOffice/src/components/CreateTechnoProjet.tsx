import { Input, Button } from '@nextui-org/react';
import { useContext, useState } from 'react';
import { MessageContext } from '../context/MessageContext';
import { TechnoType } from '../types/ProjetType';
const CreateTechnoProjet = ({ setOpenCreateProjetTechno, setProjetTechnos, toUpdateTechno, setToUpdateTechno, projetTechnos }: { setOpenCreateProjetTechno: (arg1: boolean) => void, setProjetTechnos: React.Dispatch<React.SetStateAction<TechnoType[]>>, toUpdateTechno: TechnoType | undefined, setToUpdateTechno: (arg1?: TechnoType) => void, projetTechnos: TechnoType[] }) => {

    console.log(toUpdateTechno);
    const [titreProjetTechno, setTitreProjetTechno] = useState(toUpdateTechno ? toUpdateTechno.titre : "");
    const [libelleProjetTechno, setLibelleProjetTechno] = useState(toUpdateTechno ? toUpdateTechno.libelle : "");

    const { success, error } = useContext(MessageContext);


    function handleSubmitCreateProjetTechno() {
        if (titreProjetTechno === "" || libelleProjetTechno === "") { error("Veuillez remplir tous les champs"); return }
        if (toUpdateTechno) {
            setProjetTechnos(projetTechnos.map((item) => item.titre === toUpdateTechno.titre ? { ...item, titre: titreProjetTechno, libelle: libelleProjetTechno } : item))
            success("Techno modifiée avec succès");
            setOpenCreateProjetTechno(false);
            setToUpdateTechno(undefined);
        } else {
            setProjetTechnos((prevState) => [...prevState, { titre: titreProjetTechno, libelle: libelleProjetTechno }])
            success("Techno ajoutée avec succès");
            setOpenCreateProjetTechno(false);
        }
    }

    return (
        <>
            <Input required defaultValue={toUpdateTechno ? toUpdateTechno.titre : ""} key={`createProjet-technos-titre`} label="Titre" placeholder="Titre de la catégorie technos" onChange={(e) => setTitreProjetTechno(e.target.value)} labelPlacement="outside" />
            <Input required defaultValue={toUpdateTechno ? toUpdateTechno.libelle : ""} key={`createProjet-technos-libelle`} label="Titre" placeholder="Liste des technos ($)" onChange={(e) => setLibelleProjetTechno(e.target.value)} labelPlacement="outside" />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={() => { setToUpdateTechno(undefined); setOpenCreateProjetTechno(false) }}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitCreateProjetTechno}>Enregistrer</Button>
            </div>
        </>
    );
};

export default CreateTechnoProjet;
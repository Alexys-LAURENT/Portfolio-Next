import { Input, Button } from '@nextui-org/react';
import { useContext, useState } from 'react';
import { MessageContext } from '../context/MessageContext';
import { CompetenceProjetType } from '../types/ProjetType';
const CreateCompetenceProjet = ({ setOpenCreateProjetCompetence, setProjetCompetences, toUpdateCompetence, setToUpdateCompetence, projetCompetences }: { setOpenCreateProjetCompetence: (arg1: boolean) => void, setProjetCompetences: React.Dispatch<React.SetStateAction<CompetenceProjetType[]>>, toUpdateCompetence: CompetenceProjetType | undefined, setToUpdateCompetence: (arg1?: CompetenceProjetType) => void, projetCompetences: CompetenceProjetType[] }) => {


    const [libelleProjetCompetence, setLibelleProjetCompetence] = useState(toUpdateCompetence ? toUpdateCompetence.libelle : "");

    const { success, error } = useContext(MessageContext);


    function handleSubmitCreateProjetCompetence() {
        if (libelleProjetCompetence === "") { error("Veuillez remplir tous les champs"); return }
        if (toUpdateCompetence) {
            setProjetCompetences(projetCompetences.map((item) => item.libelle === toUpdateCompetence.libelle ? { ...item, libelle: libelleProjetCompetence } : item))
            success("Compétence modifiée avec succès");
            setOpenCreateProjetCompetence(false);
            setToUpdateCompetence(undefined);
        } else {
            setProjetCompetences((prevState) => [...prevState, { libelle: libelleProjetCompetence }])
            success("Compétence ajoutée avec succès");
            setOpenCreateProjetCompetence(false);
        }
    }

    return (
        <>
            <Input required defaultValue={toUpdateCompetence ? toUpdateCompetence.libelle : ""} key={`createProjet-competence-libelle`} label="Libelle" placeholder="Compétence acquise" onChange={(e) => setLibelleProjetCompetence(e.target.value)} labelPlacement="outside" />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={() => { setToUpdateCompetence(undefined); setOpenCreateProjetCompetence(false) }}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitCreateProjetCompetence}>Enregistrer</Button>
            </div>
        </>
    );
};

export default CreateCompetenceProjet;
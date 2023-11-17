import { CompétenceType } from '../types/AProposType';
import { Input, Button } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { MessageContext } from '../context/MessageContext';
import { updateItem } from '../utils/apiHandler';
import { RefreshApiContext } from '../context/RefreshApiContext';

const UpdateCompetence = ({ competence }: { competence: CompétenceType }) => {

    const [nomCompetence, setNomCompetence] = useState(competence.nom);
    const { closeDrawer } = useContext(DrawerContext);
    const { success, error } = useContext(MessageContext);
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext);

    const handleSubmitUpdateCompetence = async () => {
        if (nomCompetence === "") { error("Veuillez remplir tous les champs"); return }
        const isUpdated = await updateItem("competences", competence.id, { nom: nomCompetence, img: competence.img });
        if (isUpdated) { success("Compétence modifiée avec succès"); closeDrawer(); setRefreshApi(refreshApi + 1) } else { error("Une erreur est survenue") }
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <Input required key={competence.nom} label="Nom" defaultValue={competence.nom} onChange={(e) => setNomCompetence(e.target.value)} labelPlacement="outside" />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={closeDrawer}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitUpdateCompetence}>Enregistrer</Button>
            </div>
        </div>
    );
};

export default UpdateCompetence;
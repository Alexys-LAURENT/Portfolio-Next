import { Input, Button } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { MessageContext } from '../context/MessageContext';
import { RefreshApiContext } from '../context/RefreshApiContext';
import { createCompetence } from '../utils/apiHandler';

const CreateCompetence = () => {
    const [nomCompetence, setNomCompetence] = useState("");
    const { closeDrawer } = useContext(DrawerContext);
    const { success, error } = useContext(MessageContext);
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext);

    const handleSubmitCreateCompetence = async () => {
        if (nomCompetence === "") { error("Veuillez remplir tous les champs"); return }
        const isCreated = await createCompetence({ nom: nomCompetence, img: "" });
        if (isCreated) {
            success("Compétence créée avec succès");
            closeDrawer();
            setRefreshApi(refreshApi + 1);
            setNomCompetence("");
        } else { error("Une erreur est survenue") }
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <Input id='CreateCompetenceInput' required label="Nom" placeholder="Nom de la compétence" key={refreshApi} onChange={(e) => setNomCompetence(e.target.value)} labelPlacement="outside" />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={closeDrawer}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitCreateCompetence}>Enregistrer</Button>
            </div>
        </div>
    );
};

export default CreateCompetence;
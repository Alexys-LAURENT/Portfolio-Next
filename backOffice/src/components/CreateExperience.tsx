import { Input, Button, Textarea } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { MessageContext } from '../context/MessageContext';
import { createExperience } from '../utils/apiHandler';
import { RefreshApiContext } from '../context/RefreshApiContext';


const CreateExperience = () => {
    const [titreExperience, setTitreExperience] = useState("");
    const [descriptionExperience, setDescriptionExperience] = useState("");
    const { closeDrawer } = useContext(DrawerContext);
    const { success, error } = useContext(MessageContext);
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext);

    const handleSubmitCreateExperience = async () => {
        if (titreExperience === "" || descriptionExperience === "") { error("Veuillez remplir tous les champs"); return }
        const isCreated = await createExperience({ titre: titreExperience, description: descriptionExperience });
        if (isCreated) {
            success("Expérience créée avec succès");
            closeDrawer();
            setRefreshApi(refreshApi + 1);
            setTitreExperience("");
            setDescriptionExperience("");
        } else { error("Une erreur est survenue") }
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <Input required key={refreshApi} label="Titre" placeholder="Titre de l'expérience" onChange={(e) => setTitreExperience(e.target.value)} labelPlacement="outside" />
            <Textarea
                key={refreshApi}
                label="Description"
                placeholder="Description de l'expérience"
                className="w-full"
                labelPlacement="outside"
                onChange={(e) => setDescriptionExperience(e.target.value)}
                maxRows={5}
                minRows={2}
                required
                classNames={{ inputWrapper: "h-auto" }}
            />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={closeDrawer}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitCreateExperience}>Enregistrer</Button>
            </div>
        </div>
    );
};

export default CreateExperience;
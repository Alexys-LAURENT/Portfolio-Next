import { Button, Textarea } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { MessageContext } from '../context/MessageContext';
import { createAlternance } from '../utils/apiHandler';
import { RefreshApiContext } from '../context/RefreshApiContext';

const CreateAlternance = () => {

    const [titreAlternance, setTitreAlternance] = useState("");
    const [descriptionAlternance, setDescriptionAlternance] = useState("");
    const { closeDrawer } = useContext(DrawerContext);
    const { success, error } = useContext(MessageContext);
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext);

    const handleSubmitCreateAlternance = async () => {
        if (titreAlternance === "" || descriptionAlternance === "") { error("Veuillez remplir tous les champs"); return }
        const isCreated = await createAlternance({ titre: titreAlternance, description: descriptionAlternance, img: "" });
        if (isCreated) {
            success("Alternance créée avec succès");
            closeDrawer();
            setRefreshApi(refreshApi + 1);
            setTitreAlternance("");
            setDescriptionAlternance("");
        } else { error("Une erreur est survenue") }
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <Textarea
                key={refreshApi}
                label="Titre"
                placeholder="Titre de l'alternance"
                className="w-full"
                labelPlacement="outside"
                onChange={(e) => setTitreAlternance(e.target.value)}
                maxRows={5}
                minRows={2}
                required
                classNames={{ inputWrapper: "h-auto" }}
            />
            <Textarea
                key={`${refreshApi}2`}
                label="Description"
                placeholder="Description de l'alternance"
                className="w-full"
                labelPlacement="outside"
                onChange={(e) => setDescriptionAlternance(e.target.value)}
                maxRows={5}
                minRows={2}
                required
                classNames={{ inputWrapper: "h-auto" }}
            />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={closeDrawer}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitCreateAlternance}>Enregistrer</Button>
            </div>
        </div>
    );
};

export default CreateAlternance;
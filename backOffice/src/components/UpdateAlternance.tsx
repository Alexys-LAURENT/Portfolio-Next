import { AlternanceType } from "../../../portfolio-next/app/types/AlternanceType";
import { Button, Textarea } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { MessageContext } from '../context/MessageContext';
import { updateItem } from '../utils/apiHandler';
import { RefreshApiContext } from '../context/RefreshApiContext';

const UpdateAlternance = ({ alternance }: { alternance: AlternanceType }) => {

    const [titreAlternance, setTitreAlternance] = useState(alternance.titre);
    const [descriptionAlternance, setDescriptionAlternance] = useState(alternance.description);
    const { closeDrawer } = useContext(DrawerContext);
    const { success, error } = useContext(MessageContext);
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext);

    const handleSubmitUpdateAlternance = async () => {
        if (titreAlternance === "" || descriptionAlternance === "") { error("Veuillez remplir tous les champs"); return }
        const isUpdated = await updateItem("alternances", alternance.id, { titre: titreAlternance, description: descriptionAlternance });
        if (isUpdated) { success("Expérience modifiée avec succès"); closeDrawer(); setRefreshApi(refreshApi + 1) } else { error("Une erreur est survenue") }
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <Textarea
                key={alternance.titre}
                label="Titre"
                placeholder="Titre de l'alternance"
                className="w-full"
                labelPlacement="outside"
                onChange={(e) => setTitreAlternance(e.target.value)}
                defaultValue={alternance.titre}
                maxRows={5}
                minRows={2}
                required
                classNames={{ inputWrapper: "h-auto" }}
            />
            <Textarea
                key={alternance.description}
                label="Description"
                placeholder="Description de l'alternance"
                className="w-full"
                labelPlacement="outside"
                defaultValue={alternance.description}
                onChange={(e) => setDescriptionAlternance(e.target.value)}
                maxRows={5}
                minRows={2}
                required
                classNames={{ inputWrapper: "h-auto" }}
            />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={closeDrawer}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitUpdateAlternance}>Enregistrer</Button>
            </div>
        </div>
    );
};

export default UpdateAlternance;
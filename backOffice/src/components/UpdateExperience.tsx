import { ExperienceType } from "../types/AProposType";
import { Input, Button, Textarea } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { MessageContext } from '../context/MessageContext';
import { updateItem } from '../utils/apiHandler';
import { RefreshApiContext } from '../context/RefreshApiContext';

const UpdateExperience = ({ experience }: { experience: ExperienceType }) => {

    const [titreExperience, setTitreExperience] = useState(experience.titre);
    const [descriptionExperience, setDescriptionExperience] = useState(experience.description);
    const { closeDrawer } = useContext(DrawerContext);
    const { success, error } = useContext(MessageContext);
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext);

    const handleSubmitUpdateExperience = async () => {
        if (titreExperience === "" || descriptionExperience === "") { error("Veuillez remplir tous les champs"); return }
        const isUpdated = await updateItem("experiences", experience.id, { titre: titreExperience, description: descriptionExperience });
        if (isUpdated) { success("Expérience modifiée avec succès"); closeDrawer(); setRefreshApi(refreshApi + 1) } else { error("Une erreur est survenue") }
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <Input required key={experience.titre} label="Titre" defaultValue={experience.titre} onChange={(e) => setTitreExperience(e.target.value)} labelPlacement="outside" />
            <Textarea
                key={experience.description}
                label="Description"
                placeholder="Description de l'expérience"
                className="w-full"
                labelPlacement="outside"
                defaultValue={experience.description}
                onChange={(e) => setDescriptionExperience(e.target.value)}
                maxRows={5}
                minRows={2}
                required
                classNames={{ inputWrapper: "h-auto" }}
            />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={closeDrawer}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitUpdateExperience}>Enregistrer</Button>
            </div>
        </div>
    );
};

export default UpdateExperience;
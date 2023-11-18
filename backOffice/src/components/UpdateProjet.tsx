import { Input, Button, Textarea, CardBody, Card, CardHeader } from '@nextui-org/react';
import { useState, useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { MessageContext } from '../context/MessageContext';
import { updateItem } from '../utils/apiHandler';
import { RefreshApiContext } from '../context/RefreshApiContext';
import CreateTechnoProjet from './CreateTechnoProjet';
import { CompetenceProjetType, ProjetType, TechnoType } from '../types/ProjetType';
import { Popconfirm } from 'antd';
import CreateCompetenceProjet from './CreateCompetenceProjet';



const UpdateProjet = ({ projet }: { projet: ProjetType }) => {
    console.log(projet);

    const [titreProjet, setTitreProjet] = useState(projet.titre);
    const [descriptionProjet, setDescriptionProjet] = useState(projet.description);
    const [gitHubLink, setGitHubLink] = useState(projet.githubLink);
    const [stacks, setStacks] = useState(projet.stacks);
    const [type, setType] = useState(projet.type);
    const [projetTechnos, setProjetTechnos] = useState<TechnoType[]>(projet.technos.length > 0 ? projet.technos : []);
    const [toUpdateTechno, setToUpdateTechno] = useState<TechnoType>();
    const [projetCompetences, setProjetCompetences] = useState<CompetenceProjetType[]>(projet.competences.length > 0 ? projet.competences : []);
    const [toUpdateCompetence, setToUpdateCompetence] = useState<CompetenceProjetType>();

    const [openCreateProjetTechno, setOpenCreateProjetTechno] = useState(false);
    const [openCreateProjetCompetence, setOpenCreateProjetCompetence] = useState(false);


    const { closeDrawer } = useContext(DrawerContext);
    const { success, error } = useContext(MessageContext);
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext);

    const handleSubmitCreateProjet = async () => {
        if (titreProjet === "" || descriptionProjet === "" || stacks === "" || type === "" || projetTechnos.length === 0 || projetCompetences.length === 0) { error("Veuillez remplir tous les champs"); return }
        const isProjetUpdated = await updateItem("projets", projet.id, { titre: titreProjet, description: descriptionProjet, githubLink: gitHubLink, stacks: stacks, type: type });
        if (!isProjetUpdated) { error("Une erreur est survenue lors de la modification du projet"); return }
        const technosUpdatePromises = projetTechnos.map(async (techno) => {
            if (techno.id) {
                const isTechnoUpdated = await updateItem("technos_projets", techno.id, { titre: techno.titre, libelle: techno.libelle, projets: `api/projets/${projet.id}` });
                if (!isTechnoUpdated) { error("Une erreur est survenue lors de la modification d'une techno"); return }
            }
        })
        await Promise.all(technosUpdatePromises).catch(() => { error("Une erreur est survenue lors de la modification d'une techno"); return });
        const competencesUpdatePromises = projetCompetences.map(async (competence) => {
            if (competence.id) {
                const isCompetenceUpdated = await updateItem("competences_projets", competence.id, { libelle: competence.libelle, projets: `api/projets/${projet.id}` });
                if (!isCompetenceUpdated) { error("Une erreur est survenue lors de la modification d'une compétence"); return }
            }
        })
        await Promise.all(competencesUpdatePromises).catch(() => { error("Une erreur est survenue lors de la modification d'une compétence"); return });

        success("Projet modifié avec succès");
        closeDrawer();
        setRefreshApi(refreshApi + 1);
        setTitreProjet("");
        setDescriptionProjet("");
        setGitHubLink("");
        setStacks("");
        setType("");
        setProjetTechnos([]);
        setProjetCompetences([]);
        setToUpdateTechno(undefined);
        setToUpdateCompetence(undefined);
    }

    const removeTechno = (techno: TechnoType) => {
        setProjetTechnos(projetTechnos.filter((item) => item.titre !== techno.titre))
    }

    const handleRenameTechno = (techno: TechnoType) => {
        setOpenCreateProjetTechno(true);
        setToUpdateTechno(techno)
    }

    const removeCompetence = (competence: CompetenceProjetType) => {
        setProjetCompetences(projetCompetences.filter((item) => item.libelle !== competence.libelle))
    }

    const handleRenameCompetence = (competence: CompetenceProjetType) => {
        setOpenCreateProjetCompetence(true);
        setToUpdateCompetence(competence)
    }

    return (
        <div className='w-full flex flex-col gap-5'>
            <Input required key={projet.titre} defaultValue={projet.titre} label="Titre" placeholder="Titre du projet" onChange={(e) => setTitreProjet(e.target.value)} labelPlacement="outside" />
            <Textarea
                key={projet.description}
                defaultValue={projet.description}
                label="Description"
                placeholder="Description du projet"
                className="w-full"
                labelPlacement="outside"
                onChange={(e) => setDescriptionProjet(e.target.value)}
                maxRows={5}
                minRows={2}
                required
                classNames={{ inputWrapper: "h-auto" }}
            />
            <Input required key={projet.githubLink} defaultValue={projet.githubLink} label="GitHub" placeholder="Lien github" onChange={(e) => setGitHubLink(e.target.value)} labelPlacement="outside" />
            <Input required key={projet.stacks} defaultValue={projet.stacks} label="Stacks" placeholder="Stacks utilisées" onChange={(e) => setStacks(e.target.value)} labelPlacement="outside" />
            <Input required key={projet.type} defaultValue={projet.type} label="Type" placeholder="Type du projet" onChange={(e) => setType(e.target.value)} labelPlacement="outside" />

            <hr />
            <p >Technos utilisées :</p>
            {projetTechnos && projetTechnos.length > 0 && projetTechnos.map((techno) => (
                <Card key={`technos-${techno.titre}`}>
                    <CardHeader className='p-0 justify-between px-4 py-2 '>
                        <svg onClick={() => handleRenameTechno(techno)} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#0267da" className="bi bi-pen-fill hover:cursor-pointer hover:scale-125 transition-all" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                        </svg>
                        <Popconfirm
                            title="Supprimer cette techno"
                            description="Êtes-vous sûr de vouloir supprimer cette techno ?"
                            onConfirm={() => removeTechno(techno)}
                            okText="Oui"
                            cancelText="Non"
                            okButtonProps={{ className: "bg-primary" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="red" className="bi bi-trash2-fill hover:cursor-pointer hover:scale-125 transition-all" viewBox="0 0 16 16">
                                <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                            </svg>
                        </Popconfirm>
                    </CardHeader>
                    <hr />
                    <CardBody className=' pt-1'>
                        <p className="font-semibold">{techno.titre}</p>
                        <ul>
                            {techno.libelle.split('$').map((item: string) => (
                                <li key={`technos-${item}`}>- {item}</li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
            ))}
            {openCreateProjetTechno && <CreateTechnoProjet setOpenCreateProjetTechno={setOpenCreateProjetTechno} setProjetTechnos={setProjetTechnos} setToUpdateTechno={setToUpdateTechno} toUpdateTechno={toUpdateTechno} projetTechnos={projetTechnos} />}
            <Card>

                {!openCreateProjetTechno && <Button className='bg-black/5 dark:bg-white/5' onClick={() => setOpenCreateProjetTechno(true)}>Ajouter une techno</Button>}

            </Card>
            <hr />
            <p >Compétences utilisées :</p>
            <div className='flex flex-col gap-4'>
                {projetCompetences && projetCompetences.length > 0 && projetCompetences.map((competence) => (
                    <Card key={`competence-${competence.libelle}`}>
                        <CardBody className='flex-row items-center justify-between'>
                            <p className='max-w-[92%] text-ellipsis line-clamp-1'>{competence.libelle}</p>
                            <span className='flex gap-3'>
                                <svg onClick={() => handleRenameCompetence(competence)} xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#0267da" className="bi bi-pen-fill hover:cursor-pointer hover:scale-125 transition-all" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                </svg>
                                <Popconfirm
                                    title="Supprimer cette compétence"
                                    description="Êtes-vous sûr de vouloir supprimer cette compétence ?"
                                    onConfirm={() => removeCompetence(competence)}
                                    okText="Oui"
                                    cancelText="Non"
                                    okButtonProps={{ className: "bg-primary" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="red" className="bi bi-trash2-fill hover:cursor-pointer hover:scale-125 transition-all" viewBox="0 0 16 16">
                                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                    </svg>
                                </Popconfirm>
                            </span>
                        </CardBody>
                    </Card>
                ))}
            </div>


            {openCreateProjetCompetence && <CreateCompetenceProjet setOpenCreateProjetCompetence={setOpenCreateProjetCompetence} setProjetCompetences={setProjetCompetences} toUpdateCompetence={toUpdateCompetence} setToUpdateCompetence={setToUpdateCompetence} projetCompetences={projetCompetences} />}

            <Card>
                {!openCreateProjetCompetence && <Button className='bg-black/5 dark:bg-white/5' onClick={() => setOpenCreateProjetCompetence(true)}>Ajouter une compétence</Button>}
            </Card>


            <hr />
            <div className='w-full flex justify-end gap-4'>
                <Button className="w-fit" color="danger" onClick={closeDrawer}>Annuler</Button>
                <Button className="w-fit" color="primary" onClick={handleSubmitCreateProjet}>Enregistrer</Button>
            </div>
        </div>
    );
};

export default UpdateProjet;
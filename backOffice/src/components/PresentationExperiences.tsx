import { Card, CardBody, Button } from "@nextui-org/react";
import { ExperienceType } from "../types/AProposType";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { RefreshApiContext } from "../context/RefreshApiContext";
import { DrawerContext } from "../context/DrawerContext";
import { Popconfirm } from 'antd';
import { removeItem } from "../utils/apiHandler";

const PresentationExperiences = ({ experiences }: { experiences: ExperienceType[] }) => {

    const { success, error } = useContext(MessageContext)
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext)
    const { showDrawer } = useContext(DrawerContext)

    const confirm = async (idExperience: number) => {
        const isDeleted = await removeItem("experiences", idExperience)
        isDeleted ? success("Expérience supprimée") : error("Une erreur est survenue")
        setRefreshApi(refreshApi + 1)
    };

    return (
        <Card id="EXPE" className="w-fullflex flex-col self-stretch flex-1">
            <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-full">
                <p>Expériences :</p>
                {experiences.map((experience) => (
                    <Card className="w-full" key={`experience-${experience.id}`}>
                        <CardBody className="flex-row justify-between">

                            <p>{experience.titre + " - " + experience.description}</p>
                            <div className="flex items-center gap-2">
                                <svg onClick={() => showDrawer('Modifier une expérience', experience)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#0267da" className="bi bi-pen-fill hover:cursor-pointer hover:scale-125 transition-all" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                </svg>
                                <Popconfirm
                                    title="Supprimer cette expérience"
                                    description="Êtes-vous sûr de vouloir supprimer cette expérience ?"
                                    onConfirm={() => confirm(experience.id)}
                                    okText="Oui"
                                    cancelText="Non"
                                    okButtonProps={{ className: "bg-primary" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" className="bi bi-trash2-fill hover:cursor-pointer hover:scale-125 transition-all" viewBox="0 0 16 16">
                                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                    </svg>
                                </Popconfirm>
                            </div>
                        </CardBody>
                    </Card>
                ))
                }
                <Card>
                    <CardBody className="p-0 ">
                        <Button className="bg-transparent text-2xl" onClick={() => showDrawer('Créer une expérience')}>+</Button>
                    </CardBody>
                </Card>

            </CardBody >
        </Card >
    );
};

export default PresentationExperiences;
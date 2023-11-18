
import { Button } from "@nextui-org/react";
import { ProjetType } from '../types/ProjetType';
import { Link } from '@nextui-org/react';
import { Popconfirm } from "antd";
import { removeItem } from "../utils/apiHandler";
import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { RefreshApiContext } from "../context/RefreshApiContext";
import { DrawerContext } from "../context/DrawerContext";

const CardProject = ({ projet }: { projet: ProjetType }) => {

    const { success, error } = useContext(MessageContext)
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext)
    const { showDrawer } = useContext(DrawerContext)


    const confirm = async (idProjet: number) => {
        const isDeleted = await removeItem("projets", idProjet)
        isDeleted ? success("Projet supprimé") : error("Une erreur est survenue")
        setRefreshApi(refreshApi + 1)
    };

    return (
        <div className="w-full max-w-[550px] relative">
            <Popconfirm
                title="Supprimer ce projet"
                description="Êtes-vous sûr de vouloir supprimer ce projet ?"
                className="absolute right-3 top-4 z-50"
                onConfirm={() => confirm(projet.id)}
                okText="Oui"
                cancelText="Non"
                okButtonProps={{ className: "bg-primary" }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" className="bi bi-trash2-fill hover:cursor-pointer hover:scale-125 transition-all" viewBox="0 0 16 16">
                    <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                </svg>
            </Popconfirm>
            <Button onClick={() => { showDrawer("Modifier un projet", projet); }} className='flex w-full h-[250px] rounded-md p-2 bg-white dark:bg-opacity-10 max-w-[550px]'>
                <div className='flex flex-col w-full h-full rounded-md'>
                    <div className='w-full flex items-center justify-between h-[40px]  font-semibold text-base mb-1 relative'>
                        <h4>{projet.titre}</h4>

                    </div>
                    <hr className='border-black/10 dark:border-white/25 border-[1.5px]' />
                    <div className='flex overflow-hidden max-w-full w-full h-[170px] '>
                        <p className='text-start break-words whitespace-normal max-w-full w-full h-[125px] mt-3 overflow-hidden font-base text-base text-ellipsis line-clamp-5'>{projet.description}</p>
                    </div>
                    <div className='flex items-center px-2 font-semibold justify-between w-full h-[40px] rounded-md bg-black/5 dark:bg-white/40'>
                        <span className=' break-words whitespace-normal max-w-[90%] overflow-hidden text-ellipsis line-clamp-1'>{projet.stacks} </span>
                        {
                            projet.githubLink &&
                            <Link href={projet.githubLink} target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-github invert dark:invert-0" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                            </Link>
                        }
                    </div>
                </div>
            </Button>
        </div>
    );
};

export default CardProject;
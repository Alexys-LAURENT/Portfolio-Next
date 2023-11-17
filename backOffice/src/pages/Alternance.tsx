import { Popconfirm } from 'antd';
import { AlternanceType } from '../../../portfolio-next/app/types/AlternanceType';
import { Image, Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { DrawerContext } from '../context/DrawerContext';
import { useContext } from 'react';
import { MessageContext } from '../context/MessageContext';
import { RefreshApiContext } from '../context/RefreshApiContext';
import { removeItem } from '../utils/apiHandler';
const Alternance = ({ alternances }: { alternances: AlternanceType[] }) => {

    const { success, error } = useContext(MessageContext)
    const { refreshApi, setRefreshApi } = useContext(RefreshApiContext)
    const { showDrawer } = useContext(DrawerContext)

    const confirm = async (idAlternance: number) => {
        const isDeleted = await removeItem("alternances", idAlternance)
        isDeleted ? success("Expérience supprimée") : error("Une erreur est survenue")
        setRefreshApi(refreshApi + 1)
    };

    return (
        <div className='min-h-[calc(100vh-65px)] flex flex-col w-full bg-bgLight dark:bg-bgDark items-center gap-10'>
            {
                alternances && alternances.length > 0 && alternances.map((alternance) => (
                    <Card id={`alternance-${alternance.id}`} key={`alternance-${alternance.id}`} className='flex flex-col ps-5 pe-5 pb-5 md:pb-0 md:ps-2 md:pe-8 bg-white dark:bg-opacity-10 rounded-lg  w-full md:max-w-[80%]'>
                        <CardHeader className='border-b-2 w-full flex-row justify-between'>
                            <svg onClick={() => showDrawer('Modifier une alternance', alternance)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#0267da" className="bi bi-pen-fill hover:cursor-pointer" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                            </svg>
                            <Popconfirm
                                title="Supprimer cette alternance"
                                description="Êtes-vous sûr de vouloir supprimer cette alternance ?"
                                onConfirm={() => confirm(alternance.id)}
                                okText="Oui"
                                cancelText="Non"
                                okButtonProps={{ className: "bg-primary" }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" className="bi bi-trash2-fill hover:cursor-pointer" viewBox="0 0 16 16">
                                    <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                </svg>
                            </Popconfirm>
                        </CardHeader>
                        <CardBody className='flex flex-col md:flex-row py-8 gap-7 md:gap-0'>
                            <div className='w-full md:w-3/12 flex justify-center items-center'>
                                <Image className=' bg-red-50' src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1024px-HTML5_logo_and_wordmark.svg.png"} alt="cd2ri" width={150} height={150} />
                            </div>
                            <div className='flex flex-col justify-center gap-5 w-full md:w-9/12'>
                                <p className='w-full text-base font-bold text-textDark dark:text-textLight'>{alternance.titre}</p>
                                <p className='w-full text-sm font-semibold text-textDark dark:text-textLight'>{alternance.description}</p>
                            </div>
                        </CardBody>
                    </Card>
                ))
            }
            <Card className='flex flex-col h-[100px] md:h-[200px] bg-white dark:bg-opacity-10 rounded-lg w-full md:max-w-[80%]'>

                <Button className='w-full h-full bg-transparent text-5xl' onClick={() => showDrawer('Créer une alternance')}>
                    +
                </Button>

            </Card>
        </div>
    );
};

export default Alternance;
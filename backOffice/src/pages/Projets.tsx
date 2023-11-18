import { Button } from '@nextui-org/react';
import { ProjetType } from '../types/ProjetType';
import CardProject from '../components/CardProjet';
import { useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
const Projets = ({ projets }: { projets: ProjetType[] }) => {
    const { showDrawer } = useContext(DrawerContext)

    return (
        <div className="min-h-[calc(100vh-65px)] p-10">
            <div className='flex flex-wrap gap-8 w-full'>

                {projets.map((projet) => (
                    <CardProject key={`projet-${projet.id}`} projet={projet} />
                ))}
                <Button onClick={() => showDrawer('Créer un projet')} className='flex w-full h-[250px] rounded-md p-2 bg-white dark:bg-opacity-10 max-w-[550px]'>
                    <p className='font-semibold text-4xl'>+</p>
                </Button>
            </div>
        </div>
    );
};

export default Projets;
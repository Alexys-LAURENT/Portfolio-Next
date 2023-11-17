import { Drawer } from 'antd';
import { useContext } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import CreateExperience from './CreateExperience';
import UpdateExperience from './UpdateExperience';
import CreateCompetence from './CreateCompetence';
import UpdateCompetence from './UpdateCompetence';
import UpdateAlternance from './UpdateAlternance';
import CreateAlternance from './CreateAlternance';
import { CompétenceType, ExperienceType } from '../types/AProposType';
import { AlternanceType } from '../../../portfolio-next/app/types/AlternanceType';
const DrawerItem = () => {
    const { drawerOpen, closeDrawer, drawerDisplay, drawerData } = useContext(DrawerContext);
    return (
        <Drawer title={<h3 className='dark:text-white'>{drawerDisplay}</h3>} closeIcon={
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x dark:text-white" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>}
            placement="right" onClose={closeDrawer} open={drawerOpen} className=' dark:bg-bgDark' classNames={{ header: '' }}>
            {drawerDisplay === "Créer une expérience" && <CreateExperience />}
            {drawerDisplay === "Modifier une expérience" && <UpdateExperience experience={drawerData as ExperienceType} />}
            {drawerDisplay === "Créer une compétence" && <CreateCompetence />}
            {drawerDisplay === "Modifier une compétence" && <UpdateCompetence competence={drawerData as CompétenceType} />}
            {drawerDisplay === "Créer une alternance" && <CreateAlternance />}
            {drawerDisplay === "Modifier une alternance" && <UpdateAlternance alternance={drawerData as AlternanceType} />}
        </Drawer>
    );
};

export default DrawerItem;
"use client"
import React, { useEffect, useState } from 'react';
import { Tooltip } from '@nextui-org/react';
import { ExperienceType } from '../types/AProposType';

const Timeline = ({ experiences }: { experiences: ExperienceType[] }) => {
    const [width, setWidth] = useState<number>(200);
    const [visible, setVisible] = useState(experiences.map(() => false));
    useEffect(() => {
        setWidth(window.innerWidth)
        setTimeout(() => {
            document.getElementById('timeLineContainer')?.classList.remove('invisible')
        }, 100)
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        })
        window.addEventListener('scroll', () => {
            setWidth(window.innerWidth + Math.random());
        })

        // Sélectionnez toutes les divs avec la classe "point"
        const pointDivs = document.querySelectorAll('.point');

        // Initialisez un tableau pour stocker la visibilité de chaque div
        const isVisibleArray = Array.from({ length: pointDivs.length }, () => false);

        // Créez un observer pour chaque div avec la classe "point"
        const observers = Array.from(pointDivs).map((pointDiv, index) => {
            return new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    // Vérifiez si la div est dans le viewport
                    if (entry.isIntersecting) {
                        // Mettez à jour le tableau isVisibleArray à l'index correspondant
                        isVisibleArray[index] = true;
                    } else {
                        isVisibleArray[index] = false;
                    }

                    // Mettez à jour le state visible avec le tableau mis à jour
                    setVisible([...isVisibleArray]);
                });
            }, { threshold: 0.5 });
        });

        // Observez chaque div avec l'observer correspondant
        Array.from(pointDivs).forEach((pointDiv, index) => {
            observers[index].observe(pointDiv);
        });

    }, [])
    return (
        <div id='timeLineContainer' className="invisible container w-full mt-8 mb-32 min-h-[300px] justify-center items-center flex">
            <div className={`flex w-1 md:w-full relative bg-white`} style={{ height: width > 768 ? 4 : 100 * experiences.length }}>
                {experiences.map((item, index) => (
                    <Tooltip key={index} title={item.titre} updatePositionDeps={[width]} shouldFlip={false} showArrow isOpen={visible[index]}
                        content={
                            <div className='flex flex-col max-w-[120px]'>
                                <p className='text-sm font-semibold'>{item.titre}</p>
                                <p className='text-xs'>{item.description}</p>
                            </div>
                        } placement={width > 768 ? index % 2 === 0 ? 'top' : 'bottom' : index % 2 === 0 ? 'left' : 'right'}  >
                        <div id={`point-${index}`} className='point h-3 w-3 rounded-full bg-white absolute' style={{ left: `${width > 768 ? ((100 / experiences.length) * (index + 1)) - (50 / experiences.length) + '%' : -4 + 'px'}`, top: `${width > 768 ? -3 + 'px' : ((100 / experiences.length) * (index + 1)) - (50 / experiences.length) + "%"}` }} key={index}>
                        </div>
                    </Tooltip>
                ))}
            </div>

            {/* Timeline line */}
        </div>
    );
};

export default Timeline;

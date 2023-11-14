"use client"
import React, { useState } from 'react';
import { ProjetType } from '../types/ProjetType';
import CardProject from '../components/CardProject';
import { Select, SelectItem, Selection } from "@nextui-org/react";

const ProjetsWrapper = ({ projets }: { projets: ProjetType[] }) => {

    const [value, setValue] = React.useState<string>();

    var allTypes: Array<any> = projets.map((projet) => projet.type).filter((type, index, self) => self.indexOf(type) === index).map((type: any) => ({ value: type, label: type }));

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
    };

    return (
        <div className='flex flex-col w-full gap-6'>
            <div className='flex items-center justify-end w-full'>
                <Select
                    label="Filtrer par type de projet"
                    className="max-w-xs"
                    items={allTypes}
                    onChange={handleSelectionChange}
                >
                    {(type) => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>}
                </Select>
            </div>
            <div className='w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-24 mb-16'>
                {
                    projets.map((projet, index) => (!value || projet.type === value ?
                        <CardProject key={`projet-${index}`} projet={projet} />
                        : null
                    ))
                }
            </div>
        </div>
    );
};

export default ProjetsWrapper;
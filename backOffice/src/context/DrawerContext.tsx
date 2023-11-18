/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from "react";
import { CompétenceType, ExperienceType } from "../types/AProposType";

type DrawerDisplay = "Créer une expérience" | "Modifier une expérience" | "Créer une compétence" | "Modifier une compétence" | "Créer un projet" | "Modifier un projet" | "Modifier une alternance" | "Créer une alternance" | "refresh"
type DrawerData = ExperienceType | CompétenceType | null


export const DrawerContext = createContext({
    drawerData: null as ExperienceType | CompétenceType | null,
    drawerOpen: false,
    drawerDisplay: "Créer une expérience" as DrawerDisplay,
    showDrawer: (_drawerDisplay: DrawerDisplay, _data?: DrawerData) => { },
    closeDrawer: () => { }
});

const DrawerContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerDisplay, setDrawerDisplay] = useState<DrawerDisplay>("Créer une expérience");
    const [drawerData, setDrawerData] = useState<DrawerData>(null);


    const showDrawer = (drawerDisplay: DrawerDisplay, data?: DrawerData) => {
        setDrawerOpen(true)
        setDrawerDisplay(drawerDisplay)
        if (data) setDrawerData(data)
    }

    const closeDrawer = () => {
        setDrawerOpen(false)
        setDrawerDisplay("refresh")
    }

    return (
        <DrawerContext.Provider
            value={{
                drawerData,
                drawerOpen,
                drawerDisplay,
                showDrawer,
                closeDrawer
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};

export default DrawerContextProvider;


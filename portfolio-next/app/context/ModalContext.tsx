// create a react context for store two state, open/setOpen and modalContent/setModalContent
'use client'
import { createContext, useState } from 'react';
import { useDisclosure } from "@nextui-org/react";
import { ProjetType } from '../types/ProjetType';
const ModalContext = createContext({
    isOpen: false,
    onOpen: () => { },
    onOpenChange: () => { },
    modalContent: {} as ProjetType,
    setModalContent: (modalContent: ProjetType) => { },
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalContent, setModalContent] = useState<ProjetType>({} as ProjetType);

    return (
        <ModalContext.Provider value={{ isOpen, onOpen, onOpenChange, modalContent, setModalContent }}>
            {children}
        </ModalContext.Provider>
    );
};

export { ModalContext, ModalProvider };

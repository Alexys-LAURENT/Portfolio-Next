"use client"
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { CompetenceProjetType, TechnoType } from "../types/ProjetType";
export default function ModalComponent() {
    const { isOpen, onOpenChange, modalContent } = useContext(ModalContext);
    console.log(modalContent)
    const tab = [
        modalContent && modalContent.description && { id: 'presentation', label: 'Présentation', content: <PresensationContent description={modalContent.description} /> },
        modalContent && modalContent.technos && modalContent.technos.length > 0 && { id: 'technos', label: 'Technos', content: <TechnosContent technos={modalContent.technos} /> },
        modalContent && modalContent.competences && modalContent.competences.length > 0 && { id: 'competences', label: 'Compétences', content: <CompetencesContent competences={modalContent.competences} /> },
        modalContent && modalContent.images && modalContent.images.length > 0 && { id: 'images', label: 'Images' },
    ].filter(Boolean);

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" isDismissable={true} placement="center" scrollBehavior="inside" backdrop="blur">
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">{modalContent.titre}</ModalHeader>
                        <ModalBody>
                            {modalContent &&
                                <Tabs aria-label="Dynamic tabs" items={tab}>
                                    {(item: any) => (
                                        <Tab key={item.id} title={item.label}>
                                            <Card>
                                                <CardBody>
                                                    {item.content}
                                                </CardBody>
                                            </Card>
                                        </Tab>
                                    )}
                                </Tabs>
                            }
                        </ModalBody>

                    </>
                </ModalContent>
            </Modal>
        </>
    );
}


function PresensationContent({ description }: { description: string }) {
    return (
        <p>{description}</p>
    )
}

function CompetencesContent({ competences }: { competences: CompetenceProjetType[] }) {
    console.log(competences)
    return (
        <div className="flex flex-col gap-4">
            {competences.map((item: CompetenceProjetType) =>
            (
                <Card key={`competence-${item.id}`}>
                    <CardBody>
                        <p>{item.libelle}</p>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}

function TechnosContent({ technos }: { technos: TechnoType[] }) {

    return (
        <div className="flex flex-col gap-4">
            {technos.map((item: TechnoType) =>
            (
                <Card key={`technos-${item.id}`}>
                    <CardBody>
                        <p className="font-semibold">{item.titre}</p>
                        <ul>
                            {item.libelle.split('$').map((item: string) => (
                                <li key={`technos-${item}`}>- {item}</li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}
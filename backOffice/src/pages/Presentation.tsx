import { AProposType } from "../types/AProposType"
import { Textarea, Input, Card, CardBody, Button, CardHeader, CardFooter, Image } from "@nextui-org/react";
import { useState } from "react";
export default function Presentation({ APropos }: { APropos: AProposType }) {

    console.log(APropos)
    const [subTitle, setSubTitle] = useState(APropos.subTitle)
    const [description, setDescription] = useState(APropos.description)

    return (
        <div className="min-h-[calc(100vh-65px)] flex flex-col lg:flex-row gap-4">
            <div className="lg:min-h-[calc(100vh-65px)] lg:w-7/12 w-full flex lg:flex-col gap-4 h-[300px]">

                <Card className="w-full">
                    <CardBody>
                        <Input key={APropos.subTitle} label="SousTitre" defaultValue={APropos.subTitle} onChange={(e) => setSubTitle(e.target.value)} labelPlacement="outside" />
                    </CardBody>
                    <CardBody>
                        <Textarea
                            key={APropos.description}
                            label="Description"
                            placeholder="Enter your description"
                            className="w-full"
                            labelPlacement="outside"
                            defaultValue={APropos.description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxRows={5}
                            minRows={2}
                            classNames={{ inputWrapper: "h-auto" }}
                        />
                    </CardBody>
                    <div className="flex justify-end w-full mb-2 pe-2">
                        <Button className="w-fit" color="primary" onClick={() => console.log(subTitle, description)}>Enregistrer</Button>
                    </div>
                </Card>
                <Card className="w-fullflex flex-col self-stretch flex-1">
                    <CardBody className="flex flex-col gap-4 overflow-y-auto max-h-full">
                        <p>Expériences :</p>
                        {APropos.experiences.map((experience) => (
                            <Card className="w-full" key={`experience-${experience.id}`}>
                                <CardBody className="flex-row justify-between">

                                    <p>{experience.titre + " - " + experience.description}</p>
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#0267da" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" className="bi bi-trash2-fill" viewBox="0 0 16 16">
                                            <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                        </svg>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                        <Card>
                            <CardBody className="p-0 ">
                                <Button className="bg-transparent">+</Button>
                            </CardBody>
                        </Card>

                    </CardBody>
                </Card>
            </div>
            <div className="w-full flex-1">
                <Card className="w-full h-full">
                    <CardBody className="gap-3">
                        <p>Compétences:</p>
                        <div className="w-full flex flex-row flex-wrap gap-4">
                            {APropos.competences.map((competence) => (
                                <Card key={`competence-${competence.id}`} className="w-32 h-32 flex-none">
                                    <CardHeader className="p-1 border-b-1 border-white/5">
                                        <p className="font-semibold text-xs w-full flex items-center justify-center line-clamp-1 text-ellipsis">
                                            {competence.nom}
                                        </p>
                                    </CardHeader>
                                    <CardBody className=" justify-center items-center" >
                                        <Image
                                            alt={competence.nom}
                                            className="object-cover rounded-xl"
                                            src={competence.img}
                                            width={45}
                                        />
                                    </CardBody>
                                    <CardFooter className="p-2 border-t-1 border-white/5 justify-around">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="#0267da" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="red" className="bi bi-trash2-fill" viewBox="0 0 16 16">
                                            <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                        </svg>
                                    </CardFooter>
                                </Card>
                            ))}
                            <Card className="w-32 h-32 flex-none">
                                <CardBody className="p-0">
                                    <Button className="w-full h-full bg-white">+</Button>
                                </CardBody>
                            </Card>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

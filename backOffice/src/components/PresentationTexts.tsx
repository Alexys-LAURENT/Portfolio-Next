import { Textarea, Input, Card, CardBody, Button } from "@nextui-org/react";
import { useState, useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { updateItem } from "../utils/apiHandler";
const PresentationTexts = ({ AproposSubTitle, AproposDescription }: { AproposSubTitle: string, AproposDescription: string }) => {

    const [subTitle, setSubTitle] = useState(AproposSubTitle)
    const [description, setDescription] = useState(AproposDescription)
    const { success, error } = useContext(MessageContext)

    async function handleSubmitTexts() {
        if (subTitle === "" || description === "") { error("Veuillez remplir tous les champs"); return }

        try {
            const isUpdated = await updateItem("a_propos", 1, { subTitle: subTitle, description: description })
            !isUpdated ? error("Une erreur est survenue") : success("Les textes ont été modifiés avec succès")
        } catch (err) {
            error("Une erreur est survenue " + err)
        }
    }

    return (
        <Card className="w-full">
            <CardBody className="gap-4">
                <Input required key={AproposSubTitle} label="SousTitre" defaultValue={AproposSubTitle} onChange={(e) => setSubTitle(e.target.value)} labelPlacement="outside" />
                <Textarea
                    key={AproposDescription}
                    label="Description"
                    placeholder="Enter your description"
                    className="w-full"
                    labelPlacement="outside"
                    defaultValue={AproposDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    maxRows={5}
                    minRows={2}
                    required
                    classNames={{ inputWrapper: "h-auto" }}
                />
            </CardBody>
            <div className="flex justify-end w-full mb-2 pe-2">
                <Button className="w-fit" color="primary" onClick={handleSubmitTexts}>Enregistrer</Button>
            </div>
        </Card>
    );
};

export default PresentationTexts;
import './App.css'
import { Tabs, Tab } from "@nextui-org/react";
import Presentation from './pages/Presentation';
import Alternance from './pages/Alternance';
import Projets from './pages/Projets';
import { useEffect, useState } from 'react'
import { getFromApi } from './utils/apiHandler';
import { AProposType } from './types/AProposType';

export default function App() {
  const [projets, setProjets] = useState([])
  const [alternance, setAlternance] = useState([])
  const [aPropos, setAPropos] = useState<AProposType>({} as AProposType)
  useEffect(() => {
    getFromApi("a_propos").then((res) => {
      setAPropos(res)
    })
    getFromApi("alternance").then((res) => {
      setAlternance(res)
    })
    getFromApi("projets").then((res) => {
      setProjets(res)
    })
  }, [])

  if (!projets || !alternance || !aPropos) return (<div>Chargement...</div>)

  return aPropos && projets && projets.length > 0 && alternance && alternance.length > 0 ? (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" className='w-full bg-bgLight dark:bg-bgDark' classNames={{ tabList: "bg-bgLight dark:bg-bgDark" }}>
        <Tab key="a_propos" title="A propos">
          <Presentation APropos={aPropos} />
        </Tab>
        <Tab key="alternance" title="Alternance">
          <Alternance />
        </Tab>
        <Tab key="projets" title="Projets">
          <Projets />
        </Tab>
      </Tabs>
    </div>
  ) : (<div>Chargement...</div>);
}

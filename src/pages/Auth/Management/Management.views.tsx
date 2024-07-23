import { useState } from "react";
import { CardContainer } from "src/components/Layout/CardContainer";
import { Tabs } from "src/components/Tabs/Tabs";
import "./Management.css";
import { TabAcessos } from "./TabAcessos";
import { TabDocumentos } from "./TabDocumentos";
import { TabPersonlizacao } from "./TabPersonalizacao";

export const Management = () => {
  const titles = ["Acessos", "Personalização", "Documentos"];
  const [activeTab, setActiveTab] = useState(titles[0]);

  return (
    <CardContainer>
      <h4 className="subtitulo">Administração da Reurb</h4>
      <Tabs titles={titles} activeTab={activeTab} setActiveTab={setActiveTab} />
      {(() => {
        switch (activeTab) {
          case "Acessos":
            return <TabAcessos />;
          case "Personalização":
            return <TabPersonlizacao />;
          case "Documentos":
            return <TabDocumentos />;
          default:
            return "Acessos";
        }
      })()}
    </CardContainer>
  );
};

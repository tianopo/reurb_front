import { useState } from "react";
import { CardContainer } from "src/components/Layout/CardContainer";
import { Tabs } from "src/components/Tabs/Tabs";
import "./Financial.css";

export const Financial = () => {
  const titles = ["Lançamentos", "Em Processo", "Concluidos"];
  const [activeTab, setActiveTab] = useState(titles[0]);

  return (
    <CardContainer>
      <h5 className="subtitulo">Financeiro</h5>
      <Tabs titles={titles} activeTab={activeTab} setActiveTab={setActiveTab} />
      {(() => {
        switch (activeTab) {
          case "Lançamentos":
            return "";
          case "Em Processo":
            return "";
          case "Concluidos":
            return "";
          default:
            return "Lançamentos";
        }
      })()}
    </CardContainer>
  );
};

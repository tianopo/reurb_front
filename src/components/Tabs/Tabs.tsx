import "./Tabs.css";

interface ITabs {
  titles: string[];
  activeTab: string;
  setActiveTab: (title: string) => void;
}

export const Tabs = ({ titles, activeTab, setActiveTab }: ITabs) => {
  return (
    <div className="flex w-full items-start justify-between border-b-1 border-edge-primary text-write-secundary">
      {titles.map((title: string) => (
        <div
          key={title}
          className={`container_tab ${activeTab === title ? "border-primary transition-colors duration-500 ease-linear active:border-primary" : ""} `}
          onClick={() => setActiveTab(title)}
        >
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
};

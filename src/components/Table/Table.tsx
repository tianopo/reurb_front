import { Gear } from "@phosphor-icons/react";
import "./Table.css";

interface ITable {
  headers: {
    title: string;
    width: string;
  }[];
  data: {
    one: string;
    two?: string;
    three?: string;
  }[];
}

export const Table = ({ headers, data }: ITable) => {
  return (
    <div className="w-full overflow-x-auto">
      <span className="text-write-primary">
        Mostrando {data.length} usuário{data.length > 1 && "s"}
      </span>
      <table className="w-full rounded-lg border-1 border-edge-primary bg-white text-start">
        <thead>
          <tr className="bg-secundary uppercase leading-pattern text-write-primary">
            {headers.map((header, index) => (
              <th key={index} className={`space-h min-w-${header.width} max-w-${header.width}`}>
                {header.title}
              </th>
            ))}
            <th className="space-h min-w-6 max-w-6"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className={`space-b min-w-${headers[0].width} max-w-${headers[0].width}`}>
                {row.one}
              </td>
              <td className={`space-b min-w-${headers[1].width} max-w-${headers[1].width}`}>
                {row?.two}
              </td>
              <td className={`space-b min-w-${headers[2].width} max-w-${headers[2].width}`}>
                {row?.three}
              </td>
              <td className={`space-b min-w-6 max-w-6`}>
                <Gear size={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

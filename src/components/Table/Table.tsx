import { Gear } from "@phosphor-icons/react";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import { IconX } from "../Icons/IconX";
import "./Table.css";

interface ITable {
  headers: {
    title: string;
  }[];
  data: {
    id: string;
    one: string;
    two?: string;
    three?: string;
    four?: string;
  }[];
  onClick?: (id: string, access: string) => void;
}

export const Table = ({ headers, data, onClick }: ITable) => {
  const { acesso } = useAccessControl();
  return (
    <div className="w-full overflow-x-auto">
      <span className="text-write-primary">
        Mostrando {data.length} dado{data.length > 1 && "s"}
      </span>
      <table className="w-full rounded-lg border-1 border-edge-primary bg-white text-start">
        <thead>
          <tr className="bg-secundary uppercase leading-pattern text-write-primary">
            {headers.map((header, index) => (
              <th key={index} className={`space-h max-w-full truncate`}>
                {header.title}
              </th>
            ))}
            <th className="space-h min-w-6 max-w-6"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="">
              <td className={`space-b max-w-32 truncate`}>{row.one}</td>
              <td className={`space-b max-w-12 truncate`}>{row?.two}</td>
              <td className={`space-b max-w-8 truncate`}>{row?.three}</td>
              {row?.four && <td className={`space-b max-w-8 truncate`}>{row?.four}</td>}
              {acesso !== Role.Cliente && (
                <td className={`space-b min-w-6 max-w-6`}>
                  <IconX
                    name="Editar"
                    icon={
                      <Gear
                        className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
                        width={19.45}
                        height={20}
                        weight="fill"
                        onClick={() => row?.two && onClick?.(row?.id, row.two)}
                      />
                    }
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

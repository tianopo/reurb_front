import { Gear } from "@phosphor-icons/react";
import { IconX } from "src/components/Icons/IconX";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import "../Financial.css";

interface ITableFinancial {
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

export const TableFinancial = ({ headers, data, onClick }: ITableFinancial) => {
  const { acesso } = useAccessControl();

  const calculateTotal = (data: any[], type: string) => {
    return data
      .filter((item: any) => item.four === type)
      .reduce((total: number, item: any) => {
        const value = parseCurrency(item.two);
        return type === "Entrada" ? total + value : total - value;
      }, 0);
  };

  const parseCurrency = (currencyString: string): number => {
    return parseFloat(currencyString.replace(/R\$|\./g, "").replace(",", "."));
  };

  const formatCurrency = (amount: number) => {
    return `R$ ${amount
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .replace(".", ",")}`;
  };

  const totalEntrada = calculateTotal(data, "Entrada");
  const totalSaida = calculateTotal(data, "Saída");
  const total = totalEntrada + totalSaida;

  const formattedTotal = formatCurrency(total);

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
              <td className={`space-b max-w-12 truncate`}>{row.two}</td>
              <td className={`space-b max-w-8 truncate`}>{row.three}</td>
              {row.four && <td className={`space-b max-w-8 truncate`}>{row.four}</td>}
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
          <tr className="bg-light-gray">
            <td className="space-b" colSpan={headers.length - 1}>
              Total
            </td>
            <td className="space-b text-right">{formattedTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

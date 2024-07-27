import { useEffect, useState } from "react";
import { Button } from "src/components/Buttons/Button";
import { InputSearch } from "src/components/Form/Input/InputSearch";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { Modal } from "src/components/Modal/Modal";
import { formatCurrency } from "src/utils/formats";

interface IModalUserProjects {
  isVisible: boolean;
  onClose: () => void;
}

export const ModalUserProjects = ({ isVisible, onClose }: IModalUserProjects) => {
  const [valueValor, setValueValor] = useState("");
  const [valueValorParcela, setValueValorParcela] = useState("");
  const [valueValorEntrada, setValueValorEntrada] = useState("");
  const [parcelas, setParcelas] = useState(1);

  const handleValorFormat = (e: { target: { value: string } }) => {
    const formattedValor = formatCurrency(e.target.value);
    setValueValor(formattedValor);
  };

  const handleValorEntradaFormat = (e: { target: { value: string } }) => {
    const formattedValorEntrada = formatCurrency(e.target.value);
    setValueValorEntrada(formattedValorEntrada);
  };

  const handleParcelasChange = (e: { target: { value: string } }) => {
    setParcelas(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    const valor = parseFloat(valueValor.replace(/[^0-9,-]+/g, "").replace(",", "."));
    const entrada = parseFloat(valueValorEntrada.replace(/[^0-9,-]+/g, "").replace(",", "."));
    const totalParcelas = parcelas > 0 ? parcelas : 1;

    if (!isNaN(valor) && !isNaN(entrada) && totalParcelas > 0) {
      const valorParcela = ((valor - entrada) / totalParcelas).toFixed(2);
      setValueValorParcela(`R$ ${valorParcela.replace(".", ",")}`);
    }
  }, [valueValor, valueValorEntrada, parcelas]);

  if (!isVisible) return null;

  return (
    <Modal onClose={onClose}>
      <h4 className="text-lg font-semibold">Adicionar Projeto ao Usuário</h4>
      <InputX
        title="Valor"
        placeholder="R$ 8.000,00"
        onChange={handleValorFormat}
        value={valueValor}
        required
      />
      <InputX
        title="Entrada"
        placeholder="R$ 8.000,00"
        onChange={handleValorEntradaFormat}
        value={valueValorEntrada}
        required
      />
      <Select
        title="Parcelas"
        options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
        onChange={handleParcelasChange}
        value={parcelas.toString()}
        required
      />
      <InputX
        title="Valor da Parcela"
        placeholder="R$ 5.000,00"
        value={valueValorParcela}
        readOnly
        required
      />
      <Select title="Dia do Vencimento" options={["10", "20", "30"]} required />
      <div className="flex flex-col gap-1">
        <p className="text-start text-write-primary">Projeto</p>
        <InputSearch title="Projeto" placeholder="Encontre um projeto" />
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>adicionar projeto</Button>
        </div>
      </div>
    </Modal>
  );
};

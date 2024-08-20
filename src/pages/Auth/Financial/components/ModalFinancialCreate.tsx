import { IdentificationCard } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { Modal } from "src/components/Modal/Modal";
import { IClientDto, IFinancialDto } from "src/interfaces/models";
import { formatCurrency } from "src/utils/formats";
import { useCreateFinancial } from "../hooks/useCreateFinancial";
import { useGetClients } from "../hooks/useGetClients";
import { SelectFinancial } from "./SelectFinancial";

interface IModalFinancialCreate {
  onClose: () => void;
}

export const ModalFinancialCreate = ({ onClose }: IModalFinancialCreate) => {
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState<IFinancialDto["status"]>("Lançamentos");
  const [tipo, setTipo] = useState<IFinancialDto["tipo"]>("Entrada");
  const [cliente, setCliente] = useState<string>("");
  const [clienteInput, setClienteInput] = useState("");
  const [clienteNome, setClienteNome] = useState("");

  const { mutate, isPending, context } = useCreateFinancial(onClose);
  const {
    formState: { errors },
    setValue,
  } = context;

  useEffect(() => {
    return setValue("status", status);
  }, [setStatus]);

  const handleValorFormat = (e: { target: { value: string } }) => {
    const formattedTotalValue = formatCurrency(e.target.value);
    setValor(formattedTotalValue);
    setValue("valor", formattedTotalValue);
  };

  const handleTipoFormat = (e: { target: { value: string } }) => {
    const value = e.target.value as IFinancialDto["tipo"];
    setTipo(value);
    setValue("tipo", value);
  };

  const handleClienteAdd = () => {
    const selectedCliente = data.find(
      (clienteBack: IClientDto) =>
        clienteBack.nome === clienteInput.trim() && clienteBack.id !== cliente,
    );

    if (selectedCliente) {
      setCliente(selectedCliente.id);
      setClienteNome(selectedCliente.nome);
      setClienteInput("");
    }
  };

  const handleClienteRemove = () => {
    setCliente("");
    setClienteNome("");
    setValue("clienteId", "");
  };

  const onSubmit = (data: IFinancialDto) => {
    mutate({
      ...data,
      clienteId: cliente,
    });
  };
  const { data, isLoading, error } = useGetClients();

  const handleFinancialTypeSelect = (option: IFinancialDto["status"]) => {
    setStatus(option);
    setValue("status", option);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex w-full flex-col justify-between md:flex-row">
        <h5>Adicionar Financeiro</h5>
        <SelectFinancial setStatus={handleFinancialTypeSelect} status={status} />
      </div>
      <FormProvider {...context}>
        <FormX
          onSubmit={onSubmit}
          className={`flex flex-col ${tipo === "Entrada" ? "gap-1.5" : "gap-4"} `}
        >
          <InputX title="Nome" placeholder="Ciclano Silva" required />
          <InputX
            title="Valor"
            placeholder="R$ 2.500,00"
            onChange={handleValorFormat}
            value={valor}
            required
          />
          <Select
            title="Pagamento"
            placeholder="Forma de Pagamento"
            options={["Crédito", "Débito", "Boleto", "Dinheiro", "Pix", "Outros"]}
            required
          />
          <div className="div-inputs">
            <Select
              title="Tipo"
              placeholder="Escolha"
              options={["Entrada", "Saída"]}
              onChange={handleTipoFormat}
              value={tipo}
              required
            />
            {tipo === "Entrada" && (
              <Select
                title="Vencimento"
                placeholder="dia do vencimento"
                options={["10", "20", "30"]}
              />
            )}
          </div>
          {tipo === "Entrada" && (
            <>
              <div className="div-inputs items-end">
                <InputX
                  title="Cliente"
                  placeholder="Digite o nome do cliente"
                  value={clienteInput}
                  onChange={(e) => setClienteInput(e.target.value)}
                  busca
                  options={data
                    ?.filter(
                      (clienteBack: IClientDto) =>
                        clienteBack.nome.toLowerCase().includes(clienteInput.toLowerCase()) &&
                        clienteBack.id !== cliente,
                    )
                    .map((cliente: IClientDto) => cliente.nome)}
                />
                <Button type="button" disabled={isLoading} onClick={handleClienteAdd}>
                  Adicionar Cliente
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-write-secundary">
                {cliente && (
                  <div key={cliente} className="flex items-center gap-1">
                    <IdentificationCard />
                    <p>{clienteNome}</p>
                    <button type="button" onClick={handleClienteRemove}>
                      ✖
                    </button>
                  </div>
                )}
                {isLoading && <h6 className="text-center text-write-primary">Carregando...</h6>}
                {error && (
                  <>
                    <h6 className="text-center text-write-primary">
                      Ocorreu um erro ao carregar os dados.
                    </h6>
                    <p className="text-center text-red-500">{error?.message}</p>
                  </>
                )}
              </div>
            </>
          )}
          <Button disabled={isPending || Object.keys(errors).length > 0}>Adicionar</Button>
        </FormX>
      </FormProvider>
    </Modal>
  );
};

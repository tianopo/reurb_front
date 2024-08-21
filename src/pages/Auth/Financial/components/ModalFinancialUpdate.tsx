import { Gear, IdentificationCard, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "src/components/Buttons/Button";
import { FormX } from "src/components/Form/FormX";
import { InputX } from "src/components/Form/Input/InputX";
import { Select } from "src/components/Form/Select/Select";
import { IconX } from "src/components/Icons/IconX";
import { Modal } from "src/components/Modal/Modal";
import { ConfirmationModal } from "src/components/Modal/ConfirmationModal";
import { IClientDto, IFinancialDto, IFinancialUpdateDto } from "src/interfaces/models";
import { Role, useAccessControl } from "src/routes/context/AccessControl";
import { formatCurrency } from "src/utils/formats";
import { useDelFinancial } from "../hooks/useDelFinancial";
import { useGetClients } from "../hooks/useGetClients";
import { useUpdateFinancial } from "../hooks/useUpdateFinancial";
import { SelectFinancial } from "./SelectFinancial";

interface IModalFinancialUpdate {
  onClose: () => void;
  financial?: IFinancialUpdateDto;
}

export const ModalFinancialUpdate = ({ onClose, financial }: IModalFinancialUpdate) => {
  const [valor, setValor] = useState(financial?.valor || "");
  const [status, setStatus] = useState(financial?.status || "Lançamentos");
  const [tipo, setTipo] = useState<IFinancialUpdateDto["tipo"]>(financial?.tipo || "Entrada");
  const [cliente, setCliente] = useState(financial?.cliente || undefined);
  const [clienteInput, setClienteInput] = useState("");
  const [edit, setEdit] = useState(false);
  const { acesso } = useAccessControl();
  const [isConfirming, setIsConfirming] = useState(false);

  const { mutate, isPending, context } = useUpdateFinancial(financial?.id || "", onClose);
  const {
    formState: { errors },
    setValue,
  } = context;

  const { mutate: mutateDel } = useDelFinancial(financial?.id || "", onClose);

  useEffect(() => {
    return setValue("status", status);
  }, [setStatus]);

  useEffect(() => {
    if (financial) {
      setValue("nome", financial.nome || "");
      setValue("tipo", tipo);
      setValue("valor", valor);
      setValue("status", status);
      setValue("pagamento", financial.pagamento || "");
      setValue("vencimento", financial.vencimento || "");
    }
  }, [financial, setValue]);

  const handleValorFormat = (e: { target: { value: string } }) => {
    const formattedValue = formatCurrency(e.target.value);
    setValor(formattedValue);
    setValue("valor", formattedValue);
  };

  const handleTipoFormat = (e: { target: { value: string } }) => {
    const value = e.target.value as IFinancialDto["tipo"];
    setTipo(value);
    setValue("tipo", value);
  };

  const handleClienteAdd = () => {
    const selectedCliente = data.find(
      (clienteBack: IClientDto) =>
        clienteBack.nome === clienteInput.trim() && clienteBack.id !== cliente?.id,
    );

    if (selectedCliente) {
      setCliente(selectedCliente);
      setClienteInput("");
    }
  };

  const handleClienteRemove = () => {
    setCliente(undefined);
    setValue("cliente", undefined);
  };

  const onSubmit = (data: IFinancialDto) => {
    mutate({
      ...data,
      cliente: cliente,
    });
  };
  const { data, isLoading, error } = useGetClients();

  const handleFinancialTypeSelect = (option: IFinancialDto["status"]) => {
    setStatus(option);
    setValue("status", option);
  };

  const handleDelete = () => {
    setIsConfirming(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirming(false);
    mutateDel();
  };

  const handleCancelDelete = () => {
    setIsConfirming(false);
  };

  return (
    <Modal onClose={onClose}>
      <div className="flex w-full flex-col justify-between md:flex-row">
        <h5>Atualizar Financeiro</h5>
        {![Role.Cliente, Role.Funcionario, null].includes(acesso) && (
          <div className="flex gap-1">
            <SelectFinancial
              setStatus={handleFinancialTypeSelect}
              status={status}
              disabled={!edit}
            />
            <IconX
              name="Excluir"
              icon={
                <Trash
                  className="cursor-pointer rounded-6 text-variation-error hover:bg-secundary hover:text-write-primary"
                  width={19.45}
                  height={20}
                  weight="regular"
                  onClick={handleDelete}
                />
              }
            />
            <IconX
              name="Editar"
              icon={
                <Gear
                  className="cursor-pointer rounded-6 text-write-secundary hover:bg-secundary hover:text-write-primary"
                  width={19.45}
                  height={20}
                  weight="fill"
                  onClick={() => setEdit(!edit)}
                />
              }
            />
          </div>
        )}
      </div>
      <FormProvider {...context}>
        <FormX
          onSubmit={onSubmit}
          className={`flex flex-col ${tipo === "Entrada" ? "gap-1.5" : "gap-4"} `}
        >
          <InputX title="Nome" placeholder="Ciclano Silva" disabled={!edit} required />
          <InputX
            title="Valor"
            placeholder="R$ 2.500,00"
            onChange={handleValorFormat}
            value={valor}
            disabled={!edit}
            required
          />
          <Select
            title="Pagamento"
            placeholder="Forma de Pagamento"
            options={["Crédito", "Débito", "Boleto", "Dinheiro", "Pix", "Outros"]}
            disabled={!edit}
            required
          />
          <div className="div-inputs">
            <Select
              title="Tipo"
              placeholder="Escolha"
              options={["Entrada", "Saída"]}
              onChange={handleTipoFormat}
              value={tipo}
              disabled={!edit}
              required
            />
            {tipo === "Entrada" && (
              <Select
                title="Vencimento"
                placeholder="dia do vencimento"
                options={["10", "20", "30"]}
                disabled={!edit}
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
                  disabled={!edit}
                  busca
                  options={data
                    ?.filter(
                      (clienteBack: IClientDto) =>
                        clienteBack.nome.toLowerCase().includes(clienteInput.toLowerCase()) &&
                        clienteBack.id !== cliente?.id,
                    )
                    .map((cliente: IClientDto) => cliente.nome)}
                />
                <Button type="button" disabled={isLoading || !edit} onClick={handleClienteAdd}>
                  Adicionar Cliente
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-write-secundary">
                {cliente && (
                  <div key={cliente.id} className="flex items-center gap-1">
                    <IdentificationCard />
                    <p>{cliente.nome}</p>
                    <button
                      type="button"
                      disabled={isLoading || !edit}
                      onClick={handleClienteRemove}
                    >
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
          <Button disabled={isPending || Object.keys(errors).length > 0 || !edit}>Atualizar</Button>
        </FormX>
      </FormProvider>
      {isConfirming && (
        <ConfirmationModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
    </Modal>
  );
};

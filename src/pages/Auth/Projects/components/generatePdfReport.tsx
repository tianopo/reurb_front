import {
  IClientDto,
  IContributionDto,
  IEmployeeDto,
  IProjectUpdateDto,
} from "src/interfaces/models";
import { formatCurrency, formatDate } from "src/utils/formats";

export const generatePdfReport = (project: IProjectUpdateDto) => {
  const funcionarios = project.funcionarios as IEmployeeDto[];
  const clientes = project.clientes as IClientDto[];
  const contributions = project.contributions as IContributionDto[];
  const clientMap = new Map<string, string>();

  clientes.forEach((cliente) => {
    return clientMap.set(cliente?.id || "", cliente?.nome);
  });

  const parseCurrencyPdf = (currencyPdfString: string): number => {
    return parseFloat(currencyPdfString.replace(/R\$|\./g, "").replace(",", "."));
  };

  const formatCurrencyPdf = (amount: number): string => {
    return `R$ ${amount
      .toFixed(2)
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
  };

  const totalValue = contributions.reduce((acc, contrib) => {
    return acc + parseCurrencyPdf(contrib.valor);
  }, 0);
  const formattedTotalValue = formatCurrencyPdf(totalValue);

  // PDF content initialization
  let pdfContent = `%PDF-1.1
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Count 1
/Kids [3 0 R]
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 5 0 R
>>
stream
`;
  // Define the starting Y position for the content
  let yPosition = 750;
  const leftMargin = 50; // Left margin for content
  const columnWidths = {
    nome: 150,
    valor: 90,
    entrada: 90,
    parcelas: 60,
    valorParcela: 90,
  };
  // Title of the Report
  pdfContent += `BT
/F1 24 Tf
1 0 0 1 50 ${yPosition} Tm
(Reporte Financeiro do Projeto ${project?.nome}) Tj
ET
`;
  yPosition -= 30;
  // Project Data
  pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition} Tm
(Nome: ${project?.nome}) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor} ${yPosition} Tm
(Inicio: ${formatDate(project?.dataInicio)}) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor + columnWidths.entrada + columnWidths.parcelas} ${yPosition} Tm
(Status: ${project?.status}) Tj
ET
`;
  yPosition -= 20;
  pdfContent += `BT
/F1 12 Tf
1 0 0 1 50 ${yPosition} Tm
(Description: ${project?.descricao}) Tj
ET
`;
  yPosition -= 20;
  pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition} Tm
(Total: ${formatCurrency(project?.valorTotal || "")}) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor + columnWidths.entrada + columnWidths.parcelas} ${yPosition} Tm
(Acumulado: ${formatCurrency(project?.valorAcumulado || "")}) Tj
ET
`;
  yPosition -= 30;

  // Employees
  if (funcionarios.length > 0) {
    pdfContent += `BT
/F1 12 Tf
1 0 0 1 50 ${yPosition} Tm
(Employees:) Tj
ET
`;
    yPosition -= 20;
    funcionarios.forEach((funcionario, index) => {
      pdfContent += `BT
/F1 12 Tf
1 0 0 1 50 ${yPosition - index * 20} Tm
(${index + 1}. ${funcionario.nome}) Tj
ET
`;
    });
    yPosition -= funcionarios.length * 20;
  }
  yPosition -= 10;
  // Clients
  if (clientes.length > 0) {
    pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition} Tm
(Clientes:) Tj
ET
`;
    yPosition -= 20;
    clientes.forEach((cliente, index) => {
      pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition - index * 20} Tm
(${index + 1}. ${cliente.nome}) Tj
ET
`;
    });
    yPosition -= clientes.length * 20;
  }
  yPosition -= 10;
  // Contributions
  if (contributions.length > 0) {
    pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition} Tm
(Contribuicoes:) Tj
ET
`;
    yPosition -= 20;
    // Table Header
    pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition} Tm
(Nome) Tj
1 0 0 1 ${leftMargin + columnWidths.nome} ${yPosition} Tm
(Valor) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor} ${yPosition} Tm
(Entrada) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor + columnWidths.entrada} ${yPosition} Tm
(Parcelas) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor + columnWidths.entrada + columnWidths.parcelas} ${yPosition} Tm
(Valor das Parcelas) Tj
ET
`;
    yPosition -= 20;
    // Table Rows
    contributions.forEach((contrib, index) => {
      const clientName = clientMap.get(contrib.userId) || "Unknown Client";
      pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition - index * 20} Tm
(${clientName.split(" ")[0]}) Tj
1 0 0 1 ${leftMargin + columnWidths.nome} ${yPosition - index * 20} Tm
(${formatCurrency(contrib.valor)}) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor} ${yPosition - index * 20} Tm
(${formatCurrency(contrib.entrada)}) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor + columnWidths.entrada} ${yPosition - index * 20} Tm
(${contrib.parcelas}) Tj
1 0 0 1 ${leftMargin + columnWidths.nome + columnWidths.valor + columnWidths.entrada + columnWidths.parcelas} ${yPosition - index * 20} Tm
(${formatCurrency(contrib.valorParcela)}) Tj
ET
`;
    });
    yPosition -= contributions.length * 20;
    pdfContent += `BT
/F1 12 Tf
1 0 0 1 ${leftMargin} ${yPosition} Tm
(Total) Tj
1 0 0 1 ${leftMargin + columnWidths.nome} ${yPosition} Tm
(${formattedTotalValue}) Tj
ET
`;
  }
  pdfContent += `endstream
endobj
5 0 obj
${pdfContent.length}
endobj
trailer
<<
/Root 1 0 R
>>
%%EOF`;
  // Convert string to Blob and create download link
  const blob = new Blob([pdfContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  // Create a link element to download the PDF
  const link = document.createElement("a");
  link.href = url;
  link.download = `Projeto_Reporte_Financeiro_${project?.nome}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Clean up URL object
  URL.revokeObjectURL(url);
};

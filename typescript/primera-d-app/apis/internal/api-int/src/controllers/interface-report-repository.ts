export interface SaveTemplateRequest {
  TemplateISV: string;
  TemplateDapp: string;
  TemplateName: string;
  TemplateDescription: string;
}

export interface GenerateReportRequest {
  RutCliente: string;
  RutClientePrestamista: string;
  FondoClientePrestamista: string;
  Nemotecnico: string;
  Cantidad: string;
  Precio: string;
  Monto: string;
}

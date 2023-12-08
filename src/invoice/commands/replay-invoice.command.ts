type Input = {
  invoiceId: string;
  since: number;
};

export class ReplayInvoiceCommand {
  constructor(public readonly data: Input) {}
}

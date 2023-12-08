type Input = {
  invoiceId: string;
  value: number;
};

export class UpdateInvoiceValueCommand {
  constructor(public readonly data: Input) {}
}

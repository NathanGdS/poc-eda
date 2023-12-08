type Input = {
  description: string;
  value: number;
};

export class CreateInvoiceCommand {
  constructor(public readonly data: Input) {}
}

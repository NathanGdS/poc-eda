type Input = {
  id: string;
  description?: string;
  value: number;
  name: string;
};

export class InvoiceAlteredEvent {
  constructor(public readonly data: Input) {}
}

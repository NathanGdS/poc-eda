import { AggregateRoot } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { InvoiceAlteredEvent } from '../events/invoice-altered.event';

export class Invoice extends AggregateRoot {
  private constructor(
    public id: string,
    public description: string,
    public value: number,
  ) {
    super();
    this.id = id ?? randomUUID();
    this.description = description;
    this.value = value;
  }

  static create(description: string, value: number, id?: string) {
    const invoice = new Invoice(id ?? null, description, value);
    invoice.apply(
      new InvoiceAlteredEvent({
        id: invoice.id,
        description: invoice.description,
        value: invoice.value,
        name: 'invoice-created',
      }),
    );
    return invoice;
  }

  static restore(id: string, description: string, value: number) {
    return new Invoice(id, description, value);
  }

  updateValue(value: number) {
    this.value = value;
    this.apply(
      new InvoiceAlteredEvent({
        id: this.id,
        value: this.value,
        name: 'invoice-value-updated',
      }),
    );
    return this;
  }
}

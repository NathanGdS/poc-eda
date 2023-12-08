import { Injectable } from '@nestjs/common';

type InvoiceType = {
  id: string;
  description: string;
  value: number;
};

@Injectable()
export class InvoiceInMemory {
  invoices: InvoiceType[] = [];

  createInvoice(data: InvoiceType) {
    this.invoices.push(data);
  }

  getInvoices() {
    return this.invoices;
  }

  getById(id: string) {
    return this.invoices.find((invoice) => invoice.id === id);
  }

  updateValue(value: number, invoiceId: string) {
    const invoiceIndex = this.invoices.findIndex(
      (invoice) => invoice.id === invoiceId,
    );

    if (invoiceIndex === -1) {
      throw new Error('Invoice not found');
    }

    this.invoices[invoiceIndex].value += value;
  }
}

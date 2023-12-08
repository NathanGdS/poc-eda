import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InvoiceInMemory } from 'src/inMemory/invoice-repository';
import { CreateInvoiceCommand } from '../commands/create-invoice.command';
import { Invoice } from '../models/Invoice';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  constructor(
    private publisher: EventPublisher,
    private repository: InvoiceInMemory,
  ) {}

  async execute({ data }: CreateInvoiceCommand) {
    const invoice = Invoice.create(data.description, data.value);
    console.log('Invoice created...');
    const invoiceModel = this.publisher.mergeObjectContext(invoice);
    this.repository.createInvoice(invoice);
    invoiceModel.commit();
  }
}

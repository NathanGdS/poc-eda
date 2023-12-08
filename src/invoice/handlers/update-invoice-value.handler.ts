import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InvoiceInMemory } from 'src/inMemory/invoice-repository';
import { UpdateInvoiceValueCommand } from '../commands/update-invoice-value.command';
import { Invoice } from '../models/Invoice';

@CommandHandler(UpdateInvoiceValueCommand)
export class UpdateInvoiceValueHandler
  implements ICommandHandler<UpdateInvoiceValueCommand>
{
  constructor(
    private publisher: EventPublisher,
    private repository: InvoiceInMemory,
  ) {}

  async execute({ data }: UpdateInvoiceValueCommand) {
    const invoiceData = this.repository.getById(data.invoiceId);
    const invoice = Invoice.restore(
      invoiceData.id,
      invoiceData.description,
      invoiceData.value,
    ).updateValue(data.value);
    const invoiceModel = this.publisher.mergeObjectContext(invoice);
    this.repository.updateValue(data.value, data.invoiceId);
    invoiceModel.commit();
  }
}

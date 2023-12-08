import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InvoiceStoredEvents } from 'src/inMemory/Invoice-stored-events';
import { InvoiceInMemory } from 'src/inMemory/invoice-repository';
import { ReplayInvoiceCommand } from '../commands/replay-invoice.command';
import { UpdateInvoiceValueCommand } from '../commands/update-invoice-value.command';

@CommandHandler(ReplayInvoiceCommand)
export class ReplayInvoiceHandler
  implements ICommandHandler<ReplayInvoiceCommand>
{
  constructor(
    private publisher: CommandBus,
    private repository: InvoiceInMemory,
    private invoiceStoredEvents: InvoiceStoredEvents,
  ) {}
  async execute({ data }: ReplayInvoiceCommand) {
    const invoiceEvents = this.invoiceStoredEvents.getEventsById(
      data.invoiceId,
    ).events;

    const eventsToReplay = invoiceEvents.slice(
      data.since + 1,
      invoiceEvents.length,
    );
    console.log('Replay', eventsToReplay);
    for (const event of eventsToReplay) {
      if (event['name'] === 'invoice-value-updated') {
        this.publisher.execute(
          new UpdateInvoiceValueCommand({
            invoiceId: event['id'],
            value: event['value'],
          }),
        );
      }
    }
  }
}

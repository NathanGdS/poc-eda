import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InvoiceStoredEvents } from 'src/inMemory/Invoice-stored-events';
import { InvoiceAlteredEvent } from '../events/invoice-altered.event';

@EventsHandler(InvoiceAlteredEvent)
export class InvoiceAlteredHandler
  implements IEventHandler<InvoiceAlteredEvent>
{
  constructor(private storeEvent: InvoiceStoredEvents) {}

  handle(event: any) {
    console.log('event received', event);
    this.storeEvent.save(event.data.id, event.data, 'Invoice');
  }
}

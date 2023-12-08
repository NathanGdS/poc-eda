import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoiceStoredEvents } from 'src/inMemory/Invoice-stored-events';
import { InvoiceInMemory } from 'src/inMemory/invoice-repository';
import { InvoiceAlteredHandler } from './event-handlers/invoice-altered.event-handler';
import { CreateInvoiceHandler } from './handlers/create-invoice.handler';
import { ReplayInvoiceHandler } from './handlers/replay-invoice.handler';
import { UpdateInvoiceValueHandler } from './handlers/update-invoice-value.handler';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [CqrsModule],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    CreateInvoiceHandler,
    UpdateInvoiceValueHandler,
    InvoiceAlteredHandler,
    InvoiceStoredEvents,
    ReplayInvoiceHandler,
    InvoiceInMemory,
  ],
})
export class InvoiceModule {}

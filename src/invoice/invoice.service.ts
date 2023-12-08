import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InvoiceStoredEvents } from 'src/inMemory/Invoice-stored-events';
import { InvoiceInMemory } from 'src/inMemory/invoice-repository';
import { CreateInvoiceCommand } from './commands/create-invoice.command';
import { ReplayInvoiceCommand } from './commands/replay-invoice.command';
import { UpdateInvoiceValueCommand } from './commands/update-invoice-value.command';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceValueDto } from './dto/update-invoice-value.dto';

@Injectable()
export class InvoiceService {
  constructor(
    private commandBus: CommandBus,
    private invoiceEvents: InvoiceStoredEvents,
    private invoiceRepository: InvoiceInMemory,
  ) {}

  async createInvoice(data: CreateInvoiceDto) {
    return this.commandBus.execute(
      new CreateInvoiceCommand({
        description: data.description,
        value: data.value,
      }),
    );
  }

  async getEvents() {
    return this.invoiceEvents.getEvents();
  }

  async getInvoices() {
    return this.invoiceRepository.getInvoices();
  }

  async updateValue(data: UpdateInvoiceValueDto, invoiceId: string) {
    return this.commandBus.execute(
      new UpdateInvoiceValueCommand({
        value: data.value,
        invoiceId,
      }),
    );
  }

  async replayInvoice(invoiceId: string, since: number) {
    return this.commandBus.execute(
      new ReplayInvoiceCommand({
        invoiceId,
        since: 0,
      }),
    );
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ReplayInvoiceDto } from './dto/replay-invoice.dto';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async createInvoice(@Body() data: CreateInvoiceDto) {
    return this.invoiceService.createInvoice(data);
  }

  @Post('value/:invoiceId')
  async updateValue(
    @Body() data: CreateInvoiceDto,
    @Param('invoiceId') invoiceId: string,
  ) {
    return this.invoiceService.updateValue(data, invoiceId);
  }

  @Post('reprocess/:invoiceId')
  async replayInvoice(
    @Param('invoiceId') invoiceId: string,
    @Body() data: ReplayInvoiceDto,
  ) {
    return this.invoiceService.replayInvoice(invoiceId, data.since);
  }

  @Get()
  async getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @Get('events')
  async getEvents() {
    return this.invoiceService.getEvents();
  }
}

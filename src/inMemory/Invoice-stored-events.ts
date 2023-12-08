import { Injectable } from '@nestjs/common';

type InvoiceEvent = {
  id: string;
  scope: string;
  events: object[];
  triggeredAt: Date;
};

@Injectable()
export class InvoiceStoredEvents {
  events: Array<InvoiceEvent> = [];

  save(id: string, data: object, scope: string) {
    const alreadyExists = this.events.findIndex((event) => event.id === id);

    if (alreadyExists >= 0) {
      this.events[alreadyExists].events.push(data);
      return;
    }

    this.events.push({
      id,
      scope,
      events: [data],
      triggeredAt: new Date(),
    });
  }

  getEvents() {
    return this.events;
  }

  getEventsById(id: string) {
    return this.events.find((event) => event.id === id);
  }
}

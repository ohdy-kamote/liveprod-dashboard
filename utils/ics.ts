import ical from "node-ical";

export interface IcsEvent {
  uid?: string;
  summary?: string;
  description?: string;
  location?: string;
  start?: Date;
  end?: Date;
}

export async function fetchIcsEvents(url: string) {
  const data = await ical.async.fromURL(url);
  const events: IcsEvent[] = [];
  for (const k of Object.keys(data)) {
    const item: any = data[k];
    if (item.type === 'VEVENT') {
      events.push({
        uid: item.uid,
        summary: item.summary,
        description: item.description,
        location: item.location,
        start: item.start instanceof Date ? item.start : new Date(item.start),
        end: item.end instanceof Date ? item.end : new Date(item.end),
      });
    }
  }
  return events;
}

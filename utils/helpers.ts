import { Node } from "./classes";
import { category } from "./constants";
import { add as dateAdd, subtract as dateSub } from "date-arithmetic";

function getSundays(year: number, month: number) {
  let sundays = [];
  let date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    // Sunday is represented by 0 in JavaScript
    if (date.getDay() === 0) {
        sundays.push(new Date(date).toLocaleDateString());
    }
    date.setDate(date.getDate() + 1);
  }

  return sundays;
}

function getSaturdays(year: number, month: number) {
  let saturdays = [];
  let date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    // Saturday is represented by 6 in JavaScript
    if (date.getDay() === 6) {
        saturdays.push(new Date(date).toLocaleDateString());
    }
    date.setDate(date.getDate() + 1);
  }

  return saturdays;
}

export function getNextService(increment: number) {
  const num = Math.abs(increment) * 7;
  let date = new Date();
  if (increment > 0) {
    date = dateAdd(date, num, "day");
  } else if (increment < 0) {
    date = dateSub(date, num, "day")
  }

  while (date.getDay() !== 6 && date.getDay() !== 0) {
    date = dateAdd(date, 1, "day");
  }

  if (date.getDay() === 6) {
    return {
      saturday: date.toISOString().slice(0, 10),
      sunday: dateAdd(date, 1, "day").toISOString().slice(0, 10)
    }
  }

  return {
    saturday: dateSub(date, 1, "day").toISOString().slice(0, 10),
    sunday: date.toISOString().slice(0, 10)
  }
}

export function createSnsMonthPayload(year: number, month: number) {
  const payload = [];
  const saturdays = getSaturdays(year, month);
  for (let i = 0; i < saturdays.length; i++) {
    const date = saturdays[i];
    for (let j = 0; j < category.SNS_ROLES.length; j++) {
      const role = category.SNS_ROLES[j];
      payload.push({
        date,
        role,
        service: category.SATURDAY_SERVICE,
        dateServiceRole: date.concat(category.SATURDAY_SERVICE, role)
      });
    }
  }

  return payload;
}

export function createSundayMonthPayload(year: number, month: number) {
  const payload = [];
  const sundays = getSundays(year, month);
  for (let i = 0; i < sundays.length; i++) {
    const date = sundays[i];
    for (let j = 0; j < category.ROLES.length; j++) {
      const role = category.ROLES[j];
      for (let k = 0; k < category.SUNDAY_SERVICES.length; k++) {
        const service = category.SUNDAY_SERVICES[k];
        payload.push({
          date,
          role,
          service,
          dateServiceRole: date.concat(service, role)
        });
      }
    }
  }

  return payload;
}

export function getMonth(date: string) {
  return new Date(date).toLocaleDateString('en-US', { month: 'long' });
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {month: "short", day: "2-digit"});
}

export function getLinkedList(arr: string[]): Node | null {
  let start: Node | null = null;

  const insertEnd = (value: string) => {
    let newNode: Node;

    if (start == null) {
      newNode = new Node();
      newNode.data = value;
      newNode.next = newNode.prev = newNode;
      start = newNode;
      return;
    }

    const last = start.prev;
    newNode = new Node();
    newNode.data = value;
    newNode.next = start;
    start.prev = newNode;
    newNode.prev = last;
    last!.next = newNode;
  }

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    insertEnd(value);
  }

  return start;
}

export function linkedListGoToData(linkedList: Node, value: string) {
  if (!category.ROLES.includes(value)) {
    throw new Error(`Role '${value}' not found.`);
  }

  while (linkedList.data !== value) {
    linkedList = linkedList.next as Node;
  }

  return linkedList;
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

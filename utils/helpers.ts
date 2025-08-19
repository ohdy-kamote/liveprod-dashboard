import moment from "moment";
import { Node } from "./classes";
import { category } from "./constants";
import { add as dateAdd, subtract as dateSub } from "date-arithmetic";

export function getSaturdaysAndSundays(year: number, month: number) {
  const saturdays = [];
  const sundays = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    // Saturday is represented by 6 in JavaScript
    if (date.getDay() === 6) {
      saturdays.push(new Date(date).toLocaleDateString("en-US", {timeZone: "Asia/Manila"}));
      sundays.push(dateAdd(date, 1, "day").toLocaleDateString("en-US", {timeZone: "Asia/Manila"}));
    }
    date.setDate(date.getDate() + 1);
  }

  return { saturdays, sundays };
}

export function getNextService(increment: number = 0) {
  const num = Math.abs(increment) * 7;
  let date = newDate();
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
      saturday: moment(date).format("YYYY-MM-DD"),
      sunday: moment(dateAdd(date, 1, "day")).format("YYYY-MM-DD")
    }
  }

  return {
    saturday: moment(dateSub(date, 1, "day")).format("YYYY-MM-DD"),
    sunday: moment(date).format("YYYY-MM-DD")
  }
}

export function createSnsMonthPayload(year: number, month: number) {
  const payload = [];
  const saturdays = getSaturdaysAndSundays(year, month).saturdays;
  for (let i = 0; i < saturdays.length; i++) {
    const date = saturdays[i];
    for (let j = 0; j < category.SNS_ROLES.length; j++) {
      const role = category.SNS_ROLES[j];
      for (let k = 0; k < category.SATURDAY_SERVICES.length; k++) {
        const service = category.SATURDAY_SERVICES[k];
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

export function createSundayMonthPayload(year: number, month: number) {
  const payload = [];
  const sundays = getSaturdaysAndSundays(year, month).sundays;
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
  return new Date(date).toLocaleDateString('en-US', { month: 'long', timeZone: 'Asia/Manila' });
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {month: "short", day: "2-digit", timeZone: "Asia/Manila"});
}

export function formatDateLong(date: string) {
  return new Date(date).toLocaleDateString("en-US", {month: "long", day: "2-digit", year: "numeric", timeZone: "Asia/Manila"});
}

export function newDate() {
  return new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Manila"}));
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

/**
 * 
 * @description This function takes an array and splits it into smaller arrays of a specified size.
 * For example, if the input array is ['foh', 'foh assistant', 'foh trainee', 'foh observer'] and the size is 2,
 * it will return [['foh', 'foh assistant'], ['foh trainee', 'foh observer']].
 * If the size is larger than the length of the array, it will return the original array as a single chunk.
 * 
 * @param arr the array to chunk into smaller arrays
 * @param size the size of each chunk
 * 
 * @returns a new array containing the chunks
 * @example chunkArray(['foh', 'foh assistant', 'foh trainee', 'foh observer'], 2)
 * // returns [['foh', 'foh assistant'], ['foh trainee', 'foh observer']]
 */
export const chunkArray = (arr: string[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

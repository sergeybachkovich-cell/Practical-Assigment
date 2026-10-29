/* eslint-disable @typescript-eslint/no-unused-vars */
// Task 02: Mini functional–utility library
// All helpers are declared but not implemented.

import { resolve } from "path";

export function mapArray<T, R>(source: readonly T[], mapper: (item: T, index: number) => R): R[] {
    if (source == null)
        throw new TypeError("source is empty");

    let results: R[] = [];

    for (let i = 0; i < source.length; i++) {
        results.push(mapper(source[i], i));
    }

    return results;
}

export function filterArray<T>(source: readonly T[], predicate: (item: T, index: number) => boolean): T[] {
  if (source == null)
        throw new TypeError("source is empty");
  
  let results: T[] = [];

  let index = 0;
  for (let it of source) {
    if (predicate(it, index)) {
        results.push(it);
    };
    index++;
  }

  return results;
}

export function reduceArray<T, R>(source: readonly T[], reducer: (acc: R, item: T, index: number) => R, initial: R): R {
  if (source == null)
        throw new TypeError("source is empty");
  
  let acc: R = initial;

  let index = 0;
  for (let it of source) {
    acc = reducer(acc, it, index);
    index++;
  }

  return acc;
}

export function partition<T>(source: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
  if (source == null)
        throw new TypeError("source is empty");

  let first: T[] = [];
  let second: T[] = [];

  for (let it of source) {
    if (predicate(it))
        first.push(it);
    else second.push(it);
  }

  return [first, second];
}

export function groupBy<T, K extends PropertyKey>(source: readonly T[], keySelector: (item: T) => K): Record<K, T[]> {
  if (source == null)
        throw new TypeError("source is empty");

  const result = {} as Record<K, T[]>;
  
  for (let it of source) {
    const key = keySelector(it);
    if (!result.hasOwnProperty(key)) {
        result[key] = [];
    }

    result[key].push(it);
  }

    return result;
}

export function closestNumber(target: number, values: number[]) {
  return values.reduce((prev, curr) => {
    return Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev;
  });
}

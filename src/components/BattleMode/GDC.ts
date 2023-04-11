export function findGcd(numbers: number[]): number {
  if (numbers.length < 2) {
    throw new Error('At least two numbers are required.');
  }

  let gcd = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    gcd = calculateGcd(gcd, numbers[i]);
  }

  return gcd;
}

export function calculateGcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

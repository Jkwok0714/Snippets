
const NAMES: string[] = ['David', 'Miguel', 'Ben', 'Huy', 'Richard', 'Clifford'];
const LOCATIONS: string[] = ['Sunnyvale', 'Santa Clara', 'San Jose', 'Redwood City', 'San Mateo', 'Fremont'];

function pluck (arr: string[], index: i32): string {
  return arr[index];
};

export function lookup(index: i32): string {
  if (index - 1 > NAMES.length)
    return '';

  return pluck(NAMES, index) + ' of ' + pluck(LOCATIONS, index);
}

export function double(input: i32): i32 {
  return input * 2;
}

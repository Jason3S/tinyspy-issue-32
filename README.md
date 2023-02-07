# 1.1.0 breaks instanceOf tests

Issue: <https://github.com/tinylibs/tinyspy/issues/32>

## Getting Started

1.  Install [`pnpm`](https://pnppm.io)
1.  `pnpm i`
1.  `pnpm test`

It should be possible to mock a class and have `instanceof` return the right value.

To change to a working version, change

```diff
   "pnpm": {
     "overrides": {
-      "tinyspy": "1.1.0"
+      "tinyspy": "1.0.2"
     }
   },
```

## StackBlitz

[StackBlitz](https://stackblitz.com/edit/vitest-dev-vitest-dhhorq?file=README.md)

**Terminal**

```sh
pnpm install && pnpm run test:ui
```

## Files

**[`MyClass.test.ts`](./src/MyClass.test.ts)**

<!--- @@inject: ./src/MyClass.test.ts --->

```ts
import { afterEach, describe, expect, test, vi } from 'vitest';

import { MyClass } from './MyClass.js';
import { create, isMyClass } from './MyClassUtil.js';

vi.mock('./MyClass.js');

const mockedMyClass = vi.mocked(MyClass);

// class MockImplementationMyClass {
//     constructor(readonly name: string) {}
// }

// mockedMyClass.mockImplementation((name) => new MockImplementationMyClass(name));

describe('MyClass', () => {
  afterEach(() => {
    mockedMyClass.mockClear();
  });

  test.each`
    name          | expected
    ${'Atlantic'} | ${'Atlantic'}
    ${'Pacific'}  | ${'Pacific'}
  `('new MyClass $name', ({ name, expected }) => {
    const instance = create(name);
    expect(isMyClass(instance)).toBe(true);
    expect(instance).toBeInstanceOf(MyClass);
    expect(mockedMyClass).toHaveBeenCalledTimes(1);
    expect(mockedMyClass).toHaveBeenCalledWith(expected);
  });
});
```

<!--- @@inject-end: ./src/MyClass.test.ts --->

**[`MyClass.ts`](./src/MyClass.ts)**

<!--- @@inject: ./src/MyClass.ts --->

```ts
export class MyClass {
  constructor(readonly name: string) {}
}
```

<!--- @@inject-end: ./src/MyClass.ts --->

**[`MyClassUtil.ts`](./src/MyClassUtil.ts)**

<!--- @@inject: ./src/MyClassUtil.ts --->

```ts
import { MyClass } from './MyClass.js';

export function create(name: string): MyClass {
  return new MyClass(name);
}

export function isMyClass(val: unknown): val is MyClass {
  return val instanceof MyClass;
}
```

<!--- @@inject-end: ./src/MyClassUtil.ts --->

<!---
cspell:dictionaries typescript
--->

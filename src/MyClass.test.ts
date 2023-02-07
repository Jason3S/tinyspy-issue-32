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

import { test as base } from '@playwright/test';
import testData from './testData.json' assert { type: 'json' };

export const test = base.extend({
    testData: async ({}, use) => {
        await use(testData);
    },
});

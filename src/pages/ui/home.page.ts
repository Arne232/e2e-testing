import { Page } from '@playwright/test';
import { BasePage } from '.';

export class HomePage extends BasePage {
  constructor(page: Page, username: string) {
    super(page, username);
  }
}

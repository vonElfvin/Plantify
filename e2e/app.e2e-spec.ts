import { PlantifyPage } from './app.po';

describe('plantify App', () => {
  let page: PlantifyPage;

  beforeEach(() => {
    page = new PlantifyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

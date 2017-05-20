import { EntranceClientPage } from './app.po';

describe('entrance-client App', () => {
  let page: EntranceClientPage;

  beforeEach(() => {
    page = new EntranceClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

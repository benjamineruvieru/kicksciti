describe('Login to app', () => {
  beforeAll(async () => {
    await device.launchApp({permissions: {notifications: 'YES'}});
  });

  it('should log in successfully', async () => {
    await element(by.id('get_started')).tap();
    await element(by.id('email_input')).typeText('test@account.com');
    await element(by.text('Next')).tap();
    await element(by.id('password_input')).typeText('testpass');
    await element(by.id('login_button')).tap();
    await expect(element(by.id('welcome_text'))).toBeVisible();
  });
});

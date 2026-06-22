import { test, expect } from '@playwright/test';

test('usuário se cadastra com sucesso e cai no feed logado', async ({ page }) => {
    const email = `igor${Date.now()}@gmail.com`;
    const password = 'Senha@123';

    await page.goto('/signup');

    await page.getByPlaceholder('seu@email.com').fill(email);

    const passwordInputs = page.getByPlaceholder('••••••••');

    await passwordInputs.nth(0).fill(password); 
    await passwordInputs.nth(1).fill(password);

    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('/', {
        timeout: 10000,
    });

    await expect(page.getByText('Feed de Posts')).toBeVisible();
});

test('usuário com conta existente consegue fazer login', async ({
    page,
    request,
}) => {
    const email = `igor${Date.now()}@example.com`;
    const password = 'Senha@123';

    await request.post('http://localhost:8080/auth/signup', {
        data: {
            email,
            password,
        },
    });

    await page.goto('/signin');

    await page.getByPlaceholder('seu@email.com').fill(email);
    await page.getByPlaceholder('••••••••').fill(password);
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL('/', {
        timeout: 10000,
    });

    await expect(page.getByText('Feed de Posts')).toBeVisible();
});
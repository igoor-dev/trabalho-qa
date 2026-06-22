import { test, expect } from '@playwright/test';

test('cria usuário com sucesso', async ({ request }) => {
    const email = `igor${Date.now()}@gmail.com`;

    const response = await request.post('/auth/signup', {
        data: {
            email: email,
            password: 'Senha@123',
        },
    });

    expect(response.status()).toBe(200);
});

test('falha com e-mail duplicado', async ({ request }) => {
    const email = `igor${Date.now()}@gmail.com`;

    const first = await request.post('/auth/signup', {
        data: {
            email: email,
            password: 'Senha@123',
        },
    });

    expect(first.status()).toBe(200);

    const second = await request.post('/auth/signup', {
        data: {
            email: email,
            password: 'Senha@123',
        },
    });

    expect(second.status()).toBe(409);
});

test('login com sucesso', async ({ request }) => {
    const email = `igor${Date.now()}@gmail.com`;

    await request.post('/auth/signup', {
        data: {
            email: email,
            password: 'Senha@123',
        },
    });

    const response = await request.post('/auth/signin', {
        data: {
            email: email,
            password: 'Senha@123',
        },
    });

    expect(response.status()).toBe(200);
});

test('falha com senha incorreta', async ({ request }) => {
    const email = `igor${Date.now()}@gmail.com`;

    await request.post('/auth/signup', {
        data: {
            email: email,
            password: 'Senha@123',
        },
    });

    const response = await request.post('/auth/signin', {
        data: {
            email: email,
            password: 'SenhaErrada123',
        },
    });

    expect(response.status()).toBe(422);
});
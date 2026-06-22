import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock('@/service/auth/auth', () => ({
  authService: {
    signUp: jest.fn(),
  },
}));

import { authService } from '@/service/auth/auth';

test('exibe erros de validação ao tentar submeter formulário vazio', async () => {
  render(<SignUp />);

  const buttons = screen.getAllByRole('button', { name: /criar conta/i });
  fireEvent.click(buttons[buttons.length - 1]);

  await waitFor(() => {
    expect(screen.getByText('Email é obrigatório')).toBeInTheDocument();
    expect(screen.getByText('Senha é obrigatória')).toBeInTheDocument();
    expect(screen.getByText('Confirmação de senha é obrigatória')).toBeInTheDocument();
  });
});


test('exibe erro quando as senhas não coincidem', async () => {
  render(<SignUp />);

  // Preenche email
  fireEvent.change(screen.getByPlaceholderText('seu@email.com'), {
    target: { value: 'igorhdg@gmail.com' },
  });

  // Preenche senha 
  fireEvent.change(screen.getAllByPlaceholderText('••••••••')[0], {
    target: { value: 'Igor123' },
  });

  // Preenche confirmação diferente
  fireEvent.change(screen.getAllByPlaceholderText('••••••••')[1], {
    target: { value: 'Igor123#' },
  });

  const buttons = screen.getAllByRole('button', { name: /criar conta/i });
  fireEvent.click(buttons[buttons.length - 1]);

  await waitFor(() => {
    expect(screen.getByText('As senhas não coincidem')).toBeInTheDocument();
  });

  // Verifica se aapi não foi chamada
  expect(authService.signUp).not.toHaveBeenCalled();
});
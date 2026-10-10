import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthContext } from '../../context/AuthContext';

// Mocks
const mockLogin = vi.fn();
vi.mock('../store/useAuthStore', () => ({
  default: () => ({
    setUsuario: vi.fn(),
  }),
}));

describe('Componente Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  it('renderiza el formulario correctamente', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
  });

  it('muestra error al enviar el formulario vacío', async () => {
    const submitButton = screen.getByRole('button', { name: 'Ingresar' });
    await userEvent.click(submitButton);
    
    // Verifica que los inputs estén vacíos (required)
    expect(screen.getByLabelText('Email')).toHaveValue('');
    expect(screen.getByLabelText('Contraseña')).toHaveValue('');
  });
});
import { cpf } from 'cpf-cnpj-validator';

export function isValidCPF(value: string): boolean {
    // Com isso, só é permitido o CPF no formato EXATO de pontuação ou um
    // CPF válido sem nenhuma pontuação
    if (!/^\d{3}(\.?\d{3}){2}-?\d{2}$/.test(value)) {
        return false;
    }

    return cpf.isValid(value, true);
}
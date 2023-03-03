import { cpf } from 'cpf-cnpj-validator';

export function isValidCPF(value: string): boolean {
    return cpf.isValid(value, true);
}
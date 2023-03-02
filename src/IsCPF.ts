import {
    ValidationOptions,
    registerDecorator,
    ValidationArguments,
} from 'class-validator';

import { cpf } from 'cpf-cnpj-validator';

function isValidCPF(value: string): boolean {
    const formatCPF = cpf.format(value);

    // Isso permite apenas CPF formatado com pontuação, remova se não quiser
    if (value !== formatCPF) {
        return false;
    }

    return cpf.isValid(value);
}

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isCPF',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments): boolean {
                    return isValidCPF(value);
                },
                defaultMessage(args: ValidationArguments): string {
                    return `${args.property} must be a cpf`;
                },
            },
        });
    };
}

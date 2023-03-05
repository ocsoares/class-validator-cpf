import { validate } from 'class-validator';
import { IsCPF } from '../src/index'

class UserCPF {
    @IsCPF()
    cpf: string;
}

async function validateCPF(cpfToBeValidated: string): Promise<boolean> {
    const userCPF = new UserCPF();
    userCPF.cpf = cpfToBeValidated;

    return validate(userCPF).then(errors => {
        if(errors.length > 0){
            return false;
        } else {
            return true;
        }
    })
}

describe('Index Test', () => {    
    it('should be a valid CPF with punctiation', async () => {
        await expect(validateCPF('706.909.390-00')).resolves.toBe(true)
    })

    it('should be a valid CPF without punctiation', async () => {
        await expect(validateCPF('62818684048')).resolves.toBe(true)
    })

    it('should be a invalid CPF if empty', async () => {
        await expect(validateCPF('')).resolves.toBe(false)
    })

    it('should be a invalid CPF if it is not a string', async () => {
        await expect(validateCPF(65888683086 as any)).resolves.toBe(false)
        await expect(validateCPF({cpf: "627.817.740-49"} as any)).resolves.toBe(false)
        await expect(validateCPF([
            {cpf: 58317966046},
            {other_cpf: '796.576.300-10'},
            {another_cpf: '796.576.380-10'}
        ] as any)).resolves.toBe(false)
    })

    it('should be a invalid CPFs with punctiation', async () => {
        await expect(validateCPF('359.712.920--05')).resolves.toBe(false)
        await expect(validateCPF('359.712.0-05')).resolves.toBe(false)
        await expect(validateCPF('359.712..920--05')).resolves.toBe(false)
        await expect(validateCPF('359..712..920--05')).resolves.toBe(false)
        await expect(validateCPF('359712920..-05')).resolves.toBe(false)
        await expect(validateCPF('359.712.-92005')).resolves.toBe(false)
        await expect(validateCPF('359..-71292005')).resolves.toBe(false)
        await expect(validateCPF('..-35971292005')).resolves.toBe(false)
        await expect(validateCPF('359.712.920-05..-')).resolves.toBe(false)
        await expect(validateCPF('359.712-920.05')).resolves.toBe(false)
        await expect(validateCPF('359-712.920.05')).resolves.toBe(false)
        await expect(validateCPF('359.712.92005')).resolves.toBe(false)
        await expect(validateCPF('359.71292005')).resolves.toBe(false)
        await expect(validateCPF('35971292005')).resolves.toBe(true)
        await expect(validateCPF('359.712.920-059')).resolves.toBe(false)
        await expect(validateCPF('3fdsfs59.71fdsf2.92fdsf0-0fsdf59')).resolves.toBe(false)
        await expect(validateCPF('359.&!+712.$$#920-@@@05')).resolves.toBe(false)
    })

    it('should be a invalid CPFs without punctiation', async () => {
        await expect(validateCPF('623275940068')).resolves.toBe(false)
        await expect(validateCPF('62325906')).resolves.toBe(false)
        await expect(validateCPF('6232759fdsffs4006')).resolves.toBe(false)
        await expect(validateCPF('6232759fdsffs40063')).resolves.toBe(false)
        await expect(validateCPF('6!!!232$#%75$$940@@06++')).resolves.toBe(false)
        await expect(validateCPF('@@@62327!!%594006___++')).resolves.toBe(false)
        await expect(validateCPF('62327594006+@_!!')).resolves.toBe(false)
        await expect(validateCPF('623275&¨¨#94006')).resolves.toBe(false)
        await expect(validateCPF(')%$(!@#62327594006')).resolves.toBe(false)
    })
})
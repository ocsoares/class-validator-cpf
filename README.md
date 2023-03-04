# class-validator-cpf

Valida strings de CPF no formato XXX.XXX.XXX-XX ou XXXXXXXXXXX, usando como base o pacote class-validator

[![npm][npm-image]][npm-url]
![GitHub top language](https://img.shields.io/github/languages/top/ocsoares/class-validator-cpf)
![GitHub last commit](https://img.shields.io/github/last-commit/ocsoares/class-validator-cpf)

[npm-image]: https://img.shields.io/npm/v/class-validator-cpf.svg?style=flat
[npm-url]: https://npmjs.org/package/class-validator-cpf

### Requer:

Node `^8.0.0`.

### Instalação:

```
npm i class-validator-cpf
```

### Uso:

Importe o decorator da biblioteca na propriedade da sua classe responsável por validar o CPF

```ts
import { IsCPF } from "class-validator-cpf";

class User {
  @IsCPF()
  cpf: string;
}
```

:warning: **AVISO**: Todas as opções do class-validator estão disponíveis nessa biblioteca, exemplo:

```ts
import { IsCPF } from "class-validator-cpf";

class User {
  @IsCPF({ message: "Mudando a mensagem" })
  cpf: string;
}
```

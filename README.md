# Documentação do Toastify

## Visão geral

O Toastify é um componente para exibir notificações (toasts) personalizadas no seu projeto. Ele usa uma área específica no HTML para renderizar os toasts, além de depender do FontAwesome para os ícones e de um arquivo CSS próprio para o estilo.

---

## Requisitos

- Ter uma tag `<section class="toast-custom-area"></section>` no seu HTML para onde os toasts vão ser inseridos.
- Incluir o FontAwesome no projeto para os ícones aparecerem corretamente.
- Importar o CSS do Toastify para o estilo funcionar.

---

## Setup

### 1. Adicionar área dos toasts

No seu HTML principal, adicione:

```html
<section class="toast-custom-area"></section>
```

### 2. Incluir FontAwesome

Se você ainda não tem o FontAwesome, adicione o link no `<head>` do seu HTML:

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
```

### 3. Importar o CSS do Toastify

Se estiver usando via bundler, importe no seu arquivo principal de estilo:

`@import "caminho/para/toastify.css";`

Se estiver usando direto no HTML:

```html
<link rel="stylesheet" href="caminho/para/toastify.css">
```

## Uso

Para exibir uma notificação, use a função showToast passando os seguintes parâmetros:

```javascript
showToast(mensagem, tipo, duracao);
```

- mensagem: Texto da notificação

- tipo: Tipo do toast. Pode ser: success, error, warning ou info

- duracao: Tempo que o toast vai ficar visível (em milissegundos)

### Exemplos:

```javascript
showToast('Tudo certo por aqui!', 'success', 3000);
showToast('Algo deu errado...', 'error', 4000);
showToast('Atenção, revise os dados.', 'warning', 5000);
showToast('Essa é uma informação qualquer.', 'info', 5000);
```

### Observações:

- O Toastify precisa da área .toast-custom-area para injetar os toasts dinamicamente.

- Certifique-se que a área esteja presente no DOM antes de chamar showToast().

- O tipo passado define o ícone, cor e estilo geral do toast, então mantenha os valores válidos para evitar problemas de renderização.


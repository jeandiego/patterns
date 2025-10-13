## visão geral

`createDialog` é uma ferramenta para exibir programaticamente Dialogs como componentes React. Ela retorna uma API com o método `show` que monta seu componente de diálogo em um novo nó DOM, aguarda a ação do usuário, resolve uma promise com o resultado e faz a limpeza automática.

---

## assinatura da API

    function createDialog<TOptions, TResult = undefined>(
      DialogComponent: React.FC<DialogComponentProps<TOptions, TResult>>
    ): {
      show(options: TOptions): Promise<DialogResult<TResult>>
    }

- **TOptions**: formato das props de configuração passadas ao diálogo.2

- **TResult**: formato dos dados retornados quando o usuário confirma.

---

## tipos

    export type DialogActionValue = 'confirm' | 'cancel' | 'dismiss'

    export interface DialogResult<T> {
      readonly value: DialogActionValue
      readonly data?: T
    }

    export type DialogComponentProps<TOptions, TResult> = {
      options: TOptions
      onAction: (value: DialogActionValue, data?: TResult) => void
    }

- **DialogActionValue**: três possíveis valores de callback que você deve tratar.

- **DialogResult**: o que `show()` retorna.

- **DialogComponentProps**: props recebidas pelo seu componente.

---

## como funciona

1.  **cria container**: um `<div>` é criado e anexado em `document.body`.

2.  **monta**: renderiza seu `DialogComponent` com o `createRoot` do React 18.

3.  **aguarda ação**: passa um callback `onAction` ao componente. Quando chamado, resolve a promise.

4.  **limpeza**: após resolver, desmonta o root e remove o container.

---

## exemplo de uso

    import { createDialog } from './create-dialog'

    // seu componente de diálogo:
    const MeuDialog: React.FC<DialogComponentProps<{ mensagem: string }, { confirmado: boolean }>> = ({ options, onAction }) => {
      return (
        <AlertDialog open onOpenChange={isOpen => !isOpen && onAction('dismiss')}>
          <AlertDialogContent>
            <h2>{options.mensagem}</h2>
            <Button onClick={() => onAction('confirm', { confirmado: true })}>OK</Button>
            <Button onClick={() => onAction('cancel')}>Cancelar</Button>
          </AlertDialogContent>
        </AlertDialog>
      )
    }

    // cria um helper:
    const Dialog = createDialog(MeuDialog)

    // em algum lugar do seu código:
    async function perguntarAoUsuario() {
      const resultado = await Dialog.show({ mensagem: 'Você concorda?' })
      if (resultado.value === 'confirm') {
        console.log('Usuário confirmou:', resultado.data)
      } else {
        console.log('Diálogo fechado com:', resultado.value)
      }
    }

---

## boas práticas

- **early return**: retorne cedo caso `options` seja inválido.

- **chame sempre `onAction`** para cada caminho de usuário (`confirm`, `cancel`, `dismiss`).

- **garanta limpeza**: não dependa de desmontagem externa; invoque `onAction` para disparar o cleanup.

- **componentes stateless**: mantenha a lógica de estado mínima, controlando abertura/fechamento internamente.

---

## detalhes da limpeza

    const cleanup = () => {
      root.unmount()
      container.remove()
    }

- Executado imediatamente após resolver a promise para evitar vazamento de memória.

- Certifique-se de descartar quaisquer assinaturas ou listeners internos ao chamar `onAction`.

---

## tratamento de erros

- Chamadas rápidas consecutivas a `show()` criam múltiplos containers independentes.

- Se `DialogComponent` lançar uma exceção, a promise não será resolvida; considere envolver o render em um boundary de erro.

---

## diagrama de sequência (Mermaid)

::: mermaid
sequenceDiagram
participant App as Aplicação
participant Helper as createDialog
participant DOM as Document

      App->>Helper: Dialog.show(options)
      activate Helper
      Helper->>DOM: cria container <div>
      Helper->>DOM: append em document.body
      Helper->>Helper: monta DialogComponent
      Helper-->DOM: renderiza componente no container
      DOM-->>Helper: usuário interage (confirm/cancel/dismiss)
      Helper->>Helper: handleAction(value, data)
      Helper->>Promise: resolve({ value, data })
      Helper->>DOM: unmount root
      Helper->>DOM: remove container
      deactivate Helper

:::

import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'
import { Toaster } from 'sonner'

import { Button } from '@/shared/components/ui'
import { useGuardedHandler } from '@/shared/hooks/use-guarded-handlers'
import { showToast } from '@/shared/lib/sonner'
import { createGuard } from '@/shared/utils'

const meta: Meta<typeof useGuardedHandler> = {
  title: 'Hooks/useGuardedHandler',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        description: {
          story: `
## useGuardedHandler

Um hook para criar handlers protegidos por condições (guards).

### API

\`\`\`typescript
function useGuardedHandler<T extends unknown[]>(
  guards: Array<Guard<T>>,
  handler: Handler<T>
): Handler<T>
\`\`\`

### Parâmetros

| Nome    | Tipo               | Descrição                              |
|---------|--------------------|----------------------------------------|
| guards  | Array<Guard<T>>    | Lista de funções guard para proteção   |
| handler | Handler<T>         | Função original a ser protegida        |

### Retorno

Retorna uma nova função handler com as proteções aplicadas.

### Tipos Relacionados

\`\`\`typescript
type Handler<T extends unknown[]> = (...args: T) => void | Promise<void>
type Guard<T extends unknown[]> = (next: Handler<T>) => Handler<T>

function createGuard<T extends unknown[]>(
  condition: () => boolean | Promise<boolean>,
  onFail?: () => void | Promise<void>
): Guard<T>
\`\`\`
        `,
        },
      },
    },
  },
} satisfies Meta<typeof useGuardedHandler>

export default meta

type Story = StoryObj<typeof meta>

// Componente de exemplo para demonstração
const DemoComponent = () => {
  // 1. Handler base
  const handleClick = (data: { id: number }, event: React.MouseEvent) => {
    showToast({
      variant: 'success',
      message: `Handler executado!: ID: ${data.id}, Evento: ${event.type}`,
    })
  }

  const confirmationGuard = <T extends unknown[]>() =>
    createGuard<T>(
      async () => {
        return confirm('Você tem certeza que deseja continuar?')
      },
      () => {
        showToast({ message: 'Ação cancelada', variant: 'error' })
      },
    )

  const guardedHandler = useGuardedHandler([confirmationGuard()], handleClick)

  return (
    <>
      <Button onClick={(e) => guardedHandler({ id: 123 }, e)} variant="default">
        Executar Ação
      </Button>
      <Toaster />
    </>
  )
}

export const BasicUsage: Story = {
  render: () => <DemoComponent />,
  name: 'Uso Básico',
  parameters: {
    docs: {
      description: {
        story: 'Exemplo básico de uso com um guard de confirmação simples.',
      },
    },
  },
}

const MultiDemoComponent = () => {
  const [premium, setPremium] = useState(false)
  const [connected, setConnected] = useState(true)

  const premiumGuard = <T extends unknown[]>() =>
    createGuard<T>(
      () => premium,
      () => {
        showToast({ message: 'Recurso disponível apenas para premium', variant: 'error', closeButton: true })
      },
    )

  const checkOnlineGuard = <T extends unknown[]>() =>
    createGuard<T>(
      () => connected,
      () => {
        showToast({ message: 'Verifique sua conexão com a internet', variant: 'error', closeButton: true })
      },
    )

  const handler = (data: { action: string }) => {
    showToast({ message: `Ação premium executada: ${data.action}`, variant: 'success', closeButton: true })
  }

  const guardedHandler = useGuardedHandler([premiumGuard(), checkOnlineGuard()], handler)

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => guardedHandler({ action: 'Acessar premium' })}>Acesso Premium</Button>
      <div className="flex w-full gap-2 border p-4">
        <Button variant="link" onClick={() => setPremium((prev) => !prev)}>
          {!premium ? 'Assinar premium' : 'Cancelar assinatura'}
        </Button>
        <Button variant="link" onClick={() => setConnected((prev) => !prev)}>
          Status conexão: {connected ? 'Conectado' : 'Desconectado'}
        </Button>
      </div>
      <Toaster />
    </div>
  )
}

export const WithMultipleGuards: Story = {
  render: () => <MultiDemoComponent />,
  name: 'Com Múltiplos Guards',
}

export const APIDocumentation: Story = {
  parameters: {
    docs: {
      description: {
        story: `
## useGuardedHandler

Um hook para criar handlers protegidos por condições (guards).

### API

\`\`\`typescript
function useGuardedHandler<T extends unknown[]>(
  guards: Array<Guard<T>>,
  handler: Handler<T>
): Handler<T>
\`\`\`

### Parâmetros

| Nome    | Tipo               | Descrição                              |
|---------|--------------------|----------------------------------------|
| guards  | Array<Guard<T>>    | Lista de funções guard para proteção   |
| handler | Handler<T>         | Função original a ser protegida        |

### Retorno

Retorna uma nova função handler com as proteções aplicadas.

### Tipos Relacionados

\`\`\`typescript
type Handler<T extends unknown[]> = (...args: T) => void | Promise<void>
type Guard<T extends unknown[]> = (next: Handler<T>) => Handler<T>

function createGuard<T extends unknown[]>(
  condition: () => boolean | Promise<boolean>,
  onFail?: () => void | Promise<void>
): Guard<T>
\`\`\`

### Uso

**useGuardedHandler** é um hook avançado que permite adicionar camadas de proteção (guards) a funções handlers.

#### Como Funciona:
1. Recebe um array de guards
2. Cada guard pode interromper a execução do handler
3. Só executa o handler original se todos os guards passarem

#### Exemplo de Uso:
\`\`\`typescript
const guardedHandler = useGuardedHandler(
  [authGuard, validationGuard],
  (data: FormData) => {
    // Lógica do handler
  }
)
\`\`\`

#### createGuard:
Cria uma função de proteção reutilizável:

\`\`\`typescript
const authGuard = createGuard(
  () => !!currentUser,
  () => showLoginModal()
)
\`\`\`
        `,
      },
    },
  },
  render: () => <></>,
}

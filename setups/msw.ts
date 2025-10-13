export const enableMSW = async () => {
  if (import.meta.env.MODE !== 'test') return

  const { worker } = await import('@/shared/tests/browser.config')
  return worker.start()
}

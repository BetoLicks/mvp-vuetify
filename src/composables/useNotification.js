const show = ref(false)
const message = ref('')
const color = ref('success')
const timeout = ref(5000)

export function useNotification() {
  const success = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'success'
    timeout.value = duration
    show.value = true
  }

  const warnig = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'warnig'
    timeout.value = duration
    show.value = true
  }

  const error = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'error'
    timeout.value = duration
    show.value = true
  }

  const info = (msg, duration = 5000) => {
    message.value = msg
    color.value = 'info'
    timeout.value = duration
    show.value = true
  }

  return {
    success,
    error,
    warnig,
    info,
    show,
    color,
    timeout
  }
}

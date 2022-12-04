import React from 'react'

const types = {
  success: {
    severity: 'success',
    summary: 'SUCESSO',
  },
  info: {
    severity: 'info',
    summary: 'INFO',
  },
  warn: {
    severity: 'warn',
    summary: 'ATENÇÃO',
  },
  error: {
    severity: 'error',
    summary: 'ERRO',
  },
}

function onToast(toast, type, msg) {
  toast.current.show({
    severity: type.severity,
    summary: type.summary,
    detail: msg,
  })
}

export const onSuccess = (toast, msg) => onToast(toast, types.success, msg)
export const onInfo = (toast, msg) => onToast(toast, types.info, msg)
export const onWarn = (toast, msg) => onToast(toast, types.warn, msg)
export const onError = (toast, msg) => onToast(toast, types.error, msg)

export const ToastContext = React.createContext()

import { toast, ToastOptions } from 'react-toastify';

export type EnqueueFunc = (msg: string, params?: ToastOptions) => void;

const enqueueSnackbar: EnqueueFunc = (msg, params) => toast(msg, params);

const enqueueError: EnqueueFunc = (msg, params) => {
  console.error('Enqueued error', msg);
  toast.error(msg, params);
};

const enqueueInfo: EnqueueFunc = (msg, params) => toast.info(msg, params);

const enqueueWarning: EnqueueFunc = (msg, params) => toast.warn(msg, params);

const enqueueSuccess: EnqueueFunc = (msg, params) => toast.success(msg, params);

const enqueueDefault: EnqueueFunc = (msg, params) => toast(msg, params);

const allEnqueues = {
  enqueueDefault,
  enqueueError,
  enqueueInfo,
  enqueueSuccess,
  enqueueWarning,
  enqueueSnackbar,
} as const;

export const useMySnackbar = () => {
  return allEnqueues;
};

import { AxiosError } from 'axios';

export const isAxiosError = (e: unknown): e is AxiosError =>
  e instanceof Object && 'isAxiosError' in e;

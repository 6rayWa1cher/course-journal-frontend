import { createAction } from '@reduxjs/toolkit';
import type { AuthBag } from 'models/auth';

export const setBag = createAction<AuthBag>('auth/setBag');

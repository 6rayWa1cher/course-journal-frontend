import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, SelectorType } from '@redux/types';

export const useParamSelector = <T, J>(
  selector: SelectorType<T, J>,
  params: J
) => {
  return useSelector<RootState, T>((state) => selector(state, params));
};

export const useTypedSelector = <T>(selector: SelectorType<T>) => {
  return useSelector<RootState, T>(selector);
};

export const useTypedDispatch = () => useDispatch<AppDispatch>();

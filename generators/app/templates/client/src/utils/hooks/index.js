import _useComponentDidMount from './useComponentDidMount';
import _useComponentWillUnmount from './useComponentWillUnmount';
import _useOnChangeWatcher from './useOnChangeWatcher';
import _useResize from './useResize';
import _useScrollTop from './useScrollTop';
import _useRedirect from './useRedirect';
import _useClearTimeout from './useClearTimeout';

export const useComponentDidMount = _useComponentDidMount;
export const useComponentWillUnmount = _useComponentWillUnmount;
export const useOnChangeWatcher = _useOnChangeWatcher;
export const useResize = _useResize;
export const useScrollTop = _useScrollTop;
export const useRedirect = _useRedirect;
export const useClearTimeout = _useClearTimeout;

export default {
  useComponentDidMount: _useComponentDidMount,
  useComponentWillUnmount: _useComponentWillUnmount,
  useOnChangeWatcher: _useOnChangeWatcher,
  useResize: _useResize,
  useScrollTop: _useScrollTop,
  useRedirect: _useRedirect,
  useClearTimeout: _useClearTimeout,
};

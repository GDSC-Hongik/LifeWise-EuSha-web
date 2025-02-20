System.register([], (function (exports) {
  'use strict';
  return {
    execute: (function () {

      exports("atom", atom);

      let keyCount = 0;
      function atom(read, write) {
        const key = `atom${++keyCount}`;
        const config = {
          toString() {
            return this.debugLabel ? key + ":" + this.debugLabel : key;
          }
        };
        if (typeof read === "function") {
          config.read = read;
        } else {
          config.init = read;
          config.read = defaultRead;
          config.write = defaultWrite;
        }
        if (write) {
          config.write = write;
        }
        return config;
      }
      function defaultRead(get) {
        return get(this);
      }
      function defaultWrite(get, set, arg) {
        return set(
          this,
          typeof arg === "function" ? arg(get(this)) : arg
        );
      }

      const isSelfAtom = (atom, a) => atom.unstable_is ? atom.unstable_is(a) : a === atom;
      const hasInitialValue = (atom) => "init" in atom;
      const isActuallyWritableAtom = (atom) => !!atom.write;
      const cancelablePromiseMap = /* @__PURE__ */ new WeakMap();
      const isPendingPromise = (value) => {
        var _a;
        return isPromiseLike(value) && !((_a = cancelablePromiseMap.get(value)) == null ? undefined : _a[1]);
      };
      const cancelPromise = (promise, nextValue) => {
        const promiseState = cancelablePromiseMap.get(promise);
        if (promiseState) {
          promiseState[1] = true;
          promiseState[0].forEach((fn) => fn(nextValue));
        } else {
          throw new Error("[Bug] cancelable promise not found");
        }
      };
      const patchPromiseForCancelability = (promise) => {
        if (cancelablePromiseMap.has(promise)) {
          return;
        }
        const promiseState = [/* @__PURE__ */ new Set(), false];
        cancelablePromiseMap.set(promise, promiseState);
        const settle = () => {
          promiseState[1] = true;
        };
        promise.then(settle, settle);
        promise.onCancel = (fn) => {
          promiseState[0].add(fn);
        };
      };
      const isPromiseLike = (p) => typeof (p == null ? undefined : p.then) === "function";
      const isAtomStateInitialized = (atomState) => "v" in atomState || "e" in atomState;
      const returnAtomValue = (atomState) => {
        if ("e" in atomState) {
          throw atomState.e;
        }
        if (!("v" in atomState)) {
          throw new Error("[Bug] atom state is not initialized");
        }
        return atomState.v;
      };
      const addPendingPromiseToDependency = (atom, promise, dependencyAtomState) => {
        if (!dependencyAtomState.p.has(atom)) {
          dependencyAtomState.p.add(atom);
          promise.then(
            () => {
              dependencyAtomState.p.delete(atom);
            },
            () => {
              dependencyAtomState.p.delete(atom);
            }
          );
        }
      };
      const addDependency = (atom, atomState, a, aState) => {
        var _a;
        if (a === atom) {
          throw new Error("[Bug] atom cannot depend on itself");
        }
        atomState.d.set(a, aState.n);
        if (isPendingPromise(atomState.v)) {
          addPendingPromiseToDependency(atom, atomState.v, aState);
        }
        (_a = aState.m) == null ? undefined : _a.t.add(atom);
      };
      const INTERNAL_flushStoreHook = Symbol.for("JOTAI.EXPERIMENTAL.FLUSHSTOREHOOK");
      const buildStore = (...storeArgs) => {
        const [
          getAtomState,
          setAtomState,
          atomRead,
          atomWrite,
          atomOnInit,
          atomOnMount
        ] = storeArgs;
        const ensureAtomState = (atom) => {
          if (!atom) {
            throw new Error("Atom is undefined or null");
          }
          let atomState = getAtomState(atom);
          if (!atomState) {
            atomState = { d: /* @__PURE__ */ new Map(), p: /* @__PURE__ */ new Set(), n: 0 };
            setAtomState(atom, atomState);
            atomOnInit == null ? undefined : atomOnInit(atom, store);
          }
          return atomState;
        };
        const invalidatedAtoms = /* @__PURE__ */ new WeakMap();
        const changedAtoms = /* @__PURE__ */ new Map();
        const unmountCallbacks = /* @__PURE__ */ new Set();
        const mountCallbacks = /* @__PURE__ */ new Set();
        const flushCallbacks = () => {
          var _a;
          const errors = [];
          const call = (fn) => {
            try {
              fn();
            } catch (e) {
              errors.push(e);
            }
          };
          do {
            (_a = store[INTERNAL_flushStoreHook]) == null ? undefined : _a.call(store);
            const callbacks = /* @__PURE__ */ new Set();
            const add = callbacks.add.bind(callbacks);
            changedAtoms.forEach((atomState) => {
              var _a2;
              return (_a2 = atomState.m) == null ? undefined : _a2.l.forEach(add);
            });
            changedAtoms.clear();
            unmountCallbacks.forEach(add);
            unmountCallbacks.clear();
            mountCallbacks.forEach(add);
            mountCallbacks.clear();
            callbacks.forEach(call);
            if (changedAtoms.size) {
              recomputeInvalidatedAtoms();
            }
          } while (changedAtoms.size || unmountCallbacks.size || mountCallbacks.size);
          if (errors.length) {
            throw errors[0];
          }
        };
        const setAtomStateValueOrPromise = (atom, atomState, valueOrPromise) => {
          const hasPrevValue = "v" in atomState;
          const prevValue = atomState.v;
          const pendingPromise = isPendingPromise(atomState.v) ? atomState.v : null;
          if (isPromiseLike(valueOrPromise)) {
            patchPromiseForCancelability(valueOrPromise);
            for (const a of atomState.d.keys()) {
              addPendingPromiseToDependency(atom, valueOrPromise, ensureAtomState(a));
            }
            atomState.v = valueOrPromise;
          } else {
            atomState.v = valueOrPromise;
          }
          delete atomState.e;
          if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
            ++atomState.n;
            if (pendingPromise) {
              cancelPromise(pendingPromise, valueOrPromise);
            }
          }
        };
        const readAtomState = (atom) => {
          var _a, _b;
          const atomState = ensureAtomState(atom);
          if (isAtomStateInitialized(atomState)) {
            if (atomState.m && invalidatedAtoms.get(atom) !== atomState.n) {
              return atomState;
            }
            if (Array.from(atomState.d).every(
              ([a, n]) => (
                // Recursively, read the atom state of the dependency, and
                // check if the atom epoch number is unchanged
                readAtomState(a).n === n
              )
            )) {
              return atomState;
            }
          }
          atomState.d.clear();
          let isSync = true;
          const mountDependenciesIfAsync = () => {
            if (atomState.m) {
              mountDependencies(atom, atomState);
              recomputeInvalidatedAtoms();
              flushCallbacks();
            }
          };
          const getter = (a) => {
            if (isSelfAtom(atom, a)) {
              const aState2 = ensureAtomState(a);
              if (!isAtomStateInitialized(aState2)) {
                if (hasInitialValue(a)) {
                  setAtomStateValueOrPromise(a, aState2, a.init);
                } else {
                  throw new Error("no atom init");
                }
              }
              return returnAtomValue(aState2);
            }
            const aState = readAtomState(a);
            try {
              return returnAtomValue(aState);
            } finally {
              addDependency(atom, atomState, a, aState);
              if (!isSync) {
                mountDependenciesIfAsync();
              }
            }
          };
          let controller;
          let setSelf;
          const options = {
            get signal() {
              if (!controller) {
                controller = new AbortController();
              }
              return controller.signal;
            },
            get setSelf() {
              if (!isActuallyWritableAtom(atom)) {
                console.warn("setSelf function cannot be used with read-only atom");
              }
              if (!setSelf && isActuallyWritableAtom(atom)) {
                setSelf = (...args) => {
                  if (isSync) {
                    console.warn("setSelf function cannot be called in sync");
                  }
                  if (!isSync) {
                    return writeAtom(atom, ...args);
                  }
                };
              }
              return setSelf;
            }
          };
          const prevEpochNumber = atomState.n;
          try {
            const valueOrPromise = atomRead(atom, getter, options);
            setAtomStateValueOrPromise(atom, atomState, valueOrPromise);
            if (isPromiseLike(valueOrPromise)) {
              (_a = valueOrPromise.onCancel) == null ? void 0 : _a.call(valueOrPromise, () => controller == null ? void 0 : controller.abort());
              valueOrPromise.then(mountDependenciesIfAsync, mountDependenciesIfAsync);
            }
            return atomState;
          } catch (error) {
            delete atomState.v;
            atomState.e = error;
            ++atomState.n;
            return atomState;
          } finally {
            isSync = false;
            if (prevEpochNumber !== atomState.n && invalidatedAtoms.get(atom) === prevEpochNumber) {
              invalidatedAtoms.set(atom, atomState.n);
              changedAtoms.set(atom, atomState);
              (_b = atomState.u) == null ? undefined : _b.call(atomState);
            }
          }
        };
        const readAtom = (atom) => returnAtomValue(readAtomState(atom));
        const getMountedOrPendingDependents = (atomState) => {
          var _a;
          const dependents = /* @__PURE__ */ new Map();
          for (const a of ((_a = atomState.m) == null ? undefined : _a.t) || []) {
            const aState = ensureAtomState(a);
            if (aState.m) {
              dependents.set(a, aState);
            }
          }
          for (const atomWithPendingPromise of atomState.p) {
            dependents.set(
              atomWithPendingPromise,
              ensureAtomState(atomWithPendingPromise)
            );
          }
          return dependents;
        };
        const invalidateDependents = (atomState) => {
          const stack = [atomState];
          while (stack.length) {
            const aState = stack.pop();
            for (const [d, s] of getMountedOrPendingDependents(aState)) {
              invalidatedAtoms.set(d, s.n);
              stack.push(s);
            }
          }
        };
        const recomputeInvalidatedAtoms = () => {
          var _a;
          const topSortedReversed = [];
          const visiting = /* @__PURE__ */ new WeakSet();
          const visited = /* @__PURE__ */ new WeakSet();
          const stack = Array.from(changedAtoms);
          while (stack.length) {
            const [a, aState] = stack[stack.length - 1];
            if (visited.has(a)) {
              stack.pop();
              continue;
            }
            if (visiting.has(a)) {
              if (invalidatedAtoms.get(a) === aState.n) {
                topSortedReversed.push([a, aState, aState.n]);
              } else {
                invalidatedAtoms.delete(a);
                changedAtoms.set(a, aState);
              }
              visited.add(a);
              stack.pop();
              continue;
            }
            visiting.add(a);
            for (const [d, s] of getMountedOrPendingDependents(aState)) {
              if (!visiting.has(d)) {
                stack.push([d, s]);
              }
            }
          }
          for (let i = topSortedReversed.length - 1; i >= 0; --i) {
            const [a, aState, prevEpochNumber] = topSortedReversed[i];
            let hasChangedDeps = false;
            for (const dep of aState.d.keys()) {
              if (dep !== a && changedAtoms.has(dep)) {
                hasChangedDeps = true;
                break;
              }
            }
            if (hasChangedDeps) {
              readAtomState(a);
              mountDependencies(a, aState);
              if (prevEpochNumber !== aState.n) {
                changedAtoms.set(a, aState);
                (_a = aState.u) == null ? undefined : _a.call(aState);
              }
            }
            invalidatedAtoms.delete(a);
          }
        };
        const writeAtomState = (atom, ...args) => {
          let isSync = true;
          const getter = (a) => returnAtomValue(readAtomState(a));
          const setter = (a, ...args2) => {
            var _a;
            const aState = ensureAtomState(a);
            try {
              if (isSelfAtom(atom, a)) {
                if (!hasInitialValue(a)) {
                  throw new Error("atom not writable");
                }
                const prevEpochNumber = aState.n;
                const v = args2[0];
                setAtomStateValueOrPromise(a, aState, v);
                mountDependencies(a, aState);
                if (prevEpochNumber !== aState.n) {
                  changedAtoms.set(a, aState);
                  (_a = aState.u) == null ? void 0 : _a.call(aState);
                  invalidateDependents(aState);
                }
                return void 0;
              } else {
                return writeAtomState(a, ...args2);
              }
            } finally {
              if (!isSync) {
                recomputeInvalidatedAtoms();
                flushCallbacks();
              }
            }
          };
          try {
            return atomWrite(atom, getter, setter, ...args);
          } finally {
            isSync = false;
          }
        };
        const writeAtom = (atom, ...args) => {
          try {
            return writeAtomState(atom, ...args);
          } finally {
            recomputeInvalidatedAtoms();
            flushCallbacks();
          }
        };
        const mountDependencies = (atom, atomState) => {
          var _a;
          if (atomState.m && !isPendingPromise(atomState.v)) {
            for (const [a, n] of atomState.d) {
              if (!atomState.m.d.has(a)) {
                const aState = ensureAtomState(a);
                const aMounted = mountAtom(a, aState);
                aMounted.t.add(atom);
                atomState.m.d.add(a);
                if (n !== aState.n) {
                  changedAtoms.set(a, aState);
                  (_a = aState.u) == null ? undefined : _a.call(aState);
                  invalidateDependents(aState);
                }
              }
            }
            for (const a of atomState.m.d || []) {
              if (!atomState.d.has(a)) {
                atomState.m.d.delete(a);
                const aMounted = unmountAtom(a, ensureAtomState(a));
                aMounted == null ? undefined : aMounted.t.delete(atom);
              }
            }
          }
        };
        const mountAtom = (atom, atomState) => {
          var _a;
          if (!atomState.m) {
            readAtomState(atom);
            for (const a of atomState.d.keys()) {
              const aMounted = mountAtom(a, ensureAtomState(a));
              aMounted.t.add(atom);
            }
            atomState.m = {
              l: /* @__PURE__ */ new Set(),
              d: new Set(atomState.d.keys()),
              t: /* @__PURE__ */ new Set()
            };
            (_a = atomState.h) == null ? undefined : _a.call(atomState);
            if (isActuallyWritableAtom(atom)) {
              const mounted = atomState.m;
              const processOnMount = () => {
                let isSync = true;
                const setAtom = (...args) => {
                  try {
                    return writeAtomState(atom, ...args);
                  } finally {
                    if (!isSync) {
                      recomputeInvalidatedAtoms();
                      flushCallbacks();
                    }
                  }
                };
                try {
                  const onUnmount = atomOnMount(atom, setAtom);
                  if (onUnmount) {
                    mounted.u = () => {
                      isSync = true;
                      try {
                        onUnmount();
                      } finally {
                        isSync = false;
                      }
                    };
                  }
                } finally {
                  isSync = false;
                }
              };
              mountCallbacks.add(processOnMount);
            }
          }
          return atomState.m;
        };
        const unmountAtom = (atom, atomState) => {
          var _a;
          if (atomState.m && !atomState.m.l.size && !Array.from(atomState.m.t).some((a) => {
            var _a2;
            return (_a2 = ensureAtomState(a).m) == null ? undefined : _a2.d.has(atom);
          })) {
            const onUnmount = atomState.m.u;
            if (onUnmount) {
              unmountCallbacks.add(onUnmount);
            }
            delete atomState.m;
            (_a = atomState.h) == null ? undefined : _a.call(atomState);
            for (const a of atomState.d.keys()) {
              const aMounted = unmountAtom(a, ensureAtomState(a));
              aMounted == null ? undefined : aMounted.t.delete(atom);
            }
            return undefined;
          }
          return atomState.m;
        };
        const subscribeAtom = (atom, listener) => {
          const atomState = ensureAtomState(atom);
          const mounted = mountAtom(atom, atomState);
          const listeners = mounted.l;
          listeners.add(listener);
          flushCallbacks();
          return () => {
            listeners.delete(listener);
            unmountAtom(atom, atomState);
            flushCallbacks();
          };
        };
        const unstable_derive = (fn) => buildStore(...fn(...storeArgs));
        const store = {
          get: readAtom,
          set: writeAtom,
          sub: subscribeAtom,
          unstable_derive
        };
        return store;
      };
      const deriveDevStoreRev4 = (store) => {
        const debugMountedAtoms = /* @__PURE__ */ new Set();
        let savedGetAtomState;
        let inRestoreAtom = 0;
        const derivedStore = store.unstable_derive((...storeArgs) => {
          const [getAtomState, setAtomState, , atomWrite] = storeArgs;
          savedGetAtomState = getAtomState;
          storeArgs[1] = function devSetAtomState(atom, atomState) {
            setAtomState(atom, atomState);
            const originalMounted = atomState.h;
            atomState.h = () => {
              originalMounted == null ? undefined : originalMounted();
              if (atomState.m) {
                debugMountedAtoms.add(atom);
              } else {
                debugMountedAtoms.delete(atom);
              }
            };
          };
          storeArgs[3] = function devAtomWrite(atom, getter, setter, ...args) {
            if (inRestoreAtom) {
              return setter(atom, ...args);
            }
            return atomWrite(atom, getter, setter, ...args);
          };
          return storeArgs;
        });
        const savedStoreSet = derivedStore.set;
        const devStore = {
          // store dev methods (these are tentative and subject to change without notice)
          dev4_get_internal_weak_map: () => ({
            get: (atom) => {
              const atomState = savedGetAtomState(atom);
              if (!atomState || atomState.n === 0) {
                return undefined;
              }
              return atomState;
            }
          }),
          dev4_get_mounted_atoms: () => debugMountedAtoms,
          dev4_restore_atoms: (values) => {
            const restoreAtom = {
              read: () => null,
              write: (_get, set) => {
                ++inRestoreAtom;
                try {
                  for (const [atom, value] of values) {
                    if (hasInitialValue(atom)) {
                      set(atom, value);
                    }
                  }
                } finally {
                  --inRestoreAtom;
                }
              }
            };
            savedStoreSet(restoreAtom);
          }
        };
        return Object.assign(derivedStore, devStore);
      };
      const createStore = exports("createStore", () => {
        const atomStateMap = /* @__PURE__ */ new WeakMap();
        const store = buildStore(
          (atom) => atomStateMap.get(atom),
          (atom, atomState) => atomStateMap.set(atom, atomState).get(atom),
          (atom, ...params) => atom.read(...params),
          (atom, ...params) => atom.write(...params),
          (atom, ...params) => {
            var _a;
            return (_a = atom.unstable_onInit) == null ? undefined : _a.call(atom, ...params);
          },
          (atom, ...params) => {
            var _a;
            return (_a = atom.onMount) == null ? undefined : _a.call(atom, ...params);
          }
        );
        {
          return deriveDevStoreRev4(store);
        }
      });
      let defaultStore;
      const getDefaultStore = exports("getDefaultStore", () => {
        if (!defaultStore) {
          defaultStore = createStore();
          {
            globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = defaultStore);
            if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
              console.warn(
                "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
              );
            }
          }
        }
        return defaultStore;
      });

    })
  };
}));

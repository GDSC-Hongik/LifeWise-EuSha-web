'use strict';

var keyCount = 0;
function atom(read, write) {
  var key = "atom" + ++keyCount;
  var config = {
    toString: function toString() {
      return process.env.NODE_ENV !== 'production' && this.debugLabel ? key + ':' + this.debugLabel : key;
    }
  };
  if (typeof read === 'function') {
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
  return set(this, typeof arg === 'function' ? arg(get(this)) : arg);
}

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: true
      } : {
        done: false,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : undefined;
  }
}

var isSelfAtom = function isSelfAtom(atom, a) {
  return atom.unstable_is ? atom.unstable_is(a) : a === atom;
};
var hasInitialValue = function hasInitialValue(atom) {
  return 'init' in atom;
};
var isActuallyWritableAtom = function isActuallyWritableAtom(atom) {
  return !!atom.write;
};
var cancelablePromiseMap = new WeakMap();
var isPendingPromise = function isPendingPromise(value) {
  var _cancelablePromiseMap;
  return isPromiseLike(value) && !((_cancelablePromiseMap = cancelablePromiseMap.get(value)) != null && _cancelablePromiseMap[1]);
};
var cancelPromise = function cancelPromise(promise, nextValue) {
  var promiseState = cancelablePromiseMap.get(promise);
  if (promiseState) {
    promiseState[1] = true;
    promiseState[0].forEach(function (fn) {
      return fn(nextValue);
    });
  } else if (process.env.NODE_ENV !== 'production') {
    throw new Error('[Bug] cancelable promise not found');
  }
};
var patchPromiseForCancelability = function patchPromiseForCancelability(promise) {
  if (cancelablePromiseMap.has(promise)) {
    return;
  }
  var promiseState = [new Set(), false];
  cancelablePromiseMap.set(promise, promiseState);
  var settle = function settle() {
    promiseState[1] = true;
  };
  promise.then(settle, settle);
  promise.onCancel = function (fn) {
    promiseState[0].add(fn);
  };
};
var isPromiseLike = function isPromiseLike(p) {
  return typeof (p == null ? undefined : p.then) === 'function';
};
var isAtomStateInitialized = function isAtomStateInitialized(atomState) {
  return 'v' in atomState || 'e' in atomState;
};
var returnAtomValue = function returnAtomValue(atomState) {
  if ('e' in atomState) {
    throw atomState.e;
  }
  if (process.env.NODE_ENV !== 'production' && !('v' in atomState)) {
    throw new Error('[Bug] atom state is not initialized');
  }
  return atomState.v;
};
var addPendingPromiseToDependency = function addPendingPromiseToDependency(atom, promise, dependencyAtomState) {
  if (!dependencyAtomState.p.has(atom)) {
    dependencyAtomState.p.add(atom);
    promise.then(function () {
      dependencyAtomState.p.delete(atom);
    }, function () {
      dependencyAtomState.p.delete(atom);
    });
  }
};
var addDependency = function addDependency(atom, atomState, a, aState) {
  var _aState$m;
  if (process.env.NODE_ENV !== 'production' && a === atom) {
    throw new Error('[Bug] atom cannot depend on itself');
  }
  atomState.d.set(a, aState.n);
  if (isPendingPromise(atomState.v)) {
    addPendingPromiseToDependency(atom, atomState.v, aState);
  }
  (_aState$m = aState.m) == null || _aState$m.t.add(atom);
};
var INTERNAL_flushStoreHook = Symbol.for('JOTAI.EXPERIMENTAL.FLUSHSTOREHOOK');
var _buildStore = function buildStore() {
  for (var _len = arguments.length, storeArgs = new Array(_len), _key = 0; _key < _len; _key++) {
    storeArgs[_key] = arguments[_key];
  }
  var getAtomState = storeArgs[0],
    setAtomState = storeArgs[1],
    atomRead = storeArgs[2],
    atomWrite = storeArgs[3],
    atomOnInit = storeArgs[4],
    atomOnMount = storeArgs[5];
  var ensureAtomState = function ensureAtomState(atom) {
    if (process.env.NODE_ENV !== 'production' && !atom) {
      throw new Error('Atom is undefined or null');
    }
    var atomState = getAtomState(atom);
    if (!atomState) {
      atomState = {
        d: new Map(),
        p: new Set(),
        n: 0
      };
      setAtomState(atom, atomState);
      atomOnInit == null || atomOnInit(atom, store);
    }
    return atomState;
  };
  var invalidatedAtoms = new WeakMap();
  var changedAtoms = new Map();
  var unmountCallbacks = new Set();
  var mountCallbacks = new Set();
  var flushCallbacks = function flushCallbacks() {
    var errors = [];
    var call = function call(fn) {
      try {
        fn();
      } catch (e) {
        errors.push(e);
      }
    };
    var _loop = function _loop() {
      var _INTERNAL_flushStoreH, _ref;
      (_INTERNAL_flushStoreH = (_ref = store)[INTERNAL_flushStoreHook]) == null || _INTERNAL_flushStoreH.call(_ref);
      var callbacks = new Set();
      var add = callbacks.add.bind(callbacks);
      changedAtoms.forEach(function (atomState) {
        var _atomState$m;
        return (_atomState$m = atomState.m) == null ? undefined : _atomState$m.l.forEach(add);
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
    };
    do {
      _loop();
    } while (changedAtoms.size || unmountCallbacks.size || mountCallbacks.size);
    if (errors.length) {
      throw errors[0];
    }
  };
  var setAtomStateValueOrPromise = function setAtomStateValueOrPromise(atom, atomState, valueOrPromise) {
    var hasPrevValue = 'v' in atomState;
    var prevValue = atomState.v;
    var pendingPromise = isPendingPromise(atomState.v) ? atomState.v : null;
    if (isPromiseLike(valueOrPromise)) {
      patchPromiseForCancelability(valueOrPromise);
      for (var _iterator = _createForOfIteratorHelperLoose(atomState.d.keys()), _step; !(_step = _iterator()).done;) {
        var a = _step.value;
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
  var _readAtomState = function readAtomState(atom) {
    var atomState = ensureAtomState(atom);
    if (isAtomStateInitialized(atomState)) {
      if (atomState.m && invalidatedAtoms.get(atom) !== atomState.n) {
        return atomState;
      }
      if (Array.from(atomState.d).every(function (_ref2) {
        var a = _ref2[0],
          n = _ref2[1];
        return (_readAtomState(a).n === n
        );
      })) {
        return atomState;
      }
    }
    atomState.d.clear();
    var isSync = true;
    var mountDependenciesIfAsync = function mountDependenciesIfAsync() {
      if (atomState.m) {
        mountDependencies(atom, atomState);
        recomputeInvalidatedAtoms();
        flushCallbacks();
      }
    };
    var getter = function getter(a) {
      if (isSelfAtom(atom, a)) {
        var _aState = ensureAtomState(a);
        if (!isAtomStateInitialized(_aState)) {
          if (hasInitialValue(a)) {
            setAtomStateValueOrPromise(a, _aState, a.init);
          } else {
            throw new Error('no atom init');
          }
        }
        return returnAtomValue(_aState);
      }
      var aState = _readAtomState(a);
      try {
        return returnAtomValue(aState);
      } finally {
        addDependency(atom, atomState, a, aState);
        if (!isSync) {
          mountDependenciesIfAsync();
        }
      }
    };
    var controller;
    var setSelf;
    var options = {
      get signal() {
        if (!controller) {
          controller = new AbortController();
        }
        return controller.signal;
      },
      get setSelf() {
        if (process.env.NODE_ENV !== 'production' && !isActuallyWritableAtom(atom)) {
          console.warn('setSelf function cannot be used with read-only atom');
        }
        if (!setSelf && isActuallyWritableAtom(atom)) {
          setSelf = function setSelf() {
            if (process.env.NODE_ENV !== 'production' && isSync) {
              console.warn('setSelf function cannot be called in sync');
            }
            if (!isSync) {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              return writeAtom.apply(undefined, [atom].concat(args));
            }
          };
        }
        return setSelf;
      }
    };
    var prevEpochNumber = atomState.n;
    try {
      var valueOrPromise = atomRead(atom, getter, options);
      setAtomStateValueOrPromise(atom, atomState, valueOrPromise);
      if (isPromiseLike(valueOrPromise)) {
        valueOrPromise.onCancel == null || valueOrPromise.onCancel(function () {
          var _controller;
          return (_controller = controller) == null ? void 0 : _controller.abort();
        });
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
        atomState.u == null || atomState.u();
      }
    }
  };
  var readAtom = function readAtom(atom) {
    return returnAtomValue(_readAtomState(atom));
  };
  var getMountedOrPendingDependents = function getMountedOrPendingDependents(atomState) {
    var dependents = new Map();
    for (var _iterator2 = _createForOfIteratorHelperLoose(((_atomState$m2 = atomState.m) == null ? undefined : _atomState$m2.t) || []), _step2; !(_step2 = _iterator2()).done;) {
      var _atomState$m2;
      var a = _step2.value;
      var aState = ensureAtomState(a);
      if (aState.m) {
        dependents.set(a, aState);
      }
    }
    for (var _iterator3 = _createForOfIteratorHelperLoose(atomState.p), _step3; !(_step3 = _iterator3()).done;) {
      var atomWithPendingPromise = _step3.value;
      dependents.set(atomWithPendingPromise, ensureAtomState(atomWithPendingPromise));
    }
    return dependents;
  };
  var invalidateDependents = function invalidateDependents(atomState) {
    var stack = [atomState];
    while (stack.length) {
      var aState = stack.pop();
      for (var _iterator4 = _createForOfIteratorHelperLoose(getMountedOrPendingDependents(aState)), _step4; !(_step4 = _iterator4()).done;) {
        var _step4$value = _step4.value,
          d = _step4$value[0],
          s = _step4$value[1];
        invalidatedAtoms.set(d, s.n);
        stack.push(s);
      }
    }
  };
  var recomputeInvalidatedAtoms = function recomputeInvalidatedAtoms() {
    var topSortedReversed = [];
    var visiting = new WeakSet();
    var visited = new WeakSet();
    var stack = Array.from(changedAtoms);
    while (stack.length) {
      var _ref3 = stack[stack.length - 1],
        a = _ref3[0],
        aState = _ref3[1];
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
      for (var _iterator5 = _createForOfIteratorHelperLoose(getMountedOrPendingDependents(aState)), _step5; !(_step5 = _iterator5()).done;) {
        var _step5$value = _step5.value,
          d = _step5$value[0],
          s = _step5$value[1];
        if (!visiting.has(d)) {
          stack.push([d, s]);
        }
      }
    }
    for (var i = topSortedReversed.length - 1; i >= 0; --i) {
      var _ref4 = topSortedReversed[i],
        _a = _ref4[0],
        _aState2 = _ref4[1],
        prevEpochNumber = _ref4[2];
      var hasChangedDeps = false;
      for (var _iterator6 = _createForOfIteratorHelperLoose(_aState2.d.keys()), _step6; !(_step6 = _iterator6()).done;) {
        var dep = _step6.value;
        if (dep !== _a && changedAtoms.has(dep)) {
          hasChangedDeps = true;
          break;
        }
      }
      if (hasChangedDeps) {
        _readAtomState(_a);
        mountDependencies(_a, _aState2);
        if (prevEpochNumber !== _aState2.n) {
          changedAtoms.set(_a, _aState2);
          _aState2.u == null || _aState2.u();
        }
      }
      invalidatedAtoms.delete(_a);
    }
  };
  var _writeAtomState = function writeAtomState(atom) {
    var isSync = true;
    var getter = function getter(a) {
      return returnAtomValue(_readAtomState(a));
    };
    var setter = function setter(a) {
      var aState = ensureAtomState(a);
      try {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        if (isSelfAtom(atom, a)) {
          if (!hasInitialValue(a)) {
            throw new Error('atom not writable');
          }
          var prevEpochNumber = aState.n;
          var v = args[0];
          setAtomStateValueOrPromise(a, aState, v);
          mountDependencies(a, aState);
          if (prevEpochNumber !== aState.n) {
            changedAtoms.set(a, aState);
            aState.u == null || aState.u();
            invalidateDependents(aState);
          }
          return undefined;
        } else {
          return _writeAtomState.apply(void 0, [a].concat(args));
        }
      } finally {
        if (!isSync) {
          recomputeInvalidatedAtoms();
          flushCallbacks();
        }
      }
    };
    try {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return atomWrite.apply(void 0, [atom, getter, setter].concat(args));
    } finally {
      isSync = false;
    }
  };
  var writeAtom = function writeAtom(atom) {
    try {
      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }
      return _writeAtomState.apply(void 0, [atom].concat(args));
    } finally {
      recomputeInvalidatedAtoms();
      flushCallbacks();
    }
  };
  var mountDependencies = function mountDependencies(atom, atomState) {
    if (atomState.m && !isPendingPromise(atomState.v)) {
      for (var _iterator7 = _createForOfIteratorHelperLoose(atomState.d), _step7; !(_step7 = _iterator7()).done;) {
        var _step7$value = _step7.value,
          a = _step7$value[0],
          n = _step7$value[1];
        if (!atomState.m.d.has(a)) {
          var aState = ensureAtomState(a);
          var aMounted = _mountAtom(a, aState);
          aMounted.t.add(atom);
          atomState.m.d.add(a);
          if (n !== aState.n) {
            changedAtoms.set(a, aState);
            aState.u == null || aState.u();
            invalidateDependents(aState);
          }
        }
      }
      for (var _iterator8 = _createForOfIteratorHelperLoose(atomState.m.d || []), _step8; !(_step8 = _iterator8()).done;) {
        var _a2 = _step8.value;
        if (!atomState.d.has(_a2)) {
          atomState.m.d.delete(_a2);
          var _aMounted = _unmountAtom(_a2, ensureAtomState(_a2));
          _aMounted == null || _aMounted.t.delete(atom);
        }
      }
    }
  };
  var _mountAtom = function mountAtom(atom, atomState) {
    if (!atomState.m) {
      _readAtomState(atom);
      for (var _iterator9 = _createForOfIteratorHelperLoose(atomState.d.keys()), _step9; !(_step9 = _iterator9()).done;) {
        var a = _step9.value;
        var aMounted = _mountAtom(a, ensureAtomState(a));
        aMounted.t.add(atom);
      }
      atomState.m = {
        l: new Set(),
        d: new Set(atomState.d.keys()),
        t: new Set()
      };
      atomState.h == null || atomState.h();
      if (isActuallyWritableAtom(atom)) {
        var mounted = atomState.m;
        var processOnMount = function processOnMount() {
          var isSync = true;
          var setAtom = function setAtom() {
            try {
              for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
              }
              return _writeAtomState.apply(void 0, [atom].concat(args));
            } finally {
              if (!isSync) {
                recomputeInvalidatedAtoms();
                flushCallbacks();
              }
            }
          };
          try {
            var onUnmount = atomOnMount(atom, setAtom);
            if (onUnmount) {
              mounted.u = function () {
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
  var _unmountAtom = function unmountAtom(atom, atomState) {
    if (atomState.m && !atomState.m.l.size && !Array.from(atomState.m.t).some(function (a) {
      var _ensureAtomState$m;
      return (_ensureAtomState$m = ensureAtomState(a).m) == null ? undefined : _ensureAtomState$m.d.has(atom);
    })) {
      var onUnmount = atomState.m.u;
      if (onUnmount) {
        unmountCallbacks.add(onUnmount);
      }
      delete atomState.m;
      atomState.h == null || atomState.h();
      for (var _iterator10 = _createForOfIteratorHelperLoose(atomState.d.keys()), _step10; !(_step10 = _iterator10()).done;) {
        var a = _step10.value;
        var aMounted = _unmountAtom(a, ensureAtomState(a));
        aMounted == null || aMounted.t.delete(atom);
      }
      return undefined;
    }
    return atomState.m;
  };
  var subscribeAtom = function subscribeAtom(atom, listener) {
    var atomState = ensureAtomState(atom);
    var mounted = _mountAtom(atom, atomState);
    var listeners = mounted.l;
    listeners.add(listener);
    flushCallbacks();
    return function () {
      listeners.delete(listener);
      _unmountAtom(atom, atomState);
      flushCallbacks();
    };
  };
  var unstable_derive = function unstable_derive(fn) {
    return _buildStore.apply(undefined, fn.apply(undefined, storeArgs));
  };
  var store = {
    get: readAtom,
    set: writeAtom,
    sub: subscribeAtom,
    unstable_derive: unstable_derive
  };
  return store;
};
var deriveDevStoreRev4 = function deriveDevStoreRev4(store) {
  var debugMountedAtoms = new Set();
  var savedGetAtomState;
  var inRestoreAtom = 0;
  var derivedStore = store.unstable_derive(function () {
    for (var _len7 = arguments.length, storeArgs = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      storeArgs[_key7] = arguments[_key7];
    }
    var getAtomState = storeArgs[0],
      setAtomState = storeArgs[1],
      atomWrite = storeArgs[3];
    savedGetAtomState = getAtomState;
    storeArgs[1] = function devSetAtomState(atom, atomState) {
      setAtomState(atom, atomState);
      var originalMounted = atomState.h;
      atomState.h = function () {
        originalMounted == null || originalMounted();
        if (atomState.m) {
          debugMountedAtoms.add(atom);
        } else {
          debugMountedAtoms.delete(atom);
        }
      };
    };
    storeArgs[3] = function devAtomWrite(atom, getter, setter) {
      for (var _len8 = arguments.length, args = new Array(_len8 > 3 ? _len8 - 3 : 0), _key8 = 3; _key8 < _len8; _key8++) {
        args[_key8 - 3] = arguments[_key8];
      }
      if (inRestoreAtom) {
        return setter.apply(undefined, [atom].concat(args));
      }
      return atomWrite.apply(undefined, [atom, getter, setter].concat(args));
    };
    return storeArgs;
  });
  var savedStoreSet = derivedStore.set;
  var devStore = {
    dev4_get_internal_weak_map: function dev4_get_internal_weak_map() {
      return {
        get: function get(atom) {
          var atomState = savedGetAtomState(atom);
          if (!atomState || atomState.n === 0) {
            return undefined;
          }
          return atomState;
        }
      };
    },
    dev4_get_mounted_atoms: function dev4_get_mounted_atoms() {
      return debugMountedAtoms;
    },
    dev4_restore_atoms: function dev4_restore_atoms(values) {
      var restoreAtom = {
        read: function read() {
          return null;
        },
        write: function write(_get, set) {
          ++inRestoreAtom;
          try {
            for (var _iterator11 = _createForOfIteratorHelperLoose(values), _step11; !(_step11 = _iterator11()).done;) {
              var _step11$value = _step11.value,
                _atom = _step11$value[0],
                value = _step11$value[1];
              if (hasInitialValue(_atom)) {
                set(_atom, value);
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
var createStore = function createStore() {
  var atomStateMap = new WeakMap();
  var store = _buildStore(function (atom) {
    return atomStateMap.get(atom);
  }, function (atom, atomState) {
    return atomStateMap.set(atom, atomState).get(atom);
  }, function (atom) {
    for (var _len9 = arguments.length, params = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      params[_key9 - 1] = arguments[_key9];
    }
    return atom.read.apply(atom, params);
  }, function (atom) {
    for (var _len10 = arguments.length, params = new Array(_len10 > 1 ? _len10 - 1 : 0), _key10 = 1; _key10 < _len10; _key10++) {
      params[_key10 - 1] = arguments[_key10];
    }
    return atom.write.apply(atom, params);
  }, function (atom) {
    for (var _len11 = arguments.length, params = new Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
      params[_key11 - 1] = arguments[_key11];
    }
    return atom.unstable_onInit == null ? undefined : atom.unstable_onInit.apply(atom, params);
  }, function (atom) {
    for (var _len12 = arguments.length, params = new Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
      params[_key12 - 1] = arguments[_key12];
    }
    return atom.onMount == null ? undefined : atom.onMount.apply(atom, params);
  });
  if (process.env.NODE_ENV !== 'production') {
    return deriveDevStoreRev4(store);
  }
  return store;
};
var defaultStore;
var getDefaultStore = function getDefaultStore() {
  if (!defaultStore) {
    defaultStore = createStore();
    if (process.env.NODE_ENV !== 'production') {
      var _ref5;
      (_ref5 = globalThis).__JOTAI_DEFAULT_STORE__ || (_ref5.__JOTAI_DEFAULT_STORE__ = defaultStore);
      if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
        console.warn('Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044');
      }
    }
  }
  return defaultStore;
};

exports.atom = atom;
exports.createStore = createStore;
exports.getDefaultStore = getDefaultStore;

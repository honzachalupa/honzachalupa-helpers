## Functions

##### Application (namespace: app or _a)
- `initServiceWorker(path, scope)` - defaults: `path = 'sw.js'`, `scope = '/'`
- `removeCachedData()`

##### Browser (namespace: browser or _b)
- `setCookie(key, value)`
- `getCookie(key)`
- `readCookieString(key)`
- `getBrowserName()`
- `getPlatformName()`
- `onWindowResize(callback, runOnMount)` - defaults: `runOnMount = true`
- `throttler(callback, delay)`

##### Context
Returns default Context API object called "Context" which can be shared between components.

##### Data (namespace: data or _d)
- `isValid(value)`
- `isNumber(value)`
- `objectToArray(object)`
- `objectsAreDifferent(object[])`
- `push(array, value)` - defaults: `array = []`
- `getIterableObject(object)`
- `switch(value, cases)`

##### Environment (namespace: environment or _e)
- `isDevEnvironment()`
- `isProdEnvironment()`

##### Formatting (namespace: formatting or _f)
- `camelize(value)`
- `decamelize(value, separator)` - defaults: `separator = '_'`
- `addThousandSeparators(value)`
- `limitDecimals(value, decimalsCount)` - defaults: `decimalsCount = 2`
- `boolToLabel(value, trueLabel, falseLabel)` - defaults: `trueLabel = 'Yes'`, `falseLabel = 'No'`
- `formatCurrency(value)`

## Options
You can overwrite default values with `setOptions({ ... })` function. Default options are:
```
{
    localization: {
        YES: 'Yes',
        NO: 'No'
    },
    serviceWorker: {
        path: 'sw.js',
        scope: '/'
    }
}
```

For more detailed documentation check the code implementation, muhehehe...

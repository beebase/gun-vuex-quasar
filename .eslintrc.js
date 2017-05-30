module.exports = {
  root         : true,
  parserOptions: {
    sourceType: 'module'
  },
  env          : {
    browser: true
  },
  globals      : {
    'cordova' : true,
    'Velocity': true,
    'DEV'     : true,
    'PROD'    : true,
    '__THEME' : true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends      : 'standard',
  // required to lint *.vue files
  plugins      : [
    'html'
  ],
  rules        : {
    // allow paren-less arrow functions
    'arrow-parens'                  : 0,
    'one-var'                       : 0,
    // allow debugger during development
    'no-debugger'                   : process.env.NODE_ENV === 'production' ? 2 : 0,
    'brace-style'                   : [2, 'stroustrup', {'allowSingleLine': true}],
    //   custom added to get rid of formatting errors
    'computed-property-even-spacing': 'off',
    'standard/no-callback-literal'  : 0,
    'key-spacing'                   : ['off'],
    'no-multi-spaces'               : ['off'],
    'no-undef'                      : ['off'],
    'space-before-function-paren'   : ['off'],
    'no-unused-vars'                : ['off'],
    'quotes'                        : ['off'],
    'spaced-comment'                : ['off'],
    // 'brace-style'                 : ["off"],
    'indent'                        : ['off']
    // 'null'                        : ["off"]
  }
}

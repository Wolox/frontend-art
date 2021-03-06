module.exports = {
  extends: ['stylelint-config-wolox'],
  rules: {
    'selector-max-type': 2,
    'at-rule-no-unknown': [ true, {
      ignoreAtRules: ['if', 'for', 'extend', 'mixin']
    }],
    'scss/no-duplicate-dollar-variables': [ true, {
      ignoreInsideAtRules: ['if', 'mixin', 'media']
    }],
    'at-rule-empty-line-before': [ "always", {
      ignoreAtRules: ['import']
    }],
    'selector-no-qualifying-type': [ true, {
      ignore: ['class']
    }]
  }
};

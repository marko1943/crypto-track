module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "handle-callback-err": "error",
    "no-console": 0,
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single", {"avoidEscape": true}],
    "semi": ["error", "always"],
    "react/jsx-uses-vars": 1,
    "react/jsx-uses-react": 1,
    "jsx-quotes": ["error", "prefer-double"]
  }
};

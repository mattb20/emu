;((exports) => {
  const tokenDictionary = [
    { regEx: /^say/, type: 'function', data: 'say' },
    { regEx: /^add/, type: 'function', data: 'add' },
    { regEx: /^subtract/, type: 'function', data: 'subtract' },
    { regEx: /^multiply/, type: 'function', data: 'multiply' },
    { regEx: /^modulo/, type: 'function', data: 'modulo' },
    { regEx: /^</, type: 'open paren', data: '<' },
    { regEx: /^"([^"]*)"/, type: 'string' },
    { regEx: /^[0-9]+/, type: 'number' },
    { regEx: /^>/, type: 'close paren', data: '>' },
    { regEx: /^assignVariable/, type: 'function', data: 'assignVariable' },
    { regEx: /^isGreaterThan/, type: 'function', data: 'isGreaterThan' },
    { regEx: /^isLessThan/, type: 'function', data: 'isLessThan' },
    { regEx: /^isEqual/, type: 'function', data: 'isEqual' },
    { regEx: /^if/, type: 'function', data: 'if' },
    { regEx: /^returnFirst/, type: 'function', data: 'returnFirst' },
    { regEx: /^while/, type: 'loop', data: 'while' }
  ];

  function tokenize(workingString) {
    const tokenArray = [];
    while (workingString.length > 0) {
      const thisTokenLex = tokenDictionary.find((tokenLex) => _matchRegEx(workingString, tokenLex));
      tokenArray.push(_processToken(workingString, thisTokenLex));
      workingString = _removeProcessedToken(workingString, thisTokenLex);
    }
    return tokenArray;
  }

  function _processToken(workingString, tokenLex) {
    let tokenValue = _matchRegEx(workingString, tokenLex);
    switch (tokenLex.type) {
      case 'string':
        tokenValue = tokenValue.slice(1, -1);
        break;
      case 'function':
        break;
      case 'open paren':
        break;
      case 'close paren':
        break;
      case 'number':
        tokenValue = parseInt(tokenValue, 10);
        break;
      case 'variable':
        tokenValue = tokenLex.data;
        break;
      case 'loop':
        break;
    }
    return _buildToken(tokenLex.type, tokenValue);
  }

  function _matchRegEx(string, tokenLex) {
    return string.match(tokenLex.regEx) ? string.match(tokenLex.regEx)[0] : null;
  }

  function _buildToken(type, data) {
    return { type, data };
  }

  function _removeProcessedToken(workingString, tokenLex) {
    const matchedString = _matchRegEx(workingString, tokenLex);
    return workingString.slice(matchedString.length).trim();
  }

  exports.tokenize = tokenize;
  exports.tokenDictionary = tokenDictionary;
})(this);

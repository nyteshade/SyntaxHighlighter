;(function()
{
  // CommonJS
  SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

  function Brush()
  {
    var keywords =  'null true false NaN undefined';
    var r = SyntaxHighlighter.regexLib;

    function process(match, regexInfo)
    {
      var constructor = SyntaxHighlighter.Match,
          code = match[0],
          result = [];

      if (match.key == "engines") {
        console.log(match);
      }

      if (match.key) {
        result.push(new constructor(match.key, match.index
          + match[0].indexOf(match.key), 'keyword'));
      }

      if (match.leading) {
        result.push(new constructor(match.leading, match.index
          + match[0].indexOf(match.leading), 'plain'));
      }

      if (match.trailing) {
        result.push(new constructor(match.trailing, match.index
          + match[0].indexOf(match.trailing), 'plain'));
      }

      if (match.val) {
        var sub;
        if ((sub=/\s*["'][^'"]+["']\s*/.exec(match.val))) {
          result.push(new constructor(match.val, match.index 
            + match[0].indexOf(match.val), 'string'));
        }
        else if ((sub=/\s*([0-9\.]+)\s*/mg.exec(match.val))) {
          result.push(new constructor(match.val, match.index 
            + match[0].indexOf(match.val), 'color1'));
        }
      }

      return result;
    }

    
    this.regexList = [
      //{ regex: r.multiLineDoubleQuotedString, css: 'string' },
      //{ regex: r.multiLineSingleQuotedString, css: 'string' },
      // { regex: r.singleLineCComments, css: 'comments' },
      // { regex: r.multiLineCComments, css: 'comments' },
      { regex: /\s*#.*/gm, css: 'preprocessor' },
      { regex: new RegExp(this.getKeywords(keywords), 'gm'),  css: 'keyword' },
      { regex: new XRegExp('^(?<leading>\s*[^\\,\\{\\}\\[\\]]*\s*)"(?<key>[^"]+)"\s*:\s*(?<val>.*?)(?<trailing>[\\,\\{\\}\\[\\]\\s]{0,2})$','smg'), 
        func: process 
      },
      { regex: /[\{\}\[\]\,\"\']/gm, css: 'operator'}
      ];
  
    this.forHtmlScript(r.scriptScriptTags);
  };

  Brush.prototype = new SyntaxHighlighter.Highlighter();
  Brush.aliases = ['json'];

  SyntaxHighlighter.brushes.JSON = Brush;

  // CommonJS
  typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

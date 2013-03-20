;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		var keywords =	''

		var r = SyntaxHighlighter.regexLib;

		this.regexList = [
      { regex: /([\.=\:])/gm,                         css: 'operators bold' },
      { regex: /^\s*(.*)(?=[^\\][\:|\=]{1})/gm,                css: 'keyword' },
      { regex: /^\s*([\S]+)(?=[ ].*)/gm,              css: 'keyword' },
			{ regex: r.singleLinePerlComments,							css: 'comments' },
      { regex: /^(!.*)$/gm,                           css: 'comments' },
      { regex: /((\\u)?[0-9]+)/gm,                    css: 'constants' }
			];

		this.forHtmlScript(r.scriptScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['properties'];

	SyntaxHighlighter.brushes.JavaProperties = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();

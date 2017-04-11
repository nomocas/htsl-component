# babelute-html Component Class

[![Travis branch](https://img.shields.io/travis/nomocas/babelute-html-component/master.svg)](https://travis-ci.org/nomocas/babelute-html-component)
[![bitHound Overall Score](https://www.bithound.io/github/nomocas/babelute-html-component/badges/score.svg)](https://www.bithound.io/github/nomocas/babelute-html-component)
[![npm](https://img.shields.io/npm/v/babelute-html-component.svg)]()
[![npm-downloads](https://img.shields.io/npm/dm/babelute-html-component.svg)]()
[![licence](https://img.shields.io/npm/l/babelute-html-component.svg)](https://spdx.org/licenses/MIT)
[![dependecies](https://img.shields.io/david/nomocas/babelute-html-component.svg)]()
[![dev-dependencies](https://img.shields.io/david/dev/nomocas/babelute-html-component.svg)]()

React Like Component Class for [babelute-html-lexicon](https://github.com/nomocas/babelute-html-lexicon).

(Almost) same API than [react component](https://facebook.github.io/react/docs/react-component.html).

Usable with [babelute-html-dom-diffing-pragmatics](https://github.com/nomocas/babelute-html-dom-diffing-pragmatics) and [babelute-html-string-pragmatics](https://github.com/nomocas/babelute-html-string-pragmatics) 

## Usage

```javascript
import Component from 'babelute-html-component';
import htmlLexicon from 'babelute-html-lexicon';

const MyComponent = Component.extends(Component, {
	getInitialState:function(props){
		return {
			//...
		};
	},
	componentWillMount() {
		// ...
	},
	render: function(firstLevel){
		var h = htmlLexicon.initializer(firstLevel);
		return h.div('...');
	}
});

const h = htmlLexicon.initializer(/* true if you use Diffing, false if you use String engine */);
const mySentence = h.div('...', h.component(MyComponent, { /* component props */ }));

```


## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright 2017 (c) Gilles Coomans

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

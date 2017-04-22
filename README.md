# htsl Component Class

[![Travis branch](https://img.shields.io/travis/nomocas/htsl-component/master.svg)](https://travis-ci.org/nomocas/htsl-component)
[![bitHound Overall Score](https://www.bithound.io/github/nomocas/htsl-component/badges/score.svg)](https://www.bithound.io/github/nomocas/htsl-component)
[![npm](https://img.shields.io/npm/v/htsl-component.svg)]()
[![npm-downloads](https://img.shields.io/npm/dm/htsl-component.svg)]()
[![licence](https://img.shields.io/npm/l/htsl-component.svg)](https://spdx.org/licenses/MIT)
[![dependencies](https://img.shields.io/david/nomocas/htsl-component.svg)]()
[![dev-dependencies](https://img.shields.io/david/dev/nomocas/htsl-component.svg)]()

React Like Component Class for [htsl-lexicon](https://github.com/nomocas/htsl-lexicon).

(Almost) same API than [React component](https://facebook.github.io/react/docs/react-component.html).

Usable with [htsl-dom-diffing-pragmatics](https://github.com/nomocas/htsl-dom-diffing-pragmatics) and [htsl-string-pragmatics](https://github.com/nomocas/htsl-string-pragmatics) 

## Usage

```javascript
import Component from 'htsl-component';
import htmlLexicon from 'htsl-lexicon';

const MyComponent = Component.extends(Component, {
	getInitialState:function(props){
		return {
			title: 'Hello world'
			...
		};
	},
	componentWillMount() {
		...
	},
	componentDidUnmount(){
		...
	},
	doSomething(event, arg) {
		console.log('bam!', arg);
	},
	render: function(firstLevel){
		var h = htmlLexicon.initializer(firstLevel);
		return h.div(h.h1(thi.state.title).button('foo', h.click(this.doSomething)), ...);
	}
});

// usage :
const h = htmlLexicon.initializer(/* true if you use FirstLevel Diffing, false otherwise */);
const mySentence = h.div('...', h.component(MyComponent, { /* component props */ }));

```



## Licence

The [MIT](http://opensource.org/licenses/MIT) License

Copyright 2017 (c) Gilles Coomans

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

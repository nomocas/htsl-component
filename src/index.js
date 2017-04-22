/*
 * @Author: Gilles Coomans
 * htsl Component Class (almost same api than React)
 */

import assert from 'assert'; // removed in production
import AsyncAggregator from 'async-aggregator';

function Component(props, parent) {
	this.props = props;
	this.parent = parent;
	this.unmounted = false;
	this.waiter = parent && parent.waiter || new AsyncAggregator();
	for (const i in this) // bind all component's methods to component
		if (i !== 'constructor' && typeof this[i] === 'function')
			this[i] = this[i].bind(this);
	if (this.getInitialState)
		this.state = this.getInitialState(props);
}

Component.prototype = {
	constructor: Component,
	setState(state) {
		this.state = Object.assign({}, this.state, state);
		if (!this.unmounted)
			this.update(); // set state should come from inner tree events : so delayed update
	},

	setProps(props) {
		this.componentWillReceiveProps(props);
		this.props = Object.assign({}, this.props, props);
		if (!this.unmounted)
			this.forceUpdate(); // update come from upper tree update : so immediate update
	},

	forceUpdate() {
		try {
			this.componentWillUpdate();
			this._render();
			this.componentDidUpdate();
		} catch (e) {
			console.error('component error while forceUpdate', e, e.stack); // eslint-disable-line
		}
	},

	/**
	 * addition to React API : wait next animation frame then update (normally not used directly)
	 * @return {Void} nothing
	 * @protected
	 */
	update() {
		if (this.animFrame)
			cancelAnimationFrame(this.animFrame);
		this.animFrame = requestAnimationFrame(() => {
			this.animFrame = null;
			this.forceUpdate();
		});
	},

	unmount() {
		this.unmounted = true;
		if (this.animFrame)
			cancelAnimationFrame(this.animFrame);
		try {
			this.componentWillUnmount();
			this._remove();
			this.componentDidUnmount();
		} catch (e) {
			console.error('component error while unmount', e, e.stack); // eslint-disable-line
		}
	},

	/**
	 * under-the-hood render and remove methods that are pragmas dependent
	 * @protected
	 */
	_render() { /* will be overriden by pragmas engine */ },
	_remove() { /* will be overriden by pragmas engine */ },
	_mount() { /* will be overriden by pragmas engine */ },

	// could be overriden by subclasses
	componentWillReceiveProps( /* props */ ) {},
	componentWillMount() {},
	componentDidMount() {},
	componentWillUpdate() {},
	componentDidUpdate() {},
	componentWillUnmount() {},
	componentDidUnmount() {}
};


// Component easy extension
Component.extends = function(Class, api) {

	assert(Class === Component || (Class.prototype instanceof Component), 'Component.extends accepts only a Component Class or Subclass as first argument');
	assert(!api || typeof api === 'object', 'Component.extends need a (optional) valid object containing methods as second argument');

	const C = function(props, parent) {
		Class.call(this, props, parent);
	};
	C.prototype = Object.create(Class.prototype);
	C.prototype.constructor = C;
	for (const i in api) // Object.assign seems to bug when used on prototype (not investigate enough : so use plain old for-in syntax)
		C.prototype[i] = api[i];
	return C;
};

export default Component;

// export default class Component {

// 	constructor(props, parent) {
// 		this.props = props;
// 		this.parent = parent;
// 		this.waiter = parent && parent.waiter || new AsyncAggregator();
// 		if (this.getInitialState)
// 			this.state = this.getInitialState(props);
// 		console.log('component init'); // eslint-disable-line no-console
// 		for (const i in this) // bind all component's methods to component
// 			if (i !== 'constructor' && typeof this[i] === 'function') {
// 				console.log('component bind method : ', i); // eslint-disable-line no-console
// 				this[i] = this[i].bind(this);
// 			}
// 		this.unmount = this.unmount.bind(this);
// 	}

// 	setState(state) {
// 		this.state = Object.assign({}, this.state, state);
// 		if (!this.unmounted)
// 			this.delayedUpdate();
// 	}

// 	setProps(props) {
// 		this.componentWillReceiveProps(props);
// 		this.props = Object.assign({}, this.props, props);
// 		this.forceUpdate();
// 	}

// 	forceUpdate() {
// 		this.componentWillUpdate();
// 		this._render();
// 		this.componentDidUpdate();
// 	}

// 	/**
// 	 * addition to React API : wait next animation frame then update (normally not used directly)
// 	 * @return {Void} nothing
// 	 * @protected
// 	 */
// 	delayedUpdate() {
// 		if (this.animFrame)
// 			cancelAnimationFrame(this.animFrame);
// 		this.animFrame = requestAnimationFrame(() => { this.animFrame = null;
// 			this.forceUpdate(); });
// 	}

// 	unmount() {
// 		this.unmounted = true;
// 		if (this.animFrame)
// 			cancelAnimationFrame(this.animFrame);
// 		this.componentWillUnmount();
// 		this._remove();
// 		this.componentDidUnmount();
// 	}

// 	/**
// 	 * under-the-hood render and remove methods that are pragmas dependent
// 	 * @protected
// 	 */
// 	_render() { /* will be overriden by pragmas engine */ }
// 	_remove() { /* will be overriden by pragmas engine */ }

// 	// could be overriden by subclasses
// 	componentWillReceiveProps( /* props */ ) {}
// 	componentWillMount() {}
// 	componentDidMount() {}
// 	componentWillUpdate() {}
// 	componentDidUpdate() {}
// 	componentWillUnmount() {}
// 	componentDidUnmount() {}

// 	// Component easy extension
// 	static extends(Class, api) {

// 		assert(Class === Component || (Class.prototype instanceof Component), 'Component.extends accepts only a Component Class or Subclass as first argument');
// 		assert(!api || typeof api === 'object', 'Component.extends need a (optional) valid object containing methods as second argument');

// 		const C = function(props) {
// 			Class.call(this, props);
// 		};
// 		C.prototype = Object.create(Class.prototype);
// 		C.prototype.constructor = C;
// 		for (const i in api) // Object.assign seems to bug when used on prototype (not investigate enough : so use plain old for-in syntax)
// 			C.prototype[i] = api[i];
// 		return C;
// 	}
// }

/**
 * @example
 * import Component from './component';
 * import htmlLexicon from 'htsl/src/html-lexicon'; 
 * 
 * class Foo extends Component {
 * 	constructor(props) {
 * 		super(props);
 * 		this.state = {
 * 			foo: 'zoo',
 * 			title: 'roo'
 * 		};
 * 	} 
 *
 * 	clickAction(title) {
 * 		this.setState({
 * 			foo: title + Math.random()
 * 		});
 * 	}
 * 	
 * 	render(useFirstLevel) {
 * 		const h = htmlLexicon.initializer(useFirstLevel);
 * 		return h.div(
 * 			h.class('foo')
 * 			.h1(this.props.bar)
 * 			.p(this.state.foo)
 * 			.click(this.clickAction, this.state.title)
 * 		);
 * 	}
 * }
 * 
 * htmlLexicon.addAliases(() => {
 * 	return {
 * 		foo(yop) {
 * 			return this.component(Foo, {
 * 				bar: yop
 * 			});
 * 		}
 * 	};
 * });
 * 
 * export { Foo };
 */


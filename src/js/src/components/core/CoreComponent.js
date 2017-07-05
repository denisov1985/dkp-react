import React, {Component} from 'react'

export default class DefaultComponent extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.classData = [];
        this.styleData = {};
    }

    setNested(obj, keyPath, value) {
        let result = {...obj}
        this.assign(result, keyPath, value);
        return result;
    }

    getNested(obj, keyPath, value) {
        let result = {...obj}
        let lastKeyIndex = keyPath.length-1;
        for (let i = 0; i < lastKeyIndex; ++ i) {
            let key = keyPath[i];
            if (!(key in result))
                return value;
            result = result[key];
        }
        if (result[keyPath[lastKeyIndex]] === undefined) {
            return value;
        }   else  {
            return result[keyPath[lastKeyIndex]];
        }
    }

    assign(obj, keyPath, value) {
        let lastKeyIndex = keyPath.length-1;
        for (let i = 0; i < lastKeyIndex; ++ i) {
            let key = keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }

    getIcon() {
        if (this.props.icon === undefined) {
            return null;
        }
        let className = 'icon ' + this.props.icon;
        return (<i className={className} />)
    }

    getPosition() {
        if (this.props.position === undefined) {
            return '';
        }
        let className = this.props.position + ' floated';
        return className;
    }

    addClass(className) {
        if (this.classData.indexOf(className) < 0) {
            this.classData.push(className);
        }
    }

    addStyle(styleKey, styleValue) {
        this.styleData[styleKey] = styleValue;
    }

    getElementClass() {
        return '';
    }

    reset() {
        this.classData = [];
        this.styleData = {};
    }

    buildClass() {
        return [];
    }

    buildStyle() {
        return {};
    }

    getClass() {
        this.reset();
        if (this.props.condition !== undefined) {
            this.props.condition(this);
        }
        this.buildClass();
        return [
            this.classData.join(' '),
            this.getProp('color'),
            this.getProp('size'),
            this.getProp('disabled'),
            this.getPosition(),
            this.getElementClass()
        ].join(' ').trim();
    }

    getStyle() {
        this.reset();

        if (this.getProp('shiftLeft', false)) {
            this.addStyle('marginLeft', this.getProp('shiftLeft') + 'px')
        }

        if (this.getProp('shiftRight', false)) {
            this.addStyle('marginRight', this.getProp('shiftRight') + 'px')
        }

        this.buildStyle();
        return this.styleData;
    }

    getClassName = () => this.getClass();

    getProp(propName, defaultValue, target) {
        if (typeof target === 'undefined') {
            target = this.props;
        }
        if (defaultValue === undefined) {
            defaultValue = '';
        }
        return target[propName] == undefined ? defaultValue : target[propName];
    }

    addHidden() {
        this.addClass('hidden');
    }

    addDisabled() {
        this.addClass('disabled');
    }

    addLoading() {
        this.addClass('loading');
        this.addClass('disabled');
    }

    getNestedValue(target, defaultValue) {

    }

    /**
     * Render children element with props
     * Has different behavior depending on children number
     * @param props
     * @param element
     * @returns {string}
     */
    renderElementWithProps(props, element) {
        if (Array.isArray(element)) {
            return element.map((child, index) => {
                props.key = index;
                if (typeof child.type === 'string') {
                    return child;
                }   else  {
                    return React.cloneElement(child, props)
                }
            });
        }   else  {
            if (typeof element === 'string') {
                return element;
            }
            return React.cloneElement(element, props)
        }
    }

    stopPropagate = (e) => {
        e.stopPropagation();
    }

    camelToDash = (str) => {
        return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}).substr(1);
    }

    getKey(index) {
        return this.camelToDash(this.constructor.name) + '-children-' + index;
    }

    render() {
        return null;
    }
}


import React, {Component} from 'react'

export default class DefaultComponent extends Component {

    constructor(props) {
        super(props);
        this.classData = [];
    }

    onClick = () => {
        if (this.props.onClick !== undefined) {
            this.props.onClick(this.props);
        }
    }

    getIcon() {
        if (this.props.icon === undefined) {
            return null;
        }
        let className = 'icon ' + this.props.icon;
        return (<i className={className}></i>)
    }

    getPosition() {
        if (this.props.position === undefined) {
            return '';
        }
        let className = this.props.position + ' floated';
        return className;
    }

    addClass(className) {
        this.classData.push(className);
    }

    getElementClass() {
        return '';
    }

    reset() {
        this.classData = [];
    }

    getClass() {
        return [
            this.classData.join(' '),
            this.getProp('color'),
            this.getProp('size'),
            this.getPosition(),
            this.getElementClass()
        ].join(' ');
    }

    getProp(propName) {
        return this.props[propName] == undefined ? '' : this.props[propName];
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

    render() {
        return null;
    }
}


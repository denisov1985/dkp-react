import React, {Component} from 'react'

export default class DefaultComponent extends Component {

    onClick = () => {
        if (this.props.onClick !== undefined) {
            this.props.onClick(this.props);
        }
    }

    getElementClass() {
        return '';
    }

    getClass() {
        return [
            this.getProp('color'),
            this.getProp('size'),
            this.getElementClass()
        ].join(' ');
    }

    getProp(propName) {
        return this.props[propName] == undefined ? '' : this.props[this.props[propName]];
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


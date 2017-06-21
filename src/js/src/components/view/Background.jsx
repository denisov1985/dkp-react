import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

class Background extends CoreComponent {
    render() {
        return (<div style={{
            zIndex: 0,
            display: 'block',
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: '#DADADA'
        }}>{this.props.children}</div>);
    }
}

export default Background;
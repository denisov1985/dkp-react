import React, {Component} from 'react'
import CoreComponent from '../core/CoreComponent';

export default class Menu extends CoreComponent {
    buildItems(items, template) {
        console.log(template)
        let result = [];
        if (Array.isArray(items)) {
            result = items.map((e, i) => {
                if (Array.isArray(e.children)) {
                    return (<div key={i} className="ui simple dropdown item">
                        {e.title} <i className="dropdown icon"></i>
                        <div className="menu">
                            {this.buildItems(e.children, template)}
                        </div>

                    </div>);
                }   else  {
                    let props = {
                        key: i,
                        className: 'item'
                    };
                    props[this.props.itemData] = e;
                    props.children = e[this.props.itemTitle];
                    return this.renderElementWithProps(props, template)
                }
            })
        }
        return result;
    }

    render() {
        return (
            <div className="ui inverted menu">
                <div className="ui container">
                    <a  href="#" className="header item">
                        <img className="logo margin-right-10" src="data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRjM4RjE5IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gcG9pbnRzPSI5Ny4wODUsNTQuNjA4IDk5LjM2Myw1NS4yNyAxMDAsNTIuNTQ5ICIvPjxwb2x5Z29uIHBvaW50cz0iNDQuOTA0LDYwLjI5NSA0OS4zMTUsNTYuNDcxIDUyLjE1OSw1Ni40NzEgNDkuMzE1LDY5LjYwOCA1Ni42NjgsNzAuNTg4IDYwLjY4OCw3NC4wMiA1Ni4yNzYsNzQuMDIgNTMuMzM0LDcyLjQ1MSAgIDQ2LjU3LDcyLjU0OSA0NC45MDQsNjguNjI4ICIvPjxwb2x5Z29uIHBvaW50cz0iNzYuOTM4LDU3LjI1NiA3NS4wOTksNjEuOTYxIDc5LjM2NCw2NS45MzIgODEuMjAxLDY5LjUzNCA4My4zNzYsNzEuMjk5IDg0LjUxMiw2OS45MDIgODEuNTY5LDYzLjA2NCAiLz48cGF0aCBkPSJNOTQuMzMxLDQ0LjMxNGwtNS40MDcsMS4wNjZsLTUuNTY1LDcuNTM3bDAuNjQ0LTAuMTYzTDg1LjU0MSw1MmgzLjE4NmwwLjc0MSwwLjE4OUw5Mi44Myw0OUg5NnYtMi40OEw5NC4zMzEsNDQuMzE0eiAgIE05My41NTUsNDYuODg4bC0xLjc2NS0wLjQwNGwxLjg3NS0xLjEwM2wxLjMyMywwLjg0Nkw5My41NTUsNDYuODg4eiIvPjxwb2x5Z29uIHBvaW50cz0iODMuOTIyLDM5LjA5NyA4Ny43ODcsMzEuOTYzIDkwLjk4MiwzOS4wOTcgODcuMTU4LDM3LjU1ICIvPjxwb2x5Z29uIHBvaW50cz0iOTkuMTE4LDM0LjgwNSA5OC4wNCwzMS4zMjQgOTMuMzg5LDM0LjUxMSA4OS4zNjcsMzMuODkyIDkyLjEwOSw0MC4yNDYgODcuMjA3LDM4LjE4NyA4NS41MjgsMzguODY1IDg1LDQwLjA1ICAgODMuMDg5LDQ3Ljc0NiA4Ni45MTMsNDQuNDYxIDkyLjMwNiw0MS43MTYgOTYuMzczLDQyLjUgOTcuOTkyLDQ3Ljc0NiA5OS4yNjcsNDMuMTM4IDk3LjY5OCwzNy44NDQgIi8+PGc+PHBvbHlnb24gcG9pbnRzPSIxNC4yMTIsNDkuMzQzIDExLjAyOCw1MC4zOTYgMTQuNTk1LDY3LjExMSAxOC4zMzMsNjUuNDM0ICAiLz48cG9seWdvbiBwb2ludHM9IjguMDc0LDUxLjM3NSA1LjM2Myw1Mi4yNzMgOC4zMDgsNjkuOTMxIDExLjkwOSw2OC4zMTYgICIvPjxwb2x5Z29uIHBvaW50cz0iMjQuNjA1LDM2Ljk0NiAyMS44MTMsNDEuMTQzIDI1LjUwNiw1NS4xMjEgMjcuODgxLDUwLjc1OCAgIi8+PHBvbHlnb24gcG9pbnRzPSIyLjM1OSw1My4yNjggMi4xNTksNTMuMzM0IDAuMzk1LDYzLjYyNyA1LjA4NCw2OC40NTYgICIvPjxwb2x5Z29uIHBvaW50cz0iMTkuNTUsNDQuNTQzIDE3LjEyOCw0OC4xODMgMjAuODgsNjMuNjE3IDIzLjUwNCw1OC43OTggICIvPjxwb2x5Z29uIHBvaW50cz0iOTguNjQ5LDQ2Ljk4NiA5OC4wNCw0OC45MjIgOTYuMTM5LDQyLjk0MiA5Mi40MDIsNDIuMjA3IDg3LjE1OCw0NC44NTMgODIuMzU0LDQ4LjkyMiA4NC41MTIsMzkuODU0IDg0LjgyMywzOS4xMyAgICA4Mi41NSw0MC4wNSA4Ni45NjQsMzIuMzA1IDc0LjExOCwyNy4zMDUgNjIuOTQyLDIwLjAwMSAzNC4zMTYsMjIuMzU0IDI2Ljk0MiwzMy40MzQgMjkuOTU0LDQ2Ljk1MSAzMC4wMDIsNDYuODYzIDMxLjk2Miw1NS45OCAgICAyOS4xMTksNjAuODgzIDI1LjM5NCw2NC43MDYgMjUuNTksNjYuNDcxIDMxLjE3OCw4MCAzNy45NDMsODAgMzcuNjQ5LDc3LjU0OSAzNS4xOTgsNzYuNTY4IDMxLjA4LDY3LjI1NSA0MC4wMDEsNjIuODQ0IDQ4LjkyMyw1NSAgICA1OS40MTQsNTUuMzkzIDY0LjMxNCw2Ni43NjYgNjkuMDIxLDcxLjE3NiA3Mi42NDgsNzguODI0IDc5LjYwOSw3OC44MjQgNzcuNjQ4LDc1Ljk4IDc0LjkwMiw3NS45OCA3MC42ODgsNjguMjM1IDc3LjEwOSw1My43MjcgICAgODIuMDExLDUzLjcyNyA4OC40NDUsNDQuODMgOTQuNTQ4LDQzLjQzMiA5Ni43NjYsNDUuOTgxIDk2Ljc2Niw0OS44NTQgOTMuMjM1LDQ5Ljg1NCA5MC4yMDUsNTIuNTU5IDk2LjEzOSw1NC4zNjMgMTAwLDUxLjYxOCAgIi8+PC9nPjwvc3ZnPg==" />
                        Raccoons DKP
                    </a>
                    {this.buildItems(this.props.items, this.props.children)}

                </div>
            </div>
        )
    }
}

Menu.defaultProps = {
    items: []
};
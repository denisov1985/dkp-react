export default class Route {

    /**
     * Constructor
     * @param route
     * @param parent
     * @param router
     */
    constructor(route, parent, router) {
        this.title = route.title;
        this.path  = route.path;
        this.alias = route.alias;
        this.component = route.component;
        this.router = router;
        this.parent   = parent;
        this.children = null;
        if (this.parent === null) {
            this.level = 0;
        }   else  {
            this.level = this.parent.level + 1;
        }
    }



    /**
     * Check if route is active
     * @returns {boolean}
     */
    isActive() {
        return this.path === this.router.getCurrentRoute();
    }

    isActiveSub() {
        if (this.level > 2) {
            return false;
        }
        let hasActiveChildren = false;
        if (Array.isArray(this.children)) {
            this.children.map((element, index) => {
                if (element.path === this.router.getCurrentRoute()) {
                    hasActiveChildren = true;
                }
            });
        }
        if (this.level === 1) {
            return this.path === this.router.getCurrentRoute();
        }
        return this.path === this.router.getCurrentRoute() || hasActiveChildren;
    }

    /**
     * Get nested level
     * @returns {number|*}
     */
    getLevel() {
        return this.level;
    }

    /**
     * Get route link
     * @returns {string}
     */
    getLink() {
        return '#' + this.path;
    }

    getAllParent(items) {
        items.push(this);
        if (this.parent != null && this.parent.getLevel() > 0) {
            items = this.parent.getAllParent(items);
        }
        return items;
    }

    lookupByPath(path) {
        if (path == this.path) {
            return this;
        }   else if (typeof this.children != 'undefined')  {
            for (let i in this.children) {
                let result = this.children[i].lookupByPath(path);
                if (result != false) {
                    return result;
                }
            }
        }   else  {
            return false
        }
        return false;
    }
}
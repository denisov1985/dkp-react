export default class ClassProp
{
    static is(className, element) {
        let field = this;
        if (!element.props.record.dataset[field]) {
            element.addClass(className)
        }
    }

    static not(className, element) {
        let field = this;
        if (element.props.record.dataset[field]) {
            element.addClass(className)
        }
    }
}
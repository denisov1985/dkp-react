export default class ColorProp
{
    static is(color, element) {
        let field = this;
        if (!element.props.record.data[field]) {
            element.addClass(color)
        }
    }

    static not(color, element) {
        let field = this;
        if (element.props.record.data[field]) {
            element.addClass(color)
        }
    }
}
export default class VisibleProp
{
    static is(element) {
        let field = this;
        if (!element.props.record.data[field]) {
            element.addHidden();
        }
    }

    static not(element) {
        let field = this;
        if (element.props.record.data[field]) {
            element.addHidden();
        }
    }
}
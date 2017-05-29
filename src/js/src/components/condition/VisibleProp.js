export default class VisibleProp
{
    static is(element) {
        let field = this;
        if (!element.props.record.dataset[field]) {
            element.addHidden();
        }
    }

    static not(element) {
        let field = this;
        if (element.props.record.dataset[field]) {
            element.addHidden();
        }
    }
}
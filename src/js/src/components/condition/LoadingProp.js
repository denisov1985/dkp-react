export default class LoadingProp
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
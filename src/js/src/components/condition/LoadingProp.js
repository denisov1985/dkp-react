export default class LoadingProp
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
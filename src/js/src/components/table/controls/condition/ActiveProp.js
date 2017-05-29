export default class ActiveProp
{
    static is(element) {
        let field = this;
        if (!element.props.record.dataset[field]) {
            element.addDisabled();
        }
    }

    static not(element) {
        let field = this;
        if (element.props.record.dataset[field]) {
            element.addDisabled();
        }
    }
}
class ActionFactory
{
    create() {
        return {
            request() {
                return {
                    type: 'REQUEST_FIND',
                    payload: 'ololo'
                };
            }
        }
    }
}

export default new ActionFactory();
export default class ReducerHelper
{
    static setNested(obj, keyPath, value) {
        let result = {...obj}
        ReducerHelper.assign(result, keyPath, value);
        return result;
    }

    static getNested(obj, keyPath, value) {
        console.log('result');
        let result = {...obj}
        let lastKeyIndex = keyPath.length-1;
        for (let i = 0; i < lastKeyIndex; ++ i) {
            let key = keyPath[i];
            if (!(key in result))
                return value;
            result = result[key];
            if (typeof result === 'undefined') {
                result = {}
            }
        }

        if (result[keyPath[lastKeyIndex]] === undefined) {
            return value;
        }

        return result[keyPath[lastKeyIndex]];
    }

    static assign(obj, keyPath, value) {
        let lastKeyIndex = keyPath.length-1;
        for (let i = 0; i < lastKeyIndex; ++ i) {
            let key = keyPath[i];
            if (!(key in obj))
                obj[key] = {}
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }

}
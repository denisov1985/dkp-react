export default class CollectionHelper
{
    static updateStatus(id, type, status, collection) {
        collection.map((element, index) => {
            if (element.data.id === id) {
                collection[index].status[type] = status;
            }
        });
        return [...collection];
    }

    static updateData(data, collection) {
        let found = false;
        collection.map((element, index) => {
            if (element.id === data.id) {
                found = true;
                for (let i in data) {
                    collection[index][i] = data[i];
                }
            }
        });
        return [...collection];
    }

    static deleteData(data, collection) {
        return collection.filter(element => element.id !== data.id)
    }

    static updateCollection(action, collection) {
        collection.map((element, index) => {
            action(element, index);
        });
        return [...collection];
    }

    static deleteCollection(action, collection) {
        let items = [];
        collection.map((element, index) => {
            if (!action(element, index)) {
                items.push(element)
            }
        });
        return items;
    }
}

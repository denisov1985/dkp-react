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

    static updateData(data, type, collection) {
        let found = false;
        collection.map((element, index) => {
            if (element.data.id === data.id) {
                found = true;
                for (let i in data) {
                    collection[index].data[i] = data[i];
                }
                collection[index].status[type] = 2;
            }
        });
        return [...collection];
    }
}

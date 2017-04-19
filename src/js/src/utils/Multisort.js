class Multisort {

    static sort(arr, columns, orderBy) {
        if (columns[0] === null) {
            return arr;
        }
        if(typeof columns == 'undefined') {
            columns = [];
            for(x=0;x<arr[0].length;x++) {
                columns.push(x);
            }
        }

        if(typeof orderBy == 'undefined') {
            orderBy = [];
            for(x=0;x<arr[0].length;x++) {
                orderBy.push('ASC');
            }
        }

        function multisortRecursive(a,b,columns,order_by,index) {
            let direction = order_by[index] == 'DESC' ? 1 : 0;

            let is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

            let ax = a[columns[index]] === undefined ? '' : a[columns[index]];
            let by = b[columns[index]] === undefined ? '' : b[columns[index]];

            let x = is_numeric ? ax : ax.toLocaleLowerCase();
            let y = is_numeric ? by : by.toLocaleLowerCase();

            if(!is_numeric) {
                x = ax,-1,
                y = by,-1;
            }



            if(x < y) {
                return direction === 0 ? -1 : 1;
            }

            if(x === y)  {
                return columns.length-1 > index ? multisortRecursive(a,b,columns,order_by,index+1) : 0;
            }

            return direction === 0 ? 1 : -1;
        }

        return arr.sort(function (a,b) {
            return multisortRecursive(a,b,columns,orderBy,0);
        });
    }

}

export default Multisort;
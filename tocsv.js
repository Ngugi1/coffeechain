const tocsv = require('export-to-csv');
module.exports = {
    writetofile: function(items, name) {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: name,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true
        };
        const csvExporter = new tocsv.ExportToCsv(options);
        csvExporter.generateCsv(items);

    }
}
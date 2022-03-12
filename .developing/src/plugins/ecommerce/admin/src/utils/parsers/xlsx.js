import readXlsxFile from 'read-excel-file';
import xlsx2json from '../formats/xlsx2json';

export default async(products, categories) => {
  await readXlsxFile(categories.rawFile)
    .then((rows) => console.log(rows))
  return readXlsxFile(file.rawFile, { schema: xlsx2json })
    .then(({ rows,errors }) => {
      console.log(errors)
      return rows.map(row => {
        let status
        switch (row['status']) {
          case 7:
            status = 'SELLING'
            row = { ...row, status  }
            break;
          case 5:
            status = 'UNAVAILABLE'
            row = { ...row, status  }
            break;
          case 8:
            status = 'ON_ORDER'
            row = { ...row, status  }
            break;
          default:
            status = 'ON_ORDER'
            row = { ...row, status  }
        }
        return row
      })
  })
}
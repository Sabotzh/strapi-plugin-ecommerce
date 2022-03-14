import readXlsxFile from 'read-excel-file';
import categorySchema from '../formats/xlsx2jsonCategories';
import productSchema from '../formats/xlsx2jsonProducts';

export default async(products, categories) => {
  console.log(categories)
  await readXlsxFile(categories.rawFile)
    .then((rows) => console.log('rows', rows))
  await readXlsxFile(categories.rawFile, { schema: categorySchema })
    .then((rows) => console.log('rows', rows))
  // return readXlsxFile(file.rawFile, { schema: productSchema })
  //   .then(({ rows,errors }) => {
  //     console.log(errors)
  //     return rows.map(row => {
  //       let status
  //       switch (row['status']) {
  //         case 7:
  //           status = 'SELLING'
  //           row = { ...row, status  }
  //           break;
  //         case 5:
  //           status = 'UNAVAILABLE'
  //           row = { ...row, status  }
  //           break;
  //         case 8:
  //           status = 'ON_ORDER'
  //           row = { ...row, status  }
  //           break;
  //         default:
  //           status = 'ON_ORDER'
  //           row = { ...row, status  }
  //       }
  //       return row
  //     })
  // })
}
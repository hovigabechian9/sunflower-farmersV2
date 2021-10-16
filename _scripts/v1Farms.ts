import csv from "csv-parser";
import path from "path";
import fs from "fs";

function getFruit(level: number) {
    if (level === 1) {
        // Potato
        return 2
    }

    if (level === 2) {
        // Beets
        return 4
    }

    if (level === 3) {
        // Cauli
        return 5
    }

    if (level === 4) {
        // Parnsnip
        return 6
    }

    // Radish
    return 7
}

function getSize(level: number) {
    if (level === 1) {
        // Potato
        return 5
    }

    if (level === 2) {
        // Beets
        return 8
    }

    if (level === 3) {
        // Cauli
        return 11
    }

    if (level === 4) {
        // Parnsnip
        return 14
    }

    // Radish
    return 17
}
const results = [];
const tokens = [];

fs.createReadStream(path.resolve(__dirname, "./transactions.csv"))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);


    fs.createReadStream(path.resolve(__dirname, "./tokens.csv"))
        .pipe(csv())
        .on('data', (data) => tokens.push(data))
        .on('end', () => {
            console.log(tokens);
            const v1Farms = results.reduce((farms: any, row: { From: string, Method: string, ErrCode: string }) => {

            if(row.ErrCode) {
                return farms
            }
            if (row.Method === 'Create Farm') {
                return {
                    ...farms,
                    // Level 1
                    [row.From]: 1 
                }
            }

            if (row.Method === 'Level Up') {
                return {
                    ...farms,
                    // Level 1
                    [row.From]: farms[row.From] + 1 
                }
            }
            // Prevent duplicates
            return farms;
            }, {});

            console.log('Found farms: ', Object.keys(v1Farms).length)
            const tuple = Object.keys(v1Farms).map(address => {
                const level = v1Farms[address]
                const token = tokens.find(token => token.HolderAddress === address)
                //console.log({ token })
                return [
                    address,
                    // Token amount
                    token ? Math.ceil(Number(token.Balance)) : 0,
                    getSize(level),
                    getFruit(level),
                ]
            })

            console.log('Tuple length: ', tuple.length)

            fs.writeFileSync(
                path.resolve(__dirname, "./tuple.txt"),
                JSON.stringify(tuple)
            );

        })

  });


// const columnToKey = {
//   E: "From",
//   P: "Method",
// };
// const result = excelToJson({
//   sourceFile: path.resolve(__dirname, "./transactions.csv"),
//   header: {
//     rows: 1,
//   },
// });
// console.log({ con: 0x60806040})
// const rows = result["Sheet1"];
// console.log(rows[1]);

// const v1Farms = rows.reduce((farms: any, row: { From: string, Method: string}) => {
//   if (row.Method === 'Create Farm') {
//       return {
//           ...farms,
//           // Level 1
//           [row.From]: 1 
//       }
//   }

//   if (row.Method === 'Level Up') {
//     return {
//         ...farms,
//         // Level 1
//         [row.From]: row.From + 1 
//     }
// }
//   // Prevent duplicates
//   return farms;
// }, {});

// // Convert to Tuple

// console.log({ v1Farms })
// // const billers: Biller[] = Object.values(uniqueBillers);

// // const sortedBillers = billers.sort((a, b) => (a.title > b.title ? 1 : -1));
// // fs.writeFileSync(
// //   path.resolve(__dirname, "./farms.json"),
// //   JSON.stringify(v1Farms)
// // );

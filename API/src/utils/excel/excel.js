const excel = require('node-excel-export');

// You can define styles as json object
const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      underline: true
    }
  },
  headerWhite: {
    fill: {
      fgColor: {
        rgb: 'ffffff'
      }
    },
    font: {
      color: {
        rgb: '000000'
      },
      sz: 18,
      bold: true
    },
    alignment: {
      horizontal: 'center'
    },
    border: {
      top: {
        style: 'thin',
        color: {
          rgb: 'ffffff'
        }
      },
      left: {
        style: 'thin',
        color: {
          rgb: 'ffffff'
        }
      },
      right: {
        style: 'thin',
        color: {
          rgb: 'ffffff'
        }
      },
      bottom: {
        style: 'thin',
        color: {
          rgb: 'ffffff'
        }
      }
    }
  },
  cell: {
    font: {
      sz: 16,
      bold: false
    },
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};

//Array of objects representing heading rows (very top)
const heading = [
  [{ value: 'Report Ads Compaign', style: styles.headerWhite }],
  []
];

// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
const merges = [
  { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
  { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
  { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
]

const exportExcel = (dataset) => {

  //Here you specify the export structure
  const specification = {
    id: { // <- the key should match the actual data key
      displayName: 'ID Compaign', // <- Here you specify the column header
      headerStyle: styles.headerWhite, // <- Header style
      cellStyle: styles.cell,
      width: 120 // <- width in pixels
    },
    name: {
      displayName: 'Name Compaign',
      headerStyle: styles.headerWhite,
      cellFormat: styles.cell,
      width: 200 // <- width in chars (when the number is passed as string)
    },
    status: {
      displayName: 'Status',
      headerStyle: styles.headerWhite,
      cellStyle: styles.cell, // <- Cell style
      width: 120 // <- width in chars (when the number is passed as string)
    },
    likes: {
      displayName: 'Likes',
      headerStyle: styles.headerWhite,
      cellStyle: styles.cell, // <- Cell style
      width: 120 // <- width in chars (when the number is passed as string)
    },
    comments: {
      displayName: 'Comments',
      headerStyle: styles.headerWhite,
      cellStyle: styles.cell, // <- Cell style
      width: 120 // <- width in chars (when the number is passed as string)
    },
    shares: {
      displayName: 'Shares',
      headerStyle: styles.headerWhite,
      cellStyle: styles.cell, // <- Cell style
      width: 120 // <- width in chars (when the number is passed as string)
    },
    created_at: {
      displayName: 'Date Created',
      headerStyle: styles.headerWhite,
      cellStyle: styles.cell, // <- Cell style
      width: 120 // <- width in chars (when the number is passed as string)
    }
  }

  // Create the excel report.
  // This function will return Buffer
  const report = excel.buildExport(
    [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
      {
        name: 'Report', // <- Specify sheet name (optional)
        heading: heading, // <- Raw heading array (optional)
        merges: merges, // <- Merge cell ranges
        specification: specification, // <- Report specification
        data: dataset // <-- Report data
      }
    ]
  );

  return report;
}


module.exports = {
  exportExcel
};
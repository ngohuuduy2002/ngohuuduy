export const localization = {
  body: {
    emptyDataSourceMessage: "There is no data to display",
    addTooltip: "Add",
    deleteTooltip: "Delete",
    editTooltip: "Edit",
    filterRow: {
      filterTooltip: "Filter",
    },
    editRow: {
      saveTooltip: "Save",
      cancelTooltip: "Cancel",
      deleteText: "Are you sure you want to delete this line?",
    },
  },
  grouping: {
    placeholder: "Drag the column header and drop it here to group by that column",
  },
  header: {
    actions: "Act",
  },
  pagination: {
    labelDisplayedRows: "{from}-{to} of {count}",
    labelRowsSelect: "lines",
    labelRowsPerPage: "Lines per page:",
    firstAriaLabel: "First page",
    firstTooltip: "First page",
    previousAriaLabel: "Previous page",
    previousTooltip: "Previous page",
    nextAriaLabel: "Next page",
    nextTooltip: "Next page",
    lastAriaLabel: "Last page",
    lastTooltip: "Last page",
  },
  toolbar: {
    addRemoveColumns: "Add or remove columns",
    nRowsSelected: "{0} lines are selected",
    showColumnsTitle: "Show columns",
    showColumnsAriaLabel: "Show columns",
    exportTitle: "Export",
    exportAriaLabel: "Export",
    exportName: "Export to CSV",
    searchTooltip: "Search",
    searchPlaceholder: "Search",
  },
  rowStyle: (rowData) => ({
    backgroundColor: rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
  }),
};

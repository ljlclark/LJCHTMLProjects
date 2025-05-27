// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// Table.js
// <script src="../../Core/Common/script/LJCCommon.js"></script>

// Table Static Functions
class Table
{
  // Element Functions
  // *****************

  // Adds the selector classes.
  static CopyClasses(eFrom, eTo)
  {
    let fromClasses = eFrom.classList;
    let toClasses = eTo.classList;
    let classCount = fromClasses.length;
    for (let index = 0; index < classCount; index++)
    {
      let fromClass = fromClasses[index];
      if (!this.HasClass(toClasses, fromClass))
      {
        toClasses.add(fromClass);
      }
    }
  }

  // Check if target class list has a class.
  static HasClass(toClasses, classItem)
  {
    let retValue = false;

    let classCount = toClasses.length;
    for (let index = 0; index < classCount; index++)
    {
      let toClass = toClasses[index];
      if (toClass.className == classItem.className)
      {
        retValue = true;
        break;
      }
    }
    return retValue;
  }

  // Table Functions
  // ***************

  // Get the table column count.
  static ColumnCount(eTable)
  {
    let retCount = 0;

    let fullRow = this.FullRow(eTable);
    let cells = fullRow.cells;
    retCount = cells.length;
    return retCount;
  }

  // Get the column width.
  static ColumnWidth(eTable, columnIndex)
  {
    let retWidth = 0;

    let rows = eTable.rows;
    if (rows.Length > 0)
    {
      let rowIndex = 0;
      let cell = this.Cell(eTable, rowIndex, columnIndex);
      if (cell != null)
      {
        retWidth = LJC.ElementStyle(cell, "width");
      }
    }
    return retWidth;
  }

  // Sets a column width.
  static SetColumnWidth(eTable, rowIndex, columnIndex, width)
  {
    let retWidth = 0;

    let column = this.Cell(eTable, rowIndex, columnIndex);
    if (column != null)
    {
      column.style.width = this.StyleText(width);
      retWidth = LJC.ElementStyle(column, "width");
    }
    return retWidth;
  }

  // Gets the table width.
  static Width(eTable)
  {
    let retValue = LJC.ElementStyle(eTable, "width");
    retValue = this.StyleValue(retValue);
    return retValue;
  }

  // Add Table Column Functions
  // *********************

  // Adds a column to the table.
  static AddColumn(eTable)
  {
    let retValue = 0;

    let rows = eTable.rows;

    let rowCount = rows.length;
    if (rowCount > 0)
    {
      for (let index = 0; index < rowCount; index++)
      {
        let row = rows[index];
        let cells = row.cells;
        let prevCell = cells[cells.length - 1];
        let newCell = null;
        if ("TH" == prevCell.nodeName)
        {
          newCell = document.createElement("th");
          row.appendChild(newCell);
        }
        else
        {
          newCell = row.insertCell(cells.length);
        }
        this.CopyClasses(prevCell, newCell);
      }
    }
    return retValue;
  }

  // Inserts a column into the table.
  static InsertColumn(eTable, insertIndex)
  {
    let retValue = 0;

    let rows = eTable.rows;

    let rowCount = rows.length;
    if (rowsCount > 0)
    {
      for (let index = 0; index < rowCount; index++)
      {
        let row = rows[index];
        let cells = row.cells;

        // Row has less cells than insert index.
        if (cells.length < insertIndex + 1)
        {
          // Expand the last cell colSpan to fill in the row.
          var cell = cells[cells.length - 1];
          cell.colSpan += insertIndex - cells.length;
          continue;
        }

        // Insert new cell.
        let prevCell = cells[insertIndex];
        let eRow = prevCell.parentElement;
        let newCell = null;
        let cellType = "td";
        if ("TH" == prevCell.nodeName)
        {
          cellType = "th";
        }
        newCell = document.createElement(cellType);
        eRow.insertBefore(newCell, prevCell);
        this.CopyClasses(prevCell, newCell);
      }
    }
    return retValue;
  }

  // Table Row Functions
  // *************

  // Get row with full column count.
  static FullRow(eTable)
  {
    let retRow = null;

    let prevCellCount = 0;
    let rows = eTable.rows;
    let rowCount = rows.length;
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++)
    {
      let row = rows[rowIndex];
      let rowCellCount = this.RowCellCount(row);

      // Assume a full row since cell count matches previous row count.
      if (!this.RowHasColSpan(row)
        && rowCellCount == prevCellCount)
      {
        retRow = row;
        break;
      }
      prevCellCount = rowCellCount;
    }
    return retRow;
  }

  // Gets the row column count.
  static RowCellCount(eRow)
  {
    let retCount = 0;

    if (eRow != null)
    {
      //retCount = eRow.cells.length;
      let cells = eRow.cells;
      let cellCount = cells.length;
      for (let index = 0; index < cellCount; index++)
      {
        let cell = cells[index];
        retCount += cell.colSpan;
      }
    }
    return retCount;
  }

  // Check if any row cell has a colSpan.
  static RowHasColSpan(eRow)
  {
    let retValue = false;

    let cells = eRow.cells;
    let cellCount = cells.length;
    for (let index = 0; index < cellCount; index++)
    {
      let cell = cells[index];
      if (cell.colSpan > 1)
      {
        retValue = true;
        break;
      }
    }
    return retValue;
  }

  // Table Cell Functions
  // ****************

  // Gets a table column.
  static Cell(eTable, rowIndex, columnIndex)
  {
    let retColumn = null;

    if (eTable != null)
    {
      let rows = eTable.rows;
      if (rows.length > rowIndex)
      {
        let row = rows[rowIndex];
        let cells = row.cells;
        if (cells.length > 0)
        {
          if (cells.length > columnIndex)
          {
            retColumn = cells[columnIndex];
          }
        }
      }
    }
    return retColumn;
  }

  // Style Functions
  // ***************

  // Get the style text with added suffix.
  static StyleText(value, suffix = "px")
  {
    let retText = null;

    if (value != null)
    {
      retText = value + suffix;
    }
    return retText;
  }

  // Get the value from the style text.
  static StyleValue(text)
  {
    let retValue = 0;

    if (LJC.HasText(text))
    {
      retValue = text.substring(0, text.length - 2);
    }
    return retValue;
  }
}

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
  static CopyClasses(fromItem, toItem)
  {
    let classCount = fromItem.classList.length;
    for (let index = 0; index < classCount; index++)
    {
      let fromClass = fromItem.classList[index];
      toItem.classList.add(fromClass);
    }
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

  // Get row with full column count.
  static FullRow(eTable)
  {
    let retRow = null;

    let prevCount = 0;
    let rows = eTable.rows;
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++)
    {
      let row = rows[rowIndex];
      let rowCellCount = this.RowCellCount(row);
      if (rowCellCount == prevCount)
      {
        retRow = row;
        break;
      }
      prevCount = rowCellCount;
    }
    return retRow;
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

  // Add Column Functions
  // *********************

  // Adds a column to the table.
  static AddColumn(eTable)
  {
    let retValue = 0;

    let rows = eTable.rows;

    if (rows.length > 0)
    {
      for (let index = 0; index < rows.length; index++)
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
  static InsertColumn(eTable, columnIndex)
  {
    let retValue = 0;

    let rows = eTable.rows;

    if (rows.length > 0)
    {
      for (let index = 0; index < rows.length; index++)
      {
        let row = rows[index];
        let cells = row.cells;
        if (cells.length < columnIndex + 1)
        {
          var cell = cells[cells.length - 1];
          cell.colSpan += columnIndex - cells.length;
          continue;
        }
        let prevCell = cells[columnIndex];
        let parent = prevCell.parentElement;
        let newCell = null;
        if ("TH" == prevCell.nodeName)
        {
          newCell = document.createElement("th");
          parent.insertBefore(newCell, prevCell);
        }
        else
        {
          newCell = document.createElement("td");
          parent.insertBefore(newCell, prevCell);
        }
        this.CopyClasses(prevCell, newCell);
      }
    }
    return retValue;
  }

  // Row Functions
  // *************

  // Gets the row column count.
  static RowCellCount(row)
  {
    let retCount = 0;

    if (row != null)
    {
      retCount = row.cells.length;
    }
    return retCount;
  }

  // Cell Functions
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
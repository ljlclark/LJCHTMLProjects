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

  // Get the table column count.
  static ColumnCount(eTable)
  {
    let retCount = 0;

    let rows = eTable.rows;
    for (let index = 0; index < rows.length; index++)
    {
      let row = rows[index];
      let rowCellCount = this.RowCellCount(row);
      if (rowCellCount == retCount)
      {
        retCount = rowCellCount;
        break;
      }
      retCount = rowCellCount;
    }
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
  static SetColumnWidth(eTable, columnIndex, width)
  {
    let retWidth = 0;

    let rowIndex = 0;
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

  static StyleText(value)
  {
    let retText = null;

    if (value != null)
    {
      retText = value + "px";
    }
    return retText;
  }

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
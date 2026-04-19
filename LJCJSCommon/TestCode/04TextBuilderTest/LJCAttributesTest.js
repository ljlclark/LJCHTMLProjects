"use strict";
// LJCAttributesTest.js

class LJCAttributesTest
{
  Run()
  {
    // Static Methods
    this.ToCollection();

    // Collection Data Methods
    this.Add();
    this.AddObject();
    this.Append();

    // Other Methods
    this.MergeStyle();
    this.UniqueColumns();
  }

  // #region Static Methods

  // Creates a typed collection from an array of objects.
  ToCollection()
  {
    const array = [
      { Name: "id", Value: "idName" },
      { Name: "class", Value: "className" },
    ];

    const attributes = LJCAttributes.ToCollection(array);
    let result = attributes.Count;
    let compare = 2;
    LJC.CheckValues("ToCollection()", result, compare);
  }
  // #endregion

  // #region Collection Data Methods

  // Creates and adds the item to the list.
  Add()
  {
    const attributes = new LJCAttributes();
    attributes.Add("id");

    const attribute = attributes.Retrieve("id");
    const result = attribute.Name;
    const compare = "id";
    LJC.CheckValues("Add()", result, compare);
  }

  // Adds the supplied item to the list.
  AddObject()
  {
    const attributes = new LJCAttributes();
    let attribute = new LJCAttribute("id", "idName");

    const addedAttrib = attributes.AddObject(attribute);
    let result = addedAttrib.Name;
    let compare = "id";
    LJC.CheckValues("AddObject()", result, compare);

    attribute = attributes.Retrieve("id");
    result = attribute.Name;
    compare = "id";
    LJC.CheckValues("AddObject()", result, compare);
  }

  // Appends items.
  Append()
  {
    const fromAttribs = new LJCAttributes();
    fromAttribs.Add("id", "idName");
    fromAttribs.Add("class", "className");

    const attribs = new LJCAttributes();
    attribs.Append(fromAttribs);
    const attrib = attribs.Retrieve("id");
    const result = attrib.Name;
    const compare = "id";
    LJC.CheckValues("Append()", result, compare);
  }
  // #endregion

  // #region Other Methods

  // Merges "style" attrib rules.
  MergeStyle()
  {
    const attribs = new LJCAttributes();
    const foundAttrib = attribs.Add("style", "borderspacing: 0px");
    const newAttrib = new LJCAttribute("style", "cellpadding: 2px");

    const result = attribs.MergeStyle(foundAttrib, newAttrib);
    const compare = "borderspacing: 0px; cellpadding: 2px; ";
    LJC.CheckValues("MergeStyle()", result, compare);
  }

  // Get the unique columns.
  UniqueColumns()
  {
    const attribs = new LJCAttributes();
    const columns = attribs.UniqueColumns("id");

    const column = columns.RetrieveAtIndex(0);
    const result = column.Value;
    const compare = "id";
    LJC.CheckValues("UniqueColumns()", result, compare);
  }
  // #endregion
}
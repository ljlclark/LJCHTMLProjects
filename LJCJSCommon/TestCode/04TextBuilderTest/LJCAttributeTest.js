"use strict";
// LJCAttributeTest.js

class LJCAttributeTest
{
  Run()
  {
    // Static Methods
    this.Copy();

    // Constructor Methods
    this.Constructor();

    // Data Class Methods
    this.Clone();
  }

  // #region Static Methods

  // Creates a new object from simple object values.
  Copy()
  {
    const simpleAttribute = {
      "Name": "id",
      "Value": "name",
    };

    const attribute = LJCAttribute.Copy(simpleAttribute);
    const result = attribute.Name;
    const compare = "id";
    LJC.CheckValues("Copy()", result, compare);
  }
  // #endregion

  // #region Constructor Methods

  // Initializes an object instance.
  Constructor()
  {
    const attribute = new LJCAttribute("id", "name");
    const result = attribute.Name;
    const compare = "id";
    LJC.CheckValues("Constructor()", result, compare);
  }
  // #endregion

  // #region Data Class Methods

  // Creates an object clone.
  Clone()
  {
    const attribute = new LJCAttribute("id", "name");
    const clone = attribute.Clone();
    const result = clone.Name;
    const compare = "id";
    LJC.CheckValues("Clone()", result, compare);
  }
  // #endregion
}
"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// LJCAppMatches.js

// #Value _CollectionName_ LJCAppMatches
// #Value _CollectionVar_ AppMatches
// #Value _CollectionLocal_ appMatches
// #Value _FileName_ LJCAppMatches.js
// #Value _ItemName_ LJCAppMatch
// #Value _ItemVar_ AppMatch
// #Value _ItemLocal_ appMatch
// #Value _KeyPropertyName_ LeftItemID
// #Value _KeyPropertyLocal_ leftItemID

// Represents a collection of LJCAppMatch data objects.
/// <include path='items/LJCAppMatches/*' file='Doc/LJCAppMatches.xml'/>
class LJCAppMatches
{
  // #region Properties

  // The current items count.
  /// <include path='items/Count/*' file='Doc/LJCAppMatches.xml'/>
  Count = 0;

  // The current #Items clone.
  /// <include path='items/ReadItems/*' file='Doc/LJCAppMatches.xml'/>
  ReadItems = [];

  // The internal collection item array.
  #Items = [];
  // #endregion

  // #region Data Object Methods

  // Creates a clone of this object.
  /// <include path='items/Clone/*' file='Doc/LJCAppMatches.xml'/>
  // <returns>The new cloned object.</returns>
  Clone()
  {
    let retAppMatches = new LJCAppMatches();

    const length = this.#Items.length;
    for (let index = 0; index < length; index++)
    {
      let appMatch = this.#Items[index];
      if (appMatch != null)
      {
        retAppMatches.AddObject(appMatch.Clone());
      }
    }
    return retAppMatches;
  }
  // #endregion

  // #region Collection Data Methods

  // Creates and adds the item to the list.
  /// <include path='items/Add/*' file='Doc/LJCAppMatches.xml'/>
  Add(leftItemID, setItemID, rightItemID)
  {
    let retAppMatch = null;

    let appMatch = new LJCAppMatch(leftItemID, setItemID, rightItemID);
    retAppMatch = this.AddObject(appMatch);
    return retAppMatch;
  }

  // Adds the supplied item to the list.
  /// <include path='items/AddObject/*' file='Doc/LJCAppMatches.xml'/>
  // <param name="item">The data object.</param>
  AddObject(appMatch)
  {
    this.#Items.push(appMatch);
    this.#ResetProperties();
    return appMatch;
  }

  // Clears the collection list.
  /// <include path='items/Clear/*' file='Doc/LJCAppMatches.xml'/>
  Clear()
  {
    this.#Items = [];
    this.#ResetProperties();
  }

  // Removes the item with the supplied name.
  /// <include path='items/Remove/*' file='Doc/LJCAppMatches.xml'/>
  // <param name="leftItemID">The left item ID.</param>
  Remove(leftItemID)
  {
    let itemIndex = this.GetIndex(leftItemID);
    if (itemIndex > -1)
    {
      let beginIndex = 0;
      this.#Items.splice(beginIndex, itemIndex);
      this.#ResetProperties();
    }
  }

  // Retrieves the item with the supplied name.
  /// <include path='items/Retrieve/*' file='Doc/LJCAppMatches.xml'/>
  Retrieve(leftItemID)
  {
    let retAppMatch = this.#Items.find(item =>
      item.LeftItemID == leftItemID);
    return retAppMatch;
  }

  // Retrieves the item at the supplied index.
  /// <include path='items/RetrieveWithIndex/*' file='Doc/LJCAppMatches.xml'/>
  RetrieveWithIndex(index)
  {
    let retAppMatch = null;

    if (index >= 0
      && this.#Items.length > index)
    {
      retAppMatch = this.#Items[index];
    }
    return retAppMatch;
  }
  // #endregion

  // #region Other Methods

  // Gets the index of the item with the supplied name.
  /// <include path='items/GetIndex/*' file='Doc/LJCAppMatches.xml'/>
  GetIndex(leftItemID)
  {
    let retIndex = -1;

    for (let index = 0; index < this.#Items.length; index++)
    {
      let item = this.#Items[index];
      if (item.LeftItemID == leftItemID)
      {
        retIndex = index;
        break;
      }
    }
    return retIndex;
  }

  // Resets the Items properties.
  #ResetProperties()
  {
    this.Count = this.#Items.length;
    this.ReadItems = Array.from(this.#Items);
  }
  // #endregion
}

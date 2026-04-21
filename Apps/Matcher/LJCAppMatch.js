"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// LJCAppMatch.js

// #Value _FileName_ LJCAppMatch.js
// #Value _ItemName_ LJCAppMatch
// #Value _ItemVar_ AppMatch
// #Value _ItemLocal_ appMatch

// #region HTML
// <script src="../../LJCJSCommon/LJCCommonLib.js"></script>
//   LJC: HasText()
// #endregion

// Represents an app match object.
/// <include path='items/LJCAppMatches/*' file='Doc/LJCAppMatch.xml'/>
class LJCAppMatch
{
  // #region Properties

  // The left item ID Unique key.
  /// <include path='items/LeftItemID/*' file='Doc/LJCAppMatch.xml'/>
  LeftItemID = "";

  // The matching left item ID.
  /// <include path='items/MatchingLeftItemID/*' file='Doc/LJCAppMatch.xml'/>
  MatchingLeftItemID = "";

  // The left item picture src path.
  /// <include path='items/PicSrc/*' file='Doc/LJCAppMatch.xml'/>
  PicSrc = "";

  // The matching right item ID.
  /// <include path='items/RightItemID/*' file='Doc/LJCAppMatch.xml'/>
  RightItemID = "";

  // The set value ID.
  /// <include path='items/SetItemID/*' file='Doc/LJCAppMatch.xml'/>
  SetItemID = "";

  // The right item text value.
  /// <include path='items/PicSrc/*' file='Doc/LJCAppMatch.xml'/>
  Text = "";
  // #endregion

  // #region Constructor Methods


  // Initializes an object instance.
  /// <include path='items/constructor/*' file='Doc/LJCAppMatch.xml'/>
  constructor(leftItemID, setItemID, rightItemID)
  {
    if (LJC.HasText(leftItemID))
    {
      this.LeftItemID = leftItemID;
    }

    if (LJC.HasText(rightItemID))
    {
      this.RightItemID = rightItemID;
    }

    if (LJC.HasText(setItemID))
    {
      this.SetItemID = setItemID;
    }
  }
  // #endregion

  // #region Data Class Methods

  // Creates a clone of this object.
  /// <include path='items/Clone/*' file='Doc/LJCAppMatch.xml'/>
  /// <returns>The new cloned object.</returns>
  Clone()
  {
    let retAppMatch = new LJCAppMatch(this.LeftItemID, this.RightItemID
      , this.SetItemID);
    return retAppMatch;
  }
  // #endregion
}
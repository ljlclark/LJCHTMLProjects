"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// LJCSetData.js

// Contains methods to set the HTML data.
/// <include path='items/LJCSetData/*' file='Doc/LJCSetData.xml'/>
class LJCSetData
{
  SetHTML(appMatches)
  {
    for (let index = 0; index < appMatches.Count; index++)
    {
      const appMatch = appMatches.RetrieveWithIndex(index);

      // Set the left item picture.
      let leftItem = LJC.Element(appMatch.LeftItemID);
      if (leftItem != null
        && !leftItem.src.includes(appMatch.PicSrc))
      {
        leftItem.src = appMatch.PicSrc;
      }

      // Set the right item text.
      let rightItem = LJC.Element(appMatch.RightItemID);
      if (rightItem != null
        && !rightItem.innerText != appMatch.Text)
      {
        rightItem.innerText = appMatch.Text;
      }
    }
  }
}
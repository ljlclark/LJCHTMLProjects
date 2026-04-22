"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// LJCSetData.js

// Contains methods to set the HTML data.
/// <include path='items/LJCSetData/*' file='Doc/LJCSetData.xml'/>
class LJCSetData
{
  // Creates AppMatches collection from a matchItem delimited string array.
  GetAppMatches(matchItems)
  {
    let retMatches = new LJCAppMatches();

    for (let index = 0; index < matchItems.length; index++)
    {
      const number = index + 1;
      const leftID = `pic${number}`;
      const setID = `set${number}`;
      const textID = `text${number}`;
      const item = matchItems[index];
      const values = item.split(",");
      let match = retMatches.Add(leftID, setID, textID);
      match.PicSrc = values[1];
      const value = values[2].trim();
      match.MatchingLeftItemID = `pic${value}`;
      match.Text = values[3].trim();
    }
    return retMatches;
  }

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
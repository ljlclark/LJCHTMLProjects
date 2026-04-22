"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// MatcherEvents.js

// #region External
// <script src="../../LJCJSCommon/LJCCommonLib.js"></script>
//   LJC: Element(), HasText()
// #endregion

class LJCMatcherEvents
{
  // #region Properties

  // The defined matches.
  AppMatches = null;

  // The selected matches.
  //SelectedMatches = new LJCAppMatches();
  // #endregion

  // #region Private Properties

  // The previously selected left item ID.
  #SelectedLeftID = "";

  // The previously selected right item ID.
  #SelectedRightID = "";
  // #endregion

  // #region Constructor Methods

  // Initializes the object instance.
  constructor()
  {
    const matchItems = new LJCMatcherData();
    const setData = new LJCSetData();
    this.AppMatches = setData.GetAppMatches(matchItems);
    setData.SetHTML(this.AppMatches);
    this.#AddEvents();
  }

  // Adds the HTML event listeners.
  #AddEvents()
  {
    document.addEventListener("click", this.#DocumentClick.bind(this));
  }
  // #endregion

  // #region Event Handlers

  // The Document "click" event handler.
  #DocumentClick(event)
  {
    let target = event.target;

    if (this.#IsLeftItem(target.id))
    {
      this.#SelectLeftItem(target);
    }
    if (this.#IsRightItem(target.id))
    {
      this.#SelectRightItem(target);
    }
  }
  // #endregion

  // #region Private Methods

  // Checks if the clicked item is a left item.
  #IsLeftItem(itemID)
  {
    let retValue = false;

    if ("pic1" == itemID
      || "pic2" == itemID
      || "pic3" == itemID
      || "pic4" == itemID
      || "pic5" == itemID
      || "pic6" == itemID)
    {
      retValue = true;
    }
    return retValue;
  }

  // Checks if the clicked item is a right item.
  #IsRightItem(itemID)
  {
    let retValue = false;

    if ("text1" == itemID
      || "text2" == itemID
      || "text3" == itemID
      || "text4" == itemID
      || "text5" == itemID
      || "text6" == itemID)
    {
      retValue = true;
    }
    return retValue;
  }

  // Deselect the left item.
  #DeselectLeft()
  {
    if (LJC.HasText(this.#SelectedLeftID))
    {
      const leftTarget = LJC.Element(this.#SelectedLeftID);
      this.#SelectedLeftID = "";
      leftTarget.style.border = "0px";
    }
  }

  // Deselect the right item.
  #DeselectRight()
  {
    if (LJC.HasText(this.#SelectedRightID))
    {
      const rightTarget = LJC.Element(this.#SelectedRightID);
      this.#SelectedRightID = "";
      rightTarget.style.border = "0px";
    }
  }

  // Select the left item.
  #SelectLeft()
  {
    if (LJC.HasText(this.#SelectedLeftID))
    {
      const leftTarget = LJC.Element(this.#SelectedLeftID);
      leftTarget.style.border = "3px solid blue";
    }
  }

  // Select the right item.
  #SelectRight()
  {
    if (LJC.HasText(this.#SelectedRightID))
    {
      const rightTarget = LJC.Element(this.#SelectedRightID);
      rightTarget.style.border = "3px solid blue";
    }
  }

  // Selects the left item.
  #SelectLeftItem(target)
  {
    const leftID = target.id;

    // Selection has changed.
    if (LJC.HasText(this.#SelectedLeftID)
      && this.#SelectedLeftID != leftID)
    {
      // Clear previous item.
      this.#DeselectLeft();
    }

    // Select new item.
    if (!this.#HasSetText(leftID))
    {
      this.#SelectedLeftID = leftID;
      this.#SelectLeft();
    }

    // If a right item is selected.
    const rightID = this.#SelectedRightID;
    if (LJC.HasText(rightID)
      && !this.#HasSetText(leftID))
    {
      // Selected item match data.
      const appMatch = this.AppMatches.Retrieve(leftID);
      if (appMatch != null
        && LJC.HasText(appMatch.MatchingLeftItemID))
      {
        // Get matching item.
        const matchingID = appMatch.MatchingLeftItemID;
        const matchingItem = this.AppMatches.Retrieve(matchingID);
        if (matchingItem.RightItemID == rightID)
        {
          this.#CopySetValue(appMatch.SetItemID, rightID);
        }
        else
        {
          error1.play();
        }
      }
    }
  }

  // Selects the right item.
  #SelectRightItem(target)
  {
    let rightID = target.id;

    // Selection has changed.
    if (LJC.HasText(this.#SelectedRightID)
      && this.#SelectedRightID != rightID)
    {
      // Clear previous item.
      this.#DeselectRight();
    }

    // Select new item.
    this.#SelectedRightID = rightID;
    this.#SelectRight();

    // If a left item is selected.
    const leftID = this.#SelectedLeftID;
    if (LJC.HasText(leftID)
      && !this.#HasSetText(leftID))
    {
      // Selected item match data.
      const appMatch = this.AppMatches.Retrieve(leftID);
      if (appMatch != null
        && LJC.HasText(appMatch.MatchingLeftItemID))
      {
        // Get matching item.
        const matchingID = appMatch.MatchingLeftItemID;
        const matchingItem = this.AppMatches.Retrieve(matchingID);
        const rightText = LJC.GetText(rightID);
        if (matchingItem.Text == rightText)
        {
          this.#CopySetValue(appMatch.SetItemID, rightID);
        }
        else
        {
          error1.play();
        }
      }
    }
  }

  // Copy the right item to the set item.
  #CopySetValue(setItemID, rightItemID)
  {
    const setTarget = LJC.Element(setItemID);
    const rightTarget = LJC.Element(rightItemID);
    if (setTarget != null
      && !LJC.HasText(setTarget.innerText)
      && LJC.HasText(rightTarget.innerText))
    {
      success.play();
      setTarget.innerText = rightTarget.innerText;
      rightTarget.innerText = "";
      this.#DeselectLeft();
      this.#DeselectRight();
    }
  }

  // Checks if the selected picture has set item text.
  #HasSetText(leftID)
  {
    let retValue = false;

    const leftMatch = this.AppMatches.Retrieve(leftID);
    const setText = LJC.GetText(leftMatch.SetItemID);
    if (LJC.HasText(setText))
    {
      retValue = true;
    }
    return retValue;
  }
}
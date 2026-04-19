"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// MatcherEvents.js

// #region External
// <script src="../../LJCJSCommon/LJCCommonLib.js"></script>
//   LJC: AddEvent()
// #endregion

class MatcherEvents
{
  // #region Properties
  // #endregion

  // #region Private Properties

  #selectedLeftItem = "";
  // #endregion

  // #region Constructor Methods

  // Initializes the object instance.
  constructor()
  {
    this.#AddEvents();
  }

  // Adds the HTML event listeners.
  #AddEvents()
  {
    document.addEventListener("click", this.#DocumentClick.bind(this));
  }
  // #endregion

  // The Document "click" event handler.
  #DocumentClick(event)
  {
    let target = event.target;

    if (target.tagName == "IMG"
      && LJC.HasText(target.id))
    {
      let id = target.id;
      if (this.IsLeftItem(id))
      {
        alert(`Left Item: ${target.id}`)
      }
    }
  }

  // Checks if the clicked item is a left item.
  IsLeftItem(itemID)
  {
    let retValue = false;

    if ("pic1" == itemID
      || "pic3" == itemID
      || "pic5" == itemID
      || "pic7" == itemID)
    {
      retValue = true;
    }
    return retValue;
  }
}
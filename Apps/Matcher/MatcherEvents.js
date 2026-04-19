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
    document.addEventListener("click", this.#DocumentClick, this);
  }
  // #endregion

  // The Document "click" event handler.
  #DocumentClick(event)
  {
    let target = event.target;
    alert(target.tagName);
  }
}
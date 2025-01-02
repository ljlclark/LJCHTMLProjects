// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// MouseText.js

// <script src="../../CalcPad/Script/StringBuilder.js"></script>

// Provides Mouse Popup text methods.
class MouseText
{
  // Static Functions

  // Creates an element.
  static CreateElement(elementType, id, innerText)
  {
    let retElement = document.getElementById(id);
    if (null == retElement)
    {
      retElement = document.createElement(elementType);
      if (id != null)
      {
        retElement.id = id;
      }
      if (innerText != null)
      {
        retElement.innerText = innerText;
      }
    }
    return retElement;
  }

  // Creates CSS for popup text.
  static CSSText(event, top)
  {
    let b = new StringBuilder();
    b.Line("position:absolute;");
    b.Line(`left:${event.pageX + 5}px;`);
    if (top != null)
    {
      b.Line(`top:${top}px;`);
      //b.Line("height:75%;");
      b.Line("overflow:scroll;");
    }
    else
    {
      b.Line(`top:${event.pageY + 5}px;`);
    }
    b.Line("background-color:black;");
    b.Line("border:1px solid white;");
    b.Line("border-radius:4px;");
    b.Line("padding:6px");
    let retCSS = b.ToString();
    return retCSS;
  }

  // Hides the popup text.
  static HideNote(event, containerID)
  {
    let eContainer = document.getElementById(containerID);
    if (eContainer)
    {
      eContainer.style.cssText = "display:none";
    }
  }

  // Constructors

  // Initialize an object instance.
  constructor(id, noteIDs)
  {
    // The note element IDs.
    this.NoteIDs = [];
    if (Array.isArray(noteIDs))
    {
      this.NoteIDs = noteIDs;
    }

    // The text container ID.
    this.ContainerID = id;

    // The current mouseover note ID.
    this.ActiveNoteID = "";

    addEventListener("keydown", this.DocKeyDown.bind(this));
    addEventListener("mouseout", this.DocMouseOut.bind(this));
    addEventListener("mouseover", this.DocMouseOver.bind(this));
  }

  // Event Handlers

  // Handles the ESC key to hide the active container.
  DocKeyDown(event)
  {
    let eContainer = document.getElementById(this.ContainerID);
    if (eContainer != null
      && "Escape" == event.key)
    {
      this.ActiveNoteID = "";
      MouseText.HideNote(event, this.ContainerID);
    }
  }

  // Handes the mouseout event.
  DocMouseOut(event)
  {
    let eTarget = event.target;

    // Hides the note if an available note ID
    // and does not start with "r".
    if (this.NoteIDs.includes(eTarget.id)
      && !this.ActiveNoteID.startsWith("r"))
    {
      this.ActiveNoteID = "";
      MouseText.HideNote(event, this.ContainerID);
    }
  }

  // Handes the mouseout event.
  DocMouseOver(event)
  {
    let eTarget = event.target;
    if (this.NoteIDs.includes(eTarget.id))
    {
      this.ActiveNoteID = eTarget.id;
    }
  }
}
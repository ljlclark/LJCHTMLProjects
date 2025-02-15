// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// John_2.js

// <script src="../../../Core/Common/Script/LJCCommon.js"></script>
// <script src="../../../Core/Common/Script/StringBuilder.js"></script>
// <script src="../Script/HTMLBuilder.js"></script>
// <script src="../Script/MouseText.js"></script>
// <script src="John_2.js"></script>

// Provides Note text for the chapter.
class John2
{
  // Static Functions

  // Gets the text for the NoteID.
  static Text(noteID)
  {
    let retText = "";
    switch (noteID)
    {
      // John 1:5
      case "a":
        retText = "Psalms 69:9";
        break;

      // John 1:19
      case "ra":
        retText = John2.Textra();
        break;
      case "rb":
        retText = John2.Textrb();
        break;
      case "rc":
        retText = John2.Textrc();
        break;
    }
    return retText;
  }

  // John 2:13
  static Textra()
  {
    let b = new HTMLBuilder();
    b.Line("Matthew 21:12, 13");
    b.Text("12 Then Jesus went into the temple of God and drove out all those");
    b.Text(" who bought and sold in the temple, and overturned the tables of");
    b.Line(" the money changers and the seats of those who sold doves.");
    b.Text("13 And He said to them, \"It is written, '<i>My house shall be");
    b.Text(" called a house of prayer,</i>' but you have made it a '<i>den of");
    b.Line(" thieves.</i>'\"");
    let retText = b.ToString();
    return retText;
  }

  // John 2:13
  static Textrb()
  {
    let b = new HTMLBuilder();
    b.Line("Mark 11:15-17");
    b.Text("15 So they came to Jerusalem. Then Jesus went into the temple and");
    b.Text(" began to drive out those who bought and sold in the temple, and");
    b.Text(" overturned the tables of the money changers and the seats of");
    b.Line(" those who sold doves.");
    b.Text("16 And He would not allow anyone to carry wares through the");
    b.Line(" temple.");
    b.Text("17 Then He taught, saying to them, \"Is it not written, '<i>My");
    b.Text(" house shall be called a house of prayer for all nations</i>'?");
    b.Line(" But you have made it a '<i>den of thieves</i>.'\"");
    let retText = b.ToString();
    return retText;
  }

  // John 2:13
  static Textrc()
  {
    let b = new HTMLBuilder();
    b.Line("Luke 19:45, 46");
    b.Text("45 Then He went into the temple and began to drive out those who");
    b.Line(" bought and sold in it,");
    b.Text("46 saying to them, \"It is written, '<i>My house is a house of");
    b.Line(" prayer</i>,' but you have made it a '<i>den of thieves.</i>'\"");
    let retText = b.ToString();
    return retText;
  }

  // Constructors

  // Initializes an object instance.
  constructor()
  {
    a.addEventListener("mouseover", this.ShowText.bind(this));
    ra.addEventListener("mouseover", this.ShowText.bind(this));
    rb.addEventListener("mouseover", this.ShowText.bind(this));
    rc.addEventListener("mouseover", this.ShowText.bind(this));

    addEventListener("dblclick", this.DocDoubleClick.bind(this));
    addEventListener("keydown", this.DocKeyDown.bind(this));

    this.NoteIDs = ["a", "ra", "rb", "rc"];
    this.MouseText = new MouseText("alt", this.NoteIDs);

    this.Doc = document.documentElement;
    this.ClientWidth = this.Doc.clientWidth;
    this.ClientHeight = this.Doc.clientHeight;
    let middle = this.ClientWidth / 2;
    // Offset the middle.
    this.RefMiddle = middle + 20;
    // Shrink the text width.
    this.RefTextWidth = middle - 20;
  }

  // Methods

  // Sets the reference text location.
  SetTextLeft(isLeft)
  {
    if (isLeft)
    {
      alt.style.left = "0px";
    }
    else
    {
      alt.style.left = `${this.RefMiddle}px`;
    }
  }

  // Event Handlers

  // Handles the "dblclick" event.
  DocDoubleClick(event)
  {
    let left = this.RemovePX(alt.style.left);
    if (left > this.RefTextWidth)
    {
      this.SetTextLeft(true);
    }
    else
    {
      this.SetTextLeft(false);
    }
  }

  // Handles the "keydown" event.
  DocKeyDown(event)
  {
    switch (event.code)
    {
      case "ArrowLeft":
        this.SetTextLeft(true);
        break;
      case "ArrowRight":
        this.SetTextLeft(false);
        break;
    }
  }

  // Show Note text.
  ShowText(event)
  {
    let eContainer = MouseText.CreateElement("div", "alt");
    let isContinue = true;
    if (null == eContainer)
    {
      isContinue = false;
    }

    let style = "";
    if (isContinue)
    {
      let text = null;
      style = MouseText.CSSText(event);
      switch (event.target.id)
      {
        case "a":
          isContinue = false;
          eContainer.innerText = "Psalms 69:9";
          break;
      }
    }

    let isRef = false;
    if (isContinue)
    {
      style = MouseText.CSSText(event, 0);
      style += `;width:${this.RefTextWidth}px`;
      style += `;left:${this.RefMiddle}px`;
      switch (event.target.id)
      {
        case "ra":
          eContainer.innerHTML = John2.Text("ra");
          break;
        case "rb":
          eContainer.innerHTML = John2.Text("rb");
          break;
        case "rc":
          eContainer.innerHTML = John2.Text("rc");
          break;
      }
      isRef = true;
    }

    if (LJC.HasText(eContainer.innerText))
    {
      let check = document.getElementById(eContainer.id);
      if (null == check)
      {
        document.body.appendChild(eContainer);
      }

      if (isRef)
      {
        alt.style.cssText = style;
        let scrollTop = this.Doc.scrollTop;
        style += `;top:${scrollTop}px`;
        let maxHeight = this.ClientHeight / 4 * 3;
        let height = eContainer.offsetHeight;
        if (height > maxHeight)
        {
          style += `;height:${maxHeight}px`;
        }
      }
      alt.style.cssText = style;
    }
  }

  // Removes the "px" from a style value.
  RemovePX(value)
  {
    value = value.trim();
    let retValue = value.substr(0, value.length - 2);
    return retValue;
  }
}

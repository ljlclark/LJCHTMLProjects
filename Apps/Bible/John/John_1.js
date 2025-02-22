// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// John_1.js

// <script src="../../../Core/Common/Script/LJCCommon.js"></script>
// <script src="../../../Core/Common/Script/StringBuilder.js"></script>
// <script src="../Script/HTMLBuilder.js"></script>
// <script src="../Script/MouseText.js"></script>
// <script src="John_1.js"></script>

// Provides Note text for the chapter.
class John1
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
        retText = "overcome";
        break;

      // John 1:9
      case "b":
        retText = John1.Textb();
        break;

      // John 1:23
      case "c":
        retText = "Psalms 40:3";
        break;

      // John 1:19
      case "ra":
        retText = John1.Textra();
        break;
      case "rb":
        retText = John1.Textrb();
        break;
      case "rc":
        retText = John1.Textrc();
        break;

      // John 1:29
      case "rd":
        retText = John1.Textrd();
        break;
      case "re":
        retText = John1.Textre();
        break;
      case "rf":
        retText = John1.Textrf();
        break;
    }
    return retText;
  }

  // John 1:9
  static Textb()
  {
    let retText = "That was the true Light which, coming into the world,\r\n";
    retText += "gives light to every man.";
    return retText;
  }

  // John 1:19
  static Textra()
  {
    let b = new HTMLBuilder();
    b.Line("Matthew 3:1-11");
    b.Text("1 In those days John the Baptist came preaching in the");
    b.Line(" wilderness of Judea,");
    b.Text("2 and saying, \"Repent, for the kingdom of heaven is at");
    b.Line(" hand!\"");
    b.Text("3 For this is he who was spoken of by the prophet Isaiah,");
    b.Line(" saying: ");
    b.Line();
    b.Line("\"The voice of one crying in the wilderness:");
    b.Line("'Prepare the way of the LORD;");
    b.Line("Make His paths straight.'\"");
    b.Line();
    b.Text("4 Now John himself was clothed in camel's hair, with a");
    b.Text(" leather belt around his waist; and his food was locusts");
    b.Line(" and wild honey.");
    b.Text("5 Then Jerusalem, all Judea, and all the region around the");
    b.Line(" Jordan went out to him");
    b.Text("6 and were baptized by him in the Jordan, confessing their");
    b.Line(" sins.");
    b.Text("7 But when he saw many of the Pharisees and Sadducees");
    b.Text(" coming to his baptism, he said to them, \"Brood of vipers!");
    b.Line(" Who warned you to flee from the wrath to come?");
    b.Line("8 \"Therefore bear fruits worthy of repentance,");
    b.Text("9 \"and do not think to say to yourselves, 'We have Abraham");
    b.Text(" as <i>our</i> father.' For I say to you that God is able to raise");
    b.Line(" up children to Abraham from these stones.");
    b.Text("10 \"And even now the ax is laid to the root of the trees.");
    b.Text(" Therefore every tree which does not bear good fruit is cut");
    b.Line(" down and thrown into the fire.");
    b.Text("11 \"I indeed baptize you with water unto repentance, but");
    b.Text(" He who is coming after me is mightier than I, whose");
    b.Text(" sandals I am not worthy to carry.He will baptize you with");
    b.Line(" the Holy Spirit and fire.");
    let retText = b.ToString();
    return retText;
  }

  // John 1:19
  static Textrb()
  {
    let b = new HTMLBuilder();
    b.Line("Mark 1:1-8");
    b.Line("1 The beginning of the gospel of Jesus Christ, the Son of God.");
    b.Line("2 As it is written in the Prophets:");
    b.Text("\"Behold, I send My messenger before Your face,");
    b.Line(" Who will prepare Your way before You.\"");
    b.Line();
    b.Line("3 \"The voice of one crying in the wilderness:");
    b.Line("'Prepare the way of the LORD;");
    b.Line("Make His paths straight.'\"");
    b.Line();
    b.Text("4 John came baptizing in the wilderness and preaching a baptism");
    b.Line(" of repentance for the remission of sins.");
    b.Text("5 Then all the land of Judea, and those from Jerusalem, went out");
    b.Text(" to him and were all baptized by him in the Jordan River,");
    b.Line(" confessing their sins.");
    b.Text("6 Now John was clothed with camel's hair and with a leather belt");
    b.Line(" around his waist, and he ate locusts and wild honey.");
    b.Text("7 And he preached, saying, \"There comes One after me who is");
    b.Text(" mightier than I, whose sandal strap I am not worthy to stoop");
    b.Line(" down and loose.");
    b.Text("8 \"I indeed baptized you with water, but He will baptize you with");
    b.Line(" the Holy Spirit.\"");
    let retText = b.ToString();
    return retText;
  }

  // John 1:19
  static Textrc()
  {
    let b = new HTMLBuilder();
    b.Line("Luke 3:2-17");
    b.Text("2 while Annas and Caiaphas were high priests, the word of God");
    b.Line(" came to John the son of Zacharias in the wilderness.");
    b.Text("3 And he went into all the region around the Jordan, preaching a");
    b.Line(" baptism of repentance for the remission of sins,");
    b.Text("4 as it is written in the book of the words of Isaiah the");
    b.Line(" prophet, saying:");
    b.Line();
    b.Line("\"The voice of one crying in the wilderness:");
    b.Line("'Prepare the way of the LORD;");
    b.Line("Make His paths straight.");
    b.Line("5 Every valley shall be filled");
    b.Line("And every mountain and hill brought low;");
    b.Line("The crooked places shall be made straight");
    b.Line("And the rough ways smooth; ");
    b.Line("6 And all flesh shall see the salvation of God.'\"");
    b.Line();
    b.Text("7 Then he said to the multitudes that came out to be baptized by");
    b.Text(" him, \"Brood of vipers! Who warned you to flee from the wrath to");
    b.Line(" come ? ");
    b.Text("8 \"Therefore bear fruits worthy of repentance, and do not begin");
    b.Text(" to say to yourselves, 'We have Abraham as <i>our</i> father.' For I say");
    b.Text(" to you that God is able to raise up children to Abraham from");
    b.Line(" these stones.");
    b.Text("9 \"And even now the ax is laid to the root of the trees.");
    b.Text(" Therefore every tree which does not bear good fruit is cut down");
    b.Line(" and thrown into the fire.\"");
    b.Line("10 So the people asked him, saying, \"What shall we do then?\"");
    b.Text("11 He answered and said to them, \"He who has two tunics, let him");
    b.Text(" give to him who has none; and he who has food, let him do");
    b.Line(" likewise.\"");
    b.Text("12 Then tax collectors also came to be baptized, and said to him,");
    b.Line(" \"Teacher, what shall we do?\"");
    b.Text("13 And he said to them, \"Collect no more than what is appointed");
    b.Line(" for you.\"");
    b.Text("14 Likewise the soldiers asked him, saying, \"And what shall we");
    b.Text(" do?\" So he said to them, \"Do not intimidate anyone or accuse");
    b.Line(" falsely, and be content with your wages.\"");
    b.Text("15 Now as the people were in expectation, and all reasoned in");
    b.Line(" their hearts about John, whether he was the Christ <i>or</i> not, ");
    b.Text("16 John answered, saying to all, \"I indeed baptize you with");
    b.Text(" water; but One mightier than I is coming, whose sandal strap I");
    b.Text(" am not worthy to loose.He will baptize you with the Holy Spirit");
    b.Line(" and fire.\"");
    let retText = b.ToString();
    return retText;
  }

  // John 1:29
  static Textrd()
  {
    let b = new HTMLBuilder();
    b.Line("Matt 3:13-17");
    b.Text("13 Then Jesus came from Galilee to John at the Jordan to be");
    b.Line(" baptized by him.");
    b.Text("14 And John <i>tried</i> to prevent Him, saying, \"I need to be baptized");
    b.Line(" by You, and are You coming to me ?\"");
    b.Text("15 But Jesus answered and said to him, \"Permit <i>it to be so</i> now,");
    b.Text(" for thus it is fitting for us to fulfill all righteousness.\"");
    b.Line(" Then he allowed Him.");
    b.Text("16 When He had been baptized, Jesus came up immediately from the");
    b.Text(" water; and behold, the heavens were opened to Him, and He saw");
    b.Line(" the Spirit of God descending like a dove and alighting upon Him.");
    b.Text("17 And suddenly a voice <i>came</i> from heaven, saying, \"This is My");
    b.Line(" beloved Son, in whom I am well pleased.\"");
    let retText = b.ToString();
    return retText;
  }

  // John 1:29
  static Textre()
  {
    let b = new HTMLBuilder();
    b.Line("Mark 1:9-11");
    b.Text("9 It came to pass in those days <i>that</i> Jesus came from Nazareth of");
    b.Line(" Galilee, and was baptized by John in the Jordan.");
    b.Text("10 And immediately, coming up from the water, He saw the heavens");
    b.Line(" parting and the Spirit descending upon Him like a dove.");
    b.Text("11 Then a voice came from heaven, \"You are My beloved Son, in");
    b.Line(" whom I am well pleased.\"");
    let retText = b.ToString();
    return retText;
  }

  // John 1:29
  static Textrf()
  {
    let b = new HTMLBuilder();
    b.Line("Luke 3:21,22");
    b.Text("21 When all the people were baptized, it came to pass that Jesus");
    b.Line(" also was baptized; and while He prayed, the heaven was opened.");
    b.Text("22 And the Holy Spirit descended in bodily form like a dove upon");
    b.Text(" Him, and a voice came from heaven which said, \"You are My");
    b.Line(" beloved Son; in You I am well pleased.\"");
    let retText = b.ToString();
    return retText;
  }

  // Constructors

  // Initializes an object instance.
  constructor()
  {
    a.addEventListener("mouseover", this.ShowText.bind(this));
    b.addEventListener("mouseover", this.ShowText.bind(this));
    c.addEventListener("mouseover", this.ShowText.bind(this));
    ra.addEventListener("mouseover", this.ShowText.bind(this));
    rb.addEventListener("mouseover", this.ShowText.bind(this));
    rc.addEventListener("mouseover", this.ShowText.bind(this));
    rd.addEventListener("mouseover", this.ShowText.bind(this));
    re.addEventListener("mouseover", this.ShowText.bind(this));
    rf.addEventListener("mouseover", this.ShowText.bind(this));

    addEventListener("dblclick", this.DocDoubleClick.bind(this));
    addEventListener("keydown", this.DocKeyDown.bind(this));

    this.NoteIDs = ["a", "b", "ra", "rb", "rc", "rd", "re", "rf"];
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
          eContainer.innerText = "overcome";
          break;
        case "b":
          isContinue = false;
          eContainer.innerText = John1.Text("b");
          break;
        case "c":
          isContinue = false;
          eContainer.innerText = John1.Text("c");
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
          eContainer.innerHTML = John1.Text("ra");
          break;
        case "rb":
          eContainer.innerHTML = John1.Text("rb");
          break;
        case "rc":
          eContainer.innerHTML = John1.Text("rc");
          break;
        case "rd":
          eContainer.innerHTML = John1.Text("rd");
          break;
        case "re":
          eContainer.innerHTML = John1.Text("re");
          break;
        case "rf":
          eContainer.innerHTML = John1.Text("rf");
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

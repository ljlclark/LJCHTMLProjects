// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// HTMLBuilder.js

class HTMLBuilder
{
  // The Constructor method.
  constructor()
  {
    this.Output = "";
  }

  // 
  Text(text)
  {
    this.Output += text;
  }

  // 
  Line(text)
  {
    if (null == text)
    {
      text = "";
    }
    text += "<br />"
    this.Text(`${text}`);
  }

  // 
  ToString()
  {
    return this.Output;
  }
}
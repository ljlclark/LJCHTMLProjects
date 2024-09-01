// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCGraphics.js

// Provides graphics methods.
// ***************
class LJCGraphics
{
  // The Constructor method.
  constructor(canvas)
  {
    this.Canvas = canvas;
    this.Context = canvas.getContext("2d");
    this.Radian = Math.PI / 180;
    this.FillStyle = this.#GetDefaultStyle(this.Canvas, "");
    this.StrokeStyle = this.#GetDefaultStyle(this.Canvas, "");

    // Animation Values
    this.X = 0;
    this.PrevX = 0;
  }

  // Draw Methods
  // ---------------
  // Arc(centerPoint, radius, endRadians, beginRadians = 0, strokeStyle = "")
  // Line(beginPoint, endPoint, strokeStyle = "")
  // NextLine(endPoint, strokeStyle = "")
  // Rectangle(beginPoint, width, height, fillStyle = "")
  // Text(text, beginPoint, font = "10px san-serif", fillStyle = "")

  // Draw an arc from the beginRadians to the endRdians.
  Arc(centerPoint, radius, endRadians, beginRadians = 0, strokeStyle = "")
  {
    let ctx = this.Context;
    strokeStyle = this.#GetStrokeStyle(strokeStyle);

    ctx.beginPath();
    ctx.arc(centerPoint.X, centerPoint.Y, radius, beginRadians, endRadians);

    ctx.strokeStyle = strokeStyle;
  }

  // Draw a line from beginPoint to endPoint.
  Line(beginPoint, endPoint, strokeStyle = "")
  {
    let ctx = this.Context;
    strokeStyle = this.#GetStrokeStyle(strokeStyle);

    ctx.moveTo(beginPoint.X, beginPoint.Y)
    ctx.lineTo(endPoint.X, endPoint.Y);

    ctx.strokeStyle = strokeStyle;
  }

  // Draw a line from the previous end point to the provided endPoint.
  NextLine(endPoint, strokeStyle = "")
  {
    let ctx = this.Context;
    strokeStyle = this.#GetStrokeStyle(strokeStyle);

    ctx.lineTo(endPoint.X, endPoint.Y);

    ctx.strokeStyle = strokeStyle;
  }

  // Draw a rectangle.
  Rectangle(beginPoint, width, height, fillStyle = "")
  {
    let ctx = this.Context;
    fillStyle = this.#GetFillStyle(fillStyle);

    ctx.beginPath();
    ctx.rect(beginPoint.X, beginPoint.Y, width, height);
    ctx.stroke();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }

  // Draw text.
  Text(text, beginPoint, font = "10px san-serif", fillStyle = "")
  {
    let ctx = this.Context;
    fillStyle = this.#GetFillStyle(fillStyle);

    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.fillText(text, beginPoint.X, beginPoint.Y);
  }

  // Other Methods
  // ---------------
  // Animate()

  // Path Methods
  // ---------------
  // BeginPath()
  // ClosePath()
  // MoveTo(point)
  // Square(value)

  // Get Radius Methods
  // ---------------
  // GetPointRadius(point)
  // GetRadius(adjacent, opposite)

  // Get Rotation Methods
  // ---------------
  // GetCosRotation(adjacent, radius)
  // GetSinRotation(opposite, radius)

  // Fill and Stroke Methods
  // ---------------
  // Fill(fillStyle = "")
  // Stroke(strokeStyle = "")

  // Test Animation
  Animate()
  {
    let ctx = this.Context;

    let y = 100;
    let width = 50;
    let height = 50;

    ctx.clearRect(this.PrevX - 1, y - 1, width + 1, height + 2);
    ctx.strokeStyle = this.strokeStyle;

    ctx.strokeRect(this.X, y, width, height);
    ctx.fillStyle = 'red';
    ctx.fillRect(this.X, y, width, height);

    this.PrevX = this.X;
    this.X += 2;
    if (this.X < this.Canvas.width - 50)
    {
      requestAnimationFrame(this.Animate.bind(this));
    }
  }

  // Performs the Ctx.beginPath() method.
  BeginPath()
  {
    this.Context.beginPath();
  }

  // Add the remaining side of the path.
  ClosePath()
  {
    this.Context.closePath();
  }

  // Move start point.
  MoveTo(point)
  {
    this.Context.moveTo(point.X, point.Y);
  }

  // Squares a value.
  Square(value)
  {
    let retValue = Math.pow(value, 2);
    return retValue;
  }

  // Get the radius for a point.
  GetPointRadius(point)
  {
    // Get the xy radius.
    let retValue = g.GetRadius(point.X, point.Y);

    if (point.Z != 0)
    {
      // xy radius is adjacent for xyz radius.
      retValue = g.GetRadius(retValue, point.Z);
    }
    return retValue;
  }

  // Get the radius.
  GetRadius(adjacent, opposite)
  {
    let sides = this.Square(adjacent) + this.Square(opposite);
    let retValue = Math.sqrt(sides);
    return retValue;
  }

  // Get the radians of an angle with sides.
  GetCosRotation(adjacent, opposite)
  {
    let radius = this.GetRadius(adjacent, opposite);
    let retValue = Math.acos(adjacent / radius);
    return retValue;
  }

  // Get the radians of an angle with sides.
  GetSinRotation(adjacent, opposite)
  {
    let radius = this.GetRadius(adjacent, opposite);
    let retValue = Math.asin(opposite / radius);
    return retValue;
  }

  // Show the fill path.
  Fill(fillStyle = "")
  {
    fillStyle = this.#GetFillStyle(fillStyle);
    this.Context.fill();
  }

  // Show the line path.
  Stroke(strokeStyle = "")
  {
    strokeStyle = this.#GetStrokeStyle(strokeStyle);
    this.Context.stroke();
  }

  // Gets the default style color.
  #GetDefaultStyle(eItem, style)
  {
    let retValue = style;

    if (!LJC.HasValue(style))
    {
      retValue = "black";
      let backColor = LJC.ElementStyle(eItem, "background-color");
      if ("rgba(0, 0, 0, 0)" == backColor)
      {
        retValue = "white";
      }
    }
    return retValue;
  }

  // Get provided style or class Style.
  #GetFillStyle(fillStyle)
  {
    let retValue = fillStyle;

    if (!LJC.HasValue(fillStyle))
    {
      retValue = this.FillStyle;
    }
    return retValue;
  }

  // Get provided style or class Style.
  #GetStrokeStyle(strokeStyle)
  {
    let retValue = strokeStyle;

    if (!LJC.HasValue(strokeStyle))
    {
      retValue = this.StrokeStyle;
    }
    return retValue;
  }
}

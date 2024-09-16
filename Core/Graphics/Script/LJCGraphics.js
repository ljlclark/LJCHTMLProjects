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

  // Path Methods
  // ---------------
  // BeginPath()
  // ClosePath()
  // MoveTo(point)
  // Square(value)

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

  // Get Radius and Rotation Methods
  // ---------------
  // CrossProduct(point1, point2)
  // Get3DRadius(point)
  // Get2DRadius(adjacent, opposite)
  // GetRotation(adjacent, opposite)

  // Get the cross product of two vectors.
  CrossProduct(point1, point2)
  {
    // Make it look like a standard equation.
    let a = point1;
    let b = point2;

    let result = new LJCPoint();
    result.X = a.Y * b.Z - a.Z * b.Y;
    result.Y = -(a.X * b.Z - a.Z * b.X);
    result.Z = a.X * b.Y - a.Y * b.X;
    return result;
  }

  // Get the radius for a point.
  Get3DRadius(point)
  {
    //// Get the xy radius.
    //let retValue = this.Get2DRadius(point.X, point.Y);
    //if (point.Z != 0)
    //{
    //  // xy radius is adjacent for xyz radius.
    //  retValue = this.Get2DRadius(retValue, point.Z);
    //}
    let sides = this.Square(point.X);
    sides += this.Square(point.Y);
    sides += this.Square(point.Z);
    let retValue = Math.sqrt(sides);
    return retValue;
  }

  // Get the radius.
  Get2DRadius(adjacent, opposite)
  {
    let sides = this.Square(adjacent)
    sides += this.Square(opposite);
    let retValue = Math.sqrt(sides);
    return retValue;
  }

  // Get the radians of an angle with sides.
  GetRotation(adjacent, opposite)
  {
    let radian = gLJCGraphics.Radian;
    let retRotation = Math.atan2(opposite, adjacent);
    if (retRotation < 0)
    {
      retRotation = Math.abs(retRotation);
    }
    let degrees = retRotation / radian;

    // Not Quandrant I or II.
    if (opposite < 0)
    {
      retRotation = Math.atan2(Math.abs(opposite)
        , Math.abs(adjacent));
    }

    // Quadrant III
    if (adjacent <= 0
      && opposite < 0)
    {
      retRotation += 180 * radian;
    }
    degrees = retRotation / radian;

    // Quadrant IV
    if (adjacent > 0
      && opposite < 0)
    {
      //retRotation += 270 * radian;
      retRotation = Math.PI * 2 - retRotation;
    }
    degrees = retRotation / radian;
    return retRotation;
  }

  // Fill and Stroke Methods
  // ---------------
  // Fill(fillStyle = "")
  // Stroke(strokeStyle = "")

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

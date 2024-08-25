// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCObject3D.js

// LJCPath - Represents a 3D path.
// LJCPathItem - Represents a 3D Path item.
// LJCPoint - Represents a 3D point.

// Represents a 3D ojbect.
// ***************
class LJCObject3D
{
  // Static Methods
  // ---------------

  // Creates a Square path.
  static CreateSquare(graphics, name, translatePoint, radius)
  {
    let object3D = new LJCObject3D(name);
    let verticeCount = 4;
    let retValue = object3D.CreatePath(name, translatePoint, radius, verticeCount);
    return retValue;
  }

  // The Constructor method.
  constructor(name, translatePoint)
  {
    this.Name = name;
    this.TranslatePoint = translatePoint;
    this.Paths = [];
  }

  // Methods
  // ---------------
  // Clone()
  // CreateFacet(name, beginPoint, radius, verticeCount)
  // Move(x, y, z)
  // Show()

  // Creates a Clone of this object.
  Clone()
  {
    let retObject3D = new LJCObject3D(this.Name);
    let paths = this.Paths;
    for (let index = 0; index < paths.length; index++)
    {
      let path = paths[index];
      retObject3D.Paths.push(path.Clone());
    }
    return retObject3D;
  }

  // Creates a Polygon path.
  CreateFacet(name, radius, verticeCount)
  {
    let g = gLJCGraphics;

    // Create the path.
    let x = radius;
    let beginPoint = new LJCPoint(x, 0, 0, radius);
    let retPath = new LJCPath(name, beginPoint
      , this.TranslatePoint);
    retPath.DoClosePath = true;

    // Rotate half of arc to make right line
    // parallel to y axis.
    retPath.Arc = (Math.PI * 2) / verticeCount;
    let arc = retPath.Arc;
    let beginRotate = arc / 2;
    beginPoint.RotateXY(beginRotate);
    retPath.Radius = beginPoint.X;

    let beginRadians = g.GetCosRotation(beginPoint.X
      , radius);
    let radians = arc + beginRadians;
    let point = beginPoint.Clone();
    for (let index = 0; index < verticeCount - 1; index++)
    {
      let nextPoint = point.Clone();
      nextPoint.RotateXY(radians);
      let pathItem = new LJCPathItem("Line", nextPoint
        , this.TranslatePoint);
      retPath.PathItems.push(pathItem);
      radians += arc;
    }
    return retPath;
  }

  // Moves the object.
  Move(x, y, z)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.Move(x, y, z);
    }
  }

  // Shows the object.
  Show()
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.Show();
    }
  }
}

// Represents a 3D path.
// ***************
class LJCPath
{
  #ScreenBeginPoint;
  #TranslatePoint;

  // The Constructor method.
  constructor(name, beginPoint, translatePoint)
  {
    this.Name = name;
    this.Arc = 0;
    this.BeginPoint = beginPoint;
    this.DoClosePath = false;
    this.PathItems = [];
    this.Radius = new LJCPoint(0, 0, 0, 0);
    this.#ScreenBeginPoint = beginPoint;
    this.SetTranslatePoint(translatePoint);
  }

  // Methods
  // ---------------
  // Clone();
  // Move(x, y, z)
  // RotateXY(radians);
  // RotateXZ(radians);
  // RotateZY(radians);
  // Show()
  // SetTranslatePoint(point)

  // Creates a Clone of this object.
  Clone()
  {
    let beginPoint = this.BeginPoint.Clone();
    let translatePoint = this.#TranslatePoint.Clone();
    let retPath = new LJCPath(this.Name, beginPoint
      , translatePoint);
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      retPath.PathItems.push(pathItem.Clone());
    }
    return retPath;
  }

  // Moves the path.
  Move(x, y, z)
  {
    // *** Next Statement *** Add
    this.BeginPoint.Move(x, y, z);
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.Move(x, y, z);
    }
    this.#Translate();
  }

  // Rotate on the XY axis.
  RotateXY(radians)
  {
    this.BeginPoint.RotateXY(radians);
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.RotateXY(radians);
    }
  }

  // Rotate on the XZ axis.
  RotateXZ(radians)
  {
    this.BeginPoint.RotateXZ(radians);
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.RotateXZ(radians);
    }
  }

  // Rotate on the ZY axis.
  RotateZY(radians)
  {
    this.BeginPoint.RotateZY(radians);
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.RotateZY(radians);
    }
  }

  // Display the Path.
  Show()
  {
    let g = gLJCGraphics;
    let pathItems = this.PathItems;

    g.BeginPath();
    let sBeginPoint = this.#ScreenBeginPoint;
    g.MoveTo(sBeginPoint);
    for (let index = 0; index < pathItems.length; index++)
    {
      let pathItem = pathItems[index];
      switch (pathItem.ItemType.toLowerCase())
      {
        case "arc":
          break;

        case "line":
          let screenPoint = pathItem.getScreenPoint();
          g.NextLine(screenPoint, pathItem.StrokeStyle);
          break;

        case "rectangle":
          break;
      }
    }
    if (this.DoClosePath)
    {
      gLJCGraphics.ClosePath();
    }
    g.Stroke();
  }

  // Sets the Translate point and screen points.
  SetTranslatePoint(point)
  {
    this.#TranslatePoint = point;
    this.#Translate();
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.SetTranslatePoint(this.#TranslatePoint);
    }
  }

  // Sets the screen points.
  #Translate()
  {
    let point = this.BeginPoint;
    let tPoint = this.#TranslatePoint;

    if (tPoint != null)
    {
      let sx = point.X + tPoint.X;
      let sy = point.Y + tPoint.Y;
      let sz = point.Z + tPoint.Z;
      this.#ScreenBeginPoint = new LJCPoint(sx, sy, sz);
    }
  }

  // Gets the ScreenBeginPoint value.
  getScreenBeginPoint()
  {
    let retValue = this.#ScreenBeginPoint;
    return retValue;
  }

  // Gets the TranslationPoint value.
  getTranslatePoint()
  {
    let retValue = this.#TranslatePoint;
    return retValue;
  }
}

// Represents a 3D Path item.
// ***************
class LJCPathItem
{
  #Point;
  #ScreenPoint;
  #TranslatePoint;

  // The Constructor method.
  constructor(itemType, nextPoint, translatePoint)
  {
    // ItemType: Arc, Line, Rectangle
    this.ItemType = itemType;
    this.#Point = nextPoint;
    this.#ScreenPoint = this.#Point;
    this.SetTranslatePoint(translatePoint);

    this.FillStyle = "";
    this.StrokeStyle = "";
  }

  // Methods
  // ---------------
  // Clone()
  // Move(x, y, z)
  // RotateXY(radians)
  // RotateXZ(radians)
  // RotateZY(radians)
  // SetTranslatePoint(point)

  // Creates a Clone of this object.
  Clone()
  {
    let point = this.#Point.Clone();
    let translatePoint = this.#TranslatePoint.Clone();
    let retPathItem = new LJCPathItem(this.ItemType, point
      , translatePoint);
    retPathItem.FillStyle = this.FillStyle;
    retPathItem.SrokeStyle = this.StrokeStyle;
    return retPathItem;
  }

  // Moves the item next point.
  Move(x, y, z)
  {
    this.#Point.Move(x, y, z);
    this.#Translate();
  }

  // Rotate on the XY axis.
  RotateXY(radians)
  {
    let point = this.#Point;

    this.NextPoint = point.RotateXY(radians);
    this.#Translate();
  }

  // Rotate on the XY axis.
  RotateXZ(radians)
  {
    let point = this.#Point;

    this.NextPoint = point.RotateXZ(radians);
    this.#Translate();
  }

  // Rotate on the XY axis.
  RotateZY(radians)
  {
    let point = this.#Point;

    this.NextPoint = point.RotateZY(radians);
    this.#Translate();
  }

  // Sets the Translate point and screen points.
  SetTranslatePoint(point)
  {
    this.#TranslatePoint = point;
    this.#Translate();
  }

  // Sets the screen points.
  #Translate()
  {
    let point = this.#Point;
    let tPoint = this.#TranslatePoint;

    if (point != null
      && tPoint != null)
    {
      let sx = point.X + tPoint.X;
      let sy = point.Y + tPoint.Y;
      let sz = point.Z + tPoint.Z;
      this.#ScreenPoint = new LJCPoint(sx, sy, sz, point.Radius);
    }
  }

  // Gets the Point value.
  getPoint()
  {
    let retValue = this.#Point;
    return retValue;
  }

  // Gets the ScreenPoint value.
  getScreenPoint()
  {
    let retValue = this.#ScreenPoint;
    return retValue;
  }

  // Gets the TranslationPoint value.
  getTranslatePoint()
  {
    let retValue = this.#TranslatePoint;
    return retValue;
  }
}

// Represents a 3D point.
// ***************
class LJCPoint
{
  // The Constructor method.
  constructor(x, y, z, radius, rotation = 0)
  {
    this.X = x;
    this.Y = y;
    this.Z = z;
    this.Radius = radius;
    this.Rotation = rotation;
  }

  // Methods
  // ---------------
  // Clone()
  // Move(x, y, z)
  // RotateXY(rotation)
  // RotateXZ(rotation)
  // RotateZY(rotation)

  // Creates a Clone of this object.
  Clone()
  {
    let retValue = new LJCPoint(this.X, this.Y
      , this.Z, this.Radius);
    return retValue;
  }

  // Moves the point.
  Move(x, y, z)
  {
    this.X += x;
    this.Y += y;
    this.Z += z;
  }

  // Create a rotated point.
  RotateXY(rotation)
  {
    // cos(radians) = a/h
    // Multiply both sides by h.
    // h * cos(radians) = a
    //this.Rotation += rotation;
    this.Rotation = rotation;
    let x = this.Radius * Math.cos(this.Rotation);
    let y = this.Radius * Math.sin(this.Rotation);
    this.X = Math.round(x);
    this.Y = Math.round(y);
  }

  // Create a rotated point.
  RotateXZ(rotation)
  {
    // cos(radians) = a/h
    // Multiply both sides by h.
    // h * cos(radians) = a
    //this.Rotation += rotation;
    this.Rotation = rotation;
    let x = this.Radius * Math.cos(this.Rotation);
    let z = this.Radius * Math.sin(this.Rotation);
    this.X = Math.round(x);
    this.Z = Math.round(z);
  }

  // Create a rotated point.
  RotateZY(rotation)
  {
    //this.Rotation += rotation;
    this.Rotation = rotation;
    let z = this.Radius * Math.cos(this.Rotation);
    let y = this.Radius * Math.sin(this.Rotation);
    this.Z = Math.round(z);
    this.Y = Math.round(y);
  }
}

// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCObject3D.js

// LJCPath - Represents a 3D path.
// LJCPathItem - Represents a 3D Path item.
// LJCPoint - Represents a 3D point.

// Represents a 3D object.
// ***************
class LJCObject3D
{
  // Static Methods
  // ---------------

  // The Constructor method.
  //constructor(name)
  constructor(name)
  {
    this.Name = name;
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
    let retPath = null;

    // Create the path.
    let x = radius;
    let beginPoint = new LJCPoint(x, 0, 0, radius);
    retPath = new LJCPath(name, beginPoint);
    retPath.DoClosePath = true;

    // Rotate half of arc to make right line
    // parallel to y axis.
    retPath.Arc = (Math.PI * 2) / verticeCount;
    let arc = retPath.Arc;
    let beginRadians = arc / 2;
    beginPoint.RotateXY(beginRadians);
    retPath.PathRadius = beginPoint.X;

    let radians = arc + beginRadians;
    let point = beginPoint.Clone();
    for (let index = 0; index < verticeCount - 1; index++)
    {
      let nextPoint = point.Clone();
      nextPoint.RotateXY(radians);
      let pathItem = new LJCPathItem("Line", nextPoint);
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

  // Sets the screen points.
  Translate()
  {
    if (gGroup.TranslatePoint != null)
    {
      for (let index = 0; index < this.Paths.length; index++)
      {
        let path = this.Paths[index];
        path.Translate();
      }
    }
  }
}

// Represents a 3D path.
// ***************
class LJCPath
{
  #ScreenBeginPoint;

  // The Constructor method.
  constructor(name, beginPoint)
  {
    this.Name = name;
    this.Arc = 0;
    this.BeginPoint = beginPoint;
    this.DoClosePath = false;
    this.PathItems = [];
    this.PathRadius = new LJCPoint(0, 0, 0, 0);
    this.#ScreenBeginPoint = beginPoint;
    this.Translate();
  }

  // Methods
  // ---------------
  // Clone();
  // Move(x, y, z)
  // RotateXY(radians);
  // RotateXZ(radians);
  // RotateZY(radians);
  // Show()
  // Translate()

  // Creates a Clone of this object.
  Clone()
  {
    let beginPoint = this.BeginPoint.Clone();
    let retPath = new LJCPath(this.Name, beginPoint);
    retPath.Arc = this.Arc;
    retPath.DoClosePath = this.DoClosePath;
    retPath.PathRadius = this.PathRadius;
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
    this.BeginPoint.Move(x, y, z);
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.Move(x, y, z);
    }
    this.Translate();
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
    this.Translate();
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
    this.Translate();
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
    this.Translate();
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

  // Sets the screen points.
  Translate()
  {
    if (gGroup.TranslatePoint != null)
    {
      this.#ScreenBeginPoint = this.BeginPoint.GetScreenPoint();
      for (let index = 0; index < this.PathItems.length; index++)
      {
        let pathItem = this.PathItems[index];
        pathItem.Translate();
      }
    }
  }

  // Gets the ScreenBeginPoint value.
  getScreenBeginPoint()
  {
    let retValue = this.#ScreenBeginPoint;
    return retValue;
  }
}

// Represents a 3D Path item.
// ***************
class LJCPathItem
{
  #Point;
  #ScreenPoint;

  // The Constructor method.
  constructor(itemType, nextPoint)
  {
    // ItemType: Arc, Line, Rectangle
    this.ItemType = itemType;
    this.#Point = nextPoint;
    this.#ScreenPoint = nextPoint;
    this.Translate();

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

  // Creates a Clone of this object.
  Clone()
  {
    let point = this.#Point.Clone();
    let retPathItem = new LJCPathItem(this.ItemType
      , point);
    retPathItem.FillStyle = this.FillStyle;
    retPathItem.SrokeStyle = this.StrokeStyle;
    return retPathItem;
  }

  // Moves the item next point.
  Move(x, y, z)
  {
    this.#Point.Move(x, y, z);
    this.Translate();
  }

  // Rotate on the XY axis.
  RotateXY(radians)
  {
    this.#Point.RotateXY(radians);
    this.Translate();
  }

  // Rotate on the XY axis.
  RotateXZ(radians)
  {
    this.#Point.RotateXZ(radians);
    this.Translate();
  }

  // Rotate on the XY axis.
  RotateZY(radians)
  {
    this.#Point.RotateZY(radians);
    this.Translate();
  }

  // Sets the screen points.
  Translate()
  {
    this.#ScreenPoint = this.#Point.GetScreenPoint();
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
    retValue.Rotation = this.Rotation;
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

  // 
  GetScreenPoint()
  {
    let tPoint = gGroup.TranslatePoint;
    let retValue = null;

    if (tPoint != null)
    {
      let sx = this.X + tPoint.X;
      let sy = this.Y + tPoint.Y;
      sx = Math.round(sx);
      sy = Math.round(sy);
      retValue = new LJCPoint(sx, sy, 0, 0);
    }
    return retValue;
  }
}

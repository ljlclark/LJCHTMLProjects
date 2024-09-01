// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCMesh.js

// LJCPath - Represents a 3D path.
// LJCPathPoint - Represents a 3D Path point.
// LJCPoint - Represents a 3D point.

// Represents a 3D object.
// ***************
class LJCMesh
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
    let retMesh = new LJCMesh(this.Name);

    let paths = this.Paths;
    for (let index = 0; index < paths.length; index++)
    {
      let path = paths[index];
      retMesh.Paths.push(path.Clone());
    }
    return retMesh;
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
      let pathPoint = new LJCPathPoint("Line", nextPoint);
      retPath.PathPoints.push(pathPoint);
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
    this.PathPoints = [];
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
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      retPath.PathPoints.push(pathPoint.Clone());
    }
    return retPath;
  }

  // Moves the path.
  Move(x, y, z)
  {
    this.BeginPoint.Move(x, y, z);
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      pathPoint.Move(x, y, z);
    }
    this.Translate();
  }

  // Rotate on the XY axis.
  RotateXY(addRadians)
  {
    let g = gLJCGraphics;
    let point = this.BeginPoint;

    let rotation = g.GetCosRotation(point.X
      , point.Y);
    rotation += addRadians;
    this.BeginPoint.RotateXY(rotation);
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      point = pathPoint.getPoint();
      rotation = g.GetCosRotation(point.X
        , point.Y);
      rotation += addRadians;
      pathPoint.RotateXY(rotation);
    }
    this.Translate();
  }

  // Rotate on the XZ axis.
  RotateXZ(addRadians)
  {
    let g = gLJCGraphics;
    let point = this.BeginPoint;

    let rotation = g.GetCosRotation(point.X
      , point.Z);
    rotation += addRadians;
    this.BeginPoint.RotateXZ(rotation);
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      point = pathPoint.getPoint();
      rotation = g.GetCosRotation(point.X
        , point.Z);
      rotation += addRadians;
      pathPoint.RotateXZ(rotation);
    }
    this.Translate();
  }

  // Rotate on the ZY axis.
  RotateZY(addRadians)
  {
    let g = gLJCGraphics;
    let point = this.BeginPoint;

    let rotation = g.GetCosRotation(point.Z
      , point.Y);
    rotation += addRadians;
    this.BeginPoint.RotateZY(rotation);
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      point = pathPoint.getPoint();
      rotation = g.GetCosRotation(point.Z
        , point.Y);
      rotation += addRadians;
      pathPoint.RotateZY(rotation);
    }
    this.Translate();
  }

  // Display the Path.
  Show()
  {
    let g = gLJCGraphics;
    let PathPoints = this.PathPoints;

    g.BeginPath();
    let sBeginPoint = this.#ScreenBeginPoint;
    g.MoveTo(sBeginPoint);
    for (let index = 0; index < PathPoints.length; index++)
    {
      let pathItem = PathPoints[index];
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
      this.#ScreenBeginPoint = this.BeginPoint.Clone();
      this.#ScreenBeginPoint.Translate();
      for (let index = 0; index < this.PathPoints.length; index++)
      {
        let pathItem = this.PathPoints[index];
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
class LJCPathPoint
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
    let retPathPoint = new LJCPathPoint(this.ItemType
      , point);
    retPathPoint.FillStyle = this.FillStyle;
    retPathPoint.SrokeStyle = this.StrokeStyle;
    return retPathPoint;
  }

  // Moves the next point.
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

  // Rotate on the ZY axis.
  RotateZY(radians)
  {
    this.#Point.RotateZY(radians);
    this.Translate();
  }

  // Sets the screen points.
  Translate()
  {
    this.#ScreenPoint = this.#Point.Clone();
    this.#ScreenPoint.Translate();
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
    let g = gLJCGraphics;

    // cos(radians) = a/h
    // Multiply both sides by h.
    // h * cos(radians) = a
    let radius = g.GetRadius(this.X, this.Y);
    this.Rotation = rotation;
    let x = radius * Math.cos(rotation);
    let y = radius * Math.sin(rotation);
    this.X = Math.round(x);
    this.Y = Math.round(y);
  }

  // Create a rotated point.
  RotateXZ(rotation)
  {
    let g = gLJCGraphics;

    let radius = g.GetRadius(this.X, this.Z);
    this.Rotation = rotation;
    let x = radius * Math.cos(rotation);
    let z = radius * Math.sin(rotation);
    this.X = Math.round(x);
    this.Z = Math.round(z);
  }

  // Create a rotated point.
  RotateZY(rotation)
  {
    let g = gLJCGraphics;

    let radius = g.GetRadius(this.Z, this.Y);
    this.Rotation = rotation;
    let z = radius * Math.cos(rotation);
    let y = radius * Math.sin(rotation);
    this.Z = Math.round(z);
    this.Y = Math.round(y);
  }

  // 
  Translate()
  {
    let tPoint = gGroup.TranslatePoint;

    if (tPoint != null)
    {
      // Perspective
      // a/b = c/d (multiply by d)
      // ad / b = c (multiple by b)
      // ad = bc (divide by a)
      // d = bc / a
      let a = tPoint.Z + this.Z;
      let sx = this.X * tPoint.Z / a;
      let sy = this.Y * tPoint.Z / a;

      // Translate (move) to screen.
      sx = sx + tPoint.X;
      sy = sy + tPoint.Y;
      this.X = Math.round(sx);
      this.Y = Math.round(sy);
    }
  }
}

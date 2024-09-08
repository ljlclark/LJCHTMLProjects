// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCPath.js

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

  // Add rotation on the XY plane.
  AddRotateXY(addRadians)
  {
    let g = gLJCGraphics;
    let point = this.BeginPoint.Clone();

    let rotation = g.GetRotation(point.X
      , point.Y);
    rotation += addRadians;
    this.BeginPoint.RotateXY(rotation);
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      point = pathPoint.getPoint().Clone();
      rotation = g.GetRotation(point.X
        , point.Y);
      // **
      let degrees = rotation / g.Radian;
      rotation += addRadians;
      degrees = rotation / g.Radian;
      pathPoint.RotateXY(rotation);
      // **
    }
    this.Translate();
  }

  // Add rotation on the XZ plane.
  AddRotateXZ(addRadians)
  {
    let g = gLJCGraphics;
    let point = this.BeginPoint.Clone();

    let rotation = g.GetRotation(point.X
      , point.Z);
    rotation += addRadians;
    this.BeginPoint.RotateXZ(rotation);
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      point = pathPoint.getPoint();
      rotation = g.GetRotation(point.X
        , point.Z);
      rotation += addRadians;
      pathPoint.RotateXZ(rotation);
    }
    this.Translate();
  }

  // Add rotation on the ZY plane.
  AddRotateZY(addRadians)
  {
    let g = gLJCGraphics;
    let point = this.BeginPoint.Clone();

    let rotation = g.GetRotation(point.Z
      , point.Y);
    rotation += addRadians;
    this.BeginPoint.RotateZY(rotation);
    for (let index = 0; index < this.PathPoints.length; index++)
    {
      let pathPoint = this.PathPoints[index];
      point = pathPoint.getPoint();
      rotation = g.GetRotation(point.Z
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
    let beginPoint = this.#ScreenBeginPoint;
    g.MoveTo(beginPoint);
    for (let index = 0; index < PathPoints.length; index++)
    {
      let pathPoint = PathPoints[index];
      switch (pathPoint.ItemType.toLowerCase())
      {
        case "arc":
          break;

        case "line":
          let screenPoint = pathPoint.getScreenPoint();
          g.NextLine(screenPoint, pathPoint.StrokeStyle);
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
        let pathPoint = this.PathPoints[index];
        pathPoint.Translate();
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

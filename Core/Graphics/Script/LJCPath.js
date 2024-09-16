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
    this.CloseType = "Close";
    // *** Next Statement *** Add
    this.FillStyle = "";
    this.PathPoints = [];
    this.PathRadius = new LJCPoint(0, 0, 0, 0);
    this.Normal = null;
    this.#ScreenBeginPoint = beginPoint;
    // *** Next Statement *** Add
    this.StrokeStyle = "";
    this.Translate();
  }

  // Data Methods
  // ---------------
  // Clone();

  // Creates a Clone of this object.
  Clone()
  {
    let beginPoint = this.BeginPoint.Clone();
    let retPath = new LJCPath(this.Name, beginPoint);
    retPath.Arc = this.Arc;
    retPath.CloseType = this.CloseType;
    retPath.FillStyle = this.FillStyle;
    retPath.PathRadius = this.PathRadius;
    for (let pathPoint of this.PathPoints)
    {
      retPath.PathPoints.push(pathPoint.Clone());
    }
    retPath.Normal = this.Normal;
    retPath.SrokeStyle = this.StrokeStyle;
    return retPath;
  }

  // Class Methods
  // ---------------
  // Move(x, y, z)
  // AddRotateXY(addRadians);
  // AddRotateXZ(addRadians);
  // AddRotateZY(addRadians);
  // RotateXY(radians);
  // RotateXZ(radians);
  // RotateZY(radians);
  // Show()
  // Translate()

  // Moves the path.
  Move(x, y, z)
  {
    this.BeginPoint.Move(x, y, z);
    for (let pathPoint of this.PathPoints)
    {
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
    for (let pathPoint of this.PathPoints)
    {
      point = pathPoint.getPoint().Clone();
      rotation = g.GetRotation(point.X
        , point.Y);
      rotation += addRadians;
      pathPoint.RotateXY(rotation);
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
    for (let pathPoint of this.PathPoints)
    {
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
    for (let pathPoint of this.PathPoints)
    {
      point = pathPoint.getPoint();
      rotation = g.GetRotation(point.Z
        , point.Y);
      rotation += addRadians;
      pathPoint.RotateZY(rotation);
    }
    this.Translate();
  }

  // Rotation on the XY plane.
  RotateXY(radians)
  {
    let g = gLJCGraphics;

    this.BeginPoint.RotateXY(radians);
    this.Normal.RotateXY(radians);
    for (let pathPoint of this.PathPoints)
    {
      pathPoint.RotateXY(radians);
    }
    this.Translate();
  }

  // Rotation on the XZ plane.
  RotateXZ(radians)
  {
    let g = gLJCGraphics;

    this.BeginPoint.RotateXZ(radians);
    this.Normal.RotateXZ(radians);
    for (let pathPoint of this.PathPoints)
    {
      pathPoint.RotateXZ(radians);
    }
    this.Translate();
  }

  // Rotation on the ZY plane.
  RotateZY(radians)
  {
    let g = gLJCGraphics;

    this.BeginPoint.RotateZY(radians);
    this.Normal.RotateZY(radians);
    for (let pathPoint of this.PathPoints)
    {
      pathPoint.RotateZY(radians);
    }
    this.Translate();
  }

  // Display the Path.
  Show()
  {
    let g = gLJCGraphics;
    let PathPoints = this.PathPoints;

    if (this.Normal.Z > 0)
    {
      g.BeginPath();
      let beginPoint = this.#ScreenBeginPoint;
      g.MoveTo(beginPoint);
      for (let pathPoint of this.PathPoints)
      {
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
      switch (this.CloseType.toLowerCase())
      {
        case "close":
          g.ClosePath();
          break;
        case "fill":
          // *** Next Statement *** Add
          g.Context.fillStyle = this.FillStyle;
          g.Context.fill();
          break;
      }
      g.Stroke();
    }
  }

  // Sets the screen points.
  Translate()
  {
    if (gScene.TranslatePoint != null)
    {
      this.#ScreenBeginPoint = this.BeginPoint.Clone();
      this.#ScreenBeginPoint.Translate();
      for (let pathPoint of this.PathPoints)
      {
        pathPoint.Translate();
      }
    }
  }

  // Getters and Setters
  // ---------------
  // getScreenBeginPoint()

  // Gets the ScreenBeginPoint value.
  getScreenBeginPoint()
  {
    let retValue = this.#ScreenBeginPoint;
    return retValue;
  }
}

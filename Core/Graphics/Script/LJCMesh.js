// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCMesh.js

// Represents a 3D object.
// ***************
class LJCMesh
{
  // The Constructor method.
  //constructor(name)
  constructor(name)
  {
    let g = gLJCGraphics;

    this.MoveValue = 0;
    this.AddXY = 5 * g.Radian;
    this.AddXZ = 0;
    this.AddZY = 0;
    this.CloseType = "None";
    this.Name = name;
    this.Paths = [];
    this.PrevRect;
  }

  // Data Methods
  // ---------------
  // Clone()

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

  // Class Methods
  // ---------------
  // Animate()
  // CreateFacet(name, beginPoint, radius, verticeCount)
  // GetMeshRectangle()
  // AddMove(x, y, z)
  // AddRotateXY(addRadians)
  // AddRotateXZ(addRadians)
  // AddRotateZY(addRadians)
  // Move(x, y, z)
  // RotateXY(radians)
  // RotateXZ(radians)
  // RotateZY(radians)
  // Show()
  // Translate()

  XYRotation()
  {
  }

  // Test Animation
  Animate()
  {
    let g = gLJCGraphics;
    let ctx = g.Context;
    let front = 0;
    let back = 1;
    let left = 2;
    let right = 3;
    let top = 4;
    let bottom = 5;

    if (this.PrevRect != null)
    {
      let rect = this.PrevRect;
      ctx.clearRect(rect.Left - 1, rect.Top - 1
        , rect.Width + 2, rect.Height + 2);
    }
    //ctx.strokeStyle = this.strokeStyle;

    // Main Rotation accumulates.
    let mesh = null;
    let base = back;

    // Testing
    //let rotate = "XY";
    //let rotate = "XYTip";
    let rotate = "XZ";
    //let rotate = "ZY";
    switch (rotate)
    {
      case "XY":
        // "negative" = Clockwise
        // "positive" = Counter
        this.AddRotateXY(this.AddXY);
        base = back;
        mesh = this.Clone();
        break;

      case "XYTip":
        // Counter
        this.AddRotateXY(this.AddXY);
        base = back;

        // Tip Angle is one time.
        mesh = this.Clone();
        // "negative" = Counter
        // "positive" = Clockwise
        mesh.AddRotateZY(55 * g.Radian);
        // "negative" = Counter
        // "positive" = Clockwise
        mesh.AddRotateXZ(5 * g.Radian);
        break;

      case "XZ":
        // "negative" = Counter
        // "positive" = Clockwise
        this.AddRotateXZ(this.AddXY);
        base = bottom;
        mesh = this.Clone();
        break;

      case "ZY":
        // "negative" = Counter
        // "positive" = Clockwise
        this.AddRotateZY(this.AddXY);
        base = left;
        mesh = this.Clone();
        break;
    }

    // Fill Base
    ctx.fillStyle = "cyan";
    let path = mesh.Paths[base];
    // Debug
    path.FillStyle = "cyan";
    path.CloseType = "Fill";
    path.Show();

    this.PrevRect = mesh.GetMeshRectangle();
    mesh.Show();

    requestAnimationFrame(this.Animate.bind(this));
  }

  // Creates a Polygon path.
  CreateFacet(name, radius, verticeCount)
  {
    let retPath = null;

    // Create the path.
    let x = radius;
    let beginPoint = new LJCPoint(x, 0, 0, radius);
    retPath = new LJCPath(name, beginPoint);
    retPath.CloseType = "Close";

    // Rotate half of arc to make right line
    // parallel to y axis.
    retPath.Arc = (Math.PI * 2) / verticeCount;
    let arc = retPath.Arc;
    let beginRadians = arc / 2;
    beginPoint.RotateXY(beginRadians);
    retPath.Translate();
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

  // Gets the mesh area rectangle.
  GetMeshRectangle()
  {
    let tPoint = gGroup.TranslatePoint;
    let retRectangle = { Left: 0, Top: 0, Width: 0, Height: 0 };
    retRectangle.Left = tPoint.X;
    retRectangle.Top = tPoint.Y;
    let largest = { X: tPoint.X, Y: tPoint.Y };

    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      let point = path.getScreenBeginPoint();
      this.#SetRectangle(point, retRectangle, largest);

      for (let pointIndex = 0; pointIndex < path.PathPoints.length; pointIndex++)
      {
        let pathPoint = path.PathPoints[pointIndex];
        let point = pathPoint.getScreenPoint();
        this.#SetRectangle(point, retRectangle, largest);
      }
      retRectangle.Width = largest.X - retRectangle.Left;
      retRectangle.Height = largest.Y - retRectangle.Top;
    }
    return retRectangle;
  }

  // Set the rectangle values.
  #SetRectangle(point, rectangle, largest)
  {
    if (point.X < rectangle.Left)
    {
      rectangle.Left = point.X;
    }

    if (point.Y < rectangle.Top)
    {
      rectangle.Top = point.Y;
    }

    if (point.X > largest.X)
    {
      largest.X = point.X;
    }

    if (point.Y > largest.Y)
    {
      largest.Y = point.Y;
    }
  }

  // Moves the object.
  AddMove(x, y, z)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      for (let pointIndex = 0; pointIndex < path.PathPoints.length; pointIndex++)
      {
        let point = path.PathPoints[pointIndex];
        let newX = point.getScreenPoint().X + x;
        let newY = point.getScreenPoint().Y + y;
        let newZ = point.getScreenPoint().Z + z;
        point.Move(newX, newY, newZ);
      }
    }
  }

  // Add rotation on the XY plane.
  AddRotateXY(addRadians)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.AddRotateXY(addRadians);
    }
  }

  // Add rotation on the XZ plane.
  AddRotateXZ(addRadians)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.AddRotateXZ(addRadians);
    }
  }

  // Add rotation on the ZY plane.
  AddRotateZY(addRadians)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.AddRotateZY(addRadians);
    }
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

  // Rotation on the XY plane.
  RotateXY(radians)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.RotateXY(radians);
    }
  }

  // Add rotation on the XZ plane.
  RotateXZ(radians)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.RotateXZ(radians);
    }
  }

  // rotation on the ZY plane.
  RotateZY(radians)
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.RotateZY(radians);
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

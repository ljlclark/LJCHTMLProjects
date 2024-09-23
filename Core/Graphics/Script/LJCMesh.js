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

    for (let path of this.Paths)
    {
      retMesh.Paths.push(path.Clone());
    }
    return retMesh;
  }

  // Class Methods
  // ---------------
  // Animate()
  // CreateFace(name, beginPoint, radius, verticeCount)
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
      let x = 1 + 30;
      let y = 1 + 30;
      let width = 2 + x + 35;
      let height = 2 + y;
      ctx.clearRect(rect.Left - x, rect.Top - y
        , rect.Width + width, rect.Height + height);
    }
    //ctx.strokeStyle = this.strokeStyle;

    let mesh = null;
    let base = back;

    // Testing
    //let rotate = "XY";
    let rotate = "XYTip";
    //let rotate = "XZ";
    //let rotate = "ZY";
    switch (rotate)
    {
      case "XY":
        // Rotate clockwise
        this.AddRotateXY(this.AddXY);
        base = back;
        mesh = this.Clone();
        break;

      case "XYTip":
        // Main Rotation accumulates.
        // Rotate clockwise
        this.AddRotateXY(this.AddXY);
        base = back;
        // Tip Angle is one time.
        mesh = this.Clone();
        // Rotate counter
        mesh.AddRotateZY(-55 * g.Radian);
        // Rotate clockwise
        mesh.AddRotateXZ(-5 * g.Radian);
        break;

      case "XZ":
        // Rotate clockwise
        this.AddRotateXZ(this.AddXY);
        base = bottom;
        mesh = this.Clone();
        break;

      case "ZY":
        // Rotate counter
        this.AddRotateZY(this.AddXY);
        base = left;
        mesh = this.Clone();
        break;
    }

    // Fill Base
    ctx.fillStyle = "cyan";
    let path = mesh.Paths[base];
    // Debug
    //path.FillStyle = "cyan";
    //path.CloseType = "Fill";
    //path.Show();

    this.PrevRect = mesh.GetRectangle();
    mesh.Show();

    requestAnimationFrame(this.Animate.bind(this));
  }

  // Creates a Polygon path.
  CreateFace(name, radius, verticeCount)
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

    // *** Begin *** Add
    retPath.Normal = new LJCPoint();
    retPath.NormalTo = new LJCPoint(0, 0, 5);
    // *** End ***

    // Get Cross Product
    if (retPath.PathPoints.length > 1)
    {
      let point1 = beginPoint;
      let point2 = retPath.PathPoints[0].getPoint();
      let point3 = retPath.PathPoints[1].getPoint();
      let xProduct = this.GetCrossProduct(point1, point2, point3);
    }
    // Next Statement *** Add
    retPath.Translate();
    return retPath;
  }

  // Get the cross product of two vectors.
  GetCrossProduct(point1, point2, point3)
  {
    let g = gLJCGraphics;
    let retProduct = null;

    let pointa = new LJCPoint();
    pointa.X = point2.X - point1.X;
    pointa.Y = point2.Y - point1.Y;
    pointa.Z = point2.Z - point1.Z;

    let pointb = new LJCPoint();
    pointb.X = point3.X - point2.X;
    pointb.Y = point3.Y - point2.Y;
    pointb.Z = point3.Z - point2.Z;

    retProduct = g.CrossProduct(pointa, pointb);
    return retProduct;
  }

  // Gets the mesh area rectangle.
  GetRectangle()
  {
    let tPoint = gScene.TranslatePoint;
    let retRectangle = { Left: 0, Top: 0, Width: 0, Height: 0 };
    retRectangle.Left = tPoint.X;
    retRectangle.Top = tPoint.Y;
    let largest = { X: tPoint.X, Y: tPoint.Y };

    for (let path of this.Paths)
    {
      let point = path.getScreenBeginPoint();
      this.#SetRectangle(point, retRectangle, largest);

      for (let pathPoint of path.PathPoints)
      {
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
      for (let point of path.PathPoints)
      {
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
    for (let path of this.Paths)
    {
      path.AddRotateXY(addRadians);
    }
  }

  // Add rotation on the XZ plane.
  AddRotateXZ(addRadians)
  {
    for (let path of this.Paths)
    {
      path.AddRotateXZ(addRadians);
    }
  }

  // Add rotation on the ZY plane.
  AddRotateZY(addRadians)
  {
    for (let path of this.Paths)
    {
      path.AddRotateZY(addRadians);
    }
  }

  // Moves the object.
  Move(x, y, z)
  {
    for (let path of this.Paths)
    {
      path.Move(x, y, z);
    }
  }

  // Rotation on the XY plane.
  RotateXY(radians)
  {
    for (let path of this.Paths)
    {
      path.RotateXY(radians);
    }
  }

  // Add rotation on the XZ plane.
  RotateXZ(radians)
  {
    for (let path of this.Paths)
    {
      path.RotateXZ(radians);
    }
  }

  // rotation on the ZY plane.
  RotateZY(radians)
  {
    for (let path of this.Paths)
    {
      path.RotateZY(radians);
    }
  }

  // Shows the object.
  Show()
  {
    for (let path of this.Paths)
    {
      path.Show();
    }
  }

  // Sets the screen points.
  Translate()
  {
    if (gScene.TranslatePoint != null)
    {
      for (let path of this.Paths)
      {
        path.Translate();
      }
    }
  }
}

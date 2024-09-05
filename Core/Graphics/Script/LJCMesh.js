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
    this.RotateXY = 5 * g.Radian;
    this.RotateXZ = 0;
    this.RotateZY = 0;
    this.AnimateActive = false;
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

  // Test Animation
  Animate()
  {
    let ctx = gLJCGraphics.Context;

    if (this.AnimateActive)
    {
      let rect = this.GetMeshRectangle();
      ctx.clearRect(rect.Left - 1, rect.Top - 1
        , rect.Width + 2, rect.Height + 2);
      ctx.strokeStyle = this.strokeStyle;

      // Debug
      this.AddRotateXY(this.RotateXY);
      //this.AddRotateXZ(this.RotateXZ);
      //this.AddRotateZY(this.RotateZY);
      //this.AddMove(this.MoveValue);
      this.Show();

      requestAnimationFrame(this.Animate.bind(this));
    }
  }

  // Creates a Polygon path.
  CreateFacet(name, radius, verticeCount)
  {
    let retPath = null;

    // Create the path.
    let x = radius;
    let beginPoint = new LJCPoint(x, 0, 0, radius);
    retPath = new LJCPath(name, beginPoint);
    retPath.DoClosePath = true;

    // Rotate half of arc to make right line
    // parallel to y axis.
    retPath.Arc = (Math.PI * 2) / verticeCount;
    // 45d = 1.57079
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

  // Gets the mesh area rectangle.
  GetMeshRectangle()
  {
    let retRectangle = { Left: 0, Top: 0, Width: 0, Height: 0 };

    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      let pathPoint = path.PathPoints[0];
      let point = pathPoint.getScreenPoint();
      if (0 == retRectangle.Left)
      {
        retRectangle.Left = point.X;
      }
      if (0 == retRectangle.Top)
      {
        retRectangle.Top = point.Y;
      }

      for (let pointIndex = 0; pointIndex < path.PathPoints.length; pointIndex++)
      {
        let pathPoint = path.PathPoints[pointIndex];
        let point = pathPoint.getScreenPoint();
        if (point.X < retRectangle.Left)
        {
          retRectangle.Left = point.X;
        }

        if (point.Y < retRectangle.Top)
        {
          retRectangle.Top = point.Y;
        }

        if (point.X > retRectangle.Left)
        {
          let width = point.X - retRectangle.Left;
          if (width > retRectangle.Width)
          {
            retRectangle.Width = width;
          }
        }

        if (point.Y > retRectangle.Top)
        {
          let height = point.Y - retRectangle.Top;
          if (height > retRectangle.Height)
          {
            retRectangle.Height = height;
          }
        }
      }
    }
    return retRectangle;
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

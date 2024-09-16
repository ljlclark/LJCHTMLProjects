// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCPoint.js

// Represents a 3D point.
// ***************
class LJCPoint
{
  // The Constructor method.
  constructor(x = 0, y = 0, z = 0, radius = 0, rotation = 0)
  {
    this.X = x;
    this.Y = y;
    this.Z = z;
    this.Radius = radius;
    //this.Rotation = rotation;
  }

  // Data Methods
  // ---------------
  // Clone()

  // Creates a Clone of this object.
  Clone()
  {
    let retValue = new LJCPoint(this.X, this.Y
      , this.Z, this.Radius);
    //retValue.Rotation = this.Rotation;
    return retValue;
  }

  // Class Methods
  // ---------------
  // Move(x, y, z)
  // RotateXY(rotation)
  // RotateXZ(rotation)
  // RotateZY(rotation)
  // Translate()

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
    //this.Rotation = rotation;
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
    //this.Rotation = rotation;
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
    //this.Rotation = rotation;
    let z = radius * Math.cos(rotation);
    let y = radius * Math.sin(rotation);
    this.Z = Math.round(z);
    this.Y = Math.round(y);
  }

  // 
  Translate()
  {
    let tPoint = gScene.TranslatePoint;

    if (tPoint != null)
    {
      // Perspective
      // Adjusted in relationship to view.
      // a = point adjacent length
      // b = point opposite length
      // c = view adjacent length (viewZ)
      // d = calculated view opposite length

      // Simplify equation
      // a/b = c/d (multiply by d)
      // ad / b = c (multiple by b)
      // ad = bc (divide by a)  // cross multiply equation
      // d = bc / a

      // Example
      // c = viewZ = tPoint.Z = 90;
      // a = adjacent = Z = (-20)
      // a = 90 - (-20) = 110
      // b = opposite = 21
      // a/b = 110 / 21 = 5.23809
      // d = bc / a
      // d = 21 * 90 / 110 = 17.181818
      // c/d = 5.23809

      // Perspective
      let viewZ = tPoint.Z;
      // Z negative toward screen
      //let a = viewZ + this.Z;
      // Z positive toward screen
      let a = viewZ - this.Z;
      let sx = this.X * viewZ / a;
      let sy = this.Y * viewZ / a;

      // Translate (move) to screen.
      sx = sx + tPoint.X;
      sy = sy + tPoint.Y;
      this.X = Math.round(sx);
      this.Y = Math.round(sy);
    }
  }
}

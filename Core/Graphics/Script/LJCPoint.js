// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCPoint.js

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
    //this.Rotation = rotation;
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
    //retValue.Rotation = this.Rotation;
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
    let tPoint = gGroup.TranslatePoint;

    if (tPoint != null)
    {
      // Perspective
      // a/b = c/d (multiply by d)
      // ad / b = c (multiple by b)
      // ad = bc (divide by a)  // cross multiply
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
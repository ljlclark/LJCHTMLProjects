// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCPathPoint.js

// Represents a 3D Path point.
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

  // Data Methods
  // ---------------
  // Clone()

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

  // Class Methods
  // ---------------
  // Move(x, y, z)
  // RotateXY(radians)
  // RotateXZ(radians)
  // RotateZY(radians)
  // Translate()

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

  // Rotate on the XZ axis.
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

  // Getters and Setters
  // ---------------
  // getPoint()
  // getScreenPoint()

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

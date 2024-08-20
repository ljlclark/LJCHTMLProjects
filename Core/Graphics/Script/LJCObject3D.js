// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// Object3D.js

// Represents a 3D ojbect.
// ***************
class LJCObject3D
{
  // AddPath(name, beginPoint, translatePoint, pathItems)
  // CreateFacetPath(name, beginPoint, translatePoint, radius, verticeCount)
  // Show()
  // ShowPath(path)

  // The Constructor method.
  constructor(graphics)
  {
    this.Graphics = graphics;
    this.Paths = [];
  }

  // Adds a Path.
  AddPath(name, beginPoint, translatePoint, pathItems)
  {
    let path = new LJCPath(name, beginPoint, translatePoint);
    for (let index = 0; index < pathItems.length; index++)
    {
      path.PathItems.push(pathItems[index]);
    }
  }

  // Creates a Polygon path.
  CreateFacetPath(name, beginPoint, translatePoint, radius, verticeCount)
  {
    let g = this.Graphics;
    let retValue = new LJCPath(name, beginPoint, translatePoint);
    retValue.DoClosePath = true;

    let arc = (Math.PI * 2) / verticeCount;
    let beginRadians = g.GetCosRotation(beginPoint.X, radius);
    let radians = arc + beginRadians;
    let nextPoint = beginPoint.Clone();
    for (let index = 0; index < verticeCount - 1; index++)
    {
      nextPoint = g.RotateXY(nextPoint, radius, radians);
      let pathItem = new LJCPathItem(g, "Line", nextPoint, translatePoint);
      retValue.PathItems.push(pathItem);
      radians += arc;
    }
    return retValue;
  }

  // Shows the object.
  Show()
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      path.Show(this.Graphics);
    }
  }
}

// Represents a 3D path.
// ***************
class LJCPath
{
  // RotateXY(radians);
  //Show(graphics)

  #ScreenBeginPoint;
  #TranslatePoint;

  // The Constructor method.
  constructor(name, beginPoint, translatePoint)
  {
    this.BeginPoint = beginPoint;
    this.DoClosePath = false;
    this.Name = name;
    this.PathItems = [];
    this.#ScreenBeginPoint = beginPoint;
    this.SetTranslatePoint(translatePoint);
  }

  // 
  RotateXY(radians)
  {

  }

  // Display the Path.
  Show(graphics)
  {
    let g = graphics;
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
          let screenPoint = pathItem.GetScreenPoint();
          g.NextLine(screenPoint, pathItem.StrokeStyle);
          break;

        case "rectangle":
          break;
      }
    }
    if (path.DoClosePath)
    {
      g.ClosePath();
    }
    g.Stroke();
  }

  //
  SetTranslatePoint(point)
  {
    this.#TranslatePoint = point;
    this.#Translate();
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.SetTranslatePoint(this.#TranslatePoint);
    }
  }

  // 
  #Translate()
  {
    let point = this.BeginPoint;
    let tPoint = this.#TranslatePoint;
    if (tPoint != null)
    {
      let sx = point.X + tPoint.X;
      let sy = point.Y + tPoint.Y;
      let sz = point.Z + tPoint.Z;
      this.#ScreenBeginPoint = new LJCPoint(sx, sy, sz);
    }
  }
}

// Represents a 3D Path item.
// ***************
class LJCPathItem
{
  // Clone()

  #Point;
  #ScreenPoint;
  #TranslatePoint;

  // The Constructor method.
  constructor(graphics, itemType, point, translatePoint)
  {
    this.Graphics = graphics;
    // ItemType: Arc, Line, Rectangle
    this.ItemType = itemType;
    this.#Point = point;
    //this.#TranslatePoint = translatePoint;
    this.#ScreenPoint = this.#Point;
    this.SetTranslatePoint(translatePoint);

    this.FillStyle = "";
    this.StrokeStyle = "";
  }

  // Creates a Clone of this object.
  Clone()
  {
    let retValue = new LJCPathItem(this.Graphics, this.ItemType, this.#Point
      , this.#TranslatePoint);
    retValue.SrokeStyle = this.StrokeStyle;
    retValue.FillStyle = this.FillStyle;
    return retValue;
  }

  // Rotate on the XY axis.
  RotateXY(radians)
  {
    let g = this.Graphics;
    let point = this.#Point;
    let radius = this.Radius;
    this.NextPoint = g.RotateXY(point, radius, radians);
    this.#Translate();
  }

  // 
  SetTranslatePoint(point)
  {
    this.#TranslatePoint = point;
    this.#Translate();
  }

  // 
  #Translate()
  {
    let point = this.#Point;
    let tPoint = this.#TranslatePoint;
    if (tPoint != null)
    {
      let sx = point.X + tPoint.X;
      let sy = point.Y + tPoint.Y;
      let sz = point.Z + tPoint.Z;
      this.#ScreenPoint = new LJCPoint(sx, sy, sz);
    }
  }

  // 
  GetPoint()
  {
    let retValue = this.#Point;
    return retValue;
  }

  // 
  GetScreenPoint()
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
  constructor(x, y, z)
  {
    this.X = x;
    this.Y = y;
    this.Z = z;
  }

  // Creates a Clone of this object.
  Clone()
  {
    let retValue = new LJCPoint(this.X, this.Y, this.Z);
    return retValue;
  }
}

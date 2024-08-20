// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// Object3D.js

// Represents a 3D ojbect.
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
      let pathItem = new LJCPathItem("Line", nextPoint);
      retValue.PathItems.push(pathItem);
      radians += arc;
    }
    retValue.TranslateAll();
    return retValue;
  }

  // Shows the object.
  Show()
  {
    for (let index = 0; index < this.Paths.length; index++)
    {
      let path = this.Paths[index];
      this.ShowPath(path);
    }
  }

  // Display the Path.
  ShowPath(path)
  {
    let g = this.Graphics;
    let pathItems = path.PathItems;

    g.BeginPath();
    let beginPoint = path.ScreenBeginPoint;
    g.MoveTo(beginPoint);
    for (let index = 0; index < pathItems.length; index++)
    {
      let pathItem = pathItems[index];
      switch (pathItem.ItemType.toLowerCase())
      {
        case "arc":
          break;

        case "line":
          let nextPoint = pathItem.ScreenNextPoint;
          g.NextLine(nextPoint, pathItem.StrokeStyle);
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
}

// Represents a 3D path.
class LJCPath
{
  // Translate(point)
  // TranslateAll()
  // SetTranslatePoint(point)

  // The Constructor method.
  constructor(name, beginPoint, translatePoint)
  {
    this.BeginPoint = beginPoint;
    this.DoClosePath = false;
    this.Name = name;
    this.PathItems = [];
    this.ScreenBeginPoint = beginPoint;
    this.TranslatePoint = translatePoint;
    this.SetTranslatePoint(translatePoint);
  }

  // Adds Path Translation
  Translate(point)
  {
    let tlPoint = this.TranslatePoint;
    let retValue = new LJCPoint(point.X + tlPoint.X, point.Y + tlPoint.Y
      , point.Z + tlPoint.Z);
    return retValue;
  }

  // Translates all paths and path items.
  TranslateAll()
  {
    this.ScreenBeginPoint = this.Translate(this.BeginPoint);
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      let nextPoint = pathItem.NextPoint;
      pathItem.ScreenNextPoint = this.Translate(nextPoint);
    }
  }

  //
  SetTranslatePoint(point)
  {
    this.TranslatePoint = point;
    this.TranslateAll();
  }
}

// Represents a 3D Path item.
class LJCPathItem
{
  // Clone()

  // The Constructor method.
  constructor(itemType, nextPoint)
  {
    // ItemType: Arc, Line, Rectangle
    this.ItemType = itemType;
    this.NextPoint = nextPoint;
    this.ScreenNextPoint = nextPoint;
    this.StrokeStyle = "";
    this.FillStyle = "";
  }

  // Creates a Clone of this object.
  Clone()
  {
    let retValue = new LJCPathItem(this.ItemType, this.NextPoint);
    retValue.SrokeStyle = this.StrokeStyle;
    retValue.FillStyle = this.FillStyle;
    return retValue;
  }
}

// Represents a 3D point.
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

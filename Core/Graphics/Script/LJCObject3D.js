// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCObject3D.js

// Represents a group of objects.
class LJCGroup
{
  // static CreateCube()
  // Show()

  // Creates a cube.
  static CreateCube(graphics, objectName, translatePoint, facetRadius)
  {
    let retValue = new LJCGroup(objectName);

    let object3D = new LJCObject3D(objectName, graphics);

    let name = "Front";
    let path = object3D.CreatePath(name, translatePoint, radius, vertices);
    path.Move(0, 0, racetRadius * -1);
    object3D.Paths.push(path);
    retValue.Objects.push(object3D);

    name = "Back";
    object3D = object3D.Clone();
    object3D.Name = name;
    path = object3D.Paths[0];
    path.Name = name;
    path.Move(0, 0, facetRadius * 2);
    retValue.Objects.push(object3D);

    name = "Left";
    object3D = object3D.Clone();
    object3D.Name = name;
    path = object3D.Paths[0];
    path.Name = name;
    path.Move(0, 0, facetRadius * -1);
    path.RotateXZ(180 * g.Radian);
    path.Move(facetRadius * -1, 0, 0);
    retValue.Objects.push(object3D);

    name = "Right";
    object3D = object3D.Clone();
    object3D.Name = name;
    path = object3D.Paths[0];
    path.Name = name;
    path.Move(facetRadius * 2, 0, 0);
    retValue.Objects.push(object3D);

    name = "Top";
    object3D = object3D.Clone();
    object3D.Name = name;
    path = object3D.Paths[0];
    path.Name = name;
    path.Move(facetRadius, 0, o);
    path.RotateXZ(180 * g.Radian);
    path.RotateYZ(180 * g.Radian);
    path.Move(0, facetRadius * -1, 0);
    retValue.Objects.push(object3D);

    name = "Bottom";
    object3D = object3D.Clone();
    object3D.Name = name;
    path = object3D.Paths[0];
    path.Name = name;
    path.Move(facetRadius * 2, 0, 0);
    retValue.Objects.push(object3D);
  }

  // The Constructor method.
  constructor(name, graphics)
  {
    this.Graphics = graphics;
    this.Name = name;
    this.Objects = [];
  }

  // Shows the group.
  Show()
  {
    for (let index = 0; index < this.Objects.length; index++)
    {
      let object3D = this.Objects[index];
      object3D.Show(this.Graphics);
    }
  }
}

// Represents a 3D ojbect.
// ***************
class LJCObject3D
{
  // static CreateSquare(graphics, name, translationPoint, radius)
  // AddPath(name, beginPoint, translatePoint, pathItems)
  // CreateFacet(name, beginPoint, translatePoint, radius, verticeCount)
  // Show()

  // 
  static CreateSquare(graphics, name, translationPoint, radius)
  {
    let retValue = new LJCObject3D(name, graphics);
    let verticeCount = 4;
    let path = retValue.CreatePath(name, translatePoint, radius, verticeCount);
    retValue.Paths.push(path);
    return retValue;
  }

  // The Constructor method.
  constructor(name, graphics)
  {
    this.Graphics = graphics;
    this.Name = name;
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
  CreateFacet(name, beginPoint, translatePoint, radius, verticeCount)
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

  // Creates a Facet based on the radius. 
  CreatePath(name, translatePoint, radius, verticeCount)
  {
    let beginPoint = new LJCPoint(radius, 0, 0);
    beginPoint = g.RotateXY(beginPoint, radius, 45 * g.Radian);
    let retValue = this.CreateFacet(name, beginPoint, translatePoint
      , radius, verticeCount);
    return retValue;
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
      path.Show(this.Graphics);
    }
  }
}

// Represents a 3D path.
// ***************
class LJCPath
{
  // RotateXY(radians);
  // Show(graphics)
  // SetTranslatePoint(point)

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

  // Moves the path.
  Move(x, y, z)
  {
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.Move(x, y, z);
    }
    this.#Translate();
  }

  // Rotate on the XY axis.
  RotateXY(radians)
  {
    for (let index = 0; index < this.PathItems.length; index++)
    {
      let pathItem = this.PathItems[index];
      pathItem.RotateXY(radians);
    }
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
          let screenPoint = pathItem.getScreenPoint();
          g.NextLine(screenPoint, pathItem.StrokeStyle);
          break;

        case "rectangle":
          break;
      }
    }
    if (this.DoClosePath)
    {
      g.ClosePath();
    }
    g.Stroke();
  }

  // Sets the Translate point and screen points.
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

  // Sets the screen points.
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

  // Gets the ScreenBeginPoint value.
  getScreenBeginPoint()
  {
    let retValue = this.#ScreenBeginPoint;
    return retValue;
  }

  // Gets the TranslationPoint value.
  getTranslatePoint()
  {
    let retValue = this.#TranslatePoint;
    return retValue;
  }
}

// Represents a 3D Path item.
// ***************
class LJCPathItem
{
  // Clone()
  // RotateXY(radians)
  // SetTranslatePoint(point)

  #Point;
  #ScreenPoint;
  #TranslatePoint;

  // The Constructor method.
  constructor(graphics, itemType, nextPoint, translatePoint)
  {
    this.Graphics = graphics;
    // ItemType: Arc, Line, Rectangle
    this.ItemType = itemType;
    this.#Point = nextPoint;
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

  // Moves the item next point.
  Move(x, y, z)
  {
    this.#Point.Move(x, y, z);
    this.#Translate();
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

  // Sets the Translate point and screen points.
  SetTranslatePoint(point)
  {
    this.#TranslatePoint = point;
    this.#Translate();
  }

  // Sets the screen points.
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

  // Gets the TranslationPoint value.
  getTranslatePoint()
  {
    let retValue = this.#TranslatePoint;
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

  // Moves the point.
  Move(x, y, z)
  {
    this.X += x;
    this.Y += y;
    thie.Z += z;
  }
}

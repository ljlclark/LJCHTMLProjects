// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCGroup.js

// Represents a group of objects.
class LJCGroup
{
  // The Constructor method.
  constructor(name)
  {
    this.Name = name;
    let canvas = gLJCGraphics.Canvas;
    this.TranslatePoint = new LJCPoint(canvas.width / 2
      , canvas.height / 2, 0);
    this.Objects = [];
  }

  // Creates a cube.
  AddCube(facetRadius)
  {
    let g = gLJCGraphics;

    let name = "Front";
    let object3D = new LJCObject3D(name
      , this.TranslatePoint);
    let square = object3D.AddSquare(name, facetRadius);
    square.Move(0, 0, facetRadius * -1);
    this.Objects.push(object3D);

    name = "Back";
    object3D = object3D.Clone();
    object3D.Name = name;
    square = object3D.Paths[0];
    square.Name = name;
    square.Move(0, 0, facetRadius * 2);
    this.Objects.push(object3D);

    name = "Left";
    object3D = object3D.Clone();
    object3D.Name = name;
    square = object3D.Paths[0];
    square.Name = name;
    square.Move(0, 0, facetRadius * -1);
    // Debug
    square.RotateXZ(180 * g.Radian);
    square.Move(facetRadius * -1, 0, 0);
    this.Objects.push(object3D);

    //name = "Right";
    //object3D = object3D.Clone();
    //object3D.Name = name;
    //square = object3D.Paths[0];
    //square.Name = name;
    //square.Move(facetRadius * 2, 0, 0);
    //this.Objects.push(object3D);

    //name = "Top";
    //object3D = object3D.Clone();
    //object3D.Name = name;
    //square = object3D.Paths[0];
    //square.Name = name;
    //square.Move(facetRadius * -1, 0, 0);
    //square.RotateXZ(180 * g.Radian);
    //square.RotateZY(180 * g.Radian);
    //square.Move(0, facetRadius * -1, 0);
    //this.Objects.push(object3D);

    //name = "Bottom";
    //object3D = object3D.Clone();
    //object3D.Name = name;
    //square = object3D.Paths[0];
    //square.Name = name;
    //square.Move(facetRadius * 2, 0, 0);
    //this.Objects.push(object3D);
  }

  // Shows the group.
  Show()
  {
    for (let index = 0; index < this.Objects.length; index++)
    {
      let object3D = this.Objects[index];
      object3D.Show();
    }
  }
}

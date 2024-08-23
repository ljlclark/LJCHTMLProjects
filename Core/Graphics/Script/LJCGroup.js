// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCGroup.js

// Represents a group of objects.
class LJCGroup
{
  // CreateCube()
  // Show()

  // The Constructor method.
  constructor(name, graphics)
  {
    this.Graphics = graphics;
    this.Name = name;
    let canvas = graphics.Canvas;
    this.TranslatePoint = new LJCPoint(canvas.width / 2
      , canvas.height / 2, 0);
    this.Objects = [];
  }

  // Creates a cube.
  AddCube(objectName, facetRadius)
  {
    let object3D = new LJCObject3D(objectName
      , this.Graphics, this.TranslatePoint);

    let name = "Front";
    let square = object3D.AddSquare(name, facetRadius);
    square.Move(0, 0, facetRadius * -1);
    object3D.Paths.push(square);
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
    square.Move(0, 0,  facetRadius * -1);
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
      object3D.Show(this.Graphics);
    }
  }
}

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
    this.Objects3D = [];
  }

  // Creates a cube.
  AddCube(radius)
  {
    let g = gLJCGraphics;

    let name = "Front";
    let object3D = new LJCObject3D(name);
    let square = object3D.CreateFacet(name, radius
      , 4);
    square.Move(0, 0, square.PathRadius * -1);
    object3D.Paths.push(square);
    this.Objects3D.push(object3D);

    name = "Back";
    object3D = object3D.Clone();
    object3D.Name = name;
    square = object3D.Paths[0];
    square.Name = name;
    square.Move(0, 0, square.PathRadius * 2);
    this.Objects3D.push(object3D);

    name = "Left";
    object3D = object3D.Clone();
    object3D.Name = name;
    square = object3D.Paths[0];
    square.Name = name;
    square.Move(0, 0, square.PathRadius * -1);
    square.RotateXZ(square.Arc);
    square.Move(square.PathRadius * -1, 0, 0);
    this.Objects3D.push(object3D);

    name = "Right";
    object3D = object3D.Clone();
    object3D.Name = name;
    square = object3D.Paths[0];
    square.Name = name;
    square.Move(square.PathRadius * 2, 0, 0);
    this.Objects3D.push(object3D);

    name = "Top";
    object3D = object3D.Clone();
    object3D.Name = name;
    square = object3D.Paths[0];
    square.Name = name;
    square.Move(square.PathRadius * -1, 0, 0);
    square.RotateXZ(square.Arc);
    square.RotateZY(square.Arc);
    square.Move(0, square.PathRadius * -1, 0);
    this.Objects3D.push(object3D);

    name = "Bottom";
    object3D = object3D.Clone();
    object3D.Name = name;
    square = object3D.Paths[0];
    square.Name = name;
    square.Move(square.PathRadius * 2, 0, 0);
    this.Objects3D.push(object3D);
  }

  // 
  Translate()
  {
    for (let index = 0; index < this.Objects3D.length; index++)
    {
      let object3D = this.Objects[index];
      object3D.Translate();
    }
  }

  // Shows the group.
  Show()
  {
    for (let index = 0; index < this.Objects3D.length; index++)
    {
      let object3D = this.Objects3D[index];
      object3D.Show();
    }
  }
}

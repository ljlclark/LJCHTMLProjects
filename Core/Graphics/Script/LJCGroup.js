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
      , canvas.height / 2, 90);
    this.Meshes = [];
  }

  // Creates a cube.
  AddCube(radius)
  {
    let g = gLJCGraphics;

    let cube = new LJCMesh("Cube");
    this.Meshes.push(cube);

    this.IsShow = true;
    let name = "Front";
    let square = cube.CreateFacet(name, radius
      , 4);
    square.Move(0, 0, -square.PathRadius);
    cube.Paths.push(square);

    name = "Back";
    square = square.Clone();
    square.Name = name;
    square.Move(0, 0, square.PathRadius * 2);
    cube.Paths.push(square);

    name = "Left";
    square = square.Clone();
    square.Name = name;
    // Move back to xyz center.
    square.Move(0, 0, -square.PathRadius);
    // Rotate counterclockwise.
    square.AddRotateXZ(square.Arc);
    // Move to left of cube.
    square.Move(-square.PathRadius, 0, 0);
    cube.Paths.push(square);

    name = "Right";
    square = square.Clone();
    square.Name = name;
    square.Move(square.PathRadius * 2, 0, 0);
    cube.Paths.push(square);

    name = "Top";
    square = square.Clone();
    square.Name = name;
    square.Move(square.PathRadius * -1, 0, 0);
    // Rotate clockwise.
    square.AddRotateXY(square.Arc);
    square.Move(0, square.PathRadius * -1, 0);
    cube.Paths.push(square);

    name = "Bottom";
    square = square.Clone();
    square.Name = name;
    square.Move(0, square.PathRadius * 2, 0);
    cube.Paths.push(square);
  }

  // 
  Translate()
  {
    for (let index = 0; index < this.Meshes.length; index++)
    {
      let mesh = this.Meshes[index];
      mesh.Translate();
    }
  }

  // Shows the group.
  Show()
  {
    for (let index = 0; index < this.Meshes.length; index++)
    {
      let mesh = this.Meshes[index];
      mesh.Show();
    }
  }
}

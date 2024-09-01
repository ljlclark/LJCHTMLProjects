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

    let name = "Front";
    let facet = new LJCMesh(name);
    let square = facet.CreateFacet(name, radius
      , 4);
    square.Move(0, 0, -square.PathRadius);
    facet.Paths.push(square);
    this.Meshes.push(facet);

    name = "Back";
    facet = facet.Clone();
    facet.Name = name;
    square = facet.Paths[0];
    square.Name = name;
    square.Move(0, 0, square.PathRadius * 2);
    this.Meshes.push(facet);

    name = "Left";
    facet = facet.Clone();
    facet.Name = name;
    square = facet.Paths[0];
    square.Name = name;
    // Move back to xyz center.
    square.Move(0, 0, -square.PathRadius);
    // Rotate counterclockwise.
    square.RotateXZ(square.Arc);
    // Move to left of cube.
    square.Move(-square.PathRadius, 0, 0);
    this.Meshes.push(facet);

    name = "Right";
    facet = facet.Clone();
    facet.Name = name;
    square = facet.Paths[0];
    square.Name = name;
    square.Move(square.PathRadius * 2, 0, 0);
    this.Meshes.push(facet);

    name = "Top";
    facet = facet.Clone();
    facet.Name = name;
    square = facet.Paths[0];
    square.Name = name;
    square.Move(square.PathRadius * -1, 0, 0);
    // Rotate counterclockwise.
    square.RotateXZ(square.Arc);
    // Rotate clockwise.
    square.RotateZY(square.Arc);
    square.Move(0, square.PathRadius * -1, 0);
    this.Meshes.push(facet);

    name = "Bottom";
    facet = facet.Clone();
    facet.Name = name;
    square = facet.Paths[0];
    square.Name = name;
    square.Move(square.PathRadius * 2, 0, 0);
    this.Meshes.push(facet);
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

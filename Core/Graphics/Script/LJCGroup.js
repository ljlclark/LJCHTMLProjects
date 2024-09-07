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
    this.#Test();
    let cube = new LJCMesh("Cube");
    this.Meshes.push(cube);

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

  #Compare(expected, actual)
  {
    if (expected != actual)
    {
      alert(`Expected: ${expected} is ${actual}`);
    }
  }

  #Test()
  {
    let g = gLJCGraphics;

    // Quadrant I
    let rotation = g.GetRotation(21, 0);
    this.#Compare(0, rotation);

    // <= 1.57079  // to 90d
    // adjacent >= 0 && opposite > 0
    rotation = g.GetRotation(1, 21);
    rotation = rotation.toFixed(5);
    this.#Compare(1.52321, rotation);

    rotation = g.GetRotation(0, 21);
    rotation = rotation.toFixed(5);
    this.#Compare(1.57080, rotation);

    // Quadrant II
    // > 1.57079 to 3.14159 to 180d
    // adjacent < 0 && opposite > 0
    rotation = g.GetRotation(-1, 21);
    rotation = rotation.toFixed(5);
    this.#Compare(1.61838, rotation);

    rotation = g.GetRotation(-21, 0);
    rotation = rotation.toFixed(5);
    this.#Compare(3.14159, rotation);

    // Quadrant III
    // > 3.14159 to 4.71239 to 270d
    // adjacent <= 0 && opposite < 0
    rotation = g.GetRotation(-21, -1);
    rotation = rotation.toFixed(5);
    this.#Compare(4.66481, rotation);

    rotation = g.GetRotation(0, -21);
    rotation = rotation.toFixed(5);
    this.#Compare(4.71239, rotation);

    // Quadrant IV
    // > 4.71239 < 6.28318 to 359d
    // adjacent > 0 && opposite < 0
    rotation = g.GetRotation(21, -1);
    rotation = rotation.toFixed(5);
    this.#Compare(4.75997, rotation);
  }
}

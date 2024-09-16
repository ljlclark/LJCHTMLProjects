// Copyright(c) Lester J.Clark and Contributors. -- >
// Licensed under the MIT License.-- >
// LJCScene.js

// Represents a group of objects.
class LJCScene
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

    let base = cube.CreateFace("Base", radius
      , 4);

    let square = base.Clone();
    square.Name = "Front";
    square.Move(0, 0, square.PathRadius);
    cube.Paths.push(square);

    square = base.Clone();
    square.Name = "Back";
    // Rotate clockwise.
    square.AddRotateXZ(square.Arc * 2);
    square.Move(0, 0, -square.PathRadius);
    cube.Paths.push(square);

    square = base.Clone();
    square.Name = "Left";
    // Rotate clockwise.
    square.AddRotateXZ(square.Arc);
    square.Move(-square.PathRadius, 0, 0);
    cube.Paths.push(square);

    square = base.Clone();
    square.Name = "Right";
    // Rotate counter.
    square.AddRotateXZ(-square.Arc);
    square.Move(square.PathRadius, 0, 0);
    cube.Paths.push(square);

    square = base.Clone();
    square.Name = "Top";
    // Rotate clockwise.
    square.AddRotateZY(-square.Arc);
    square.Move(0, square.PathRadius * -1, 0);
    cube.Paths.push(square);

    square = base.Clone();
    square.Name = "Bottom";
    // Rotate counter.
    square.AddRotateZY(square.Arc);
    square.Move(0, square.PathRadius, 0);
    cube.Paths.push(square);
  }

  // 
  Translate()
  {
    for (let mesh of this.Meshes)
    {
      mesh.Translate();
    }
  }

  // Shows the group.
  Show()
  {
    for (let mesh of this.Meshes)
    {
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
    rotation = g.GetRotation(1, 21);
    rotation = rotation.toFixed(5);
    this.#Compare(1.52321, rotation);

    // Quadrant II
    rotation = g.GetRotation(0, 21);
    rotation = rotation.toFixed(5);
    this.#Compare(1.57080, rotation);

    rotation = g.GetRotation(-1, 21);
    rotation = rotation.toFixed(5);
    this.#Compare(1.61838, rotation);

    // Quadrant III
    rotation = g.GetRotation(-21, 0);
    rotation = rotation.toFixed(5);
    this.#Compare(3.14159, rotation);

    rotation = g.GetRotation(-21, -1);
    rotation = rotation.toFixed(5);
    this.#Compare(3.18918, rotation);

    // Quadrant IV
    rotation = g.GetRotation(0, -21);
    rotation = rotation.toFixed(5);
    this.#Compare(4.71239, rotation);

    rotation = g.GetRotation(21, -1);
    rotation = rotation.toFixed(5);
    this.#Compare(6.23560, rotation);
  }
}

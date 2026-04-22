"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// LJCMatcherData.js

// Represents the Matcher data.
/// <include path='items/LJCMatcherData/*' file='Doc/LJCMatcherData.xml'/>
class LJCMatcherData
{
  AppMatches = null;

  // Initializes the object instance.
  /// <include path='items/constructor/*' file='Doc/LJCMatcherData.xml'/>
  constructor()
  {
    const retItems = [
      "1, images/Crossing.jpg, 2, Wear a seat belt while in a car.",
      "2, images/GreenLight.jpg, 6, Cross the street at the zebra crossing.",
      "3, images/SeatBelt.jpg, 1, Do not cross between moving vehicles.",
      "4, images/Helment.jpg, 5, Use the crosswalk and do not jaywalk.",
      "5, images/Traffic.jpg, 3, Wear a helmet when riding a bicycle.",
      "6, images/Jwalk.jpg, 4, Wait for the green light before crossing.",
    ];
    return retItems;
  }
}

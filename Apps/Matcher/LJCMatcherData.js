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
      "1, Images/Crossing.jpg, 2, Wear a seat belt while in a car.",
      "2, Images/GreenLight.jpg, 6, Cross the street at the zebra crossing.",
      "3, Images/SeatBelt.jpg, 1, Do not cross between moving vehicles.",
      "4, Images/Helment.jpg, 5, Use the crosswalk and do not jaywalk.",
      "5, Images/Traffic.jpg, 3, Wear a helmet when riding a bicycle.",
      "6, Images/JWalk.jpg, 4, Wait for the green light before crossing.",
    ];
    return retItems;
  }
}

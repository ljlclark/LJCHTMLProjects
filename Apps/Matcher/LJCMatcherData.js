"use strict";
// Copyright(c) Lester J. Clark and Contributors.
// Licensed under the MIT License.
// LJCMatcherData.js

// Represents the Matcher data.
/// <include path='items/LJCMatcherData/*' file='Doc/LJCMatcherData.xml'/>
class LJCMatcherData
{
  // Initializes the object instance.
  /// <include path='items/constructor/*' file='Doc/LJCMatcherData.xml'/>
  constructor()
  {
    const appMatches = new LJCAppMatches();

    let item = appMatches.Add("pic1", "set1", "text1");
    item.PicSrc = "images/Crossing.jpg";
    item.Text = "Wear a seat belt while in a car.";
    item.MatchingLeftItemID = "pic2";

    item = appMatches.Add("pic2", "set2", "text2");
    item.PicSrc = "images/GreenLight.jpg";
    item.Text = "Cross the street at the zebra crossing.";
    item.MatchingLeftItemID = "pic6";

    item = appMatches.Add("pic3", "set3", "text3");
    item.PicSrc = "images/SeatBelt.jpg";
    item.Text = "Do not cross between moving vehicles.";
    item.MatchingLeftItemID = "pic1";

    item = appMatches.Add("pic4", "set4", "text4");
    item.PicSrc = "images/Helment.jpg";
    item.Text = "Use the crosswalk and do not jaywalk.";
    item.MatchingLeftItemID = "pic5";

    item = appMatches.Add("pic5", "set5", "text5");
    item.PicSrc = "images/Traffic.jpg";
    item.Text = "Wear a helmet when riding a bicycle.";
    item.MatchingLeftItemID = "pic3";

    item = appMatches.Add("pic6", "set6", "text6");
    item.PicSrc = "images/Jwalk.jpg";
    item.Text = "Wait for the green light before crossing.";
    item.MatchingLeftItemID = "pic4";
    return appMatches;
  }
}

import { define } from "./define";

const cycling = define("sport", "Équipement de cyclisme");
const fitness = define("sport", "Équipement de fitness");
const recovery = define("sport", "Appareil de récupération");

export const sportCatalogue = [
  cycling("Garmin", "Garmin Edge 530", "garmin edge 530", 110, 500),
  cycling("Garmin", "Garmin Edge 1040", "garmin edge 1040", 300, 1100),
  cycling("Wahoo", "Wahoo Elemnt Bolt V2", "wahoo | elemnt bolt/element bolt | v2", 120, 380),
  cycling("Wahoo", "Wahoo Kickr Core", "wahoo kickr core", 250, 950),
  cycling("Tacx", "Tacx Neo 2T", "tacx neo 2t", 550, 2000),
  cycling("Zwift", "Zwift Hub", "zwift hub", 250, 700),
  cycling("Elite", "Elite Suito-T", "elite | suito", 300, 900),

  fitness("Peloton", "Peloton Bike", "peloton bike", 500, 3200),
  fitness("Concept2", "Concept2 RowErg", "concept2/concept 2 | rowerg/rameur/model d", 600, 1900),
  fitness("Bowflex", "Bowflex SelectTech 552", "bowflex | 552", 180, 800),

  recovery("Theragun", "Theragun Elite", "theragun elite", 150, 650),
  recovery("Theragun", "Theragun Mini", "theragun mini", 70, 250),
  recovery("Hyperice", "Hyperice Hypervolt 2 Pro", "hypervolt 2 pro", 150, 450),
];

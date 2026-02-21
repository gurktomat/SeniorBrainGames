// @ts-nocheck
import type { Quiz } from "./types";

import acronymRecall from "@/data/memory-games/acronym-recall.json";
import africanLandmarksQuiz from "@/data/memory-games/african-landmarks-quiz.json";
import airplaneTypesQuiz from "@/data/memory-games/airplane-types-quiz.json";
import ancientCivilizationsRecall from "@/data/memory-games/ancient-civilizations-recall.json";
import ancientEgyptRecall from "@/data/memory-games/ancient-egypt-recall.json";
import ancientLeadersRecall from "@/data/memory-games/ancient-leaders-recall.json";
import ancientPhilosophersQuiz from "@/data/memory-games/ancient-philosophers-quiz.json";
import ancientRuinsQuiz from "@/data/memory-games/ancient-ruins-quiz.json";
import animalClassification from "@/data/memory-games/animal-classification.json";
import animalSoundsQuiz from "@/data/memory-games/animal-sounds-quiz.json";
import animationClassicsRecall from "@/data/memory-games/animation-classics-recall.json";
import antSpeciesQuiz from "@/data/memory-games/ant-species-quiz.json";
import aquaticPlantsQuiz from "@/data/memory-games/aquatic-plants-quiz.json";
import artMovementsQuiz from "@/data/memory-games/art-movements-quiz.json";
import artStylesRecall from "@/data/memory-games/art-styles-recall.json";
import asianTemplesQuiz from "@/data/memory-games/asian-temples-quiz.json";
import associationChallenge from "@/data/memory-games/association-challenge.json";
import astronomyFactsRecall from "@/data/memory-games/astronomy-facts-recall.json";
import atomicStructureQuiz from "@/data/memory-games/atomic-structure-quiz.json";
import automotiveToolsQuiz from "@/data/memory-games/automotive-tools-quiz.json";
import aviationMilestonesQuiz from "@/data/memory-games/aviation-milestones-quiz.json";
import bakingEquipmentQuiz from "@/data/memory-games/baking-equipment-quiz.json";
import bakingTermsQuiz from "@/data/memory-games/baking-terms-quiz.json";
import bambooVarietiesQuiz from "@/data/memory-games/bamboo-varieties-quiz.json";
import batSpeciesQuiz from "@/data/memory-games/bat-species-quiz.json";
import bathroomItemsQuiz from "@/data/memory-games/bathroom-items-quiz.json";
import bbqStylesQuiz from "@/data/memory-games/bbq-styles-quiz.json";
import bearSpeciesQuiz from "@/data/memory-games/bear-species-quiz.json";
import beetleIdentification from "@/data/memory-games/beetle-identification.json";
import beforeAndAfter from "@/data/memory-games/before-and-after.json";
import berryIdentification from "@/data/memory-games/berry-identification.json";
import bicycleHistoryQuiz from "@/data/memory-games/bicycle-history-quiz.json";
import bigCatsQuiz from "@/data/memory-games/big-cats-quiz.json";
import biologyTermsRecall from "@/data/memory-games/biology-terms-recall.json";
import birdIdentification from "@/data/memory-games/bird-identification.json";
import birthstoneQuiz from "@/data/memory-games/birthstone-quiz.json";
import bisonBuffaloQuiz from "@/data/memory-games/bison-buffalo-quiz.json";
import boatTypesQuiz from "@/data/memory-games/boat-types-quiz.json";
import boneNamesQuiz from "@/data/memory-games/bone-names-quiz.json";
import brainFacts from "@/data/memory-games/brain-facts.json";
import brainTeasers from "@/data/memory-games/brain-teasers.json";
import breadTypesQuiz from "@/data/memory-games/bread-types-quiz.json";
import broadwayMusicalsQuiz from "@/data/memory-games/broadway-musicals-quiz.json";
import butterflyIdentification from "@/data/memory-games/butterfly-identification.json";
import cactusIdentification from "@/data/memory-games/cactus-identification.json";
import camelSpeciesQuiz from "@/data/memory-games/camel-species-quiz.json";
import campingGearQuiz from "@/data/memory-games/camping-gear-quiz.json";
import canalWaterwayQuiz from "@/data/memory-games/canal-waterway-quiz.json";
import carLogosQuiz from "@/data/memory-games/car-logos-quiz.json";
import carnivorousPlantsQuiz from "@/data/memory-games/carnivorous-plants-quiz.json";
import catBreedsQuiz from "@/data/memory-games/cat-breeds-quiz.json";
import categorySort from "@/data/memory-games/category-sort.json";
import cheeseVarietiesQuiz from "@/data/memory-games/cheese-varieties-quiz.json";
import chemicalCompoundsQuiz from "@/data/memory-games/chemical-compounds-quiz.json";
import chemistryReactionsQuiz from "@/data/memory-games/chemistry-reactions-quiz.json";
import chocolateVarietiesQuiz from "@/data/memory-games/chocolate-varieties-quiz.json";
import civilRightsLeadersQuiz from "@/data/memory-games/civil-rights-leaders-quiz.json";
import civilWarEventsQuiz from "@/data/memory-games/civil-war-events-quiz.json";
import classicCarBrandsQuiz from "@/data/memory-games/classic-car-brands-quiz.json";
import classicTrucksQuiz from "@/data/memory-games/classic-trucks-quiz.json";
import classicalComposersQuiz from "@/data/memory-games/classical-composers-quiz.json";
import cleaningProductsQuiz from "@/data/memory-games/cleaning-products-quiz.json";
import climbingPlantsQuiz from "@/data/memory-games/climbing-plants-quiz.json";
import cloudTypesQuiz from "@/data/memory-games/cloud-types-quiz.json";
import cocktailIdentification from "@/data/memory-games/cocktail-identification.json";
import coffeeVarietiesQuiz from "@/data/memory-games/coffee-varieties-quiz.json";
import coldWarEventsQuiz from "@/data/memory-games/cold-war-events-quiz.json";
import colonialEraQuiz from "@/data/memory-games/colonial-era-quiz.json";
import colorMixingQuiz from "@/data/memory-games/color-mixing-quiz.json";
import computerHistoryQuiz from "@/data/memory-games/computer-history-quiz.json";
import concentrationQuiz from "@/data/memory-games/concentration-quiz.json";
import condimentsQuiz from "@/data/memory-games/condiments-quiz.json";
import connectionPuzzle from "@/data/memory-games/connection-puzzle.json";
import constellationQuiz from "@/data/memory-games/constellation-quiz.json";
import constructionVehiclesQuiz from "@/data/memory-games/construction-vehicles-quiz.json";
import cookingMethodsQuiz from "@/data/memory-games/cooking-methods-quiz.json";
import countryCapitalsQuiz from "@/data/memory-games/country-capitals-quiz.json";
import countryMusicLegendsQuiz from "@/data/memory-games/country-music-legends-quiz.json";
import countryShapesQuiz from "@/data/memory-games/country-shapes-quiz.json";
import craftSuppliesQuiz from "@/data/memory-games/craft-supplies-quiz.json";
import crocodilianIdentification from "@/data/memory-games/crocodilian-identification.json";
import culturalSuperstitionsQuiz from "@/data/memory-games/cultural-superstitions-quiz.json";
import culturalTaboosQuiz from "@/data/memory-games/cultural-taboos-quiz.json";
import currencyCountries from "@/data/memory-games/currency-countries.json";
import curryVarietiesQuiz from "@/data/memory-games/curry-varieties-quiz.json";
import danceStylesQuiz from "@/data/memory-games/dance-styles-quiz.json";
import decadeMusicRecall from "@/data/memory-games/decade-music-recall.json";
import deerSpeciesQuiz from "@/data/memory-games/deer-species-quiz.json";
import desertLandmarksQuiz from "@/data/memory-games/desert-landmarks-quiz.json";
import dinosaurFactsQuiz from "@/data/memory-games/dinosaur-facts-quiz.json";
import dnaGeneticsQuiz from "@/data/memory-games/dna-genetics-quiz.json";
import dogBreedQuiz from "@/data/memory-games/dog-breed-quiz.json";
import dogBreedsQuiz from "@/data/memory-games/dog-breeds-quiz.json";
import driedFruitsQuiz from "@/data/memory-games/dried-fruits-quiz.json";
import dumplingTypesQuiz from "@/data/memory-games/dumpling-types-quiz.json";
import earthScienceQuiz from "@/data/memory-games/earth-science-quiz.json";
import electricalToolsQuiz from "@/data/memory-games/electrical-tools-quiz.json";
import electricityMagnetismQuiz from "@/data/memory-games/electricity-magnetism-quiz.json";
import elementSymbols from "@/data/memory-games/element-symbols.json";
import elephantFactsQuiz from "@/data/memory-games/elephant-facts-quiz.json";
import emergencyVehiclesQuiz from "@/data/memory-games/emergency-vehicles-quiz.json";
import europeanLandmarksRecall from "@/data/memory-games/european-landmarks-recall.json";
import evergreenTreesQuiz from "@/data/memory-games/evergreen-trees-quiz.json";
import everydayMemoryTest from "@/data/memory-games/everyday-memory-test.json";
import fabricTypesQuiz from "@/data/memory-games/fabric-types-quiz.json";
import famousAlbumsRecall from "@/data/memory-games/famous-albums-recall.json";
import famousArchesQuiz from "@/data/memory-games/famous-arches-quiz.json";
import famousAuthorsRecall from "@/data/memory-games/famous-authors-recall.json";
import famousBandsRecall from "@/data/memory-games/famous-bands-recall.json";
import famousBattlesRecall from "@/data/memory-games/famous-battles-recall.json";
import famousBridgesRecall from "@/data/memory-games/famous-bridges-recall.json";
import famousCastlesRecall from "@/data/memory-games/famous-castles-recall.json";
import famousComediansRecall from "@/data/memory-games/famous-comedians-recall.json";
import famousComposersRecall from "@/data/memory-games/famous-composers-recall.json";
import famousDamsQuiz from "@/data/memory-games/famous-dams-quiz.json";
import famousDiplomatsQuiz from "@/data/memory-games/famous-diplomats-quiz.json";
import famousDirectorsRecall from "@/data/memory-games/famous-directors-recall.json";
import famousDiscoveries from "@/data/memory-games/famous-discoveries.json";
import famousDuosRecall from "@/data/memory-games/famous-duos-recall.json";
import famousExperimentsQuiz from "@/data/memory-games/famous-experiments-quiz.json";
import famousExplorersRecall from "@/data/memory-games/famous-explorers-recall.json";
import famousFaces from "@/data/memory-games/famous-faces.json";
import famousFirsts from "@/data/memory-games/famous-firsts.json";
import famousFountainsQuiz from "@/data/memory-games/famous-fountains-quiz.json";
import famousGardensRecall from "@/data/memory-games/famous-gardens-recall.json";
import famousGeneralsRecall from "@/data/memory-games/famous-generals-recall.json";
import famousHighwaysQuiz from "@/data/memory-games/famous-highways-quiz.json";
import famousInventionsRecall from "@/data/memory-games/famous-inventions-recall.json";
import famousLighthousesQuiz from "@/data/memory-games/famous-lighthouses-quiz.json";
import famousLogos from "@/data/memory-games/famous-logos.json";
import famousMosquesQuiz from "@/data/memory-games/famous-mosques-quiz.json";
import famousMusicalsRecall from "@/data/memory-games/famous-musicals-recall.json";
import famousNicknames from "@/data/memory-games/famous-nicknames.json";
import famousOperasRecall from "@/data/memory-games/famous-operas-recall.json";
import famousPaintingsRecall from "@/data/memory-games/famous-paintings-recall.json";
import famousPaintings from "@/data/memory-games/famous-paintings.json";
import famousPalacesQuiz from "@/data/memory-games/famous-palaces-quiz.json";
import famousPhotographersQuiz from "@/data/memory-games/famous-photographers-quiz.json";
import famousQueensRecall from "@/data/memory-games/famous-queens-recall.json";
import famousQuotesRecall from "@/data/memory-games/famous-quotes-recall.json";
import famousRacetracksQuiz from "@/data/memory-games/famous-racetracks-quiz.json";
import famousScientistsQuiz from "@/data/memory-games/famous-scientists-quiz.json";
import famousScientistsRecall from "@/data/memory-games/famous-scientists-recall.json";
import famousSculptorsRecall from "@/data/memory-games/famous-sculptors-recall.json";
import famousSitcomsQuiz from "@/data/memory-games/famous-sitcoms-quiz.json";
import famousSkyscrapersQuiz from "@/data/memory-games/famous-skyscrapers-quiz.json";
import famousStatuesQuiz from "@/data/memory-games/famous-statues-quiz.json";
import famousTowersQuiz from "@/data/memory-games/famous-towers-quiz.json";
import famousTvShowsQuiz from "@/data/memory-games/famous-tv-shows-quiz.json";
import fastenersHardwareQuiz from "@/data/memory-games/fasteners-hardware-quiz.json";
import fernVarietiesQuiz from "@/data/memory-games/fern-varieties-quiz.json";
import firstAidSuppliesQuiz from "@/data/memory-games/first-aid-supplies-quiz.json";
import fishIdentification from "@/data/memory-games/fish-identification.json";
import fishingTackleQuiz from "@/data/memory-games/fishing-tackle-quiz.json";
import flagIdentification from "@/data/memory-games/flag-identification.json";
import flowerIdentification from "@/data/memory-games/flower-identification.json";
import foodOriginsQuiz from "@/data/memory-games/food-origins-quiz.json";
import foundingFathersQuiz from "@/data/memory-games/founding-fathers-quiz.json";
import freightTransportQuiz from "@/data/memory-games/freight-transport-quiz.json";
import frogSpeciesIdentification from "@/data/memory-games/frog-species-identification.json";
import fruitTreeIdentification from "@/data/memory-games/fruit-tree-identification.json";
import garageItemsQuiz from "@/data/memory-games/garage-items-quiz.json";
import gardenBulbsQuiz from "@/data/memory-games/garden-bulbs-quiz.json";
import gardenToolsRecall from "@/data/memory-games/garden-tools-recall.json";
import gardenVegetablesRecall from "@/data/memory-games/garden-vegetables-recall.json";
import gemstoneIdentification from "@/data/memory-games/gemstone-identification.json";
import geographyExtremes from "@/data/memory-games/geography-extremes.json";
import goatBreedsQuiz from "@/data/memory-games/goat-breeds-quiz.json";
import grammyWinnersQuiz from "@/data/memory-games/grammy-winners-quiz.json";
import greekMythologyFiguresQuiz from "@/data/memory-games/greek-mythology-figures-quiz.json";
import grillingTechniquesQuiz from "@/data/memory-games/grilling-techniques-quiz.json";
import handToolsQuiz from "@/data/memory-games/hand-tools-quiz.json";
import hardwareStoreQuiz from "@/data/memory-games/hardware-store-quiz.json";
import helicopterTypesQuiz from "@/data/memory-games/helicopter-types-quiz.json";
import herbIdentification from "@/data/memory-games/herb-identification.json";
import historicalDates from "@/data/memory-games/historical-dates.json";
import historicalFigures from "@/data/memory-games/historical-figures.json";
import homeRepairMaterialsQuiz from "@/data/memory-games/home-repair-materials-quiz.json";
import horseBreedsQuiz from "@/data/memory-games/horse-breeds-quiz.json";
import hotSauceVarietiesQuiz from "@/data/memory-games/hot-sauce-varieties-quiz.json";
import houseplantIdentification from "@/data/memory-games/houseplant-identification.json";
import humanBodySystemsQuiz from "@/data/memory-games/human-body-systems-quiz.json";
import indigenousCulturesQuiz from "@/data/memory-games/indigenous-cultures-quiz.json";
import industrialRevolutionQuiz from "@/data/memory-games/industrial-revolution-quiz.json";
import insectIdentification from "@/data/memory-games/insect-identification.json";
import instrumentSoundsQuiz from "@/data/memory-games/instrument-sounds-quiz.json";
import islandGeographyQuiz from "@/data/memory-games/island-geography-quiz.json";
import jazzGreatsRecall from "@/data/memory-games/jazz-greats-recall.json";
import kitchenAppliancesQuiz from "@/data/memory-games/kitchen-appliances-quiz.json";
import kitchenUtensilsQuiz from "@/data/memory-games/kitchen-utensils-quiz.json";
import landmarkLocations from "@/data/memory-games/landmark-locations.json";
import languageOriginsQuiz from "@/data/memory-games/language-origins-quiz.json";
import laundryRoomQuiz from "@/data/memory-games/laundry-room-quiz.json";
import leafShapesQuiz from "@/data/memory-games/leaf-shapes-quiz.json";
import lizardIdentification from "@/data/memory-games/lizard-identification.json";
import locomotiveHistoryQuiz from "@/data/memory-games/locomotive-history-quiz.json";
import logicDeduction from "@/data/memory-games/logic-deduction.json";
import mapSymbolsQuiz from "@/data/memory-games/map-symbols-quiz.json";
import marineBiologyQuiz from "@/data/memory-games/marine-biology-quiz.json";
import measurementConversions from "@/data/memory-games/measurement-conversions.json";
import medicalBreakthroughsQuiz from "@/data/memory-games/medical-breakthroughs-quiz.json";
import medicinalPlantsQuiz from "@/data/memory-games/medicinal-plants-quiz.json";
import medievalMonarchsQuiz from "@/data/memory-games/medieval-monarchs-quiz.json";
import militaryVehiclesQuiz from "@/data/memory-games/military-vehicles-quiz.json";
import modernHistoryLeadersQuiz from "@/data/memory-games/modern-history-leaders-quiz.json";
import monkeySpeciesQuiz from "@/data/memory-games/monkey-species-quiz.json";
import mossLichenQuiz from "@/data/memory-games/moss-lichen-quiz.json";
import motorcycleBrandsQuiz from "@/data/memory-games/motorcycle-brands-quiz.json";
import mountainPeaksRecall from "@/data/memory-games/mountain-peaks-recall.json";
import movieQuotesRecall from "@/data/memory-games/movie-quotes-recall.json";
import movieSoundtracksQuiz from "@/data/memory-games/movie-soundtracks-quiz.json";
import movieYearQuiz from "@/data/memory-games/movie-year-quiz.json";
import mushroomIdentification from "@/data/memory-games/mushroom-identification.json";
import musicDecadesQuiz from "@/data/memory-games/music-decades-quiz.json";
import musicNotesQuiz from "@/data/memory-games/music-notes-quiz.json";
import nationalCostumesQuiz from "@/data/memory-games/national-costumes-quiz.json";
import nationalMonumentsRecall from "@/data/memory-games/national-monuments-recall.json";
import nobelPrizeScienceQuiz from "@/data/memory-games/nobel-prize-science-quiz.json";
import numberFactsQuiz from "@/data/memory-games/number-facts-quiz.json";
import numberPatterns from "@/data/memory-games/number-patterns.json";
import nutIdentification from "@/data/memory-games/nut-identification.json";
import oceanCreaturesQuiz from "@/data/memory-games/ocean-creatures-quiz.json";
import oddOneOut from "@/data/memory-games/odd-one-out.json";
import officeSuppliesQuiz from "@/data/memory-games/office-supplies-quiz.json";
import olympicHostCities from "@/data/memory-games/olympic-host-cities.json";
import olympicSportsQuiz from "@/data/memory-games/olympic-sports-quiz.json";
import orchestraInstrumentsQuiz from "@/data/memory-games/orchestra-instruments-quiz.json";
import orchidIdentification from "@/data/memory-games/orchid-identification.json";
import organFunctionsQuiz from "@/data/memory-games/organ-functions-quiz.json";
import ornamentalGrassesQuiz from "@/data/memory-games/ornamental-grasses-quiz.json";
import paintingSuppliesQuiz from "@/data/memory-games/painting-supplies-quiz.json";
import pastaShapesQuiz from "@/data/memory-games/pasta-shapes-quiz.json";
import periodicElementQuiz from "@/data/memory-games/periodic-element-quiz.json";
import periodicTableRecall from "@/data/memory-games/periodic-table-recall.json";
import phobiaNames from "@/data/memory-games/phobia-names.json";
import physicsLawsQuiz from "@/data/memory-games/physics-laws-quiz.json";
import pictureQuiz from "@/data/memory-games/picture-quiz.json";
import pieTypesQuiz from "@/data/memory-games/pie-types-quiz.json";
import pigBreedsQuiz from "@/data/memory-games/pig-breeds-quiz.json";
import planetFactsQuiz from "@/data/memory-games/planet-facts-quiz.json";
import plumbingPartsQuiz from "@/data/memory-games/plumbing-parts-quiz.json";
import poisonousPlantsQuiz from "@/data/memory-games/poisonous-plants-quiz.json";
import popMusicHitsQuiz from "@/data/memory-games/pop-music-hits-quiz.json";
import powerToolsQuiz from "@/data/memory-games/power-tools-quiz.json";
import prairieWildflowersQuiz from "@/data/memory-games/prairie-wildflowers-quiz.json";
import presidentialOrder from "@/data/memory-games/presidential-order.json";
import primateIdentification from "@/data/memory-games/primate-identification.json";
import quickThinking from "@/data/memory-games/quick-thinking.json";
import rabbitBreedsQuiz from "@/data/memory-games/rabbit-breeds-quiz.json";
import racingCarsQuiz from "@/data/memory-games/racing-cars-quiz.json";
import rapidRecall from "@/data/memory-games/rapid-recall.json";
import rememberTheYear from "@/data/memory-games/remember-the-year.json";
import renaissanceFiguresQuiz from "@/data/memory-games/renaissance-figures-quiz.json";
import reptileIdentification from "@/data/memory-games/reptile-identification.json";
import reverseTrivia from "@/data/memory-games/reverse-trivia.json";
import revolutionaryLeadersQuiz from "@/data/memory-games/revolutionary-leaders-quiz.json";
import riceDishesQuiz from "@/data/memory-games/rice-dishes-quiz.json";
import rockLegendsRecall from "@/data/memory-games/rock-legends-recall.json";
import rockTypesQuiz from "@/data/memory-games/rock-types-quiz.json";
import rodentIdentification from "@/data/memory-games/rodent-identification.json";
import romanEmperorsQuiz from "@/data/memory-games/roman-emperors-quiz.json";
import romanNumerals from "@/data/memory-games/roman-numerals.json";
import rootVegetablesQuiz from "@/data/memory-games/root-vegetables-quiz.json";
import roseVarietiesQuiz from "@/data/memory-games/rose-varieties-quiz.json";
import sailingVesselsQuiz from "@/data/memory-games/sailing-vessels-quiz.json";
import saladTypesQuiz from "@/data/memory-games/salad-types-quiz.json";
import salamanderIdentification from "@/data/memory-games/salamander-identification.json";
import sandwichVarietiesQuiz from "@/data/memory-games/sandwich-varieties-quiz.json";
import scienceAcronymsQuiz from "@/data/memory-games/science-acronyms-quiz.json";
import scienceFactsRecall from "@/data/memory-games/science-facts-recall.json";
import scienceSymbolsQuiz from "@/data/memory-games/science-symbols-quiz.json";
import scientificInstrumentsQuiz from "@/data/memory-games/scientific-instruments-quiz.json";
import scientificUnitsQuiz from "@/data/memory-games/scientific-units-quiz.json";
import seafoodIdentification from "@/data/memory-games/seafood-identification.json";
import seedIdentificationQuiz from "@/data/memory-games/seed-identification-quiz.json";
import sequenceOrder from "@/data/memory-games/sequence-order.json";
import sewingNotionsQuiz from "@/data/memory-games/sewing-notions-quiz.json";
import sheepBreedsQuiz from "@/data/memory-games/sheep-breeds-quiz.json";
import shipTypesQuiz from "@/data/memory-games/ship-types-quiz.json";
import shrubIdentification from "@/data/memory-games/shrub-identification.json";
import snakeSpeciesQuiz from "@/data/memory-games/snake-species-quiz.json";
import solarSystemQuiz from "@/data/memory-games/solar-system-quiz.json";
import spaceMissionsRecall from "@/data/memory-games/space-missions-recall.json";
import spaceRaceEventsQuiz from "@/data/memory-games/space-race-events-quiz.json";
import speedMathQuiz from "@/data/memory-games/speed-math-quiz.json";
import spiceIdentification from "@/data/memory-games/spice-identification.json";
import sportsBallsQuiz from "@/data/memory-games/sports-balls-quiz.json";
import sportsEquipmentQuiz from "@/data/memory-games/sports-equipment-quiz.json";
import sportsRecordsQuiz from "@/data/memory-games/sports-records-quiz.json";
import sportsRulesQuiz from "@/data/memory-games/sports-rules-quiz.json";
import sportsVenuesQuiz from "@/data/memory-games/sports-venues-quiz.json";
import stateCapitalsRecall from "@/data/memory-games/state-capitals-recall.json";
import stateFlagsQuiz from "@/data/memory-games/state-flags-quiz.json";
import stringInstrumentsRecall from "@/data/memory-games/string-instruments-recall.json";
import subwaySystemsQuiz from "@/data/memory-games/subway-systems-quiz.json";
import succulentIdentification from "@/data/memory-games/succulent-identification.json";
import sushiTypesQuiz from "@/data/memory-games/sushi-types-quiz.json";
import teaVarietiesQuiz from "@/data/memory-games/tea-varieties-quiz.json";
import techInventionsRecall from "@/data/memory-games/tech-inventions-recall.json";
import technologyPioneersQuiz from "@/data/memory-games/technology-pioneers-quiz.json";
import telescopeDiscoveriesQuiz from "@/data/memory-games/telescope-discoveries-quiz.json";
import traditionalDancesRecall from "@/data/memory-games/traditional-dances-recall.json";
import traditionalInstrumentsQuiz from "@/data/memory-games/traditional-instruments-quiz.json";
import trainTypesQuiz from "@/data/memory-games/train-types-quiz.json";
import treeIdentification from "@/data/memory-games/tree-identification.json";
import triviaRecall from "@/data/memory-games/trivia-recall.json";
import tropicalFruitsQuiz from "@/data/memory-games/tropical-fruits-quiz.json";
import tropicalPlantsQuiz from "@/data/memory-games/tropical-plants-quiz.json";
import turtleTortoiseQuiz from "@/data/memory-games/turtle-tortoise-quiz.json";
import tvThemeSongsQuiz from "@/data/memory-games/tv-theme-songs-quiz.json";
import twoTruthsOneLie from "@/data/memory-games/two-truths-one-lie.json";
import unitConversions from "@/data/memory-games/unit-conversions.json";
import vegetableGardenQuiz from "@/data/memory-games/vegetable-garden-quiz.json";
import vintageAircraftQuiz from "@/data/memory-games/vintage-aircraft-quiz.json";
import visualClues from "@/data/memory-games/visual-clues.json";
import visualMemoryQuiz from "@/data/memory-games/visual-memory-quiz.json";
import vitaminMineralsQuiz from "@/data/memory-games/vitamin-minerals-quiz.json";
import volcanicLandmarksQuiz from "@/data/memory-games/volcanic-landmarks-quiz.json";
import weatherSymbolsQuiz from "@/data/memory-games/weather-symbols-quiz.json";
import whaleDolphinQuiz from "@/data/memory-games/whale-dolphin-quiz.json";
import whatComesNext from "@/data/memory-games/what-comes-next.json";
import wildCatsIdentification from "@/data/memory-games/wild-cats-identification.json";
import wildflowerQuiz from "@/data/memory-games/wildflower-quiz.json";
import wineRegionsQuiz from "@/data/memory-games/wine-regions-quiz.json";
import wolfSpeciesQuiz from "@/data/memory-games/wolf-species-quiz.json";
import womensHistoryQuiz from "@/data/memory-games/womens-history-quiz.json";
import woodwindInstrumentsQuiz from "@/data/memory-games/woodwind-instruments-quiz.json";
import woodworkingToolsQuiz from "@/data/memory-games/woodworking-tools-quiz.json";
import wordConnections from "@/data/memory-games/word-connections.json";
import wordDefinitionsQuiz from "@/data/memory-games/word-definitions-quiz.json";
import workshopToolsQuiz from "@/data/memory-games/workshop-tools-quiz.json";
import worldBreadsQuiz from "@/data/memory-games/world-breads-quiz.json";
import worldBridgesQuiz from "@/data/memory-games/world-bridges-quiz.json";
import worldCalendarSystemsQuiz from "@/data/memory-games/world-calendar-systems-quiz.json";
import worldCapitalsExtreme from "@/data/memory-games/world-capitals-extreme.json";
import worldCathedralsQuiz from "@/data/memory-games/world-cathedrals-quiz.json";
import worldCheesesRecall from "@/data/memory-games/world-cheeses-recall.json";
import worldClockTowersQuiz from "@/data/memory-games/world-clock-towers-quiz.json";
import worldComingOfAgeQuiz from "@/data/memory-games/world-coming-of-age-quiz.json";
import worldCurrenciesRecall from "@/data/memory-games/world-currencies-recall.json";
import worldDessertsQuiz from "@/data/memory-games/world-desserts-quiz.json";
import worldFestivalsQuiz from "@/data/memory-games/world-festivals-quiz.json";
import worldFlagsRecall from "@/data/memory-games/world-flags-recall.json";
import worldFolkTalesQuiz from "@/data/memory-games/world-folk-tales-quiz.json";
import worldFuneralTraditionsQuiz from "@/data/memory-games/world-funeral-traditions-quiz.json";
import worldGreetingCustomsQuiz from "@/data/memory-games/world-greeting-customs-quiz.json";
import worldHarvestFestivalsQuiz from "@/data/memory-games/world-harvest-festivals-quiz.json";
import worldHospitalityCustomsQuiz from "@/data/memory-games/world-hospitality-customs-quiz.json";
import worldLeadersQuiz from "@/data/memory-games/world-leaders-quiz.json";
import worldMartialArtsQuiz from "@/data/memory-games/world-martial-arts-quiz.json";
import worldMaskTraditionsQuiz from "@/data/memory-games/world-mask-traditions-quiz.json";
import worldMusicTraditionsQuiz from "@/data/memory-games/world-music-traditions-quiz.json";
import worldNewYearTraditionsQuiz from "@/data/memory-games/world-new-year-traditions-quiz.json";
import worldOperaHousesQuiz from "@/data/memory-games/world-opera-houses-quiz.json";
import worldRecords from "@/data/memory-games/world-records.json";
import worldReligiousFestivalsQuiz from "@/data/memory-games/world-religious-festivals-quiz.json";
import worldSoupsQuiz from "@/data/memory-games/world-soups-quiz.json";
import worldStadiumsQuiz from "@/data/memory-games/world-stadiums-quiz.json";
import worldStorytellingTraditionsQuiz from "@/data/memory-games/world-storytelling-traditions-quiz.json";
import worldStreetFoodQuiz from "@/data/memory-games/world-street-food-quiz.json";
import worldTeaCeremoniesQuiz from "@/data/memory-games/world-tea-ceremonies-quiz.json";
import worldTeasAndInfusionsQuiz from "@/data/memory-games/world-teas-and-infusions-quiz.json";
import worldTextileTraditionsQuiz from "@/data/memory-games/world-textile-traditions-quiz.json";
import worldTraditionalMedicineQuiz from "@/data/memory-games/world-traditional-medicine-quiz.json";
import worldWaterfallsQuiz from "@/data/memory-games/world-waterfalls-quiz.json";
import worldWeddingTraditionsQuiz from "@/data/memory-games/world-wedding-traditions-quiz.json";
import wwiEventsQuiz from "@/data/memory-games/wwi-events-quiz.json";
import wwiiEventsQuiz from "@/data/memory-games/wwii-events-quiz.json";
import zodiacTrivia from "@/data/memory-games/zodiac-trivia.json";

const quizzes: Quiz[] = [
  acronymRecall as Quiz,
  africanLandmarksQuiz as Quiz,
  airplaneTypesQuiz as Quiz,
  ancientCivilizationsRecall as Quiz,
  ancientEgyptRecall as Quiz,
  ancientLeadersRecall as Quiz,
  ancientPhilosophersQuiz as Quiz,
  ancientRuinsQuiz as Quiz,
  animalClassification as Quiz,
  animalSoundsQuiz as Quiz,
  animationClassicsRecall as Quiz,
  antSpeciesQuiz as Quiz,
  aquaticPlantsQuiz as Quiz,
  artMovementsQuiz as Quiz,
  artStylesRecall as Quiz,
  asianTemplesQuiz as Quiz,
  associationChallenge as Quiz,
  astronomyFactsRecall as Quiz,
  atomicStructureQuiz as Quiz,
  automotiveToolsQuiz as Quiz,
  aviationMilestonesQuiz as Quiz,
  bakingEquipmentQuiz as Quiz,
  bakingTermsQuiz as Quiz,
  bambooVarietiesQuiz as Quiz,
  batSpeciesQuiz as Quiz,
  bathroomItemsQuiz as Quiz,
  bbqStylesQuiz as Quiz,
  bearSpeciesQuiz as Quiz,
  beetleIdentification as Quiz,
  beforeAndAfter as Quiz,
  berryIdentification as Quiz,
  bicycleHistoryQuiz as Quiz,
  bigCatsQuiz as Quiz,
  biologyTermsRecall as Quiz,
  birdIdentification as Quiz,
  birthstoneQuiz as Quiz,
  bisonBuffaloQuiz as Quiz,
  boatTypesQuiz as Quiz,
  boneNamesQuiz as Quiz,
  brainFacts as Quiz,
  brainTeasers as Quiz,
  breadTypesQuiz as Quiz,
  broadwayMusicalsQuiz as Quiz,
  butterflyIdentification as Quiz,
  cactusIdentification as Quiz,
  camelSpeciesQuiz as Quiz,
  campingGearQuiz as Quiz,
  canalWaterwayQuiz as Quiz,
  carLogosQuiz as Quiz,
  carnivorousPlantsQuiz as Quiz,
  catBreedsQuiz as Quiz,
  categorySort as Quiz,
  cheeseVarietiesQuiz as Quiz,
  chemicalCompoundsQuiz as Quiz,
  chemistryReactionsQuiz as Quiz,
  chocolateVarietiesQuiz as Quiz,
  civilRightsLeadersQuiz as Quiz,
  civilWarEventsQuiz as Quiz,
  classicCarBrandsQuiz as Quiz,
  classicTrucksQuiz as Quiz,
  classicalComposersQuiz as Quiz,
  cleaningProductsQuiz as Quiz,
  climbingPlantsQuiz as Quiz,
  cloudTypesQuiz as Quiz,
  cocktailIdentification as Quiz,
  coffeeVarietiesQuiz as Quiz,
  coldWarEventsQuiz as Quiz,
  colonialEraQuiz as Quiz,
  colorMixingQuiz as Quiz,
  computerHistoryQuiz as Quiz,
  concentrationQuiz as Quiz,
  condimentsQuiz as Quiz,
  connectionPuzzle as Quiz,
  constellationQuiz as Quiz,
  constructionVehiclesQuiz as Quiz,
  cookingMethodsQuiz as Quiz,
  countryCapitalsQuiz as Quiz,
  countryMusicLegendsQuiz as Quiz,
  countryShapesQuiz as Quiz,
  craftSuppliesQuiz as Quiz,
  crocodilianIdentification as Quiz,
  culturalSuperstitionsQuiz as Quiz,
  culturalTaboosQuiz as Quiz,
  currencyCountries as Quiz,
  curryVarietiesQuiz as Quiz,
  danceStylesQuiz as Quiz,
  decadeMusicRecall as Quiz,
  deerSpeciesQuiz as Quiz,
  desertLandmarksQuiz as Quiz,
  dinosaurFactsQuiz as Quiz,
  dnaGeneticsQuiz as Quiz,
  dogBreedQuiz as Quiz,
  dogBreedsQuiz as Quiz,
  driedFruitsQuiz as Quiz,
  dumplingTypesQuiz as Quiz,
  earthScienceQuiz as Quiz,
  electricalToolsQuiz as Quiz,
  electricityMagnetismQuiz as Quiz,
  elementSymbols as Quiz,
  elephantFactsQuiz as Quiz,
  emergencyVehiclesQuiz as Quiz,
  europeanLandmarksRecall as Quiz,
  evergreenTreesQuiz as Quiz,
  everydayMemoryTest as Quiz,
  fabricTypesQuiz as Quiz,
  famousAlbumsRecall as Quiz,
  famousArchesQuiz as Quiz,
  famousAuthorsRecall as Quiz,
  famousBandsRecall as Quiz,
  famousBattlesRecall as Quiz,
  famousBridgesRecall as Quiz,
  famousCastlesRecall as Quiz,
  famousComediansRecall as Quiz,
  famousComposersRecall as Quiz,
  famousDamsQuiz as Quiz,
  famousDiplomatsQuiz as Quiz,
  famousDirectorsRecall as Quiz,
  famousDiscoveries as Quiz,
  famousDuosRecall as Quiz,
  famousExperimentsQuiz as Quiz,
  famousExplorersRecall as Quiz,
  famousFaces as Quiz,
  famousFirsts as Quiz,
  famousFountainsQuiz as Quiz,
  famousGardensRecall as Quiz,
  famousGeneralsRecall as Quiz,
  famousHighwaysQuiz as Quiz,
  famousInventionsRecall as Quiz,
  famousLighthousesQuiz as Quiz,
  famousLogos as Quiz,
  famousMosquesQuiz as Quiz,
  famousMusicalsRecall as Quiz,
  famousNicknames as Quiz,
  famousOperasRecall as Quiz,
  famousPaintingsRecall as Quiz,
  famousPaintings as Quiz,
  famousPalacesQuiz as Quiz,
  famousPhotographersQuiz as Quiz,
  famousQueensRecall as Quiz,
  famousQuotesRecall as Quiz,
  famousRacetracksQuiz as Quiz,
  famousScientistsQuiz as Quiz,
  famousScientistsRecall as Quiz,
  famousSculptorsRecall as Quiz,
  famousSitcomsQuiz as Quiz,
  famousSkyscrapersQuiz as Quiz,
  famousStatuesQuiz as Quiz,
  famousTowersQuiz as Quiz,
  famousTvShowsQuiz as Quiz,
  fastenersHardwareQuiz as Quiz,
  fernVarietiesQuiz as Quiz,
  firstAidSuppliesQuiz as Quiz,
  fishIdentification as Quiz,
  fishingTackleQuiz as Quiz,
  flagIdentification as Quiz,
  flowerIdentification as Quiz,
  foodOriginsQuiz as Quiz,
  foundingFathersQuiz as Quiz,
  freightTransportQuiz as Quiz,
  frogSpeciesIdentification as Quiz,
  fruitTreeIdentification as Quiz,
  garageItemsQuiz as Quiz,
  gardenBulbsQuiz as Quiz,
  gardenToolsRecall as Quiz,
  gardenVegetablesRecall as Quiz,
  gemstoneIdentification as Quiz,
  geographyExtremes as Quiz,
  goatBreedsQuiz as Quiz,
  grammyWinnersQuiz as Quiz,
  greekMythologyFiguresQuiz as Quiz,
  grillingTechniquesQuiz as Quiz,
  handToolsQuiz as Quiz,
  hardwareStoreQuiz as Quiz,
  helicopterTypesQuiz as Quiz,
  herbIdentification as Quiz,
  historicalDates as Quiz,
  historicalFigures as Quiz,
  homeRepairMaterialsQuiz as Quiz,
  horseBreedsQuiz as Quiz,
  hotSauceVarietiesQuiz as Quiz,
  houseplantIdentification as Quiz,
  humanBodySystemsQuiz as Quiz,
  indigenousCulturesQuiz as Quiz,
  industrialRevolutionQuiz as Quiz,
  insectIdentification as Quiz,
  instrumentSoundsQuiz as Quiz,
  islandGeographyQuiz as Quiz,
  jazzGreatsRecall as Quiz,
  kitchenAppliancesQuiz as Quiz,
  kitchenUtensilsQuiz as Quiz,
  landmarkLocations as Quiz,
  languageOriginsQuiz as Quiz,
  laundryRoomQuiz as Quiz,
  leafShapesQuiz as Quiz,
  lizardIdentification as Quiz,
  locomotiveHistoryQuiz as Quiz,
  logicDeduction as Quiz,
  mapSymbolsQuiz as Quiz,
  marineBiologyQuiz as Quiz,
  measurementConversions as Quiz,
  medicalBreakthroughsQuiz as Quiz,
  medicinalPlantsQuiz as Quiz,
  medievalMonarchsQuiz as Quiz,
  militaryVehiclesQuiz as Quiz,
  modernHistoryLeadersQuiz as Quiz,
  monkeySpeciesQuiz as Quiz,
  mossLichenQuiz as Quiz,
  motorcycleBrandsQuiz as Quiz,
  mountainPeaksRecall as Quiz,
  movieQuotesRecall as Quiz,
  movieSoundtracksQuiz as Quiz,
  movieYearQuiz as Quiz,
  mushroomIdentification as Quiz,
  musicDecadesQuiz as Quiz,
  musicNotesQuiz as Quiz,
  nationalCostumesQuiz as Quiz,
  nationalMonumentsRecall as Quiz,
  nobelPrizeScienceQuiz as Quiz,
  numberFactsQuiz as Quiz,
  numberPatterns as Quiz,
  nutIdentification as Quiz,
  oceanCreaturesQuiz as Quiz,
  oddOneOut as Quiz,
  officeSuppliesQuiz as Quiz,
  olympicHostCities as Quiz,
  olympicSportsQuiz as Quiz,
  orchestraInstrumentsQuiz as Quiz,
  orchidIdentification as Quiz,
  organFunctionsQuiz as Quiz,
  ornamentalGrassesQuiz as Quiz,
  paintingSuppliesQuiz as Quiz,
  pastaShapesQuiz as Quiz,
  periodicElementQuiz as Quiz,
  periodicTableRecall as Quiz,
  phobiaNames as Quiz,
  physicsLawsQuiz as Quiz,
  pictureQuiz as Quiz,
  pieTypesQuiz as Quiz,
  pigBreedsQuiz as Quiz,
  planetFactsQuiz as Quiz,
  plumbingPartsQuiz as Quiz,
  poisonousPlantsQuiz as Quiz,
  popMusicHitsQuiz as Quiz,
  powerToolsQuiz as Quiz,
  prairieWildflowersQuiz as Quiz,
  presidentialOrder as Quiz,
  primateIdentification as Quiz,
  quickThinking as Quiz,
  rabbitBreedsQuiz as Quiz,
  racingCarsQuiz as Quiz,
  rapidRecall as Quiz,
  rememberTheYear as Quiz,
  renaissanceFiguresQuiz as Quiz,
  reptileIdentification as Quiz,
  reverseTrivia as Quiz,
  revolutionaryLeadersQuiz as Quiz,
  riceDishesQuiz as Quiz,
  rockLegendsRecall as Quiz,
  rockTypesQuiz as Quiz,
  rodentIdentification as Quiz,
  romanEmperorsQuiz as Quiz,
  romanNumerals as Quiz,
  rootVegetablesQuiz as Quiz,
  roseVarietiesQuiz as Quiz,
  sailingVesselsQuiz as Quiz,
  saladTypesQuiz as Quiz,
  salamanderIdentification as Quiz,
  sandwichVarietiesQuiz as Quiz,
  scienceAcronymsQuiz as Quiz,
  scienceFactsRecall as Quiz,
  scienceSymbolsQuiz as Quiz,
  scientificInstrumentsQuiz as Quiz,
  scientificUnitsQuiz as Quiz,
  seafoodIdentification as Quiz,
  seedIdentificationQuiz as Quiz,
  sequenceOrder as Quiz,
  sewingNotionsQuiz as Quiz,
  sheepBreedsQuiz as Quiz,
  shipTypesQuiz as Quiz,
  shrubIdentification as Quiz,
  snakeSpeciesQuiz as Quiz,
  solarSystemQuiz as Quiz,
  spaceMissionsRecall as Quiz,
  spaceRaceEventsQuiz as Quiz,
  speedMathQuiz as Quiz,
  spiceIdentification as Quiz,
  sportsBallsQuiz as Quiz,
  sportsEquipmentQuiz as Quiz,
  sportsRecordsQuiz as Quiz,
  sportsRulesQuiz as Quiz,
  sportsVenuesQuiz as Quiz,
  stateCapitalsRecall as Quiz,
  stateFlagsQuiz as Quiz,
  stringInstrumentsRecall as Quiz,
  subwaySystemsQuiz as Quiz,
  succulentIdentification as Quiz,
  sushiTypesQuiz as Quiz,
  teaVarietiesQuiz as Quiz,
  techInventionsRecall as Quiz,
  technologyPioneersQuiz as Quiz,
  telescopeDiscoveriesQuiz as Quiz,
  traditionalDancesRecall as Quiz,
  traditionalInstrumentsQuiz as Quiz,
  trainTypesQuiz as Quiz,
  treeIdentification as Quiz,
  triviaRecall as Quiz,
  tropicalFruitsQuiz as Quiz,
  tropicalPlantsQuiz as Quiz,
  turtleTortoiseQuiz as Quiz,
  tvThemeSongsQuiz as Quiz,
  twoTruthsOneLie as Quiz,
  unitConversions as Quiz,
  vegetableGardenQuiz as Quiz,
  vintageAircraftQuiz as Quiz,
  visualClues as Quiz,
  visualMemoryQuiz as Quiz,
  vitaminMineralsQuiz as Quiz,
  volcanicLandmarksQuiz as Quiz,
  weatherSymbolsQuiz as Quiz,
  whaleDolphinQuiz as Quiz,
  whatComesNext as Quiz,
  wildCatsIdentification as Quiz,
  wildflowerQuiz as Quiz,
  wineRegionsQuiz as Quiz,
  wolfSpeciesQuiz as Quiz,
  womensHistoryQuiz as Quiz,
  woodwindInstrumentsQuiz as Quiz,
  woodworkingToolsQuiz as Quiz,
  wordConnections as Quiz,
  wordDefinitionsQuiz as Quiz,
  workshopToolsQuiz as Quiz,
  worldBreadsQuiz as Quiz,
  worldBridgesQuiz as Quiz,
  worldCalendarSystemsQuiz as Quiz,
  worldCapitalsExtreme as Quiz,
  worldCathedralsQuiz as Quiz,
  worldCheesesRecall as Quiz,
  worldClockTowersQuiz as Quiz,
  worldComingOfAgeQuiz as Quiz,
  worldCurrenciesRecall as Quiz,
  worldDessertsQuiz as Quiz,
  worldFestivalsQuiz as Quiz,
  worldFlagsRecall as Quiz,
  worldFolkTalesQuiz as Quiz,
  worldFuneralTraditionsQuiz as Quiz,
  worldGreetingCustomsQuiz as Quiz,
  worldHarvestFestivalsQuiz as Quiz,
  worldHospitalityCustomsQuiz as Quiz,
  worldLeadersQuiz as Quiz,
  worldMartialArtsQuiz as Quiz,
  worldMaskTraditionsQuiz as Quiz,
  worldMusicTraditionsQuiz as Quiz,
  worldNewYearTraditionsQuiz as Quiz,
  worldOperaHousesQuiz as Quiz,
  worldRecords as Quiz,
  worldReligiousFestivalsQuiz as Quiz,
  worldSoupsQuiz as Quiz,
  worldStadiumsQuiz as Quiz,
  worldStorytellingTraditionsQuiz as Quiz,
  worldStreetFoodQuiz as Quiz,
  worldTeaCeremoniesQuiz as Quiz,
  worldTeasAndInfusionsQuiz as Quiz,
  worldTextileTraditionsQuiz as Quiz,
  worldTraditionalMedicineQuiz as Quiz,
  worldWaterfallsQuiz as Quiz,
  worldWeddingTraditionsQuiz as Quiz,
  wwiEventsQuiz as Quiz,
  wwiiEventsQuiz as Quiz,
  zodiacTrivia as Quiz,
];

export default quizzes;

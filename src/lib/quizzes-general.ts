// @ts-nocheck
import type { Quiz } from "./types";

import accidentalInventions from "@/data/general-knowledge/accidental-inventions.json";
import africanCapitals from "@/data/general-knowledge/african-capitals.json";
import africanGreatLakes from "@/data/general-knowledge/african-great-lakes.json";
import africanMythologyQuiz from "@/data/general-knowledge/african-mythology-quiz.json";
import africanRivers from "@/data/general-knowledge/african-rivers.json";
import africanWildlifeQuiz from "@/data/general-knowledge/african-wildlife-quiz.json";
import africanWildlife from "@/data/general-knowledge/african-wildlife.json";
import ageOfExplorationQuiz from "@/data/general-knowledge/age-of-exploration-quiz.json";
import airportDesignQuiz from "@/data/general-knowledge/airport-design-quiz.json";
import americanHistory from "@/data/general-knowledge/american-history.json";
import ancientAfricanKingdomsQuiz from "@/data/general-knowledge/ancient-african-kingdoms-quiz.json";
import ancientCelticWorldQuiz from "@/data/general-knowledge/ancient-celtic-world-quiz.json";
import ancientChinaQuiz from "@/data/general-knowledge/ancient-china-quiz.json";
import ancientCivilizations from "@/data/general-knowledge/ancient-civilizations.json";
import ancientEgyptQuiz from "@/data/general-knowledge/ancient-egypt-quiz.json";
import ancientEgyptianGods from "@/data/general-knowledge/ancient-egyptian-gods.json";
import ancientEmpires from "@/data/general-knowledge/ancient-empires.json";
import ancientGreeceQuiz from "@/data/general-knowledge/ancient-greece-quiz.json";
import ancientGreekDrama from "@/data/general-knowledge/ancient-greek-drama.json";
import ancientGreekPhilosophyQuiz from "@/data/general-knowledge/ancient-greek-philosophy-quiz.json";
import ancientIndiaQuiz from "@/data/general-knowledge/ancient-india-quiz.json";
import ancientMedicineQuiz from "@/data/general-knowledge/ancient-medicine-quiz.json";
import ancientMesopotamiaQuiz from "@/data/general-knowledge/ancient-mesopotamia-quiz.json";
import ancientModernWonders from "@/data/general-knowledge/ancient-modern-wonders.json";
import ancientPhoeniciaQuiz from "@/data/general-knowledge/ancient-phoenicia-quiz.json";
import ancientRomeRepublicQuiz from "@/data/general-knowledge/ancient-rome-republic-quiz.json";
import animalAdaptationsQuiz from "@/data/general-knowledge/animal-adaptations-quiz.json";
import animalKingdomFacts from "@/data/general-knowledge/animal-kingdom-facts.json";
import animalRecordsQuiz from "@/data/general-knowledge/animal-records-quiz.json";
import aqueductHistoryQuiz from "@/data/general-knowledge/aqueduct-history-quiz.json";
import architecturalStylesQuiz from "@/data/general-knowledge/architectural-styles-quiz.json";
import arcticAnimalsQuiz from "@/data/general-knowledge/arctic-animals-quiz.json";
import arcticAnimals from "@/data/general-knowledge/arctic-animals.json";
import arcticAntarcticGeography from "@/data/general-knowledge/arctic-antarctic-geography.json";
import artTechniquesQuiz from "@/data/general-knowledge/art-techniques-quiz.json";
import asianCapitals from "@/data/general-knowledge/asian-capitals.json";
import asianMountainRanges from "@/data/general-knowledge/asian-mountain-ranges.json";
import astronomyFacts from "@/data/general-knowledge/astronomy-facts.json";
import australianGeography from "@/data/general-knowledge/australian-geography.json";
import australianWildlifeQuiz from "@/data/general-knowledge/australian-wildlife-quiz.json";
import australianWildlife from "@/data/general-knowledge/australian-wildlife.json";
import aviationMilestonesQuiz from "@/data/general-knowledge/aviation-milestones-quiz.json";
import aztecCivilizationQuiz from "@/data/general-knowledge/aztec-civilization-quiz.json";
import bakingScienceQuiz from "@/data/general-knowledge/baking-science-quiz.json";
import balletDanceQuiz from "@/data/general-knowledge/ballet-dance-quiz.json";
import baseballLegendsQuiz from "@/data/general-knowledge/baseball-legends-quiz.json";
import basketballHistoryQuiz from "@/data/general-knowledge/basketball-history-quiz.json";
import bearsOfTheWorldQuiz from "@/data/general-knowledge/bears-of-the-world-quiz.json";
import bibleKnowledge from "@/data/general-knowledge/bible-knowledge.json";
import bigCatsQuiz from "@/data/general-knowledge/big-cats-quiz.json";
import birdsBirdwatching from "@/data/general-knowledge/birds-birdwatching.json";
import boxingLegendsQuiz from "@/data/general-knowledge/boxing-legends-quiz.json";
import bridgesEngineeringQuiz from "@/data/general-knowledge/bridges-engineering-quiz.json";
import buddhismBasicsQuiz from "@/data/general-knowledge/buddhism-basics-quiz.json";
import butterfliesMothsQuiz from "@/data/general-knowledge/butterflies-moths-quiz.json";
import byzantineEmpireQuiz from "@/data/general-knowledge/byzantine-empire-quiz.json";
import canalEngineeringQuiz from "@/data/general-knowledge/canal-engineering-quiz.json";
import caribbeanIslandsQuiz from "@/data/general-knowledge/caribbean-islands-quiz.json";
import celticMythologyQuiz from "@/data/general-knowledge/celtic-mythology-quiz.json";
import centralAmericanGeography from "@/data/general-knowledge/central-american-geography.json";
import chemistryElementsQuiz from "@/data/general-knowledge/chemistry-elements-quiz.json";
import chineseMythologyQuiz from "@/data/general-knowledge/chinese-mythology-quiz.json";
import chocolateHistoryQuiz from "@/data/general-knowledge/chocolate-history-quiz.json";
import civilRightsHistoryQuiz from "@/data/general-knowledge/civil-rights-history-quiz.json";
import classicalMusic from "@/data/general-knowledge/classical-music.json";
import climateScienceQuiz from "@/data/general-knowledge/climate-science-quiz.json";
import climateZones from "@/data/general-knowledge/climate-zones.json";
import coldWarPoliticsQuiz from "@/data/general-knowledge/cold-war-politics-quiz.json";
import colonialismDecolonizationQuiz from "@/data/general-knowledge/colonialism-decolonization-quiz.json";
import combatSportsQuiz from "@/data/general-knowledge/combat-sports-quiz.json";
import computerHistoryQuiz from "@/data/general-knowledge/computer-history-quiz.json";
import concreteMasonryQuiz from "@/data/general-knowledge/concrete-masonry-quiz.json";
import constitutionalAmendmentsQuiz from "@/data/general-knowledge/constitutional-amendments-quiz.json";
import cricketWorldQuiz from "@/data/general-knowledge/cricket-world-quiz.json";
import cyclingTourQuiz from "@/data/general-knowledge/cycling-tour-quiz.json";
import dairyProductsQuiz from "@/data/general-knowledge/dairy-products-quiz.json";
import deepSeaExplorationQuiz from "@/data/general-knowledge/deep-sea-exploration-quiz.json";
import democraticInstitutionsQuiz from "@/data/general-knowledge/democratic-institutions-quiz.json";
import desertLandscapes from "@/data/general-knowledge/desert-landscapes.json";
import digestiveSystemQuiz from "@/data/general-knowledge/digestive-system-quiz.json";
import diplomacyForeignPolicyQuiz from "@/data/general-knowledge/diplomacy-foreign-policy-quiz.json";
import dnaGeneticsQuiz from "@/data/general-knowledge/dna-genetics-quiz.json";
import domesticCatsQuiz from "@/data/general-knowledge/domestic-cats-quiz.json";
import domesticDogsQuiz from "@/data/general-knowledge/domestic-dogs-quiz.json";
import earthScience from "@/data/general-knowledge/earth-science.json";
import easternPhilosophyQuiz from "@/data/general-knowledge/eastern-philosophy-quiz.json";
import economicTheoriesQuiz from "@/data/general-knowledge/economic-theories-quiz.json";
import electoralSystemsQuiz from "@/data/general-knowledge/electoral-systems-quiz.json";
import electricityMagnetismQuiz from "@/data/general-knowledge/electricity-magnetism-quiz.json";
import elephantsGentleGiantsQuiz from "@/data/general-knowledge/elephants-gentle-giants-quiz.json";
import elevatorEscalatorQuiz from "@/data/general-knowledge/elevator-escalator-quiz.json";
import endangeredSpeciesQuiz from "@/data/general-knowledge/endangered-species-quiz.json";
import endangeredSpecies from "@/data/general-knowledge/endangered-species.json";
import enlightenmentThinkersQuiz from "@/data/general-knowledge/enlightenment-thinkers-quiz.json";
import equestrianSportsQuiz from "@/data/general-knowledge/equestrian-sports-quiz.json";
import espionageIntelligenceQuiz from "@/data/general-knowledge/espionage-intelligence-quiz.json";
import ethicsMoralPhilosophyQuiz from "@/data/general-knowledge/ethics-moral-philosophy-quiz.json";
import europeanCapitalsQuiz from "@/data/general-knowledge/european-capitals-quiz.json";
import europeanMountainRanges from "@/data/general-knowledge/european-mountain-ranges.json";
import europeanRivers from "@/data/general-knowledge/european-rivers.json";
import everydayScience from "@/data/general-knowledge/everyday-science.json";
import existentialismQuiz from "@/data/general-knowledge/existentialism-quiz.json";
import extremeSportsQuiz from "@/data/general-knowledge/extreme-sports-quiz.json";
import famousArchaeologicalFinds from "@/data/general-knowledge/famous-archaeological-finds.json";
import famousArchitects from "@/data/general-knowledge/famous-architects.json";
import famousArtMuseums from "@/data/general-knowledge/famous-art-museums.json";
import famousArtists from "@/data/general-knowledge/famous-artists.json";
import famousBalletsQuiz from "@/data/general-knowledge/famous-ballets-quiz.json";
import famousBattles from "@/data/general-knowledge/famous-battles.json";
import famousBridges from "@/data/general-knowledge/famous-bridges.json";
import famousBuildings from "@/data/general-knowledge/famous-buildings.json";
import famousCastles from "@/data/general-knowledge/famous-castles.json";
import famousCodesCiphers from "@/data/general-knowledge/famous-codes-ciphers.json";
import famousComposers from "@/data/general-knowledge/famous-composers.json";
import famousDamsQuiz from "@/data/general-knowledge/famous-dams-quiz.json";
import famousDoctorsQuiz from "@/data/general-knowledge/famous-doctors-quiz.json";
import famousDuels from "@/data/general-knowledge/famous-duels.json";
import famousDuos from "@/data/general-knowledge/famous-duos.json";
import famousEconomists from "@/data/general-knowledge/famous-economists.json";
import famousEngineersQuiz from "@/data/general-knowledge/famous-engineers-quiz.json";
import famousEscapes from "@/data/general-knowledge/famous-escapes.json";
import famousExpeditions from "@/data/general-knowledge/famous-expeditions.json";
import famousExplorers from "@/data/general-knowledge/famous-explorers.json";
import famousFeuds from "@/data/general-knowledge/famous-feuds.json";
import famousFirstFlights from "@/data/general-knowledge/famous-first-flights.json";
import famousFoodOrigins from "@/data/general-knowledge/famous-food-origins.json";
import famousForgeries from "@/data/general-knowledge/famous-forgeries.json";
import famousGardens from "@/data/general-knowledge/famous-gardens.json";
import famousGhostStories from "@/data/general-knowledge/famous-ghost-stories.json";
import famousHistoricalEvents from "@/data/general-knowledge/famous-historical-events.json";
import famousHoaxes from "@/data/general-knowledge/famous-hoaxes.json";
import famousInventionsHistory from "@/data/general-knowledge/famous-inventions-history.json";
import famousInventions from "@/data/general-knowledge/famous-inventions.json";
import famousLaboratoriesQuiz from "@/data/general-knowledge/famous-laboratories-quiz.json";
import famousLandmarks from "@/data/general-knowledge/famous-landmarks.json";
import famousLastWords from "@/data/general-knowledge/famous-last-words.json";
import famousLibrariesMuseums from "@/data/general-knowledge/famous-libraries-museums.json";
import famousLiterature from "@/data/general-knowledge/famous-literature.json";
import famousMaps from "@/data/general-knowledge/famous-maps.json";
import famousMathematicians from "@/data/general-knowledge/famous-mathematicians.json";
import famousMedicalDiscoveries from "@/data/general-knowledge/famous-medical-discoveries.json";
import famousMonuments from "@/data/general-knowledge/famous-monuments.json";
import famousMuseumCollections from "@/data/general-knowledge/famous-museum-collections.json";
import famousNovelsQuiz from "@/data/general-knowledge/famous-novels-quiz.json";
import famousOperasQuiz from "@/data/general-knowledge/famous-operas-quiz.json";
import famousPhilosophers from "@/data/general-knowledge/famous-philosophers.json";
import famousPhotographers from "@/data/general-knowledge/famous-photographers.json";
import famousPlaywrights from "@/data/general-knowledge/famous-playwrights.json";
import famousPoetryForms from "@/data/general-knowledge/famous-poetry-forms.json";
import famousPoets from "@/data/general-knowledge/famous-poets.json";
import famousPoliticalLeadersQuiz from "@/data/general-knowledge/famous-political-leaders-quiz.json";
import famousPredictions from "@/data/general-knowledge/famous-predictions.json";
import famousQuotes from "@/data/general-knowledge/famous-quotes.json";
import famousRivers from "@/data/general-knowledge/famous-rivers.json";
import famousRobberies from "@/data/general-knowledge/famous-robberies.json";
import famousScientists from "@/data/general-knowledge/famous-scientists.json";
import famousShips from "@/data/general-knowledge/famous-ships.json";
import famousShortStories from "@/data/general-knowledge/famous-short-stories.json";
import famousSiblings from "@/data/general-knowledge/famous-siblings.json";
import famousSpeeches from "@/data/general-knowledge/famous-speeches.json";
import famousSymphonies from "@/data/general-knowledge/famous-symphonies.json";
import famousTelescopesQuiz from "@/data/general-knowledge/famous-telescopes-quiz.json";
import famousTreaties from "@/data/general-knowledge/famous-treaties.json";
import famousTrials from "@/data/general-knowledge/famous-trials.json";
import famousTwins from "@/data/general-knowledge/famous-twins.json";
import famousUnfinishedWorks from "@/data/general-knowledge/famous-unfinished-works.json";
import famousVolcanoesQuiz from "@/data/general-knowledge/famous-volcanoes-quiz.json";
import famousWallsBarriers from "@/data/general-knowledge/famous-walls-barriers.json";
import famousWomenHistory from "@/data/general-knowledge/famous-women-history.json";
import fermentedFoodsQuiz from "@/data/general-knowledge/fermented-foods-quiz.json";
import feudalJapanQuiz from "@/data/general-knowledge/feudal-japan-quiz.json";
import filmHistoryClassics from "@/data/general-knowledge/film-history-classics.json";
import flowersGardening from "@/data/general-knowledge/flowers-gardening.json";
import folkMusicTraditions from "@/data/general-knowledge/folk-music-traditions.json";
import foodAllergiesQuiz from "@/data/general-knowledge/food-allergies-quiz.json";
import foodCooking from "@/data/general-knowledge/food-cooking.json";
import foodPreservationMethodsQuiz from "@/data/general-knowledge/food-preservation-methods-quiz.json";
import formulaOneRacingQuiz from "@/data/general-knowledge/formula-one-racing-quiz.json";
import freshwaterFishQuiz from "@/data/general-knowledge/freshwater-fish-quiz.json";
import freshwaterFish from "@/data/general-knowledge/freshwater-fish.json";
import geographyChallenge from "@/data/general-knowledge/geography-challenge.json";
import geologyRocksMineralsQuiz from "@/data/general-knowledge/geology-rocks-minerals-quiz.json";
import globalTradeEconomicsQuiz from "@/data/general-knowledge/global-trade-economics-quiz.json";
import golfHistoryQuiz from "@/data/general-knowledge/golf-history-quiz.json";
import grainsCerealsQuiz from "@/data/general-knowledge/grains-cereals-quiz.json";
import greekMythologyGods from "@/data/general-knowledge/greek-mythology-gods.json";
import gymnasticsHistoryQuiz from "@/data/general-knowledge/gymnastics-history-quiz.json";
import heartHealthQuiz from "@/data/general-knowledge/heart-health-quiz.json";
import herbalRemediesQuiz from "@/data/general-knowledge/herbal-remedies-quiz.json";
import highwaySystemQuiz from "@/data/general-knowledge/highway-system-quiz.json";
import hinduismDeitiesQuiz from "@/data/general-knowledge/hinduism-deities-quiz.json";
import historyOfMedicineQuiz from "@/data/general-knowledge/history-of-medicine-quiz.json";
import holyRomanEmpireQuiz from "@/data/general-knowledge/holy-roman-empire-quiz.json";
import humanAnatomy from "@/data/general-knowledge/human-anatomy.json";
import humanBodyHealth from "@/data/general-knowledge/human-body-health.json";
import humanRightsMilestonesQuiz from "@/data/general-knowledge/human-rights-milestones-quiz.json";
import iceHockeyQuiz from "@/data/general-knowledge/ice-hockey-quiz.json";
import impressionistPainters from "@/data/general-knowledge/impressionist-painters.json";
import incaEmpireQuiz from "@/data/general-knowledge/inca-empire-quiz.json";
import infectiousDiseasesQuiz from "@/data/general-knowledge/infectious-diseases-quiz.json";
import insectsAndBugs from "@/data/general-knowledge/insects-and-bugs.json";
import insectsBugsQuiz from "@/data/general-knowledge/insects-bugs-quiz.json";
import internationalLawQuiz from "@/data/general-knowledge/international-law-quiz.json";
import internationalOrganizationsQuiz from "@/data/general-knowledge/international-organizations-quiz.json";
import inventionsByDecade from "@/data/general-knowledge/inventions-by-decade.json";
import islandNations from "@/data/general-knowledge/island-nations.json";
import japaneseMythologyQuiz from "@/data/general-knowledge/japanese-mythology-quiz.json";
import jazzMusicLegends from "@/data/general-knowledge/jazz-music-legends.json";
import laborMovementHistoryQuiz from "@/data/general-knowledge/labor-movement-history-quiz.json";
import landlockedCountries from "@/data/general-knowledge/landlocked-countries.json";
import landmarkLegislationQuiz from "@/data/general-knowledge/landmark-legislation-quiz.json";
import lawEnforcementHistoryQuiz from "@/data/general-knowledge/law-enforcement-history-quiz.json";
import lighthouseEngineeringQuiz from "@/data/general-knowledge/lighthouse-engineering-quiz.json";
import literaryCharactersQuiz from "@/data/general-knowledge/literary-characters-quiz.json";
import marathonHistoryQuiz from "@/data/general-knowledge/marathon-history-quiz.json";
import marsExplorationQuiz from "@/data/general-knowledge/mars-exploration-quiz.json";
import mathNumbers from "@/data/general-knowledge/math-numbers.json";
import mayanCivilizationQuiz from "@/data/general-knowledge/mayan-civilization-quiz.json";
import medicalInstrumentsQuiz from "@/data/general-knowledge/medical-instruments-quiz.json";
import medicalPioneersQuiz from "@/data/general-knowledge/medical-pioneers-quiz.json";
import medievalEuropeQuiz from "@/data/general-knowledge/medieval-europe-quiz.json";
import medievalPhilosophyQuiz from "@/data/general-knowledge/medieval-philosophy-quiz.json";
import mediterraneanGeography from "@/data/general-knowledge/mediterranean-geography.json";
import mentalHealthFactsQuiz from "@/data/general-knowledge/mental-health-facts-quiz.json";
import mesopotamianMythologyQuiz from "@/data/general-knowledge/mesopotamian-mythology-quiz.json";
import microscopeDiscoveriesQuiz from "@/data/general-knowledge/microscope-discoveries-quiz.json";
import middleEastGeography from "@/data/general-knowledge/middle-east-geography.json";
import migratoryBirdsQuiz from "@/data/general-knowledge/migratory-birds-quiz.json";
import miningEngineeringQuiz from "@/data/general-knowledge/mining-engineering-quiz.json";
import modernArtMovements from "@/data/general-knowledge/modern-art-movements.json";
import mongolEmpireQuiz from "@/data/general-knowledge/mongol-empire-quiz.json";
import mountainRanges from "@/data/general-knowledge/mountain-ranges.json";
import mughalEmpireQuiz from "@/data/general-knowledge/mughal-empire-quiz.json";
import musicalInstruments from "@/data/general-knowledge/musical-instruments.json";
import mythologyLegends from "@/data/general-knowledge/mythology-legends.json";
import nationalSymbols from "@/data/general-knowledge/national-symbols.json";
import nativeAmericanSpiritualityQuiz from "@/data/general-knowledge/native-american-spirituality-quiz.json";
import natureAnimals from "@/data/general-knowledge/nature-animals.json";
import nobelPrizeWinners from "@/data/general-knowledge/nobel-prize-winners.json";
import norseMythologyQuiz from "@/data/general-knowledge/norse-mythology-quiz.json";
import northAmericanGeography from "@/data/general-knowledge/north-american-geography.json";
import nuclearPowerPlantsQuiz from "@/data/general-knowledge/nuclear-power-plants-quiz.json";
import nuclearScienceQuiz from "@/data/general-knowledge/nuclear-science-quiz.json";
import nutritionHealth from "@/data/general-knowledge/nutrition-health.json";
import oceanDepths from "@/data/general-knowledge/ocean-depths.json";
import oceanEcosystemsQuiz from "@/data/general-knowledge/ocean-ecosystems-quiz.json";
import oceanMammals from "@/data/general-knowledge/ocean-mammals.json";
import oceanScienceQuiz from "@/data/general-knowledge/ocean-science-quiz.json";
import olympicHostCitiesQuiz from "@/data/general-knowledge/olympic-host-cities-quiz.json";
import olympicSports from "@/data/general-knowledge/olympic-sports.json";
import olympicSummerGamesQuiz from "@/data/general-knowledge/olympic-summer-games-quiz.json";
import olympicWinterGamesQuiz from "@/data/general-knowledge/olympic-winter-games-quiz.json";
import operaBasicsQuiz from "@/data/general-knowledge/opera-basics-quiz.json";
import organicFarmingQuiz from "@/data/general-knowledge/organic-farming-quiz.json";
import ottomanEmpireQuiz from "@/data/general-knowledge/ottoman-empire-quiz.json";
import pacificIslandNations from "@/data/general-knowledge/pacific-island-nations.json";
import parliamentaryTraditionsQuiz from "@/data/general-knowledge/parliamentary-traditions-quiz.json";
import penguinsPolarLifeQuiz from "@/data/general-knowledge/penguins-polar-life-quiz.json";
import periodicTable from "@/data/general-knowledge/periodic-table.json";
import persianEmpireQuiz from "@/data/general-knowledge/persian-empire-quiz.json";
import philosophicalConceptsQuiz from "@/data/general-knowledge/philosophical-concepts-quiz.json";
import photographyHistory from "@/data/general-knowledge/photography-history.json";
import photographyScienceQuiz from "@/data/general-knowledge/photography-science-quiz.json";
import pipelineEngineeringQuiz from "@/data/general-knowledge/pipeline-engineering-quiz.json";
import plantKingdomFacts from "@/data/general-knowledge/plant-kingdom-facts.json";
import politicalIdeologiesQuiz from "@/data/general-knowledge/political-ideologies-quiz.json";
import politicalSystemsQuiz from "@/data/general-knowledge/political-systems-quiz.json";
import polynesianMythologyQuiz from "@/data/general-knowledge/polynesian-mythology-quiz.json";
import portHarborEngineeringQuiz from "@/data/general-knowledge/port-harbor-engineering-quiz.json";
import powerGridQuiz from "@/data/general-knowledge/power-grid-quiz.json";
import preciousGems from "@/data/general-knowledge/precious-gems.json";
import primatesQuiz from "@/data/general-knowledge/primates-quiz.json";
import quantumPhysicsBasics from "@/data/general-knowledge/quantum-physics-basics.json";
import radioTelevisionHistoryQuiz from "@/data/general-knowledge/radio-television-history-quiz.json";
import railroadHistoryQuiz from "@/data/general-knowledge/railroad-history-quiz.json";
import railwayStationsQuiz from "@/data/general-knowledge/railway-stations-quiz.json";
import rainforestCreaturesQuiz from "@/data/general-knowledge/rainforest-creatures-quiz.json";
import rainforestCreatures from "@/data/general-knowledge/rainforest-creatures.json";
import religiousSymbolsQuiz from "@/data/general-knowledge/religious-symbols-quiz.json";
import renaissanceArtQuiz from "@/data/general-knowledge/renaissance-art-quiz.json";
import renaissanceEraQuiz from "@/data/general-knowledge/renaissance-era-quiz.json";
import renewableEnergyQuiz from "@/data/general-knowledge/renewable-energy-quiz.json";
import reptilesAmphibiansQuiz from "@/data/general-knowledge/reptiles-amphibians-quiz.json";
import revolutionHistoryQuiz from "@/data/general-knowledge/revolution-history-quiz.json";
import roadConstructionQuiz from "@/data/general-knowledge/road-construction-quiz.json";
import roboticsAiQuiz from "@/data/general-knowledge/robotics-ai-quiz.json";
import romanEmpireQuiz from "@/data/general-knowledge/roman-empire-quiz.json";
import romanMythologyQuiz from "@/data/general-knowledge/roman-mythology-quiz.json";
import rugbyWorldQuiz from "@/data/general-knowledge/rugby-world-quiz.json";
import safariSavannaQuiz from "@/data/general-knowledge/safari-savanna-quiz.json";
import satelliteTechnologyQuiz from "@/data/general-knowledge/satellite-technology-quiz.json";
import scandinavianCountries from "@/data/general-knowledge/scandinavian-countries.json";
import scienceInventions from "@/data/general-knowledge/science-inventions.json";
import sculptureMasterpieces from "@/data/general-knowledge/sculpture-masterpieces.json";
import seafoodKnowledgeQuiz from "@/data/general-knowledge/seafood-knowledge-quiz.json";
import sharksRaysQuiz from "@/data/general-knowledge/sharks-rays-quiz.json";
import shipbuildingHistoryQuiz from "@/data/general-knowledge/shipbuilding-history-quiz.json";
import skyscraperHistoryQuiz from "@/data/general-knowledge/skyscraper-history-quiz.json";
import sleepScienceQuiz from "@/data/general-knowledge/sleep-science-quiz.json";
import soccerLegendsQuiz from "@/data/general-knowledge/soccer-legends-quiz.json";
import socialMovementsQuiz from "@/data/general-knowledge/social-movements-quiz.json";
import solarSystemFacts from "@/data/general-knowledge/solar-system-facts.json";
import southAmericanCountries from "@/data/general-knowledge/south-american-countries.json";
import southAmericanRivers from "@/data/general-knowledge/south-american-rivers.json";
import southeastAsianGeography from "@/data/general-knowledge/southeast-asian-geography.json";
import spaceAstronomy from "@/data/general-knowledge/space-astronomy.json";
import spaceExplorationMissions from "@/data/general-knowledge/space-exploration-missions.json";
import spaceLaunchFacilitiesQuiz from "@/data/general-knowledge/space-launch-facilities-quiz.json";
import spaceStationsQuiz from "@/data/general-knowledge/space-stations-quiz.json";
import spanishEmpireQuiz from "@/data/general-knowledge/spanish-empire-quiz.json";
import spiceTradeHistoryQuiz from "@/data/general-knowledge/spice-trade-history-quiz.json";
import stadiumArchitectureQuiz from "@/data/general-knowledge/stadium-architecture-quiz.json";
import stoicismPhilosophyQuiz from "@/data/general-knowledge/stoicism-philosophy-quiz.json";
import structuralEngineeringQuiz from "@/data/general-knowledge/structural-engineering-quiz.json";
import subwaySystemsQuiz from "@/data/general-knowledge/subway-systems-quiz.json";
import superfoodsNutritionQuiz from "@/data/general-knowledge/superfoods-nutrition-quiz.json";
import supremeCourtCasesQuiz from "@/data/general-knowledge/supreme-court-cases-quiz.json";
import suspensionBridgesQuiz from "@/data/general-knowledge/suspension-bridges-quiz.json";
import swimmingDivingQuiz from "@/data/general-knowledge/swimming-diving-quiz.json";
import teaCultureQuiz from "@/data/general-knowledge/tea-culture-quiz.json";
import tennisLegendsQuiz from "@/data/general-knowledge/tennis-legends-quiz.json";
import theaterHistoryQuiz from "@/data/general-knowledge/theater-history-quiz.json";
import trackAndFieldQuiz from "@/data/general-knowledge/track-and-field-quiz.json";
import traditionalHealingQuiz from "@/data/general-knowledge/traditional-healing-quiz.json";
import travelGeographyUsa from "@/data/general-knowledge/travel-geography-usa.json";
import tropicalFruitsQuiz from "@/data/general-knowledge/tropical-fruits-quiz.json";
import tunnelEngineeringQuiz from "@/data/general-knowledge/tunnel-engineering-quiz.json";
import unitedNationsQuiz from "@/data/general-knowledge/united-nations-quiz.json";
import usPresidents from "@/data/general-knowledge/us-presidents.json";
import vaccineHistoryQuiz from "@/data/general-knowledge/vaccine-history-quiz.json";
import venomousAnimalsQuiz from "@/data/general-knowledge/venomous-animals-quiz.json";
import vikingAgeQuiz from "@/data/general-knowledge/viking-age-quiz.json";
import vitaminDeficienciesQuiz from "@/data/general-knowledge/vitamin-deficiencies-quiz.json";
import volcanicWonders from "@/data/general-knowledge/volcanic-wonders.json";
import volleyballBadmintonQuiz from "@/data/general-knowledge/volleyball-badminton-quiz.json";
import waterTreatmentQuiz from "@/data/general-knowledge/water-treatment-quiz.json";
import weatherNaturalPhenomena from "@/data/general-knowledge/weather-natural-phenomena.json";
import whalesDolphinsQuiz from "@/data/general-knowledge/whales-dolphins-quiz.json";
import winterSportsQuiz from "@/data/general-knowledge/winter-sports-quiz.json";
import wolvesCaninesQuiz from "@/data/general-knowledge/wolves-canines-quiz.json";
import womensSuffrageQuiz from "@/data/general-knowledge/womens-suffrage-quiz.json";
import worldArchipelagos from "@/data/general-knowledge/world-archipelagos.json";
import worldCanals from "@/data/general-knowledge/world-canals.json";
import worldCapitalsAdvanced from "@/data/general-knowledge/world-capitals-advanced.json";
import worldCapitals from "@/data/general-knowledge/world-capitals.json";
import worldCaves from "@/data/general-knowledge/world-caves.json";
import worldCoralReefs from "@/data/general-knowledge/world-coral-reefs.json";
import worldCreationMyths from "@/data/general-knowledge/world-creation-myths.json";
import worldCuisine from "@/data/general-knowledge/world-cuisine.json";
import worldCupSoccerQuiz from "@/data/general-knowledge/world-cup-soccer-quiz.json";
import worldCurrencies from "@/data/general-knowledge/world-currencies.json";
import worldDances from "@/data/general-knowledge/world-dances.json";
import worldDesertsQuiz from "@/data/general-knowledge/world-deserts-quiz.json";
import worldFestivals from "@/data/general-knowledge/world-festivals.json";
import worldFjords from "@/data/general-knowledge/world-fjords.json";
import worldFlags from "@/data/general-knowledge/world-flags.json";
import worldFolkTales from "@/data/general-knowledge/world-folk-tales.json";
import worldGeysersSprings from "@/data/general-knowledge/world-geysers-springs.json";
import worldGlaciers from "@/data/general-knowledge/world-glaciers.json";
import worldHeritageSites from "@/data/general-knowledge/world-heritage-sites.json";
import worldHistory from "@/data/general-knowledge/world-history.json";
import worldIslands from "@/data/general-knowledge/world-islands.json";
import worldLakes from "@/data/general-knowledge/world-lakes.json";
import worldLanguages from "@/data/general-knowledge/world-languages.json";
import worldLighthouses from "@/data/general-knowledge/world-lighthouses.json";
import worldMountains from "@/data/general-knowledge/world-mountains.json";
import worldMythologyQuiz from "@/data/general-knowledge/world-mythology-quiz.json";
import worldNationalParks from "@/data/general-knowledge/world-national-parks.json";
import worldOceansRivers from "@/data/general-knowledge/world-oceans-rivers.json";
import worldPeninsulas from "@/data/general-knowledge/world-peninsulas.json";
import worldPlateaus from "@/data/general-knowledge/world-plateaus.json";
import worldRainforests from "@/data/general-knowledge/world-rainforests.json";
import worldRecordHolders from "@/data/general-knowledge/world-record-holders.json";
import worldReligionsMythology from "@/data/general-knowledge/world-religions-mythology.json";
import worldReligions from "@/data/general-knowledge/world-religions.json";
import worldSacredTextsQuiz from "@/data/general-knowledge/world-sacred-texts-quiz.json";
import worldStraits from "@/data/general-knowledge/world-straits.json";
import worldTidalPhenomena from "@/data/general-knowledge/world-tidal-phenomena.json";
import worldTradeRoutes from "@/data/general-knowledge/world-trade-routes.json";
import worldWaterfalls from "@/data/general-knowledge/world-waterfalls.json";
import worldWetlands from "@/data/general-knowledge/world-wetlands.json";
import worldsLargestCities from "@/data/general-knowledge/worlds-largest-cities.json";
import worldsLongestRivers from "@/data/general-knowledge/worlds-longest-rivers.json";
import worldsSmallestCountries from "@/data/general-knowledge/worlds-smallest-countries.json";
import wrestlingHistoryQuiz from "@/data/general-knowledge/wrestling-history-quiz.json";
import zenBuddhismQuiz from "@/data/general-knowledge/zen-buddhism-quiz.json";

const quizzes: Quiz[] = [
  accidentalInventions as Quiz,
  africanCapitals as Quiz,
  africanGreatLakes as Quiz,
  africanMythologyQuiz as Quiz,
  africanRivers as Quiz,
  africanWildlifeQuiz as Quiz,
  africanWildlife as Quiz,
  ageOfExplorationQuiz as Quiz,
  airportDesignQuiz as Quiz,
  americanHistory as Quiz,
  ancientAfricanKingdomsQuiz as Quiz,
  ancientCelticWorldQuiz as Quiz,
  ancientChinaQuiz as Quiz,
  ancientCivilizations as Quiz,
  ancientEgyptQuiz as Quiz,
  ancientEgyptianGods as Quiz,
  ancientEmpires as Quiz,
  ancientGreeceQuiz as Quiz,
  ancientGreekDrama as Quiz,
  ancientGreekPhilosophyQuiz as Quiz,
  ancientIndiaQuiz as Quiz,
  ancientMedicineQuiz as Quiz,
  ancientMesopotamiaQuiz as Quiz,
  ancientModernWonders as Quiz,
  ancientPhoeniciaQuiz as Quiz,
  ancientRomeRepublicQuiz as Quiz,
  animalAdaptationsQuiz as Quiz,
  animalKingdomFacts as Quiz,
  animalRecordsQuiz as Quiz,
  aqueductHistoryQuiz as Quiz,
  architecturalStylesQuiz as Quiz,
  arcticAnimalsQuiz as Quiz,
  arcticAnimals as Quiz,
  arcticAntarcticGeography as Quiz,
  artTechniquesQuiz as Quiz,
  asianCapitals as Quiz,
  asianMountainRanges as Quiz,
  astronomyFacts as Quiz,
  australianGeography as Quiz,
  australianWildlifeQuiz as Quiz,
  australianWildlife as Quiz,
  aviationMilestonesQuiz as Quiz,
  aztecCivilizationQuiz as Quiz,
  bakingScienceQuiz as Quiz,
  balletDanceQuiz as Quiz,
  baseballLegendsQuiz as Quiz,
  basketballHistoryQuiz as Quiz,
  bearsOfTheWorldQuiz as Quiz,
  bibleKnowledge as Quiz,
  bigCatsQuiz as Quiz,
  birdsBirdwatching as Quiz,
  boxingLegendsQuiz as Quiz,
  bridgesEngineeringQuiz as Quiz,
  buddhismBasicsQuiz as Quiz,
  butterfliesMothsQuiz as Quiz,
  byzantineEmpireQuiz as Quiz,
  canalEngineeringQuiz as Quiz,
  caribbeanIslandsQuiz as Quiz,
  celticMythologyQuiz as Quiz,
  centralAmericanGeography as Quiz,
  chemistryElementsQuiz as Quiz,
  chineseMythologyQuiz as Quiz,
  chocolateHistoryQuiz as Quiz,
  civilRightsHistoryQuiz as Quiz,
  classicalMusic as Quiz,
  climateScienceQuiz as Quiz,
  climateZones as Quiz,
  coldWarPoliticsQuiz as Quiz,
  colonialismDecolonizationQuiz as Quiz,
  combatSportsQuiz as Quiz,
  computerHistoryQuiz as Quiz,
  concreteMasonryQuiz as Quiz,
  constitutionalAmendmentsQuiz as Quiz,
  cricketWorldQuiz as Quiz,
  cyclingTourQuiz as Quiz,
  dairyProductsQuiz as Quiz,
  deepSeaExplorationQuiz as Quiz,
  democraticInstitutionsQuiz as Quiz,
  desertLandscapes as Quiz,
  digestiveSystemQuiz as Quiz,
  diplomacyForeignPolicyQuiz as Quiz,
  dnaGeneticsQuiz as Quiz,
  domesticCatsQuiz as Quiz,
  domesticDogsQuiz as Quiz,
  earthScience as Quiz,
  easternPhilosophyQuiz as Quiz,
  economicTheoriesQuiz as Quiz,
  electoralSystemsQuiz as Quiz,
  electricityMagnetismQuiz as Quiz,
  elephantsGentleGiantsQuiz as Quiz,
  elevatorEscalatorQuiz as Quiz,
  endangeredSpeciesQuiz as Quiz,
  endangeredSpecies as Quiz,
  enlightenmentThinkersQuiz as Quiz,
  equestrianSportsQuiz as Quiz,
  espionageIntelligenceQuiz as Quiz,
  ethicsMoralPhilosophyQuiz as Quiz,
  europeanCapitalsQuiz as Quiz,
  europeanMountainRanges as Quiz,
  europeanRivers as Quiz,
  everydayScience as Quiz,
  existentialismQuiz as Quiz,
  extremeSportsQuiz as Quiz,
  famousArchaeologicalFinds as Quiz,
  famousArchitects as Quiz,
  famousArtMuseums as Quiz,
  famousArtists as Quiz,
  famousBalletsQuiz as Quiz,
  famousBattles as Quiz,
  famousBridges as Quiz,
  famousBuildings as Quiz,
  famousCastles as Quiz,
  famousCodesCiphers as Quiz,
  famousComposers as Quiz,
  famousDamsQuiz as Quiz,
  famousDoctorsQuiz as Quiz,
  famousDuels as Quiz,
  famousDuos as Quiz,
  famousEconomists as Quiz,
  famousEngineersQuiz as Quiz,
  famousEscapes as Quiz,
  famousExpeditions as Quiz,
  famousExplorers as Quiz,
  famousFeuds as Quiz,
  famousFirstFlights as Quiz,
  famousFoodOrigins as Quiz,
  famousForgeries as Quiz,
  famousGardens as Quiz,
  famousGhostStories as Quiz,
  famousHistoricalEvents as Quiz,
  famousHoaxes as Quiz,
  famousInventionsHistory as Quiz,
  famousInventions as Quiz,
  famousLaboratoriesQuiz as Quiz,
  famousLandmarks as Quiz,
  famousLastWords as Quiz,
  famousLibrariesMuseums as Quiz,
  famousLiterature as Quiz,
  famousMaps as Quiz,
  famousMathematicians as Quiz,
  famousMedicalDiscoveries as Quiz,
  famousMonuments as Quiz,
  famousMuseumCollections as Quiz,
  famousNovelsQuiz as Quiz,
  famousOperasQuiz as Quiz,
  famousPhilosophers as Quiz,
  famousPhotographers as Quiz,
  famousPlaywrights as Quiz,
  famousPoetryForms as Quiz,
  famousPoets as Quiz,
  famousPoliticalLeadersQuiz as Quiz,
  famousPredictions as Quiz,
  famousQuotes as Quiz,
  famousRivers as Quiz,
  famousRobberies as Quiz,
  famousScientists as Quiz,
  famousShips as Quiz,
  famousShortStories as Quiz,
  famousSiblings as Quiz,
  famousSpeeches as Quiz,
  famousSymphonies as Quiz,
  famousTelescopesQuiz as Quiz,
  famousTreaties as Quiz,
  famousTrials as Quiz,
  famousTwins as Quiz,
  famousUnfinishedWorks as Quiz,
  famousVolcanoesQuiz as Quiz,
  famousWallsBarriers as Quiz,
  famousWomenHistory as Quiz,
  fermentedFoodsQuiz as Quiz,
  feudalJapanQuiz as Quiz,
  filmHistoryClassics as Quiz,
  flowersGardening as Quiz,
  folkMusicTraditions as Quiz,
  foodAllergiesQuiz as Quiz,
  foodCooking as Quiz,
  foodPreservationMethodsQuiz as Quiz,
  formulaOneRacingQuiz as Quiz,
  freshwaterFishQuiz as Quiz,
  freshwaterFish as Quiz,
  geographyChallenge as Quiz,
  geologyRocksMineralsQuiz as Quiz,
  globalTradeEconomicsQuiz as Quiz,
  golfHistoryQuiz as Quiz,
  grainsCerealsQuiz as Quiz,
  greekMythologyGods as Quiz,
  gymnasticsHistoryQuiz as Quiz,
  heartHealthQuiz as Quiz,
  herbalRemediesQuiz as Quiz,
  highwaySystemQuiz as Quiz,
  hinduismDeitiesQuiz as Quiz,
  historyOfMedicineQuiz as Quiz,
  holyRomanEmpireQuiz as Quiz,
  humanAnatomy as Quiz,
  humanBodyHealth as Quiz,
  humanRightsMilestonesQuiz as Quiz,
  iceHockeyQuiz as Quiz,
  impressionistPainters as Quiz,
  incaEmpireQuiz as Quiz,
  infectiousDiseasesQuiz as Quiz,
  insectsAndBugs as Quiz,
  insectsBugsQuiz as Quiz,
  internationalLawQuiz as Quiz,
  internationalOrganizationsQuiz as Quiz,
  inventionsByDecade as Quiz,
  islandNations as Quiz,
  japaneseMythologyQuiz as Quiz,
  jazzMusicLegends as Quiz,
  laborMovementHistoryQuiz as Quiz,
  landlockedCountries as Quiz,
  landmarkLegislationQuiz as Quiz,
  lawEnforcementHistoryQuiz as Quiz,
  lighthouseEngineeringQuiz as Quiz,
  literaryCharactersQuiz as Quiz,
  marathonHistoryQuiz as Quiz,
  marsExplorationQuiz as Quiz,
  mathNumbers as Quiz,
  mayanCivilizationQuiz as Quiz,
  medicalInstrumentsQuiz as Quiz,
  medicalPioneersQuiz as Quiz,
  medievalEuropeQuiz as Quiz,
  medievalPhilosophyQuiz as Quiz,
  mediterraneanGeography as Quiz,
  mentalHealthFactsQuiz as Quiz,
  mesopotamianMythologyQuiz as Quiz,
  microscopeDiscoveriesQuiz as Quiz,
  middleEastGeography as Quiz,
  migratoryBirdsQuiz as Quiz,
  miningEngineeringQuiz as Quiz,
  modernArtMovements as Quiz,
  mongolEmpireQuiz as Quiz,
  mountainRanges as Quiz,
  mughalEmpireQuiz as Quiz,
  musicalInstruments as Quiz,
  mythologyLegends as Quiz,
  nationalSymbols as Quiz,
  nativeAmericanSpiritualityQuiz as Quiz,
  natureAnimals as Quiz,
  nobelPrizeWinners as Quiz,
  norseMythologyQuiz as Quiz,
  northAmericanGeography as Quiz,
  nuclearPowerPlantsQuiz as Quiz,
  nuclearScienceQuiz as Quiz,
  nutritionHealth as Quiz,
  oceanDepths as Quiz,
  oceanEcosystemsQuiz as Quiz,
  oceanMammals as Quiz,
  oceanScienceQuiz as Quiz,
  olympicHostCitiesQuiz as Quiz,
  olympicSports as Quiz,
  olympicSummerGamesQuiz as Quiz,
  olympicWinterGamesQuiz as Quiz,
  operaBasicsQuiz as Quiz,
  organicFarmingQuiz as Quiz,
  ottomanEmpireQuiz as Quiz,
  pacificIslandNations as Quiz,
  parliamentaryTraditionsQuiz as Quiz,
  penguinsPolarLifeQuiz as Quiz,
  periodicTable as Quiz,
  persianEmpireQuiz as Quiz,
  philosophicalConceptsQuiz as Quiz,
  photographyHistory as Quiz,
  photographyScienceQuiz as Quiz,
  pipelineEngineeringQuiz as Quiz,
  plantKingdomFacts as Quiz,
  politicalIdeologiesQuiz as Quiz,
  politicalSystemsQuiz as Quiz,
  polynesianMythologyQuiz as Quiz,
  portHarborEngineeringQuiz as Quiz,
  powerGridQuiz as Quiz,
  preciousGems as Quiz,
  primatesQuiz as Quiz,
  quantumPhysicsBasics as Quiz,
  radioTelevisionHistoryQuiz as Quiz,
  railroadHistoryQuiz as Quiz,
  railwayStationsQuiz as Quiz,
  rainforestCreaturesQuiz as Quiz,
  rainforestCreatures as Quiz,
  religiousSymbolsQuiz as Quiz,
  renaissanceArtQuiz as Quiz,
  renaissanceEraQuiz as Quiz,
  renewableEnergyQuiz as Quiz,
  reptilesAmphibiansQuiz as Quiz,
  revolutionHistoryQuiz as Quiz,
  roadConstructionQuiz as Quiz,
  roboticsAiQuiz as Quiz,
  romanEmpireQuiz as Quiz,
  romanMythologyQuiz as Quiz,
  rugbyWorldQuiz as Quiz,
  safariSavannaQuiz as Quiz,
  satelliteTechnologyQuiz as Quiz,
  scandinavianCountries as Quiz,
  scienceInventions as Quiz,
  sculptureMasterpieces as Quiz,
  seafoodKnowledgeQuiz as Quiz,
  sharksRaysQuiz as Quiz,
  shipbuildingHistoryQuiz as Quiz,
  skyscraperHistoryQuiz as Quiz,
  sleepScienceQuiz as Quiz,
  soccerLegendsQuiz as Quiz,
  socialMovementsQuiz as Quiz,
  solarSystemFacts as Quiz,
  southAmericanCountries as Quiz,
  southAmericanRivers as Quiz,
  southeastAsianGeography as Quiz,
  spaceAstronomy as Quiz,
  spaceExplorationMissions as Quiz,
  spaceLaunchFacilitiesQuiz as Quiz,
  spaceStationsQuiz as Quiz,
  spanishEmpireQuiz as Quiz,
  spiceTradeHistoryQuiz as Quiz,
  stadiumArchitectureQuiz as Quiz,
  stoicismPhilosophyQuiz as Quiz,
  structuralEngineeringQuiz as Quiz,
  subwaySystemsQuiz as Quiz,
  superfoodsNutritionQuiz as Quiz,
  supremeCourtCasesQuiz as Quiz,
  suspensionBridgesQuiz as Quiz,
  swimmingDivingQuiz as Quiz,
  teaCultureQuiz as Quiz,
  tennisLegendsQuiz as Quiz,
  theaterHistoryQuiz as Quiz,
  trackAndFieldQuiz as Quiz,
  traditionalHealingQuiz as Quiz,
  travelGeographyUsa as Quiz,
  tropicalFruitsQuiz as Quiz,
  tunnelEngineeringQuiz as Quiz,
  unitedNationsQuiz as Quiz,
  usPresidents as Quiz,
  vaccineHistoryQuiz as Quiz,
  venomousAnimalsQuiz as Quiz,
  vikingAgeQuiz as Quiz,
  vitaminDeficienciesQuiz as Quiz,
  volcanicWonders as Quiz,
  volleyballBadmintonQuiz as Quiz,
  waterTreatmentQuiz as Quiz,
  weatherNaturalPhenomena as Quiz,
  whalesDolphinsQuiz as Quiz,
  winterSportsQuiz as Quiz,
  wolvesCaninesQuiz as Quiz,
  womensSuffrageQuiz as Quiz,
  worldArchipelagos as Quiz,
  worldCanals as Quiz,
  worldCapitalsAdvanced as Quiz,
  worldCapitals as Quiz,
  worldCaves as Quiz,
  worldCoralReefs as Quiz,
  worldCreationMyths as Quiz,
  worldCuisine as Quiz,
  worldCupSoccerQuiz as Quiz,
  worldCurrencies as Quiz,
  worldDances as Quiz,
  worldDesertsQuiz as Quiz,
  worldFestivals as Quiz,
  worldFjords as Quiz,
  worldFlags as Quiz,
  worldFolkTales as Quiz,
  worldGeysersSprings as Quiz,
  worldGlaciers as Quiz,
  worldHeritageSites as Quiz,
  worldHistory as Quiz,
  worldIslands as Quiz,
  worldLakes as Quiz,
  worldLanguages as Quiz,
  worldLighthouses as Quiz,
  worldMountains as Quiz,
  worldMythologyQuiz as Quiz,
  worldNationalParks as Quiz,
  worldOceansRivers as Quiz,
  worldPeninsulas as Quiz,
  worldPlateaus as Quiz,
  worldRainforests as Quiz,
  worldRecordHolders as Quiz,
  worldReligionsMythology as Quiz,
  worldReligions as Quiz,
  worldSacredTextsQuiz as Quiz,
  worldStraits as Quiz,
  worldTidalPhenomena as Quiz,
  worldTradeRoutes as Quiz,
  worldWaterfalls as Quiz,
  worldWetlands as Quiz,
  worldsLargestCities as Quiz,
  worldsLongestRivers as Quiz,
  worldsSmallestCountries as Quiz,
  wrestlingHistoryQuiz as Quiz,
  zenBuddhismQuiz as Quiz,
];

export default quizzes;

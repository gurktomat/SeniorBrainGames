import type { Quiz, GameCategory } from "./types";

// Nostalgia Trivia quizzes
import fiftiesNostalgia from "@/data/nostalgia-trivia/fifties-nostalgia.json";
import sixtiesMusic from "@/data/nostalgia-trivia/sixties-music.json";
import classicHollywood from "@/data/nostalgia-trivia/classic-hollywood.json";
import seventiesNostalgia from "@/data/nostalgia-trivia/seventies-nostalgia.json";
import classicTv from "@/data/nostalgia-trivia/classic-tv.json";
import sixtiesNostalgia from "@/data/nostalgia-trivia/sixties-nostalgia.json";
import eightiesNostalgia from "@/data/nostalgia-trivia/eighties-nostalgia.json";
import classicCommercials from "@/data/nostalgia-trivia/classic-commercials.json";
import classicCars from "@/data/nostalgia-trivia/classic-cars.json";
import vintageToys from "@/data/nostalgia-trivia/vintage-toys.json";
import classicRadio from "@/data/nostalgia-trivia/classic-radio.json";
import decadeFashions from "@/data/nostalgia-trivia/decade-fashions.json";
import classicCartoons from "@/data/nostalgia-trivia/classic-cartoons.json";
import classicSports from "@/data/nostalgia-trivia/classic-sports.json";
import classicBoardGames from "@/data/nostalgia-trivia/classic-board-games.json";
import classicSitcomCatchphrases from "@/data/nostalgia-trivia/classic-sitcom-catchphrases.json";
import famousCouples from "@/data/nostalgia-trivia/famous-couples.json";
import classicMovieQuotes from "@/data/nostalgia-trivia/classic-movie-quotes.json";
import retroTvThemes from "@/data/nostalgia-trivia/retro-tv-themes.json";
import retroMovieStars from "@/data/nostalgia-trivia/retro-movie-stars.json";
import classicJingles from "@/data/nostalgia-trivia/classic-jingles.json";
import finishTheLyric from "@/data/nostalgia-trivia/finish-the-lyric.json";
import nameTheDecade from "@/data/nostalgia-trivia/name-the-decade.json";
import classicGameShows from "@/data/nostalgia-trivia/classic-game-shows.json";
import classicDinersDriveIns from "@/data/nostalgia-trivia/classic-diners-drive-ins.json";
import woodstockMusicFestivals from "@/data/nostalgia-trivia/woodstock-music-festivals.json";
import classicWesterns from "@/data/nostalgia-trivia/classic-westerns.json";
import classicChildrensBooks from "@/data/nostalgia-trivia/classic-childrens-books.json";
import vintageHouseholdItems from "@/data/nostalgia-trivia/vintage-household-items.json";
import classicCandy from "@/data/nostalgia-trivia/classic-candy.json";
import vintageAdvertisements from "@/data/nostalgia-trivia/vintage-advertisements.json";
import retroTechnology from "@/data/nostalgia-trivia/retro-technology.json";
import classicDanceCrazes from "@/data/nostalgia-trivia/classic-dance-crazes.json";
import oldSchoolPlayground from "@/data/nostalgia-trivia/old-school-playground.json";
import vintageComicStrips from "@/data/nostalgia-trivia/vintage-comic-strips.json";
import classicThemeParks from "@/data/nostalgia-trivia/classic-theme-parks.json";
import retroFashionIcons from "@/data/nostalgia-trivia/retro-fashion-icons.json";
import classicRadioShows from "@/data/nostalgia-trivia/classic-radio-shows.json";
import vintageApplianceBrands from "@/data/nostalgia-trivia/vintage-appliance-brands.json";
import classicOlympicMoments from "@/data/nostalgia-trivia/classic-olympic-moments.json";
import retroSlang from "@/data/nostalgia-trivia/retro-slang.json";
import classicDepartmentStores from "@/data/nostalgia-trivia/classic-department-stores.json";
import vintageCarModels from "@/data/nostalgia-trivia/vintage-car-models.json";
import classicVarietyShows from "@/data/nostalgia-trivia/classic-variety-shows.json";
import vintageHomeDecor from "@/data/nostalgia-trivia/vintage-home-decor.json";
import classicCerealBrands from "@/data/nostalgia-trivia/classic-cereal-brands.json";
import retroHairstyles from "@/data/nostalgia-trivia/retro-hairstyles.json";
import classicDetectiveShows from "@/data/nostalgia-trivia/classic-detective-shows.json";
import vintageKitchenBrands from "@/data/nostalgia-trivia/vintage-kitchen-brands.json";
import classicFamilySitcoms from "@/data/nostalgia-trivia/classic-family-sitcoms.json";
import retroSchoolDays from "@/data/nostalgia-trivia/retro-school-days.json";
import vintageHolidayTraditions from "@/data/nostalgia-trivia/vintage-holiday-traditions.json";
import classicSoapOperas from "@/data/nostalgia-trivia/classic-soap-operas.json";
import famousTvCatchphrases from "@/data/nostalgia-trivia/famous-tv-catchphrases.json";
import classicJazzMusic from "@/data/nostalgia-trivia/classic-jazz-music.json";
import vintageTelevisionAds from "@/data/nostalgia-trivia/vintage-television-ads.json";
import retroCampingOutdoors from "@/data/nostalgia-trivia/retro-camping-outdoors.json";
import classicRomanceMovies from "@/data/nostalgia-trivia/classic-romance-movies.json";
import vintageTrains from "@/data/nostalgia-trivia/vintage-trains.json";
import retroToysDolls from "@/data/nostalgia-trivia/retro-toys-dolls.json";
import classicHorrorMovies from "@/data/nostalgia-trivia/classic-horror-movies.json";
import vintageNewspapers from "@/data/nostalgia-trivia/vintage-newspapers.json";
import retroBicycles from "@/data/nostalgia-trivia/retro-bicycles.json";
import classicComedyDuos from "@/data/nostalgia-trivia/classic-comedy-duos.json";
import vintageJewelryFashion from "@/data/nostalgia-trivia/vintage-jewelry-fashion.json";
import classicChristmasSpecials from "@/data/nostalgia-trivia/classic-christmas-specials.json";
import retroBeachCulture from "@/data/nostalgia-trivia/retro-beach-culture.json";
import classicAnimatedMovies from "@/data/nostalgia-trivia/classic-animated-movies.json";
import vintageKitchenGadgets from "@/data/nostalgia-trivia/vintage-kitchen-gadgets.json";
import classicMysteryNovels from "@/data/nostalgia-trivia/classic-mystery-novels.json";
import retroStateFairs from "@/data/nostalgia-trivia/retro-state-fairs.json";
import classicSwingMusic from "@/data/nostalgia-trivia/classic-swing-music.json";
import vintageLunchBoxes from "@/data/nostalgia-trivia/vintage-lunch-boxes.json";
import retroDriveInRestaurants from "@/data/nostalgia-trivia/retro-drive-in-restaurants.json";
import classicCartoonCharacters from "@/data/nostalgia-trivia/classic-cartoon-characters.json";
import vintagePostcards from "@/data/nostalgia-trivia/vintage-postcards.json";
import retroPetTrends from "@/data/nostalgia-trivia/retro-pet-trends.json";
import classicAdventureMovies from "@/data/nostalgia-trivia/classic-adventure-movies.json";
import vintageRadios from "@/data/nostalgia-trivia/vintage-radios.json";
import classicCountryMusic from "@/data/nostalgia-trivia/classic-country-music.json";
import vintageBoardGames from "@/data/nostalgia-trivia/vintage-board-games.json";
import retroCandyBars from "@/data/nostalgia-trivia/retro-candy-bars.json";
import classicSitcomFamilies from "@/data/nostalgia-trivia/classic-sitcom-families.json";
import vintageMovieTheaters from "@/data/nostalgia-trivia/vintage-movie-theaters.json";
import retroArcadeGames from "@/data/nostalgia-trivia/retro-arcade-games.json";
import classicChildrensTv from "@/data/nostalgia-trivia/classic-childrens-tv.json";
import vintageSodaBrands from "@/data/nostalgia-trivia/vintage-soda-brands.json";
import retroDanceMoves from "@/data/nostalgia-trivia/retro-dance-moves.json";
import classicSpyMovies from "@/data/nostalgia-trivia/classic-spy-movies.json";
import vintageRecordPlayers from "@/data/nostalgia-trivia/vintage-record-players.json";
import classicDiscoEra from "@/data/nostalgia-trivia/classic-disco-era.json";
import vintageIceCream from "@/data/nostalgia-trivia/vintage-ice-cream.json";
import retroDriveInMovies from "@/data/nostalgia-trivia/retro-drive-in-movies.json";
import classicRockBands from "@/data/nostalgia-trivia/classic-rock-bands.json";
import vintageDiners from "@/data/nostalgia-trivia/vintage-diners.json";
import retroRollerSkating from "@/data/nostalgia-trivia/retro-roller-skating.json";
import classicWarMovies from "@/data/nostalgia-trivia/classic-war-movies.json";
import vintageTypewriters from "@/data/nostalgia-trivia/vintage-typewriters.json";
import retroStationWagons from "@/data/nostalgia-trivia/retro-station-wagons.json";
import classicFolkMusic from "@/data/nostalgia-trivia/classic-folk-music.json";
import vintagePhotography from "@/data/nostalgia-trivia/vintage-photography.json";
import retroJukeboxes from "@/data/nostalgia-trivia/retro-jukeboxes.json";
import classicMusicals from "@/data/nostalgia-trivia/classic-musicals.json";
import classicWesternsTv from "@/data/nostalgia-trivia/classic-westerns-tv.json";

// General Knowledge quizzes
import famousLandmarks from "@/data/general-knowledge/famous-landmarks.json";
import usPresidents from "@/data/general-knowledge/us-presidents.json";
import natureAnimals from "@/data/general-knowledge/nature-animals.json";
import geographyChallenge from "@/data/general-knowledge/geography-challenge.json";
import foodCooking from "@/data/general-knowledge/food-cooking.json";
import scienceInventions from "@/data/general-knowledge/science-inventions.json";
import americanHistory from "@/data/general-knowledge/american-history.json";
import humanBodyHealth from "@/data/general-knowledge/human-body-health.json";
import worldCapitals from "@/data/general-knowledge/world-capitals.json";
import famousScientists from "@/data/general-knowledge/famous-scientists.json";
import spaceAstronomy from "@/data/general-knowledge/space-astronomy.json";
import famousLiterature from "@/data/general-knowledge/famous-literature.json";
import worldOceansRivers from "@/data/general-knowledge/world-oceans-rivers.json";
import musicalInstruments from "@/data/general-knowledge/musical-instruments.json";
import worldReligionsMythology from "@/data/general-knowledge/world-religions-mythology.json";
import famousInventions from "@/data/general-knowledge/famous-inventions.json";
import ancientModernWonders from "@/data/general-knowledge/ancient-modern-wonders.json";
import famousDuos from "@/data/general-knowledge/famous-duos.json";
import everydayScience from "@/data/general-knowledge/everyday-science.json";
import worldHistory from "@/data/general-knowledge/world-history.json";
import mathNumbers from "@/data/general-knowledge/math-numbers.json";
import famousQuotes from "@/data/general-knowledge/famous-quotes.json";
import bibleKnowledge from "@/data/general-knowledge/bible-knowledge.json";
import birdsBirdwatching from "@/data/general-knowledge/birds-birdwatching.json";
import flowersGardening from "@/data/general-knowledge/flowers-gardening.json";
import travelGeographyUsa from "@/data/general-knowledge/travel-geography-usa.json";
import weatherNaturalPhenomena from "@/data/general-knowledge/weather-natural-phenomena.json";
import famousSpeeches from "@/data/general-knowledge/famous-speeches.json";
import worldCurrencies from "@/data/general-knowledge/world-currencies.json";
import nationalSymbols from "@/data/general-knowledge/national-symbols.json";
import famousExplorers from "@/data/general-knowledge/famous-explorers.json";
import worldLanguages from "@/data/general-knowledge/world-languages.json";
import famousBuildings from "@/data/general-knowledge/famous-buildings.json";
import preciousGems from "@/data/general-knowledge/precious-gems.json";
import worldFestivals from "@/data/general-knowledge/world-festivals.json";
import famousBattles from "@/data/general-knowledge/famous-battles.json";
import olympicSports from "@/data/general-knowledge/olympic-sports.json";
import famousArtists from "@/data/general-knowledge/famous-artists.json";
import ancientCivilizations from "@/data/general-knowledge/ancient-civilizations.json";
import famousBridges from "@/data/general-knowledge/famous-bridges.json";
import classicalMusic from "@/data/general-knowledge/classical-music.json";
import famousWomenHistory from "@/data/general-knowledge/famous-women-history.json";
import famousShips from "@/data/general-knowledge/famous-ships.json";
import nutritionHealth from "@/data/general-knowledge/nutrition-health.json";
import astronomyFacts from "@/data/general-knowledge/astronomy-facts.json";
import worldFlags from "@/data/general-knowledge/world-flags.json";
import worldDances from "@/data/general-knowledge/world-dances.json";
import inventionsByDecade from "@/data/general-knowledge/inventions-by-decade.json";
import worldCuisine from "@/data/general-knowledge/world-cuisine.json";
import famousMonuments from "@/data/general-knowledge/famous-monuments.json";
import earthScience from "@/data/general-knowledge/earth-science.json";
import mythologyLegends from "@/data/general-knowledge/mythology-legends.json";
import famousLibrariesMuseums from "@/data/general-knowledge/famous-libraries-museums.json";
import worldHeritageSites from "@/data/general-knowledge/world-heritage-sites.json";
import famousTrials from "@/data/general-knowledge/famous-trials.json";
import worldCanals from "@/data/general-knowledge/world-canals.json";
import famousLastWords from "@/data/general-knowledge/famous-last-words.json";
import worldCaves from "@/data/general-knowledge/world-caves.json";
import famousSiblings from "@/data/general-knowledge/famous-siblings.json";
import worldLakes from "@/data/general-knowledge/world-lakes.json";
import famousHistoricalEvents from "@/data/general-knowledge/famous-historical-events.json";
import worldNationalParks from "@/data/general-knowledge/world-national-parks.json";
import famousRobberies from "@/data/general-knowledge/famous-robberies.json";
import spaceExplorationMissions from "@/data/general-knowledge/space-exploration-missions.json";
import famousHoaxes from "@/data/general-knowledge/famous-hoaxes.json";
import famousArchaeologicalFinds from "@/data/general-knowledge/famous-archaeological-finds.json";
import animalKingdomFacts from "@/data/general-knowledge/animal-kingdom-facts.json";
import plantKingdomFacts from "@/data/general-knowledge/plant-kingdom-facts.json";
import oceanDepths from "@/data/general-knowledge/ocean-depths.json";
import climateZones from "@/data/general-knowledge/climate-zones.json";
import famousEscapes from "@/data/general-knowledge/famous-escapes.json";
import worldRecordHolders from "@/data/general-knowledge/world-record-holders.json";
import famousDuels from "@/data/general-knowledge/famous-duels.json";
import worldTradeRoutes from "@/data/general-knowledge/world-trade-routes.json";
import famousCodesCiphers from "@/data/general-knowledge/famous-codes-ciphers.json";
import solarSystemFacts from "@/data/general-knowledge/solar-system-facts.json";
import famousFeuds from "@/data/general-knowledge/famous-feuds.json";
import worldLighthouses from "@/data/general-knowledge/world-lighthouses.json";
import desertLandscapes from "@/data/general-knowledge/desert-landscapes.json";
import volcanicWonders from "@/data/general-knowledge/volcanic-wonders.json";
import famousRivers from "@/data/general-knowledge/famous-rivers.json";
import islandNations from "@/data/general-knowledge/island-nations.json";
import mountainRanges from "@/data/general-knowledge/mountain-ranges.json";
import famousGardens from "@/data/general-knowledge/famous-gardens.json";
import famousCastles from "@/data/general-knowledge/famous-castles.json";
import ancientEmpires from "@/data/general-knowledge/ancient-empires.json";
import famousTreaties from "@/data/general-knowledge/famous-treaties.json";
import famousPhilosophers from "@/data/general-knowledge/famous-philosophers.json";
import nobelPrizeWinners from "@/data/general-knowledge/nobel-prize-winners.json";
import famousArchitects from "@/data/general-knowledge/famous-architects.json";
import famousComposers from "@/data/general-knowledge/famous-composers.json";
import periodicTable from "@/data/general-knowledge/periodic-table.json";
import humanAnatomy from "@/data/general-knowledge/human-anatomy.json";
import famousPhotographers from "@/data/general-knowledge/famous-photographers.json";
import worldWaterfalls from "@/data/general-knowledge/world-waterfalls.json";
import famousPoets from "@/data/general-knowledge/famous-poets.json";
import worldIslands from "@/data/general-knowledge/world-islands.json";
import famousEconomists from "@/data/general-knowledge/famous-economists.json";
import worldMountains from "@/data/general-knowledge/world-mountains.json";
import famousMathematicians from "@/data/general-knowledge/famous-mathematicians.json";
import worldReligions from "@/data/general-knowledge/world-religions.json";
import famousInventionsHistory from "@/data/general-knowledge/famous-inventions-history.json";
import worldCapitalsAdvanced from "@/data/general-knowledge/world-capitals-advanced.json";

// Word Games (quiz-format ones)
import synonymChallenge from "@/data/word-games/synonym-challenge.json";
import whatsTheWord from "@/data/word-games/whats-the-word.json";
import antonymChallenge from "@/data/word-games/antonym-challenge.json";
import idiomOrigins from "@/data/word-games/idiom-origins.json";
import rhymeTime from "@/data/word-games/rhyme-time.json";
import commonlyConfused from "@/data/word-games/commonly-confused.json";
import vocabularyBuilder from "@/data/word-games/vocabulary-builder.json";
import figuresOfSpeech from "@/data/word-games/figures-of-speech.json";
import grammarPunctuation from "@/data/word-games/grammar-punctuation.json";
import foreignWords from "@/data/word-games/foreign-words.json";
import oldTimeExpressions from "@/data/word-games/old-time-expressions.json";
import wordOrigins from "@/data/word-games/word-origins.json";
import proverbsSayings from "@/data/word-games/proverbs-sayings.json";
import compoundWords from "@/data/word-games/compound-words.json";
import abbreviationsAcronyms from "@/data/word-games/abbreviations-acronyms.json";
import completeThePhrase from "@/data/word-games/complete-the-phrase.json";
import homophonesChallenge from "@/data/word-games/homophones-challenge.json";
import doubleMeanings from "@/data/word-games/double-meanings.json";
import prefixSuffixQuiz from "@/data/word-games/prefix-suffix-quiz.json";
import literaryVocabulary from "@/data/word-games/literary-vocabulary.json";
import wordPairsQuiz from "@/data/word-games/word-pairs-quiz.json";
import britishAmericanEnglish from "@/data/word-games/british-american-english.json";
import silentLettersQuiz from "@/data/word-games/silent-letters-quiz.json";
import onomatopoeiaQuiz from "@/data/word-games/onomatopoeia-quiz.json";
import palindromesQuiz from "@/data/word-games/palindromes-quiz.json";
import rootWordsQuiz from "@/data/word-games/root-words-quiz.json";
import collectiveNounsQuiz from "@/data/word-games/collective-nouns-quiz.json";
import eponymsQuiz from "@/data/word-games/eponyms-quiz.json";
import portmanteauWords from "@/data/word-games/portmanteau-words.json";
import archaicWords from "@/data/word-games/archaic-words.json";
import contronymsQuiz from "@/data/word-games/contronyms-quiz.json";
import animalIdioms from "@/data/word-games/animal-idioms.json";
import colorExpressions from "@/data/word-games/color-expressions.json";
import weatherExpressions from "@/data/word-games/weather-expressions.json";
import foodExpressions from "@/data/word-games/food-expressions.json";
import musicVocabulary from "@/data/word-games/music-vocabulary.json";
import legalVocabulary from "@/data/word-games/legal-vocabulary.json";
import medicalVocabulary from "@/data/word-games/medical-vocabulary.json";
import nauticalTerms from "@/data/word-games/nautical-terms.json";
import sportsLingo from "@/data/word-games/sports-lingo.json";
import kitchenVocabulary from "@/data/word-games/kitchen-vocabulary.json";
import travelVocabulary from "@/data/word-games/travel-vocabulary.json";
import natureVocabulary from "@/data/word-games/nature-vocabulary.json";
import spoonerismQuiz from "@/data/word-games/spoonerisms-quiz.json";
import malapropismQuiz from "@/data/word-games/malapropisms-quiz.json";
import cockneyRhymingSlang from "@/data/word-games/cockney-rhyming-slang.json";
import australianSlang from "@/data/word-games/australian-slang.json";
import southernExpressions from "@/data/word-games/southern-expressions.json";
import theaterVocabulary from "@/data/word-games/theater-vocabulary.json";
import wineVocabulary from "@/data/word-games/wine-vocabulary.json";
import architectureTerms from "@/data/word-games/architecture-terms.json";
import musicTheoryTerms from "@/data/word-games/music-theory-terms.json";
import photographyTerms from "@/data/word-games/photography-terms.json";
import cookingTechniques from "@/data/word-games/cooking-techniques.json";
import danceVocabulary from "@/data/word-games/dance-vocabulary.json";
import geologyVocabulary from "@/data/word-games/geology-vocabulary.json";
import aviationTerms from "@/data/word-games/aviation-terms.json";
import botanicalTerms from "@/data/word-games/botanical-terms.json";
import zoologyTerms from "@/data/word-games/zoology-terms.json";
import archaeologyTerms from "@/data/word-games/archaeology-terms.json";
import printingTerms from "@/data/word-games/printing-terms.json";
import maritimeExpressions from "@/data/word-games/maritime-expressions.json";
import horseRidingTerms from "@/data/word-games/horse-riding-terms.json";
import chessVocabulary from "@/data/word-games/chess-vocabulary.json";
import textileTerms from "@/data/word-games/textile-terms.json";
import weatherVocabulary from "@/data/word-games/weather-vocabulary.json";
import irishExpressions from "@/data/word-games/irish-expressions.json";
import scottishWords from "@/data/word-games/scottish-words.json";
import alliterationQuiz from "@/data/word-games/alliteration-quiz.json";
import oxymoronsQuiz from "@/data/word-games/oxymorons-quiz.json";
import similesQuiz from "@/data/word-games/similes-quiz.json";
import metaphorsQuiz from "@/data/word-games/metaphors-quiz.json";
import tongueTwistersQuiz from "@/data/word-games/tongue-twisters-quiz.json";
import shakespeareWords from "@/data/word-games/shakespeare-words.json";
import frenchLoanwords from "@/data/word-games/french-loanwords.json";
import latinPhrases from "@/data/word-games/latin-phrases.json";
import businessJargon from "@/data/word-games/business-jargon.json";
import technologyTerms from "@/data/word-games/technology-terms.json";
import artVocabulary from "@/data/word-games/art-vocabulary.json";
import fashionVocabulary from "@/data/word-games/fashion-vocabulary.json";
import astronomyVocabulary from "@/data/word-games/astronomy-vocabulary.json";
import bodyIdioms from "@/data/word-games/body-idioms.json";
import numberExpressions from "@/data/word-games/number-expressions.json";
import timeExpressions from "@/data/word-games/time-expressions.json";
import moneyExpressions from "@/data/word-games/money-expressions.json";
import warExpressions from "@/data/word-games/war-expressions.json";
import bookVocabulary from "@/data/word-games/book-vocabulary.json";
import gardenVocabulary from "@/data/word-games/garden-vocabulary.json";
import oceanVocabulary from "@/data/word-games/ocean-vocabulary.json";
import mountainVocabulary from "@/data/word-games/mountain-vocabulary.json";
import desertVocabulary from "@/data/word-games/desert-vocabulary.json";
import mythologyWords from "@/data/word-games/mythology-words.json";
import geographyVocabulary from "@/data/word-games/geography-vocabulary.json";

// Memory Games (quiz-format ones)
import pictureQuiz from "@/data/memory-games/picture-quiz.json";
import famousFaces from "@/data/memory-games/famous-faces.json";
import oddOneOut from "@/data/memory-games/odd-one-out.json";
import triviaRecall from "@/data/memory-games/trivia-recall.json";
import visualClues from "@/data/memory-games/visual-clues.json";
import beforeAndAfter from "@/data/memory-games/before-and-after.json";
import connectionPuzzle from "@/data/memory-games/connection-puzzle.json";
import brainTeasers from "@/data/memory-games/brain-teasers.json";
import wordConnections from "@/data/memory-games/word-connections.json";
import concentrationQuiz from "@/data/memory-games/concentration-quiz.json";
import numberPatterns from "@/data/memory-games/number-patterns.json";
import famousFirsts from "@/data/memory-games/famous-firsts.json";
import logicDeduction from "@/data/memory-games/logic-deduction.json";
import sequenceOrder from "@/data/memory-games/sequence-order.json";
import whatComesNext from "@/data/memory-games/what-comes-next.json";
import categorySort from "@/data/memory-games/category-sort.json";
import twoTruthsOneLie from "@/data/memory-games/two-truths-one-lie.json";
import rememberTheYear from "@/data/memory-games/remember-the-year.json";
import everydayMemoryTest from "@/data/memory-games/everyday-memory-test.json";
import rapidRecall from "@/data/memory-games/rapid-recall.json";
import stateFlagsQuiz from "@/data/memory-games/state-flags-quiz.json";
import birdIdentification from "@/data/memory-games/bird-identification.json";
import treeIdentification from "@/data/memory-games/tree-identification.json";
import cloudTypesQuiz from "@/data/memory-games/cloud-types-quiz.json";
import instrumentSoundsQuiz from "@/data/memory-games/instrument-sounds-quiz.json";
import gemstoneIdentification from "@/data/memory-games/gemstone-identification.json";
import dogBreedsQuiz from "@/data/memory-games/dog-breeds-quiz.json";
import catBreedsQuiz from "@/data/memory-games/cat-breeds-quiz.json";
import dinosaurFactsQuiz from "@/data/memory-games/dinosaur-facts-quiz.json";
import spaceMissionsRecall from "@/data/memory-games/space-missions-recall.json";
import vitaminMineralsQuiz from "@/data/memory-games/vitamin-minerals-quiz.json";
import boneNamesQuiz from "@/data/memory-games/bone-names-quiz.json";
import organFunctionsQuiz from "@/data/memory-games/organ-functions-quiz.json";
import mapSymbolsQuiz from "@/data/memory-games/map-symbols-quiz.json";
import artMovementsQuiz from "@/data/memory-games/art-movements-quiz.json";
import fabricTypesQuiz from "@/data/memory-games/fabric-types-quiz.json";
import carLogosQuiz from "@/data/memory-games/car-logos-quiz.json";
import countryShapesQuiz from "@/data/memory-games/country-shapes-quiz.json";
import famousBattlesRecall from "@/data/memory-games/famous-battles-recall.json";
import olympicHostCities from "@/data/memory-games/olympic-host-cities.json";
import weatherSymbolsQuiz from "@/data/memory-games/weather-symbols-quiz.json";
import musicNotesQuiz from "@/data/memory-games/music-notes-quiz.json";
import danceStylesQuiz from "@/data/memory-games/dance-styles-quiz.json";
import worldCapitalsExtreme from "@/data/memory-games/world-capitals-extreme.json";
import famousPaintingsRecall from "@/data/memory-games/famous-paintings-recall.json";
import historicalDates from "@/data/memory-games/historical-dates.json";
import flagIdentification from "@/data/memory-games/flag-identification.json";
import animalClassification from "@/data/memory-games/animal-classification.json";
import elementSymbols from "@/data/memory-games/element-symbols.json";
import stateCapitalsRecall from "@/data/memory-games/state-capitals-recall.json";
import famousPaintings from "@/data/memory-games/famous-paintings.json";
import romanNumerals from "@/data/memory-games/roman-numerals.json";
import measurementConversions from "@/data/memory-games/measurement-conversions.json";
import acronymRecall from "@/data/memory-games/acronym-recall.json";
import phobiaNames from "@/data/memory-games/phobia-names.json";
import zodiacTrivia from "@/data/memory-games/zodiac-trivia.json";
import birthstoneQuiz from "@/data/memory-games/birthstone-quiz.json";
import colorMixingQuiz from "@/data/memory-games/color-mixing-quiz.json";
import speedMathQuiz from "@/data/memory-games/speed-math-quiz.json";
import reverseTrivia from "@/data/memory-games/reverse-trivia.json";
import decadeMusicRecall from "@/data/memory-games/decade-music-recall.json";
import movieYearQuiz from "@/data/memory-games/movie-year-quiz.json";
import presidentialOrder from "@/data/memory-games/presidential-order.json";
import scienceFactsRecall from "@/data/memory-games/science-facts-recall.json";
import famousLogos from "@/data/memory-games/famous-logos.json";
import worldRecords from "@/data/memory-games/world-records.json";
import brainFacts from "@/data/memory-games/brain-facts.json";
import visualMemoryQuiz from "@/data/memory-games/visual-memory-quiz.json";
import associationChallenge from "@/data/memory-games/association-challenge.json";
import quickThinking from "@/data/memory-games/quick-thinking.json";
import countryCapitalsQuiz from "@/data/memory-games/country-capitals-quiz.json";
import periodicElementQuiz from "@/data/memory-games/periodic-element-quiz.json";
import famousInventionsRecall from "@/data/memory-games/famous-inventions-recall.json";
import worldLeadersQuiz from "@/data/memory-games/world-leaders-quiz.json";
import landmarkLocations from "@/data/memory-games/landmark-locations.json";
import animalSoundsQuiz from "@/data/memory-games/animal-sounds-quiz.json";
import famousQuotesRecall from "@/data/memory-games/famous-quotes-recall.json";
import historicalFigures from "@/data/memory-games/historical-figures.json";
import planetFactsQuiz from "@/data/memory-games/planet-facts-quiz.json";
import oceanCreaturesQuiz from "@/data/memory-games/ocean-creatures-quiz.json";
import famousComposersRecall from "@/data/memory-games/famous-composers-recall.json";
import currencyCountries from "@/data/memory-games/currency-countries.json";
import languageOriginsQuiz from "@/data/memory-games/language-origins-quiz.json";
import famousAuthorsRecall from "@/data/memory-games/famous-authors-recall.json";
import sportsRecordsQuiz from "@/data/memory-games/sports-records-quiz.json";
import foodOriginsQuiz from "@/data/memory-games/food-origins-quiz.json";
import famousDiscoveries from "@/data/memory-games/famous-discoveries.json";
import musicDecadesQuiz from "@/data/memory-games/music-decades-quiz.json";
import geographyExtremes from "@/data/memory-games/geography-extremes.json";
import famousNicknames from "@/data/memory-games/famous-nicknames.json";
import unitConversions from "@/data/memory-games/unit-conversions.json";
import wordDefinitionsQuiz from "@/data/memory-games/word-definitions-quiz.json";
import numberFactsQuiz from "@/data/memory-games/number-facts-quiz.json";
import scienceSymbolsQuiz from "@/data/memory-games/science-symbols-quiz.json";
import famousDuosRecall from "@/data/memory-games/famous-duos-recall.json";

const nostalgiaTrivia: Quiz[] = [
  fiftiesNostalgia as Quiz,
  sixtiesMusic as Quiz,
  classicHollywood as Quiz,
  seventiesNostalgia as Quiz,
  classicTv as Quiz,
  sixtiesNostalgia as Quiz,
  eightiesNostalgia as Quiz,
  classicCommercials as Quiz,
  classicCars as Quiz,
  vintageToys as Quiz,
  classicRadio as Quiz,
  decadeFashions as Quiz,
  classicCartoons as Quiz,
  classicSports as Quiz,
  classicBoardGames as Quiz,
  classicSitcomCatchphrases as Quiz,
  famousCouples as Quiz,
  classicMovieQuotes as Quiz,
  retroTvThemes as Quiz,
  retroMovieStars as Quiz,
  classicJingles as Quiz,
  finishTheLyric as Quiz,
  nameTheDecade as Quiz,
  classicGameShows as Quiz,
  classicDinersDriveIns as Quiz,
  woodstockMusicFestivals as Quiz,
  classicWesterns as Quiz,
  classicChildrensBooks as Quiz,
  vintageHouseholdItems as Quiz,
  classicCandy as Quiz,
  vintageAdvertisements as Quiz,
  retroTechnology as Quiz,
  classicDanceCrazes as Quiz,
  oldSchoolPlayground as Quiz,
  vintageComicStrips as Quiz,
  classicThemeParks as Quiz,
  retroFashionIcons as Quiz,
  classicRadioShows as Quiz,
  vintageApplianceBrands as Quiz,
  classicOlympicMoments as Quiz,
  retroSlang as Quiz,
  classicDepartmentStores as Quiz,
  vintageCarModels as Quiz,
  classicVarietyShows as Quiz,
  vintageHomeDecor as Quiz,
  classicCerealBrands as Quiz,
  retroHairstyles as Quiz,
  classicDetectiveShows as Quiz,
  vintageKitchenBrands as Quiz,
  classicFamilySitcoms as Quiz,
  retroSchoolDays as Quiz,
  vintageHolidayTraditions as Quiz,
  classicSoapOperas as Quiz,
  famousTvCatchphrases as Quiz,
  classicCountryMusic as Quiz,
  vintageBoardGames as Quiz,
  retroCandyBars as Quiz,
  classicSitcomFamilies as Quiz,
  vintageMovieTheaters as Quiz,
  retroArcadeGames as Quiz,
  classicChildrensTv as Quiz,
  vintageSodaBrands as Quiz,
  retroDanceMoves as Quiz,
  classicSpyMovies as Quiz,
  vintageRecordPlayers as Quiz,
  classicDiscoEra as Quiz,
  vintageIceCream as Quiz,
  retroDriveInMovies as Quiz,
  classicRockBands as Quiz,
  vintageDiners as Quiz,
  retroRollerSkating as Quiz,
  classicWarMovies as Quiz,
  vintageTypewriters as Quiz,
  retroStationWagons as Quiz,
  classicFolkMusic as Quiz,
  vintagePhotography as Quiz,
  retroJukeboxes as Quiz,
  classicMusicals as Quiz,
  classicWesternsTv as Quiz,
  classicJazzMusic as Quiz,
  vintageTelevisionAds as Quiz,
  retroCampingOutdoors as Quiz,
  classicRomanceMovies as Quiz,
  vintageTrains as Quiz,
  retroToysDolls as Quiz,
  classicHorrorMovies as Quiz,
  vintageNewspapers as Quiz,
  retroBicycles as Quiz,
  classicComedyDuos as Quiz,
  vintageJewelryFashion as Quiz,
  classicChristmasSpecials as Quiz,
  retroBeachCulture as Quiz,
  classicAnimatedMovies as Quiz,
  vintageKitchenGadgets as Quiz,
  classicMysteryNovels as Quiz,
  retroStateFairs as Quiz,
  classicSwingMusic as Quiz,
  vintageLunchBoxes as Quiz,
  retroDriveInRestaurants as Quiz,
  classicCartoonCharacters as Quiz,
  vintagePostcards as Quiz,
  retroPetTrends as Quiz,
  classicAdventureMovies as Quiz,
  vintageRadios as Quiz,
];

const generalKnowledge: Quiz[] = [
  famousLandmarks as Quiz,
  usPresidents as Quiz,
  natureAnimals as Quiz,
  geographyChallenge as Quiz,
  foodCooking as Quiz,
  scienceInventions as Quiz,
  americanHistory as Quiz,
  humanBodyHealth as Quiz,
  worldCapitals as Quiz,
  famousScientists as Quiz,
  spaceAstronomy as Quiz,
  famousLiterature as Quiz,
  worldOceansRivers as Quiz,
  musicalInstruments as Quiz,
  worldReligionsMythology as Quiz,
  famousInventions as Quiz,
  ancientModernWonders as Quiz,
  famousDuos as Quiz,
  everydayScience as Quiz,
  worldHistory as Quiz,
  mathNumbers as Quiz,
  famousQuotes as Quiz,
  bibleKnowledge as Quiz,
  birdsBirdwatching as Quiz,
  flowersGardening as Quiz,
  travelGeographyUsa as Quiz,
  weatherNaturalPhenomena as Quiz,
  famousSpeeches as Quiz,
  worldCurrencies as Quiz,
  nationalSymbols as Quiz,
  famousExplorers as Quiz,
  worldLanguages as Quiz,
  famousBuildings as Quiz,
  preciousGems as Quiz,
  worldFestivals as Quiz,
  famousBattles as Quiz,
  olympicSports as Quiz,
  famousArtists as Quiz,
  ancientCivilizations as Quiz,
  famousBridges as Quiz,
  classicalMusic as Quiz,
  famousWomenHistory as Quiz,
  famousShips as Quiz,
  nutritionHealth as Quiz,
  astronomyFacts as Quiz,
  worldFlags as Quiz,
  worldDances as Quiz,
  inventionsByDecade as Quiz,
  worldCuisine as Quiz,
  famousMonuments as Quiz,
  earthScience as Quiz,
  mythologyLegends as Quiz,
  famousLibrariesMuseums as Quiz,
  desertLandscapes as Quiz,
  volcanicWonders as Quiz,
  famousRivers as Quiz,
  islandNations as Quiz,
  mountainRanges as Quiz,
  famousGardens as Quiz,
  famousCastles as Quiz,
  ancientEmpires as Quiz,
  famousTreaties as Quiz,
  famousPhilosophers as Quiz,
  nobelPrizeWinners as Quiz,
  famousArchitects as Quiz,
  famousComposers as Quiz,
  periodicTable as Quiz,
  humanAnatomy as Quiz,
  famousPhotographers as Quiz,
  worldWaterfalls as Quiz,
  famousPoets as Quiz,
  worldIslands as Quiz,
  famousEconomists as Quiz,
  worldMountains as Quiz,
  famousMathematicians as Quiz,
  worldReligions as Quiz,
  famousInventionsHistory as Quiz,
  worldCapitalsAdvanced as Quiz,
  worldHeritageSites as Quiz,
  famousTrials as Quiz,
  worldCanals as Quiz,
  famousLastWords as Quiz,
  worldCaves as Quiz,
  famousSiblings as Quiz,
  worldLakes as Quiz,
  famousHistoricalEvents as Quiz,
  worldNationalParks as Quiz,
  famousRobberies as Quiz,
  spaceExplorationMissions as Quiz,
  famousHoaxes as Quiz,
  famousArchaeologicalFinds as Quiz,
  animalKingdomFacts as Quiz,
  plantKingdomFacts as Quiz,
  oceanDepths as Quiz,
  climateZones as Quiz,
  famousEscapes as Quiz,
  worldRecordHolders as Quiz,
  famousDuels as Quiz,
  worldTradeRoutes as Quiz,
  famousCodesCiphers as Quiz,
  solarSystemFacts as Quiz,
  famousFeuds as Quiz,
  worldLighthouses as Quiz,
];

const wordGameQuizzes: Quiz[] = [
  synonymChallenge as Quiz,
  whatsTheWord as Quiz,
  antonymChallenge as Quiz,
  idiomOrigins as Quiz,
  rhymeTime as Quiz,
  commonlyConfused as Quiz,
  vocabularyBuilder as Quiz,
  figuresOfSpeech as Quiz,
  grammarPunctuation as Quiz,
  foreignWords as Quiz,
  oldTimeExpressions as Quiz,
  wordOrigins as Quiz,
  proverbsSayings as Quiz,
  compoundWords as Quiz,
  abbreviationsAcronyms as Quiz,
  completeThePhrase as Quiz,
  homophonesChallenge as Quiz,
  doubleMeanings as Quiz,
  prefixSuffixQuiz as Quiz,
  literaryVocabulary as Quiz,
  wordPairsQuiz as Quiz,
  britishAmericanEnglish as Quiz,
  silentLettersQuiz as Quiz,
  onomatopoeiaQuiz as Quiz,
  palindromesQuiz as Quiz,
  rootWordsQuiz as Quiz,
  collectiveNounsQuiz as Quiz,
  eponymsQuiz as Quiz,
  portmanteauWords as Quiz,
  archaicWords as Quiz,
  contronymsQuiz as Quiz,
  animalIdioms as Quiz,
  colorExpressions as Quiz,
  weatherExpressions as Quiz,
  foodExpressions as Quiz,
  musicVocabulary as Quiz,
  legalVocabulary as Quiz,
  medicalVocabulary as Quiz,
  nauticalTerms as Quiz,
  sportsLingo as Quiz,
  kitchenVocabulary as Quiz,
  travelVocabulary as Quiz,
  natureVocabulary as Quiz,
  alliterationQuiz as Quiz,
  oxymoronsQuiz as Quiz,
  similesQuiz as Quiz,
  metaphorsQuiz as Quiz,
  tongueTwistersQuiz as Quiz,
  shakespeareWords as Quiz,
  frenchLoanwords as Quiz,
  latinPhrases as Quiz,
  businessJargon as Quiz,
  technologyTerms as Quiz,
  artVocabulary as Quiz,
  fashionVocabulary as Quiz,
  astronomyVocabulary as Quiz,
  bodyIdioms as Quiz,
  numberExpressions as Quiz,
  timeExpressions as Quiz,
  moneyExpressions as Quiz,
  warExpressions as Quiz,
  bookVocabulary as Quiz,
  gardenVocabulary as Quiz,
  oceanVocabulary as Quiz,
  mountainVocabulary as Quiz,
  desertVocabulary as Quiz,
  mythologyWords as Quiz,
  geographyVocabulary as Quiz,
  spoonerismQuiz as Quiz,
  malapropismQuiz as Quiz,
  cockneyRhymingSlang as Quiz,
  australianSlang as Quiz,
  southernExpressions as Quiz,
  theaterVocabulary as Quiz,
  wineVocabulary as Quiz,
  architectureTerms as Quiz,
  musicTheoryTerms as Quiz,
  photographyTerms as Quiz,
  cookingTechniques as Quiz,
  danceVocabulary as Quiz,
  geologyVocabulary as Quiz,
  aviationTerms as Quiz,
  botanicalTerms as Quiz,
  zoologyTerms as Quiz,
  archaeologyTerms as Quiz,
  printingTerms as Quiz,
  maritimeExpressions as Quiz,
  horseRidingTerms as Quiz,
  chessVocabulary as Quiz,
  textileTerms as Quiz,
  weatherVocabulary as Quiz,
  irishExpressions as Quiz,
  scottishWords as Quiz,
];

const memoryGameQuizzes: Quiz[] = [
  pictureQuiz as Quiz,
  famousFaces as Quiz,
  oddOneOut as Quiz,
  triviaRecall as Quiz,
  visualClues as Quiz,
  beforeAndAfter as Quiz,
  connectionPuzzle as Quiz,
  brainTeasers as Quiz,
  wordConnections as Quiz,
  concentrationQuiz as Quiz,
  numberPatterns as Quiz,
  famousFirsts as Quiz,
  logicDeduction as Quiz,
  sequenceOrder as Quiz,
  whatComesNext as Quiz,
  categorySort as Quiz,
  twoTruthsOneLie as Quiz,
  rememberTheYear as Quiz,
  everydayMemoryTest as Quiz,
  rapidRecall as Quiz,
  historicalDates as Quiz,
  flagIdentification as Quiz,
  animalClassification as Quiz,
  elementSymbols as Quiz,
  stateCapitalsRecall as Quiz,
  famousPaintings as Quiz,
  romanNumerals as Quiz,
  measurementConversions as Quiz,
  acronymRecall as Quiz,
  phobiaNames as Quiz,
  zodiacTrivia as Quiz,
  birthstoneQuiz as Quiz,
  colorMixingQuiz as Quiz,
  speedMathQuiz as Quiz,
  reverseTrivia as Quiz,
  decadeMusicRecall as Quiz,
  movieYearQuiz as Quiz,
  presidentialOrder as Quiz,
  scienceFactsRecall as Quiz,
  famousLogos as Quiz,
  worldRecords as Quiz,
  brainFacts as Quiz,
  visualMemoryQuiz as Quiz,
  associationChallenge as Quiz,
  quickThinking as Quiz,
  countryCapitalsQuiz as Quiz,
  periodicElementQuiz as Quiz,
  famousInventionsRecall as Quiz,
  worldLeadersQuiz as Quiz,
  landmarkLocations as Quiz,
  animalSoundsQuiz as Quiz,
  famousQuotesRecall as Quiz,
  historicalFigures as Quiz,
  planetFactsQuiz as Quiz,
  oceanCreaturesQuiz as Quiz,
  famousComposersRecall as Quiz,
  currencyCountries as Quiz,
  languageOriginsQuiz as Quiz,
  famousAuthorsRecall as Quiz,
  sportsRecordsQuiz as Quiz,
  foodOriginsQuiz as Quiz,
  famousDiscoveries as Quiz,
  musicDecadesQuiz as Quiz,
  geographyExtremes as Quiz,
  famousNicknames as Quiz,
  unitConversions as Quiz,
  wordDefinitionsQuiz as Quiz,
  numberFactsQuiz as Quiz,
  scienceSymbolsQuiz as Quiz,
  famousDuosRecall as Quiz,
  stateFlagsQuiz as Quiz,
  birdIdentification as Quiz,
  treeIdentification as Quiz,
  cloudTypesQuiz as Quiz,
  instrumentSoundsQuiz as Quiz,
  gemstoneIdentification as Quiz,
  dogBreedsQuiz as Quiz,
  catBreedsQuiz as Quiz,
  dinosaurFactsQuiz as Quiz,
  spaceMissionsRecall as Quiz,
  vitaminMineralsQuiz as Quiz,
  boneNamesQuiz as Quiz,
  organFunctionsQuiz as Quiz,
  mapSymbolsQuiz as Quiz,
  artMovementsQuiz as Quiz,
  fabricTypesQuiz as Quiz,
  carLogosQuiz as Quiz,
  countryShapesQuiz as Quiz,
  famousBattlesRecall as Quiz,
  olympicHostCities as Quiz,
  weatherSymbolsQuiz as Quiz,
  musicNotesQuiz as Quiz,
  danceStylesQuiz as Quiz,
  worldCapitalsExtreme as Quiz,
  famousPaintingsRecall as Quiz,
];

const allQuizzes: Quiz[] = [
  ...nostalgiaTrivia,
  ...generalKnowledge,
  ...wordGameQuizzes,
  ...memoryGameQuizzes,
];

export function getAllQuizzes(): Quiz[] {
  return allQuizzes;
}

export function getQuizzesByCategory(category: GameCategory): Quiz[] {
  switch (category) {
    case "nostalgia-trivia":
      return nostalgiaTrivia;
    case "general-knowledge":
      return generalKnowledge;
    case "word-games":
      return wordGameQuizzes;
    case "memory-games":
      return memoryGameQuizzes;
    default:
      return [];
  }
}

export function getQuizBySlug(
  category: string,
  slug: string,
): Quiz | undefined {
  return allQuizzes.find((q) => q.id === slug && q.gameCategory === category);
}

export function getQuizById(id: string): Quiz | undefined {
  return allQuizzes.find((q) => q.id === id);
}

export function getDailyChallenge(): Quiz {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  // Pick 5 questions deterministically from all quizzes
  const allQuestions = allQuizzes.flatMap((q) => q.questions);
  const selected = [];
  const seed = Math.abs(hash);
  for (let i = 0; i < 5 && i < allQuestions.length; i++) {
    const index = (seed + i * 7919) % allQuestions.length;
    selected.push(allQuestions[index]);
  }

  return {
    id: `daily-${dateString}`,
    title: "Daily Challenge",
    description: "5 questions from across all categories — a new challenge every day!",
    gameCategory: "nostalgia-trivia",
    questions: selected,
  };
}

// Category metadata for UI
export const categoryInfo: Record<
  GameCategory,
  { title: string; description: string; icon: string; slug: string }
> = {
  "nostalgia-trivia": {
    title: "Nostalgia Trivia",
    description:
      "Travel back in time with trivia from the 1950s through the 1980s. Test your memory of music, movies, TV, and culture!",
    icon: "radio",
    slug: "nostalgia-trivia",
  },
  "general-knowledge": {
    title: "General Knowledge",
    description:
      "Challenge yourself with questions about geography, history, science, nature, and more!",
    icon: "globe",
    slug: "general-knowledge",
  },
  "word-games": {
    title: "Word Games",
    description:
      "Scrambles, proverbs, synonyms, and more — give your vocabulary a workout!",
    icon: "type",
    slug: "word-games",
  },
  "memory-games": {
    title: "Memory Games",
    description:
      "Card matching, pattern recognition, and visual puzzles to sharpen your memory!",
    icon: "brain",
    slug: "memory-games",
  },
};

// Non-quiz game slugs for the special game engines
export const specialGameSlugs: Record<string, string[]> = {
  "word-games": [
    "word-scramble",
    "complete-the-proverb",
    "spelling-bee",
    "word-association",
    "crossword-classic",
    "word-search",
    "hangman",
    "word-ladder",
    "cryptogram",
    "anagram-challenge",
    "missing-vowels",
    "emoji-decoder",
    "riddle-challenge",
    "famous-first-lines",
    "grammar-true-or-false",
    "crossword-nature-science",
    "word-search-animals",
    "food-word-scramble",
    "cryptogram-poetry",
    "word-ladder-challenge",
    "history-spelling-bee",
    "word-search-travel",
  ],
  "nostalgia-trivia": [
    "timeline-sort",
    "nostalgia-fact-or-fiction",
    "decade-sorting",
    "nostalgia-who-am-i",
    "nostalgia-hangman",
    "nostalgia-riddles",
    "vintage-spelling-bee",
    "old-time-sayings",
    "retro-word-association",
    "nostalgia-matching",
    "nostalgia-estimation",
  ],
  "general-knowledge": [
    "true-or-false",
    "who-am-i",
    "science-sorting",
    "history-timeline",
    "science-true-or-false",
    "what-in-the-world",
    "inventions-timeline",
    "animal-kingdom-sorting",
    "mental-math",
    "logic-patterns",
    "observation-challenge",
    "geography-sorting",
  ],
  "memory-games": [
    "memory-card-match",
    "spot-the-difference",
    "whats-missing",
    "pattern-recognition",
    "color-shape-sorting",
    "sudoku-puzzles",
    "sliding-puzzle",
    "sequence-memory",
    "matching-pairs",
    "math-challenge",
    "number-memory",
    "estimation-game",
    "memory-true-or-false",
    "what-am-i",
    "minesweeper",
    "nature-card-match",
    "color-sequence-challenge",
    "number-recall-challenge",
    "whats-changed",
    "sudoku-challenge",
    "sliding-puzzle-challenge",
    "famous-pairs-matching",
  ],
};

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

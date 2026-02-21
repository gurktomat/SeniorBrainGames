// @ts-nocheck
import type { Quiz } from "./types";

import q1930sScrewballComedies from "@/data/nostalgia-trivia/1930s-screwball-comedies.json";
import q1940sWarFilms from "@/data/nostalgia-trivia/1940s-war-films.json";
import q1940sWartimeCulture from "@/data/nostalgia-trivia/1940s-wartime-culture.json";
import q1950sAmericaQuiz from "@/data/nostalgia-trivia/1950s-america-quiz.json";
import q1950sMovieMusicals from "@/data/nostalgia-trivia/1950s-movie-musicals.json";
import q1950sRadioDramas from "@/data/nostalgia-trivia/1950s-radio-dramas.json";
import q1950sRebelMovies from "@/data/nostalgia-trivia/1950s-rebel-movies.json";
import q1950sRockAndRollPioneers from "@/data/nostalgia-trivia/1950s-rock-and-roll-pioneers.json";
import q1950sSitcomStars from "@/data/nostalgia-trivia/1950s-sitcom-stars.json";
import q1960sBritishInvasion from "@/data/nostalgia-trivia/1960s-british-invasion.json";
import q1960sEpicMovies from "@/data/nostalgia-trivia/1960s-epic-movies.json";
import q1960sPresidentialEra from "@/data/nostalgia-trivia/1960s-presidential-era.json";
import q1960sPsychedelicRock from "@/data/nostalgia-trivia/1960s-psychedelic-rock.json";
import q1960sSocialChange from "@/data/nostalgia-trivia/1960s-social-change.json";
import q1960sSurfMusic from "@/data/nostalgia-trivia/1960s-surf-music.json";
import q1960sVarietyShowActs from "@/data/nostalgia-trivia/1960s-variety-show-acts.json";
import q1970sBlockbusters from "@/data/nostalgia-trivia/1970s-blockbusters.json";
import q1970sCulturalMoments from "@/data/nostalgia-trivia/1970s-cultural-moments.json";
import q1970sEnergyCrisis from "@/data/nostalgia-trivia/1970s-energy-crisis.json";
import q1970sHardRock from "@/data/nostalgia-trivia/1970s-hard-rock.json";
import q1970sPoliticalEvents from "@/data/nostalgia-trivia/1970s-political-events.json";
import q1970sProgressiveRock from "@/data/nostalgia-trivia/1970s-progressive-rock.json";
import q1970sPunkRock from "@/data/nostalgia-trivia/1970s-punk-rock.json";
import q1970sSoftRock from "@/data/nostalgia-trivia/1970s-soft-rock.json";
import q1970sSouthernRock from "@/data/nostalgia-trivia/1970s-southern-rock.json";
import q1980sMtvEra from "@/data/nostalgia-trivia/1980s-mtv-era.json";
import q1980sNewWave from "@/data/nostalgia-trivia/1980s-new-wave.json";
import q1980sPowerBallads from "@/data/nostalgia-trivia/1980s-power-ballads.json";
import q1980sTeenMovies from "@/data/nostalgia-trivia/1980s-teen-movies.json";
import q1980sWorldEvents from "@/data/nostalgia-trivia/1980s-world-events.json";
import andyGriffithShowTrivia from "@/data/nostalgia-trivia/andy-griffith-show-trivia.json";
import babyBoomerMilestones from "@/data/nostalgia-trivia/baby-boomer-milestones.json";
import berlinWallHistory from "@/data/nostalgia-trivia/berlin-wall-history.json";
import bibleTrivia from "@/data/nostalgia-trivia/bible-trivia.json";
import bigBandEra from "@/data/nostalgia-trivia/big-band-era.json";
import civilRightsMovementQuiz from "@/data/nostalgia-trivia/civil-rights-movement-quiz.json";
import classicAcademyAwards from "@/data/nostalgia-trivia/classic-academy-awards.json";
import classicAdventureMovies from "@/data/nostalgia-trivia/classic-adventure-movies.json";
import classicAnimatedMovies from "@/data/nostalgia-trivia/classic-animated-movies.json";
import classicAutoRacing from "@/data/nostalgia-trivia/classic-auto-racing.json";
import classicBakingBrands from "@/data/nostalgia-trivia/classic-baking-brands.json";
import classicBaseballLegends from "@/data/nostalgia-trivia/classic-baseball-legends.json";
import classicBiblicalEpics from "@/data/nostalgia-trivia/classic-biblical-epics.json";
import classicBirdWatching from "@/data/nostalgia-trivia/classic-bird-watching.json";
import classicBluesLegends from "@/data/nostalgia-trivia/classic-blues-legends.json";
import classicBoardGames from "@/data/nostalgia-trivia/classic-board-games.json";
import classicBridgeClubs from "@/data/nostalgia-trivia/classic-bridge-clubs.json";
import classicCandy from "@/data/nostalgia-trivia/classic-candy.json";
import classicCapGuns from "@/data/nostalgia-trivia/classic-cap-guns.json";
import classicCars from "@/data/nostalgia-trivia/classic-cars.json";
import classicCartoonCharacters from "@/data/nostalgia-trivia/classic-cartoon-characters.json";
import classicCartoons from "@/data/nostalgia-trivia/classic-cartoons.json";
import classicCaryGrantMovies from "@/data/nostalgia-trivia/classic-cary-grant-movies.json";
import classicCbRadios from "@/data/nostalgia-trivia/classic-cb-radios.json";
import classicCerealBrands from "@/data/nostalgia-trivia/classic-cereal-brands.json";
import classicChildrensBooks from "@/data/nostalgia-trivia/classic-childrens-books.json";
import classicChildrensTv from "@/data/nostalgia-trivia/classic-childrens-tv.json";
import classicChristmasSpecials from "@/data/nostalgia-trivia/classic-christmas-specials.json";
import classicClocksWatches from "@/data/nostalgia-trivia/classic-clocks-watches.json";
import classicClothingBrands from "@/data/nostalgia-trivia/classic-clothing-brands.json";
import classicCoinCollecting from "@/data/nostalgia-trivia/classic-coin-collecting.json";
import classicComedyDuos from "@/data/nostalgia-trivia/classic-comedy-duos.json";
import classicCommercials from "@/data/nostalgia-trivia/classic-commercials.json";
import classicCountryMusic from "@/data/nostalgia-trivia/classic-country-music.json";
import classicCourtroomDramas from "@/data/nostalgia-trivia/classic-courtroom-dramas.json";
import classicCricketLegends from "@/data/nostalgia-trivia/classic-cricket-legends.json";
import classicCrooners from "@/data/nostalgia-trivia/classic-crooners.json";
import classicDanceCrazes from "@/data/nostalgia-trivia/classic-dance-crazes.json";
import classicDepartmentStoreMemories from "@/data/nostalgia-trivia/classic-department-store-memories.json";
import classicDepartmentStores from "@/data/nostalgia-trivia/classic-department-stores.json";
import classicDetectiveShows from "@/data/nostalgia-trivia/classic-detective-shows.json";
import classicDinerFood from "@/data/nostalgia-trivia/classic-diner-food.json";
import classicDinersDriveIns from "@/data/nostalgia-trivia/classic-diners-drive-ins.json";
import classicDiscoEra from "@/data/nostalgia-trivia/classic-disco-era.json";
import classicDisneyAnimatedFilms from "@/data/nostalgia-trivia/classic-disney-animated-films.json";
import classicFabricTextileTrends from "@/data/nostalgia-trivia/classic-fabric-textile-trends.json";
import classicFamilySitcoms from "@/data/nostalgia-trivia/classic-family-sitcoms.json";
import classicFashionMagazines from "@/data/nostalgia-trivia/classic-fashion-magazines.json";
import classicFigureSkating from "@/data/nostalgia-trivia/classic-figure-skating.json";
import classicFilmNoir from "@/data/nostalgia-trivia/classic-film-noir.json";
import classicFolkMusic from "@/data/nostalgia-trivia/classic-folk-music.json";
import classicFoodCommercials from "@/data/nostalgia-trivia/classic-food-commercials.json";
import classicFoodMascots from "@/data/nostalgia-trivia/classic-food-mascots.json";
import classicGameShowHosts from "@/data/nostalgia-trivia/classic-game-show-hosts.json";
import classicGameShows from "@/data/nostalgia-trivia/classic-game-shows.json";
import classicGardeningClubs from "@/data/nostalgia-trivia/classic-gardening-clubs.json";
import classicGirlGroups from "@/data/nostalgia-trivia/classic-girl-groups.json";
import classicGolfLegends from "@/data/nostalgia-trivia/classic-golf-legends.json";
import classicGospelMusic from "@/data/nostalgia-trivia/classic-gospel-music.json";
import classicHandbagHistory from "@/data/nostalgia-trivia/classic-handbag-history.json";
import classicHiFiEquipment from "@/data/nostalgia-trivia/classic-hi-fi-equipment.json";
import classicHockeyLegends from "@/data/nostalgia-trivia/classic-hockey-legends.json";
import classicHollywood from "@/data/nostalgia-trivia/classic-hollywood.json";
import classicHomeStereos from "@/data/nostalgia-trivia/classic-home-stereos.json";
import classicHorrorMovies from "@/data/nostalgia-trivia/classic-horror-movies.json";
import classicJazzMusic from "@/data/nostalgia-trivia/classic-jazz-music.json";
import classicJingles from "@/data/nostalgia-trivia/classic-jingles.json";
import classicJumpRopeGames from "@/data/nostalgia-trivia/classic-jump-rope-games.json";
import classicKitchenAppliances from "@/data/nostalgia-trivia/classic-kitchen-appliances.json";
import classicLingerieFoundations from "@/data/nostalgia-trivia/classic-lingerie-foundations.json";
import classicMarbleGames from "@/data/nostalgia-trivia/classic-marble-games.json";
import classicMenswearAccessories from "@/data/nostalgia-trivia/classic-menswear-accessories.json";
import classicMiniaturePainting from "@/data/nostalgia-trivia/classic-miniature-painting.json";
import classicMovieCarsChases from "@/data/nostalgia-trivia/classic-movie-cars-chases.json";
import classicMovieCouples from "@/data/nostalgia-trivia/classic-movie-couples.json";
import classicMovieDanceScenes from "@/data/nostalgia-trivia/classic-movie-dance-scenes.json";
import classicMovieMonsters from "@/data/nostalgia-trivia/classic-movie-monsters.json";
import classicMovieQuotes from "@/data/nostalgia-trivia/classic-movie-quotes.json";
import classicMovieSidekicks from "@/data/nostalgia-trivia/classic-movie-sidekicks.json";
import classicMovieSoundtracks from "@/data/nostalgia-trivia/classic-movie-soundtracks.json";
import classicMovieTaglines from "@/data/nostalgia-trivia/classic-movie-taglines.json";
import classicMovieVillains from "@/data/nostalgia-trivia/classic-movie-villains.json";
import classicMusicFestivals from "@/data/nostalgia-trivia/classic-music-festivals.json";
import classicMusicOneHitWonders from "@/data/nostalgia-trivia/classic-music-one-hit-wonders.json";
import classicMusicals from "@/data/nostalgia-trivia/classic-musicals.json";
import classicMysteryNovels from "@/data/nostalgia-trivia/classic-mystery-novels.json";
import classicOlympicMoments from "@/data/nostalgia-trivia/classic-olympic-moments.json";
import classicOutdoorGames from "@/data/nostalgia-trivia/classic-outdoor-games.json";
import classicPerfumesColognes from "@/data/nostalgia-trivia/classic-perfumes-colognes.json";
import classicPlaygroundEquipment from "@/data/nostalgia-trivia/classic-playground-equipment.json";
import classicPowerTools from "@/data/nostalgia-trivia/classic-power-tools.json";
import classicQuiltingBees from "@/data/nostalgia-trivia/classic-quilting-bees.json";
import classicRadioShows from "@/data/nostalgia-trivia/classic-radio-shows.json";
import classicRadio from "@/data/nostalgia-trivia/classic-radio.json";
import classicRecessGames from "@/data/nostalgia-trivia/classic-recess-games.json";
import classicRockBands from "@/data/nostalgia-trivia/classic-rock-bands.json";
import classicRockCollecting from "@/data/nostalgia-trivia/classic-rock-collecting.json";
import classicRockabilly from "@/data/nostalgia-trivia/classic-rockabilly.json";
import classicRomanceMovies from "@/data/nostalgia-trivia/classic-romance-movies.json";
import classicRotaryPhones from "@/data/nostalgia-trivia/classic-rotary-phones.json";
import classicSciFiMovies from "@/data/nostalgia-trivia/classic-sci-fi-movies.json";
import classicSitcomCatchphrases from "@/data/nostalgia-trivia/classic-sitcom-catchphrases.json";
import classicSitcomFamilies from "@/data/nostalgia-trivia/classic-sitcom-families.json";
import classicSnackFoodsFifties from "@/data/nostalgia-trivia/classic-snack-foods-fifties.json";
import classicSoapOperas from "@/data/nostalgia-trivia/classic-soap-operas.json";
import classicSodaFountains from "@/data/nostalgia-trivia/classic-soda-fountains.json";
import classicSoulMusic from "@/data/nostalgia-trivia/classic-soul-music.json";
import classicSports from "@/data/nostalgia-trivia/classic-sports.json";
import classicSpyMovies from "@/data/nostalgia-trivia/classic-spy-movies.json";
import classicSquareDancing from "@/data/nostalgia-trivia/classic-square-dancing.json";
import classicSwingMusic from "@/data/nostalgia-trivia/classic-swing-music.json";
import classicTableTennis from "@/data/nostalgia-trivia/classic-table-tennis.json";
import classicTennisStars from "@/data/nostalgia-trivia/classic-tennis-stars.json";
import classicThemeParks from "@/data/nostalgia-trivia/classic-theme-parks.json";
import classicTinToys from "@/data/nostalgia-trivia/classic-tin-toys.json";
import classicToySoldiers from "@/data/nostalgia-trivia/classic-toy-soldiers.json";
import classicTvAddressesLocations from "@/data/nostalgia-trivia/classic-tv-addresses-locations.json";
import classicTvAnimals from "@/data/nostalgia-trivia/classic-tv-animals.json";
import classicTvCouples from "@/data/nostalgia-trivia/classic-tv-couples.json";
import classicTvCowboys from "@/data/nostalgia-trivia/classic-tv-cowboys.json";
import classicTvDetectives from "@/data/nostalgia-trivia/classic-tv-detectives.json";
import classicTvDinners from "@/data/nostalgia-trivia/classic-tv-dinners.json";
import classicTvDoctors from "@/data/nostalgia-trivia/classic-tv-doctors.json";
import classicTvLawyers from "@/data/nostalgia-trivia/classic-tv-lawyers.json";
import classicTvSponsorsAds from "@/data/nostalgia-trivia/classic-tv-sponsors-ads.json";
import classicTvThemeSongs from "@/data/nostalgia-trivia/classic-tv-theme-songs.json";
import classicTvWesternsQuiz from "@/data/nostalgia-trivia/classic-tv-westerns-quiz.json";
import classicTv from "@/data/nostalgia-trivia/classic-tv.json";
import classicVacuumCleaners from "@/data/nostalgia-trivia/classic-vacuum-cleaners.json";
import classicVarietyShows from "@/data/nostalgia-trivia/classic-variety-shows.json";
import classicWarMovies from "@/data/nostalgia-trivia/classic-war-movies.json";
import classicWeightliftingLegends from "@/data/nostalgia-trivia/classic-weightlifting-legends.json";
import classicWesternsTv from "@/data/nostalgia-trivia/classic-westerns-tv.json";
import classicWesterns from "@/data/nostalgia-trivia/classic-westerns.json";
import classicWoodenToys from "@/data/nostalgia-trivia/classic-wooden-toys.json";
import classicYoYoTricks from "@/data/nostalgia-trivia/classic-yo-yo-tricks.json";
import coldWarMemories from "@/data/nostalgia-trivia/cold-war-memories.json";
import cubanMissileCrisisQuiz from "@/data/nostalgia-trivia/cuban-missile-crisis-quiz.json";
import dDayAndWwiiBattles from "@/data/nostalgia-trivia/d-day-and-wwii-battles.json";
import decadeFashions from "@/data/nostalgia-trivia/decade-fashions.json";
import dickVanDykeShowTrivia from "@/data/nostalgia-trivia/dick-van-dyke-show-trivia.json";
import dooWopClassics from "@/data/nostalgia-trivia/doo-wop-classics.json";
import earlyColorTvShows from "@/data/nostalgia-trivia/early-color-tv-shows.json";
import earlyTvAnthologyDramas from "@/data/nostalgia-trivia/early-tv-anthology-dramas.json";
import earlyTvGameShows from "@/data/nostalgia-trivia/early-tv-game-shows.json";
import earlyTvTalkShows from "@/data/nostalgia-trivia/early-tv-talk-shows.json";
import eightiesNostalgia from "@/data/nostalgia-trivia/eighties-nostalgia.json";
import elvisPresleyKing from "@/data/nostalgia-trivia/elvis-presley-king.json";
import famousCouples from "@/data/nostalgia-trivia/famous-couples.json";
import famousMovieDirectors from "@/data/nostalgia-trivia/famous-movie-directors.json";
import famousSpeechesHistory from "@/data/nostalgia-trivia/famous-speeches-history.json";
import famousTvCatchphrases from "@/data/nostalgia-trivia/famous-tv-catchphrases.json";
import fiftiesFashionTrends from "@/data/nostalgia-trivia/fifties-fashion-trends.json";
import fiftiesNostalgia from "@/data/nostalgia-trivia/fifties-nostalgia.json";
import fiftiesTvKidsShows from "@/data/nostalgia-trivia/fifties-tv-kids-shows.json";
import finishTheLyric from "@/data/nostalgia-trivia/finish-the-lyric.json";
import goldenAgeMovieStudios from "@/data/nostalgia-trivia/golden-age-movie-studios.json";
import goldenAgeTvComedians from "@/data/nostalgia-trivia/golden-age-tv-comedians.json";
import hitchcockMovieTrivia from "@/data/nostalgia-trivia/hitchcock-movie-trivia.json";
import iLoveLucyTrivia from "@/data/nostalgia-trivia/i-love-lucy-trivia.json";
import iconicNewsMoments from "@/data/nostalgia-trivia/iconic-news-moments.json";
import jfkAssassinationQuiz from "@/data/nostalgia-trivia/jfk-assassination-quiz.json";
import johnWayneMovieTrivia from "@/data/nostalgia-trivia/john-wayne-movie-trivia.json";
import koreanWarQuiz from "@/data/nostalgia-trivia/korean-war-quiz.json";
import moonLandingMemories from "@/data/nostalgia-trivia/moon-landing-memories.json";
import motownLegends from "@/data/nostalgia-trivia/motown-legends.json";
import nameTheDecade from "@/data/nostalgia-trivia/name-the-decade.json";
import oldFashionedHomeRecipes from "@/data/nostalgia-trivia/old-fashioned-home-recipes.json";
import oldHollywoodGlamour from "@/data/nostalgia-trivia/old-hollywood-glamour.json";
import oldSchoolPlayground from "@/data/nostalgia-trivia/old-school-playground.json";
import postWarAmerica from "@/data/nostalgia-trivia/post-war-america.json";
import presidentialAssassinationsAttempts from "@/data/nostalgia-trivia/presidential-assassinations-attempts.json";
import retroAirConditioning from "@/data/nostalgia-trivia/retro-air-conditioning.json";
import retroArcadeGames from "@/data/nostalgia-trivia/retro-arcade-games.json";
import retroBarbecueGrilling from "@/data/nostalgia-trivia/retro-barbecue-grilling.json";
import retroBeachCulture from "@/data/nostalgia-trivia/retro-beach-culture.json";
import retroBicycles from "@/data/nostalgia-trivia/retro-bicycles.json";
import retroBowlingCulture from "@/data/nostalgia-trivia/retro-bowling-culture.json";
import retroBreakfastCereals from "@/data/nostalgia-trivia/retro-breakfast-cereals.json";
import retroBuildingToys from "@/data/nostalgia-trivia/retro-building-toys.json";
import retroCampingOutdoors from "@/data/nostalgia-trivia/retro-camping-outdoors.json";
import retroCandyBars from "@/data/nostalgia-trivia/retro-candy-bars.json";
import retroCardGames from "@/data/nostalgia-trivia/retro-card-games.json";
import retroCbRadioHobby from "@/data/nostalgia-trivia/retro-cb-radio-hobby.json";
import retroChemistrySets from "@/data/nostalgia-trivia/retro-chemistry-sets.json";
import retroChildrensFashion from "@/data/nostalgia-trivia/retro-childrens-fashion.json";
import retroCocktailsDrinks from "@/data/nostalgia-trivia/retro-cocktails-drinks.json";
import retroComicBooks from "@/data/nostalgia-trivia/retro-comic-books.json";
import retroCookbooksKitchen from "@/data/nostalgia-trivia/retro-cookbooks-kitchen.json";
import retroCyclingChampions from "@/data/nostalgia-trivia/retro-cycling-champions.json";
import retroDanceMoves from "@/data/nostalgia-trivia/retro-dance-moves.json";
import retroDenimJeansHistory from "@/data/nostalgia-trivia/retro-denim-jeans-history.json";
import retroDiscoFashion from "@/data/nostalgia-trivia/retro-disco-fashion.json";
import retroDollsQuiz from "@/data/nostalgia-trivia/retro-dolls-quiz.json";
import retroDriveInFood from "@/data/nostalgia-trivia/retro-drive-in-food.json";
import retroDriveInMovies from "@/data/nostalgia-trivia/retro-drive-in-movies.json";
import retroDriveInRestaurants from "@/data/nostalgia-trivia/retro-drive-in-restaurants.json";
import retroElectricRazors from "@/data/nostalgia-trivia/retro-electric-razors.json";
import retroElectricTrains from "@/data/nostalgia-trivia/retro-electric-trains.json";
import retroFashionIcons from "@/data/nostalgia-trivia/retro-fashion-icons.json";
import retroFootballHeroes from "@/data/nostalgia-trivia/retro-football-heroes.json";
import retroFrozenFoods from "@/data/nostalgia-trivia/retro-frozen-foods.json";
import retroHairstyles from "@/data/nostalgia-trivia/retro-hairstyles.json";
import retroHamRadio from "@/data/nostalgia-trivia/retro-ham-radio.json";
import retroHikingMountaineering from "@/data/nostalgia-trivia/retro-hiking-mountaineering.json";
import retroHolidayRecipes from "@/data/nostalgia-trivia/retro-holiday-recipes.json";
import retroHomeDeliveries from "@/data/nostalgia-trivia/retro-home-deliveries.json";
import retroHomeProjectors from "@/data/nostalgia-trivia/retro-home-projectors.json";
import retroJukeboxes from "@/data/nostalgia-trivia/retro-jukeboxes.json";
import retroKitchenTools from "@/data/nostalgia-trivia/retro-kitchen-tools.json";
import retroKnittingCrochet from "@/data/nostalgia-trivia/retro-knitting-crochet.json";
import retroLawnGardenTools from "@/data/nostalgia-trivia/retro-lawn-garden-tools.json";
import retroLeatherTooling from "@/data/nostalgia-trivia/retro-leather-tooling.json";
import retroMacrameCrafts from "@/data/nostalgia-trivia/retro-macrame-crafts.json";
import retroMensFashion from "@/data/nostalgia-trivia/retro-mens-fashion.json";
import retroMetalDetecting from "@/data/nostalgia-trivia/retro-metal-detecting.json";
import retroMilitaryFashionInfluence from "@/data/nostalgia-trivia/retro-military-fashion-influence.json";
import retroModelKits from "@/data/nostalgia-trivia/retro-model-kits.json";
import retroModelRailroads from "@/data/nostalgia-trivia/retro-model-railroads.json";
import retroMovieStars from "@/data/nostalgia-trivia/retro-movie-stars.json";
import retroPetTrends from "@/data/nostalgia-trivia/retro-pet-trends.json";
import retroPhoneHistory from "@/data/nostalgia-trivia/retro-phone-history.json";
import retroPinballMachines from "@/data/nostalgia-trivia/retro-pinball-machines.json";
import retroPizzaHistory from "@/data/nostalgia-trivia/retro-pizza-history.json";
import retroPotteryCeramics from "@/data/nostalgia-trivia/retro-pottery-ceramics.json";
import retroPromMemories from "@/data/nostalgia-trivia/retro-prom-memories.json";
import retroRollerSkating from "@/data/nostalgia-trivia/retro-roller-skating.json";
import retroSchoolDays from "@/data/nostalgia-trivia/retro-school-days.json";
import retroSchoolLunches from "@/data/nostalgia-trivia/retro-school-lunches.json";
import retroSewingCrafts from "@/data/nostalgia-trivia/retro-sewing-crafts.json";
import retroShoeFashions from "@/data/nostalgia-trivia/retro-shoe-fashions.json";
import retroSkiingCulture from "@/data/nostalgia-trivia/retro-skiing-culture.json";
import retroSlang from "@/data/nostalgia-trivia/retro-slang.json";
import retroStateFairs from "@/data/nostalgia-trivia/retro-state-fairs.json";
import retroStationWagons from "@/data/nostalgia-trivia/retro-station-wagons.json";
import retroSummerCamps from "@/data/nostalgia-trivia/retro-summer-camps.json";
import retroSwimmingHeroes from "@/data/nostalgia-trivia/retro-swimming-heroes.json";
import retroSwimwearStyles from "@/data/nostalgia-trivia/retro-swimwear-styles.json";
import retroTapeRecorders from "@/data/nostalgia-trivia/retro-tape-recorders.json";
import retroTechnology from "@/data/nostalgia-trivia/retro-technology.json";
import retroTeenFashion from "@/data/nostalgia-trivia/retro-teen-fashion.json";
import retroTelephones from "@/data/nostalgia-trivia/retro-telephones.json";
import retroTelevisionAntennas from "@/data/nostalgia-trivia/retro-television-antennas.json";
import retroToyCommercials from "@/data/nostalgia-trivia/retro-toy-commercials.json";
import retroToysDolls from "@/data/nostalgia-trivia/retro-toys-dolls.json";
import retroTvThemes from "@/data/nostalgia-trivia/retro-tv-themes.json";
import retroVolleyballHistory from "@/data/nostalgia-trivia/retro-volleyball-history.json";
import retroWindUpToys from "@/data/nostalgia-trivia/retro-wind-up-toys.json";
import retroWrestlingLegends from "@/data/nostalgia-trivia/retro-wrestling-legends.json";
import seventiesNostalgia from "@/data/nostalgia-trivia/seventies-nostalgia.json";
import sixtiesMusic from "@/data/nostalgia-trivia/sixties-music.json";
import sixtiesNostalgia from "@/data/nostalgia-trivia/sixties-nostalgia.json";
import sixtiesTvAdventureShows from "@/data/nostalgia-trivia/sixties-tv-adventure-shows.json";
import sixtiesTvSupernaturalSitcoms from "@/data/nostalgia-trivia/sixties-tv-supernatural-sitcoms.json";
import spaceRaceQuiz from "@/data/nostalgia-trivia/space-race-quiz.json";
import tvMedicalShowsEarly from "@/data/nostalgia-trivia/tv-medical-shows-early.json";
import tvMilitaryComedies from "@/data/nostalgia-trivia/tv-military-comedies.json";
import tvNetworkHistoryFiftiesSixties from "@/data/nostalgia-trivia/tv-network-history-fifties-sixties.json";
import tvRuralComedies from "@/data/nostalgia-trivia/tv-rural-comedies.json";
import tvSciFiFantasySixties from "@/data/nostalgia-trivia/tv-sci-fi-fantasy-sixties.json";
import tvSitcomNeighborsFriends from "@/data/nostalgia-trivia/tv-sitcom-neighbors-friends.json";
import tvSpyShowsSixties from "@/data/nostalgia-trivia/tv-spy-shows-sixties.json";
import vietnamWarEra from "@/data/nostalgia-trivia/vietnam-war-era.json";
import vintageAdvertisements from "@/data/nostalgia-trivia/vintage-advertisements.json";
import vintageAntiqueCollecting from "@/data/nostalgia-trivia/vintage-antique-collecting.json";
import vintageApplianceAds from "@/data/nostalgia-trivia/vintage-appliance-ads.json";
import vintageApplianceBrands from "@/data/nostalgia-trivia/vintage-appliance-brands.json";
import vintageArcheryShooting from "@/data/nostalgia-trivia/vintage-archery-shooting.json";
import vintageBarbershops from "@/data/nostalgia-trivia/vintage-barbershops.json";
import vintageBasketballPioneers from "@/data/nostalgia-trivia/vintage-basketball-pioneers.json";
import vintageBeautyParlors from "@/data/nostalgia-trivia/vintage-beauty-parlors.json";
import vintageBoardGames from "@/data/nostalgia-trivia/vintage-board-games.json";
import vintageBoxingChampions from "@/data/nostalgia-trivia/vintage-boxing-champions.json";
import vintageBreakfastFoods from "@/data/nostalgia-trivia/vintage-breakfast-foods.json";
import vintageCakeMixes from "@/data/nostalgia-trivia/vintage-cake-mixes.json";
import vintageCalculators from "@/data/nostalgia-trivia/vintage-calculators.json";
import vintageCalligraphyHobby from "@/data/nostalgia-trivia/vintage-calligraphy-hobby.json";
import vintageCameras from "@/data/nostalgia-trivia/vintage-cameras.json";
import vintageCandleMaking from "@/data/nostalgia-trivia/vintage-candle-making.json";
import vintageCannedGoods from "@/data/nostalgia-trivia/vintage-canned-goods.json";
import vintageCarModels from "@/data/nostalgia-trivia/vintage-car-models.json";
import vintageCircusCarnival from "@/data/nostalgia-trivia/vintage-circus-carnival.json";
import vintageCoffeeBrands from "@/data/nostalgia-trivia/vintage-coffee-brands.json";
import vintageComicBookHeroes from "@/data/nostalgia-trivia/vintage-comic-book-heroes.json";
import vintageComicStrips from "@/data/nostalgia-trivia/vintage-comic-strips.json";
import vintageDecoupageCrafts from "@/data/nostalgia-trivia/vintage-decoupage-crafts.json";
import vintageDiners from "@/data/nostalgia-trivia/vintage-diners.json";
import vintageElectricFans from "@/data/nostalgia-trivia/vintage-electric-fans.json";
import vintageEyewearStyles from "@/data/nostalgia-trivia/vintage-eyewear-styles.json";
import vintageFastFoodChains from "@/data/nostalgia-trivia/vintage-fast-food-chains.json";
import vintageFishingLures from "@/data/nostalgia-trivia/vintage-fishing-lures.json";
import vintageFishingTraditions from "@/data/nostalgia-trivia/vintage-fishing-traditions.json";
import vintageFlyTying from "@/data/nostalgia-trivia/vintage-fly-tying.json";
import vintageFurCoatEra from "@/data/nostalgia-trivia/vintage-fur-coat-era.json";
import vintageGasStations from "@/data/nostalgia-trivia/vintage-gas-stations.json";
import vintageGloveFashion from "@/data/nostalgia-trivia/vintage-glove-fashion.json";
import vintageGroceryStores from "@/data/nostalgia-trivia/vintage-grocery-stores.json";
import vintageGymnasticsStars from "@/data/nostalgia-trivia/vintage-gymnastics-stars.json";
import vintageHandTools from "@/data/nostalgia-trivia/vintage-hand-tools.json";
import vintageHatStyles from "@/data/nostalgia-trivia/vintage-hat-styles.json";
import vintageHolidayTraditions from "@/data/nostalgia-trivia/vintage-holiday-traditions.json";
import vintageHomeDecor from "@/data/nostalgia-trivia/vintage-home-decor.json";
import vintageHomeHeating from "@/data/nostalgia-trivia/vintage-home-heating.json";
import vintageHomeLighting from "@/data/nostalgia-trivia/vintage-home-lighting.json";
import vintageHorseRacing from "@/data/nostalgia-trivia/vintage-horse-racing.json";
import vintageHouseholdItems from "@/data/nostalgia-trivia/vintage-household-items.json";
import vintageIceCream from "@/data/nostalgia-trivia/vintage-ice-cream.json";
import vintageJelloRecipes from "@/data/nostalgia-trivia/vintage-jello-recipes.json";
import vintageJewelryFashion from "@/data/nostalgia-trivia/vintage-jewelry-fashion.json";
import vintageKitchenBrands from "@/data/nostalgia-trivia/vintage-kitchen-brands.json";
import vintageKitchenGadgets from "@/data/nostalgia-trivia/vintage-kitchen-gadgets.json";
import vintageLunchBoxes from "@/data/nostalgia-trivia/vintage-lunch-boxes.json";
import vintageMakeupTrends from "@/data/nostalgia-trivia/vintage-makeup-trends.json";
import vintageMilkDelivery from "@/data/nostalgia-trivia/vintage-milk-delivery.json";
import vintageMovieTheaters from "@/data/nostalgia-trivia/vintage-movie-theaters.json";
import vintageNewspapers from "@/data/nostalgia-trivia/vintage-newspapers.json";
import vintageNylonStockingEra from "@/data/nostalgia-trivia/vintage-nylon-stocking-era.json";
import vintagePhotographyHobby from "@/data/nostalgia-trivia/vintage-photography-hobby.json";
import vintagePhotography from "@/data/nostalgia-trivia/vintage-photography.json";
import vintagePlayKitchens from "@/data/nostalgia-trivia/vintage-play-kitchens.json";
import vintagePostcards from "@/data/nostalgia-trivia/vintage-postcards.json";
import vintageRadios from "@/data/nostalgia-trivia/vintage-radios.json";
import vintageRecordPlayers from "@/data/nostalgia-trivia/vintage-record-players.json";
import vintageRefrigerators from "@/data/nostalgia-trivia/vintage-refrigerators.json";
import vintageSailingRegattas from "@/data/nostalgia-trivia/vintage-sailing-regattas.json";
import vintageSchoolSupplies from "@/data/nostalgia-trivia/vintage-school-supplies.json";
import vintageSewingMachines from "@/data/nostalgia-trivia/vintage-sewing-machines.json";
import vintageSodaBrands from "@/data/nostalgia-trivia/vintage-soda-brands.json";
import vintageStampCollecting from "@/data/nostalgia-trivia/vintage-stamp-collecting.json";
import vintageStuffedAnimals from "@/data/nostalgia-trivia/vintage-stuffed-animals.json";
import vintageTeaPartyToys from "@/data/nostalgia-trivia/vintage-tea-party-toys.json";
import vintageTelevisionAds from "@/data/nostalgia-trivia/vintage-television-ads.json";
import vintageTelevisionSets from "@/data/nostalgia-trivia/vintage-television-sets.json";
import vintageToastersIrons from "@/data/nostalgia-trivia/vintage-toasters-irons.json";
import vintageToyBrands from "@/data/nostalgia-trivia/vintage-toy-brands.json";
import vintageToyCatalogs from "@/data/nostalgia-trivia/vintage-toy-catalogs.json";
import vintageToyTrucks from "@/data/nostalgia-trivia/vintage-toy-trucks.json";
import vintageToys from "@/data/nostalgia-trivia/vintage-toys.json";
import vintageTrackField from "@/data/nostalgia-trivia/vintage-track-field.json";
import vintageTrainSets from "@/data/nostalgia-trivia/vintage-train-sets.json";
import vintageTrains from "@/data/nostalgia-trivia/vintage-trains.json";
import vintageTravelPosters from "@/data/nostalgia-trivia/vintage-travel-posters.json";
import vintageTypewriters from "@/data/nostalgia-trivia/vintage-typewriters.json";
import vintageVinylRecords from "@/data/nostalgia-trivia/vintage-vinyl-records.json";
import vintageWashingMachines from "@/data/nostalgia-trivia/vintage-washing-machines.json";
import vintageWeddingFashions from "@/data/nostalgia-trivia/vintage-wedding-fashions.json";
import vintageWoodworkingHobby from "@/data/nostalgia-trivia/vintage-woodworking-hobby.json";
import watergateScandalQuiz from "@/data/nostalgia-trivia/watergate-scandal-quiz.json";
import woodstockMusicFestivals from "@/data/nostalgia-trivia/woodstock-music-festivals.json";
import wwiiHomeFront from "@/data/nostalgia-trivia/wwii-home-front.json";

const quizzes: Quiz[] = [
  q1930sScrewballComedies as Quiz,
  q1940sWarFilms as Quiz,
  q1940sWartimeCulture as Quiz,
  q1950sAmericaQuiz as Quiz,
  q1950sMovieMusicals as Quiz,
  q1950sRadioDramas as Quiz,
  q1950sRebelMovies as Quiz,
  q1950sRockAndRollPioneers as Quiz,
  q1950sSitcomStars as Quiz,
  q1960sBritishInvasion as Quiz,
  q1960sEpicMovies as Quiz,
  q1960sPresidentialEra as Quiz,
  q1960sPsychedelicRock as Quiz,
  q1960sSocialChange as Quiz,
  q1960sSurfMusic as Quiz,
  q1960sVarietyShowActs as Quiz,
  q1970sBlockbusters as Quiz,
  q1970sCulturalMoments as Quiz,
  q1970sEnergyCrisis as Quiz,
  q1970sHardRock as Quiz,
  q1970sPoliticalEvents as Quiz,
  q1970sProgressiveRock as Quiz,
  q1970sPunkRock as Quiz,
  q1970sSoftRock as Quiz,
  q1970sSouthernRock as Quiz,
  q1980sMtvEra as Quiz,
  q1980sNewWave as Quiz,
  q1980sPowerBallads as Quiz,
  q1980sTeenMovies as Quiz,
  q1980sWorldEvents as Quiz,
  andyGriffithShowTrivia as Quiz,
  babyBoomerMilestones as Quiz,
  berlinWallHistory as Quiz,
  bibleTrivia as Quiz,
  bigBandEra as Quiz,
  civilRightsMovementQuiz as Quiz,
  classicAcademyAwards as Quiz,
  classicAdventureMovies as Quiz,
  classicAnimatedMovies as Quiz,
  classicAutoRacing as Quiz,
  classicBakingBrands as Quiz,
  classicBaseballLegends as Quiz,
  classicBiblicalEpics as Quiz,
  classicBirdWatching as Quiz,
  classicBluesLegends as Quiz,
  classicBoardGames as Quiz,
  classicBridgeClubs as Quiz,
  classicCandy as Quiz,
  classicCapGuns as Quiz,
  classicCars as Quiz,
  classicCartoonCharacters as Quiz,
  classicCartoons as Quiz,
  classicCaryGrantMovies as Quiz,
  classicCbRadios as Quiz,
  classicCerealBrands as Quiz,
  classicChildrensBooks as Quiz,
  classicChildrensTv as Quiz,
  classicChristmasSpecials as Quiz,
  classicClocksWatches as Quiz,
  classicClothingBrands as Quiz,
  classicCoinCollecting as Quiz,
  classicComedyDuos as Quiz,
  classicCommercials as Quiz,
  classicCountryMusic as Quiz,
  classicCourtroomDramas as Quiz,
  classicCricketLegends as Quiz,
  classicCrooners as Quiz,
  classicDanceCrazes as Quiz,
  classicDepartmentStoreMemories as Quiz,
  classicDepartmentStores as Quiz,
  classicDetectiveShows as Quiz,
  classicDinerFood as Quiz,
  classicDinersDriveIns as Quiz,
  classicDiscoEra as Quiz,
  classicDisneyAnimatedFilms as Quiz,
  classicFabricTextileTrends as Quiz,
  classicFamilySitcoms as Quiz,
  classicFashionMagazines as Quiz,
  classicFigureSkating as Quiz,
  classicFilmNoir as Quiz,
  classicFolkMusic as Quiz,
  classicFoodCommercials as Quiz,
  classicFoodMascots as Quiz,
  classicGameShowHosts as Quiz,
  classicGameShows as Quiz,
  classicGardeningClubs as Quiz,
  classicGirlGroups as Quiz,
  classicGolfLegends as Quiz,
  classicGospelMusic as Quiz,
  classicHandbagHistory as Quiz,
  classicHiFiEquipment as Quiz,
  classicHockeyLegends as Quiz,
  classicHollywood as Quiz,
  classicHomeStereos as Quiz,
  classicHorrorMovies as Quiz,
  classicJazzMusic as Quiz,
  classicJingles as Quiz,
  classicJumpRopeGames as Quiz,
  classicKitchenAppliances as Quiz,
  classicLingerieFoundations as Quiz,
  classicMarbleGames as Quiz,
  classicMenswearAccessories as Quiz,
  classicMiniaturePainting as Quiz,
  classicMovieCarsChases as Quiz,
  classicMovieCouples as Quiz,
  classicMovieDanceScenes as Quiz,
  classicMovieMonsters as Quiz,
  classicMovieQuotes as Quiz,
  classicMovieSidekicks as Quiz,
  classicMovieSoundtracks as Quiz,
  classicMovieTaglines as Quiz,
  classicMovieVillains as Quiz,
  classicMusicFestivals as Quiz,
  classicMusicOneHitWonders as Quiz,
  classicMusicals as Quiz,
  classicMysteryNovels as Quiz,
  classicOlympicMoments as Quiz,
  classicOutdoorGames as Quiz,
  classicPerfumesColognes as Quiz,
  classicPlaygroundEquipment as Quiz,
  classicPowerTools as Quiz,
  classicQuiltingBees as Quiz,
  classicRadioShows as Quiz,
  classicRadio as Quiz,
  classicRecessGames as Quiz,
  classicRockBands as Quiz,
  classicRockCollecting as Quiz,
  classicRockabilly as Quiz,
  classicRomanceMovies as Quiz,
  classicRotaryPhones as Quiz,
  classicSciFiMovies as Quiz,
  classicSitcomCatchphrases as Quiz,
  classicSitcomFamilies as Quiz,
  classicSnackFoodsFifties as Quiz,
  classicSoapOperas as Quiz,
  classicSodaFountains as Quiz,
  classicSoulMusic as Quiz,
  classicSports as Quiz,
  classicSpyMovies as Quiz,
  classicSquareDancing as Quiz,
  classicSwingMusic as Quiz,
  classicTableTennis as Quiz,
  classicTennisStars as Quiz,
  classicThemeParks as Quiz,
  classicTinToys as Quiz,
  classicToySoldiers as Quiz,
  classicTvAddressesLocations as Quiz,
  classicTvAnimals as Quiz,
  classicTvCouples as Quiz,
  classicTvCowboys as Quiz,
  classicTvDetectives as Quiz,
  classicTvDinners as Quiz,
  classicTvDoctors as Quiz,
  classicTvLawyers as Quiz,
  classicTvSponsorsAds as Quiz,
  classicTvThemeSongs as Quiz,
  classicTvWesternsQuiz as Quiz,
  classicTv as Quiz,
  classicVacuumCleaners as Quiz,
  classicVarietyShows as Quiz,
  classicWarMovies as Quiz,
  classicWeightliftingLegends as Quiz,
  classicWesternsTv as Quiz,
  classicWesterns as Quiz,
  classicWoodenToys as Quiz,
  classicYoYoTricks as Quiz,
  coldWarMemories as Quiz,
  cubanMissileCrisisQuiz as Quiz,
  dDayAndWwiiBattles as Quiz,
  decadeFashions as Quiz,
  dickVanDykeShowTrivia as Quiz,
  dooWopClassics as Quiz,
  earlyColorTvShows as Quiz,
  earlyTvAnthologyDramas as Quiz,
  earlyTvGameShows as Quiz,
  earlyTvTalkShows as Quiz,
  eightiesNostalgia as Quiz,
  elvisPresleyKing as Quiz,
  famousCouples as Quiz,
  famousMovieDirectors as Quiz,
  famousSpeechesHistory as Quiz,
  famousTvCatchphrases as Quiz,
  fiftiesFashionTrends as Quiz,
  fiftiesNostalgia as Quiz,
  fiftiesTvKidsShows as Quiz,
  finishTheLyric as Quiz,
  goldenAgeMovieStudios as Quiz,
  goldenAgeTvComedians as Quiz,
  hitchcockMovieTrivia as Quiz,
  iLoveLucyTrivia as Quiz,
  iconicNewsMoments as Quiz,
  jfkAssassinationQuiz as Quiz,
  johnWayneMovieTrivia as Quiz,
  koreanWarQuiz as Quiz,
  moonLandingMemories as Quiz,
  motownLegends as Quiz,
  nameTheDecade as Quiz,
  oldFashionedHomeRecipes as Quiz,
  oldHollywoodGlamour as Quiz,
  oldSchoolPlayground as Quiz,
  postWarAmerica as Quiz,
  presidentialAssassinationsAttempts as Quiz,
  retroAirConditioning as Quiz,
  retroArcadeGames as Quiz,
  retroBarbecueGrilling as Quiz,
  retroBeachCulture as Quiz,
  retroBicycles as Quiz,
  retroBowlingCulture as Quiz,
  retroBreakfastCereals as Quiz,
  retroBuildingToys as Quiz,
  retroCampingOutdoors as Quiz,
  retroCandyBars as Quiz,
  retroCardGames as Quiz,
  retroCbRadioHobby as Quiz,
  retroChemistrySets as Quiz,
  retroChildrensFashion as Quiz,
  retroCocktailsDrinks as Quiz,
  retroComicBooks as Quiz,
  retroCookbooksKitchen as Quiz,
  retroCyclingChampions as Quiz,
  retroDanceMoves as Quiz,
  retroDenimJeansHistory as Quiz,
  retroDiscoFashion as Quiz,
  retroDollsQuiz as Quiz,
  retroDriveInFood as Quiz,
  retroDriveInMovies as Quiz,
  retroDriveInRestaurants as Quiz,
  retroElectricRazors as Quiz,
  retroElectricTrains as Quiz,
  retroFashionIcons as Quiz,
  retroFootballHeroes as Quiz,
  retroFrozenFoods as Quiz,
  retroHairstyles as Quiz,
  retroHamRadio as Quiz,
  retroHikingMountaineering as Quiz,
  retroHolidayRecipes as Quiz,
  retroHomeDeliveries as Quiz,
  retroHomeProjectors as Quiz,
  retroJukeboxes as Quiz,
  retroKitchenTools as Quiz,
  retroKnittingCrochet as Quiz,
  retroLawnGardenTools as Quiz,
  retroLeatherTooling as Quiz,
  retroMacrameCrafts as Quiz,
  retroMensFashion as Quiz,
  retroMetalDetecting as Quiz,
  retroMilitaryFashionInfluence as Quiz,
  retroModelKits as Quiz,
  retroModelRailroads as Quiz,
  retroMovieStars as Quiz,
  retroPetTrends as Quiz,
  retroPhoneHistory as Quiz,
  retroPinballMachines as Quiz,
  retroPizzaHistory as Quiz,
  retroPotteryCeramics as Quiz,
  retroPromMemories as Quiz,
  retroRollerSkating as Quiz,
  retroSchoolDays as Quiz,
  retroSchoolLunches as Quiz,
  retroSewingCrafts as Quiz,
  retroShoeFashions as Quiz,
  retroSkiingCulture as Quiz,
  retroSlang as Quiz,
  retroStateFairs as Quiz,
  retroStationWagons as Quiz,
  retroSummerCamps as Quiz,
  retroSwimmingHeroes as Quiz,
  retroSwimwearStyles as Quiz,
  retroTapeRecorders as Quiz,
  retroTechnology as Quiz,
  retroTeenFashion as Quiz,
  retroTelephones as Quiz,
  retroTelevisionAntennas as Quiz,
  retroToyCommercials as Quiz,
  retroToysDolls as Quiz,
  retroTvThemes as Quiz,
  retroVolleyballHistory as Quiz,
  retroWindUpToys as Quiz,
  retroWrestlingLegends as Quiz,
  seventiesNostalgia as Quiz,
  sixtiesMusic as Quiz,
  sixtiesNostalgia as Quiz,
  sixtiesTvAdventureShows as Quiz,
  sixtiesTvSupernaturalSitcoms as Quiz,
  spaceRaceQuiz as Quiz,
  tvMedicalShowsEarly as Quiz,
  tvMilitaryComedies as Quiz,
  tvNetworkHistoryFiftiesSixties as Quiz,
  tvRuralComedies as Quiz,
  tvSciFiFantasySixties as Quiz,
  tvSitcomNeighborsFriends as Quiz,
  tvSpyShowsSixties as Quiz,
  vietnamWarEra as Quiz,
  vintageAdvertisements as Quiz,
  vintageAntiqueCollecting as Quiz,
  vintageApplianceAds as Quiz,
  vintageApplianceBrands as Quiz,
  vintageArcheryShooting as Quiz,
  vintageBarbershops as Quiz,
  vintageBasketballPioneers as Quiz,
  vintageBeautyParlors as Quiz,
  vintageBoardGames as Quiz,
  vintageBoxingChampions as Quiz,
  vintageBreakfastFoods as Quiz,
  vintageCakeMixes as Quiz,
  vintageCalculators as Quiz,
  vintageCalligraphyHobby as Quiz,
  vintageCameras as Quiz,
  vintageCandleMaking as Quiz,
  vintageCannedGoods as Quiz,
  vintageCarModels as Quiz,
  vintageCircusCarnival as Quiz,
  vintageCoffeeBrands as Quiz,
  vintageComicBookHeroes as Quiz,
  vintageComicStrips as Quiz,
  vintageDecoupageCrafts as Quiz,
  vintageDiners as Quiz,
  vintageElectricFans as Quiz,
  vintageEyewearStyles as Quiz,
  vintageFastFoodChains as Quiz,
  vintageFishingLures as Quiz,
  vintageFishingTraditions as Quiz,
  vintageFlyTying as Quiz,
  vintageFurCoatEra as Quiz,
  vintageGasStations as Quiz,
  vintageGloveFashion as Quiz,
  vintageGroceryStores as Quiz,
  vintageGymnasticsStars as Quiz,
  vintageHandTools as Quiz,
  vintageHatStyles as Quiz,
  vintageHolidayTraditions as Quiz,
  vintageHomeDecor as Quiz,
  vintageHomeHeating as Quiz,
  vintageHomeLighting as Quiz,
  vintageHorseRacing as Quiz,
  vintageHouseholdItems as Quiz,
  vintageIceCream as Quiz,
  vintageJelloRecipes as Quiz,
  vintageJewelryFashion as Quiz,
  vintageKitchenBrands as Quiz,
  vintageKitchenGadgets as Quiz,
  vintageLunchBoxes as Quiz,
  vintageMakeupTrends as Quiz,
  vintageMilkDelivery as Quiz,
  vintageMovieTheaters as Quiz,
  vintageNewspapers as Quiz,
  vintageNylonStockingEra as Quiz,
  vintagePhotographyHobby as Quiz,
  vintagePhotography as Quiz,
  vintagePlayKitchens as Quiz,
  vintagePostcards as Quiz,
  vintageRadios as Quiz,
  vintageRecordPlayers as Quiz,
  vintageRefrigerators as Quiz,
  vintageSailingRegattas as Quiz,
  vintageSchoolSupplies as Quiz,
  vintageSewingMachines as Quiz,
  vintageSodaBrands as Quiz,
  vintageStampCollecting as Quiz,
  vintageStuffedAnimals as Quiz,
  vintageTeaPartyToys as Quiz,
  vintageTelevisionAds as Quiz,
  vintageTelevisionSets as Quiz,
  vintageToastersIrons as Quiz,
  vintageToyBrands as Quiz,
  vintageToyCatalogs as Quiz,
  vintageToyTrucks as Quiz,
  vintageToys as Quiz,
  vintageTrackField as Quiz,
  vintageTrainSets as Quiz,
  vintageTrains as Quiz,
  vintageTravelPosters as Quiz,
  vintageTypewriters as Quiz,
  vintageVinylRecords as Quiz,
  vintageWashingMachines as Quiz,
  vintageWeddingFashions as Quiz,
  vintageWoodworkingHobby as Quiz,
  watergateScandalQuiz as Quiz,
  woodstockMusicFestivals as Quiz,
  wwiiHomeFront as Quiz,
];

export default quizzes;

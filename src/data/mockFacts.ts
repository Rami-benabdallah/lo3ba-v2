export interface Fact {
  text: string;
  isTrue: boolean;
  correctFact: string; // Explanation shown when wrong
}

export const mockFacts: Fact[] = [
  {
    text: "Bananas are berries, but strawberries are not.",
    isTrue: true,
    correctFact: "Botanically, bananas are classified as berries because they develop from a single ovary. Strawberries are actually aggregate fruits, not berries.",
  },
  {
    text: "Octopuses have three hearts.",
    isTrue: true,
    correctFact: "Octopuses have three hearts: two pump blood to the gills, and one pumps blood to the rest of the body.",
  },
  {
    text: "The Great Wall of China is visible from space with the naked eye.",
    isTrue: false,
    correctFact: "The Great Wall of China is NOT visible from space with the naked eye. This is a common myth. It's too narrow and blends with the landscape.",
  },
  {
    text: "Honey never spoils.",
    isTrue: true,
    correctFact: "Honey has an extremely long shelf life and can last indefinitely if stored properly. Archaeologists have found edible honey in ancient Egyptian tombs.",
  },
  {
    text: "Sharks can get cancer.",
    isTrue: true,
    correctFact: "Despite the myth that sharks don't get cancer, they can and do develop cancer. The myth likely started from a 1992 book.",
  },
  {
    text: "Humans use only 10% of their brains.",
    isTrue: false,
    correctFact: "Humans use 100% of their brains, just not all at once. Different parts are active at different times. The 10% myth has been debunked by neuroscience.",
  },
  {
    text: "Wombat poop is cube-shaped.",
    isTrue: true,
    correctFact: "Wombats produce cube-shaped feces, which helps prevent the droppings from rolling away and allows them to mark their territory more effectively.",
  },
  {
    text: "The human body has four lungs.",
    isTrue: false,
    correctFact: "Humans have two lungs, not four. Each lung is divided into lobes (right lung has 3 lobes, left has 2), but they're still considered two organs.",
  },
  {
    text: "A group of flamingos is called a 'flamboyance'.",
    isTrue: true,
    correctFact: "A group of flamingos is indeed called a 'flamboyance', which perfectly describes their vibrant pink appearance.",
  },
  {
    text: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid.",
    isTrue: true,
    correctFact: "Cleopatra lived around 69-30 BCE, while the Great Pyramid was built around 2580-2560 BCE. The Moon landing was in 1969 CE, making this statement true.",
  },
  {
    text: "Dolphins have names for each other.",
    isTrue: true,
    correctFact: "Dolphins use signature whistles that act like names, allowing them to identify and call to specific individuals.",
  },
  {
    text: "The human nose can detect over 1 trillion different scents.",
    isTrue: true,
    correctFact: "Research shows the human nose can distinguish over 1 trillion different odors, far more than previously thought.",
  },
  {
    text: "Bulls are enraged by the color red.",
    isTrue: false,
    correctFact: "Bulls are colorblind to red. They're actually reacting to the movement of the matador's cape, not the color. Red is used for tradition and visibility.",
  },
  {
    text: "There are more possible games of chess than atoms in the observable universe.",
    isTrue: true,
    correctFact: "The number of possible chess games (around 10^120) far exceeds the estimated number of atoms in the observable universe (around 10^80).",
  },
  {
    text: "Penguins can fly.",
    isTrue: false,
    correctFact: "Penguins cannot fly. They are flightless birds that have adapted to swimming instead, using their wings as flippers.",
  },
  {
    text: "Butterflies taste with their feet.",
    isTrue: true,
    correctFact: "Butterflies have taste receptors on their feet, allowing them to detect nutrients when they land on plants.",
  },
  {
    text: "Goldfish have a memory span of only three seconds.",
    isTrue: false,
    correctFact: "Goldfish can remember things for months, not seconds. The myth has been debunked repeatedly by experiments.",
  },
  {
    text: "The Eiffel Tower grows taller in the summer.",
    isTrue: true,
    correctFact: "Heat causes the metal in the tower to expand, making it grow by up to 6 inches (15 cm) during hot weather.",
  },
  {
    text: "Humans and dinosaurs lived at the same time.",
    isTrue: false,
    correctFact: "Dinosaurs went extinct about 65 million years before humans appeared.",
  },
  {
    text: "An octopus can regrow a lost arm.",
    isTrue: true,
    correctFact: "Octopuses regenerate lost limbs, including nerves and muscle tissue, over several months.",
  },
  {
    text: "Lightning never strikes the same place twice.",
    isTrue: false,
    correctFact: "Lightning frequently strikes the same place multiple times, especially tall structures like skyscrapers.",
  },
  {
    text: "A sneeze can travel over 100 miles per hour.",
    isTrue: true,
    correctFact: "Sneezes can reach speeds around 100 mph due to the rapid expulsion of air from the lungs.",
  },
  {
    text: "Bamboo can grow nearly a meter in a single day.",
    isTrue: true,
    correctFact: "Certain bamboo species can grow up to 91 cm (35 inches) in 24 hours, making them among the fastest-growing plants.",
  },
  {
    text: "Chameleons change color primarily to blend in with their surroundings.",
    isTrue: false,
    correctFact: "Chameleons mainly change color to regulate temperature and communicate emotions, not for camouflage.",
  },
  {
    text: "Sea otters hold hands while sleeping.",
    isTrue: true,
    correctFact: "Sea otters often hold hands to avoid drifting apart while floating on their backs.",
  },
  {
    text: "Humans have more bones as adults than as babies.",
    isTrue: false,
    correctFact: "Babies are born with around 270 bones, some of which fuse over time, leaving adults with 206.",
  },
  {
    text: "Tomatoes were once believed to be poisonous.",
    isTrue: true,
    correctFact: "Europeans once feared tomatoes because aristocrats were poisoned by eating them off lead plates.",
  },
  {
    text: "Mount Everest is the tallest mountain on Earth.",
    isTrue: true,
    correctFact: "Everest is the tallest above sea level, though Mauna Kea is taller when measured from its base underwater.",
  },
  {
    text: "Owls can rotate their heads 360 degrees.",
    isTrue: false,
    correctFact: "They can rotate about 270 degrees, thanks to extra vertebrae in their necks, but not a full 360.",
  },
  {
    text: "A day on Venus is longer than a year on Venus.",
    isTrue: true,
    correctFact: "Venus rotates extremely slowly, taking 243 Earth days to spin once but only 225 days to orbit the Sun.",
  },
  {
    text: "Bats are blind.",
    isTrue: false,
    correctFact: "Bats have perfectly functional eyes and can see; they simply rely on echolocation for navigation.",
  },
  {
    text: "Koalas sleep up to 22 hours a day.",
    isTrue: true,
    correctFact: "Koalas sleep extremely long hours because eucalyptus leaves provide very little energy.",
  },
  {
    text: "Humans share 50% of their DNA with bananas.",
    isTrue: true,
    correctFact: "About half of human DNA has recognizable homologs in bananas, though this does NOT mean we are 50% banana.",
  },
  {
    text: "The sun is actually yellow.",
    isTrue: false,
    correctFact: "The sun is white when viewed from space; Earth's atmosphere scatters light, making it appear yellow.",
  },
  {
    text: "Cows have best friends and get stressed when separated.",
    isTrue: true,
    correctFact: "Studies show cows form social bonds and display signs of stress when isolated from preferred companions.",
  },
  {
    text: "Vikings wore horned helmets.",
    isTrue: false,
    correctFact: "There is no evidence Vikings wore horned helmets; the idea came from 19th-century opera costumes.",
  },
  {
    text: "Spiders can fly using electric fields in the atmosphere.",
    isTrue: true,
    correctFact: "Some spiders use 'ballooning,' riding electromagnetic currents—not just wind—to travel long distances.",
  },
  {
    text: "Snowflakes always have six sides.",
    isTrue: true,
    correctFact: "Snowflakes crystallize with six-fold symmetry due to the molecular structure of water.",
  },
  {
    text: "Earwax is a type of sweat.",
    isTrue: true,
    correctFact: "Earwax is produced by modified sweat glands in the ear canal.",
  },
  {
    text: "Humans can’t breathe and swallow at the same time.",
    isTrue: true,
    correctFact: "The epiglottis blocks the airway when swallowing, making simultaneous breathing impossible.",
  },
  {
    text: "You can see the Great Wall of China from the Moon.",
    isTrue: false,
    correctFact: "Even astronauts in low orbit can’t see it without help. It’s too narrow and blends with terrain.",
  },
  {
    text: "Jellyfish have no brains.",
    isTrue: true,
    correctFact: "Jellyfish have a simple nerve net but no brain or central nervous system.",
  },
  {
    text: "Some metals can explode when they touch water.",
    isTrue: true,
    correctFact: "Alkali metals like sodium and potassium react violently with water, sometimes causing explosions.",
  },
  {
    text: "A snail can sleep for three years.",
    isTrue: true,
    correctFact: "Some snail species enter multi-year hibernation during extreme drought conditions.",
  },
  {
    text: "The Amazon rainforest produces 20% of the world’s oxygen.",
    isTrue: false,
    correctFact: "Most oxygen comes from marine phytoplankton. The Amazon recycles nearly all oxygen it produces.",
  },
  {
    text: "The shortest war in history lasted about 38 minutes.",
    isTrue: true,
    correctFact: "The Anglo-Zanzibar War of 1896 ended in under an hour when Zanzibar surrendered.",
  },
  {
    text: "Humans glow in the dark.",
    isTrue: true,
    correctFact: "Humans emit tiny amounts of bioluminescent light, but it's too faint for the eye to detect.",
  },
  {
    text: "Camels store water in their humps.",
    isTrue: false,
    correctFact: "Their humps store fat, not water. Water is stored in their bloodstream and tissues.",
  },
  {
    text: "Turtles can breathe through their butts.",
    isTrue: true,
    correctFact: "Some turtles perform cloacal respiration, absorbing oxygen through their rear opening.",
  },
  {
    text: "There are no deserts in Antarctica.",
    isTrue: false,
    correctFact: "Antarctica *is* a desert—the largest one—due to its extremely low precipitation.",
  },
  {
    text: "The heart of a blue whale is the size of a small car.",
    isTrue: true,
    correctFact: "Blue whale hearts can weigh 400 kg (882 lbs), roughly the size of a compact car.",
  },
  {
    text: "Humans have only five senses.",
    isTrue: false,
    correctFact: "Humans have many more, including balance, temperature, pain, proprioception, and more.",
  },
  {
    text: "A single cloud can weigh over a million pounds.",
    isTrue: true,
    correctFact: "Clouds contain massive amounts of water vapor, making their total weight enormous.",
  },
  {
    text: "Carrots were originally purple.",
    isTrue: true,
    correctFact: "Orange carrots were bred later; ancient carrots were purple, yellow, and white.",
  },
  {
    text: "Glass is a slow-moving liquid.",
    isTrue: false,
    correctFact: "Glass is an amorphous solid, not a liquid. Old wavy windows are uneven due to historic production.",
  },
  {
    text: "Rats laugh when tickled.",
    isTrue: true,
    correctFact: "Rats emit ultrasonic chirping sounds when tickled, similar to laughter.",
  },
  {
    text: "The Space Station travels at about 17,500 mph.",
    isTrue: true,
    correctFact: "The ISS orbits Earth at ~28,000 km/h to remain in low Earth orbit.",
  },
  {
    text: "Humans swallow eight spiders a year in their sleep.",
    isTrue: false,
    correctFact: "This myth is false; spiders avoid humans and would not crawl into sleeping mouths.",
  },
  {
    text: "The fastest animal on Earth is the cheetah.",
    isTrue: false,
    correctFact: "Cheetahs are fastest *on land*, but the peregrine falcon is faster, diving over 240 mph.",
  },
  {
    text: "Bees can recognize human faces.",
    isTrue: true,
    correctFact: "Bees can learn and remember human facial patterns using associative memory.",
  },
  {
    text: "Saturn would float in water.",
    isTrue: true,
    correctFact: "Saturn's average density is lower than water, meaning it would float if a giant ocean existed.",
  },
  {
    text: "Humans can live without a stomach.",
    isTrue: true,
    correctFact: "People can survive without a stomach after surgical removal; the intestine adapts to handle digestion.",
  },
  {
    text: "Your fingernails grow faster in the cold.",
    isTrue: false,
    correctFact: "Nails grow faster in warm conditions due to increased circulation, not colder ones.",
  },
];

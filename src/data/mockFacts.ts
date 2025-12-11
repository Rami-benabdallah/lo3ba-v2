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
];

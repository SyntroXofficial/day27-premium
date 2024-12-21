export const methods = [
  {
    id: 'xbox-gamepass',
    title: 'Xbox Game Pass Method',
    rarity: 'epic',
    pin: '4617',
    steps: [
      'Log in to an account that has Game Pass',
      'Download the game you want',
      'Play it for approximately 5 minutes, then exit the game',
      'Log in to your main account and you will be able to play the game without owning Game Pass'
    ],
    warning: "I'm not responsible for any errors or issues if you didn't follow my instructions correctly",
    status: 'working'
  },
  {
    id: 'steam-family',
    title: 'Steam Family Sharing Method',
    rarity: 'legendary',
    pin: '2716',
    steps: [
      'Add a friend who owns the game to your Family Sharing',
      'Enable Family Library Sharing in Steam settings',
      'Wait for the games to become available',
      'You can now play the shared games when your friend is not playing'
    ],
    warning: "Make sure to follow Steam's Family Sharing guidelines to avoid any issues",
    status: 'working'
  },
  {
    id: 'epic-games',
    title: 'Epic Games Free Games Method',
    rarity: 'rare',
    pin: '8293',
    steps: [
      'Create an Epic Games account',
      'Visit the store every Thursday',
      'Claim the free games within the available timeframe',
      'The games will be permanently added to your library'
    ],
    warning: "Don't forget to claim the games before they rotate out",
    status: 'working'
  }
];
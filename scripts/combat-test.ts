import { CombatSimulator, CombatAction } from '../src/shared/combat/combat-simulator';
import { ICombat, ICombatCharacter, ICombatParty, Profession, PetAttribute, PetAffinity } from '../src/shared/interfaces';

const characters: ICombatCharacter[] = [
  { combatId: 1, combatPartyId: 1, name: 'Watch My Stuff',
    profession: Profession.Bitomancer,
    level: 10,
    specialName: 'Bit',
    stats: { str: 500, dex: 100, con: 100, int: 100, agi: 50, luk: 100, hp: 10000, special: 2048, gold: 10, xp: 10 },
    maxStats: { str: 500, dex: 100, con: 100, int: 100, agi: 50, luk: 100, hp: 10000, special: 2048, gold: 10, xp: 10 }
  },
  { combatId: 2, combatPartyId: 2, name: 'Super Tester',
    attribute: PetAttribute.Alchemist, affinity: PetAffinity.Healer,
    level: 10,
    stats: { str: 400, dex: 100, con: 100, int: 100, agi: 50, luk: 100, hp: 5000, special: 0, gold: 10, xp: 10 },
    maxStats: { str: 400, dex: 100, con: 100, int: 100, agi: 50, luk: 100, hp: 5000, special: 0, gold: 10, xp: 10 }
  },
  { combatId: 3, combatPartyId: 2, name: 'Super Tester 2',
    attribute: PetAttribute.Alchemist, affinity: PetAffinity.Healer,
    level: 10,
    stats: { str: 400, dex: 100, con: 100, int: 100, agi: 50, luk: 100, hp: 5000, special: 0, gold: 10, xp: 10 },
    maxStats: { str: 400, dex: 100, con: 100, int: 100, agi: 50, luk: 100, hp: 5000, special: 0, gold: 10, xp: 10 }
  }
];

const parties: ICombatParty[] = [
  { id: 1, name: 'The Special Testers' },
  { id: 2, name: 'Spooky Transistors' },
];

const combat: ICombat = {
  name: 'The Forsaken Combat',
  timestamp: Date.now(),
  seed: 1,
  currentRound: 0,
  chance: null,
  characters: characters.reduce((prev, cur) => {
    prev[cur.combatId] = cur;
    return prev;
  }, {}),
  parties: parties.reduce((prev, cur) => {
    prev[cur.id] = cur;
    return prev;
  }, {})
};

const simulator = new CombatSimulator(combat);
simulator.events$.subscribe(({ action, data }) => {
  if(action === CombatAction.Message) {
    if(!data) return;
    console.log(data);
  }

  if(action === CombatAction.PrintStatistics) {
    console.log(`Round ${data.currentRound}`,
      Object.values(data.characters)
        .map((x: any) => `${x.name} (HP ${x.stats.hp} | ${x.specialName || '???'} ${x.stats.special})`)
    );
  }

  if(action === CombatAction.SummaryMessage) {
    console.log(data);
  }
});

simulator.beginCombat();

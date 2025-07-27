// Sanity schema exports
// Centralized export for all Sanity schemas

import gameSchema from './game';
import matchSchema from './match';
import teamSchema from './team';
import tournamentSchema from './tournament';

// Export individual schemas
export { gameSchema, matchSchema, teamSchema, tournamentSchema };

// Export array of all schemas for Sanity config
export const schemaTypes = [
  gameSchema,
  matchSchema,
  teamSchema,
  tournamentSchema,
];

export default schemaTypes;

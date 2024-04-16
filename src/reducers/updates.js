export function updatesReducer(newState, state, action) {
  switch (action.type) {
    case "BALL":
      const bowler =
        state.teams[state.bowlingTeamID].players[state.currentBowlerID]
          .lastName;
      const batter =
        state.teams[state.battingTeamID].players[state.currentStrikerID]
          .lastName;
      const score = newState.score;
      const last = state.updates[state.updates.length - 1];
      let newUpdate;

      if (!last || last.type !== "OVER" || last.over !== state.score.over + 1) {
        newUpdate = {
          type: "OVER",
          bowler,
          over: state.score.over + 1,
          score: `${score.score}/${score.wickets}`,
          updates: [
            {
              type: "BALL",
              ball: `${score.over}.${score.ball}`,
              batter,
              runs: action.runs
            }
          ]
        };
        return [...state.updates, newUpdate];
      }
      newUpdate = {
        ...last,
        score: `${score.score}/${score.wickets}`,
        updates: [
          ...last.updates,
          {
            type: "BALL",
            ball: `${score.ball === 0 ? score.over - 1 : score.over}.${
              score.ball === 0 ? 6 : score.ball
            }`,
            batter,
            runs: action.runs
          }
        ]
      };

      return [...state.updates.slice(0, state.updates.length - 1), newUpdate];

    default:
      return state && state.updates ? state.updates : [];
  }
}

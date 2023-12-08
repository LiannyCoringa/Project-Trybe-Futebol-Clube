export default `SELECT 
teams.team_name AS name, 
SUM(CASE WHEN matches.away_team_goals > matches.home_team_goals THEN 3 
WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalPoints,
COUNT(matches.away_team_id) AS totalGames,
SUM(CASE WHEN matches.away_team_goals > matches.home_team_goals THEN 1 ELSE 0 END) 
AS totalVictories,
SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN matches.away_team_goals < matches.home_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(matches.away_team_goals) AS goalsFavor,
SUM(matches.home_team_goals) AS goalsOwn,
SUM(matches.away_team_goals) - SUM(matches.home_team_goals) AS goalsBalance,
(SUM(CASE WHEN matches.away_team_goals > matches.home_team_goals THEN 3 
    WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) 
/ (COUNT(matches.away_team_id) * 3)) * 100 AS efficiency
FROM teams
INNER JOIN matches ON teams.id = matches.away_team_id
WHERE matches.in_progress = false
GROUP BY teams.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC`;

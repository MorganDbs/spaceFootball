import CsvLoader, { ICsvLoader } from '../../utils/CsvLoader';

interface ITeamsManager extends ICsvLoader {}

export default class TeamsManager extends CsvLoader implements ITeamsManager {
    constructor() {
        super(
            '../../../static/england-premier-league-teams-2018-to-2019-stats.csv',
            ['common_name', 'country', 'season', 'team_name'],
            'league_position'
        );
    }
}

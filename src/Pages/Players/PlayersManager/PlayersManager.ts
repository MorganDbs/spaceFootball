import CsvLoader, { ICsvLoader } from '../../../utils/CsvLoader';

interface IPlayersManager extends ICsvLoader {}

export default class PlayersManager
    extends CsvLoader
    implements IPlayersManager
{
    constructor() {
        super(
            '../../../static/england-premier-league-players-2018-to-2019-stats.csv',
            [
                'current_club',
                'birthday_GMT',
                'league',
                'nationality',
                'position',
                'season',
                'full_name',
                'age',
            ],
            'full_name'
        );
    }
}

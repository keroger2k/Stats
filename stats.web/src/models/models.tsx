export type EdenDateOrDateTime = { date: Date } | { datetime: Date };
export type HomeAway = 'home' | 'away';
export type AssociationType = 'manager' | 'family' | 'player' | 'fan';

export interface Team {
    id: string;
    name: string;
    sport: string;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    age_group: string;
    season_name: string;
    season_year: number;
    competition_level: string;
    team_type: string;
    settings?: {
        scorekeeping?: {
            bats?: {
                innings_per_game: number;
                // There are additional unused fields here.
            };
        };
    };
    user_team_associations?: AssociationType[];
    team_avatar_image?: string;
    team_player_count?: number | null; // number of active players on team
    organizations: {
        organization_id: string;
        status: string;
    }[];
    schedule: Event[] | null;
}

export type Event = {
    event: {
        id: string;
        event_type: 'game' | 'practice' | 'other';
        sub_type: 'scrimmages'[];
        status: 'scheduled' | 'canceled';
        full_day: boolean;
        team_id: string;
        start: { datetime: string } | null;
        end: { datetime: string } | null;
        arrive?: { datetime: string } | null;
        timezone?: string | null;
        location?: Location | null;
        notes?: string;
        title?: string | null;
        series_id?: string | null;
        organization_id?: string | null;
    };
    pregame_data?: {
        game_id: string;
        opponent_name?: string;
        opponent_id?: string | null;
        home_away?: HomeAway | null;
        lineup_id?: string | null;
    };
};

export type Location = {
    coordinates?: {
        latitude: number | null;
        longitude: number | null;
    };
    address: string[];
    
};

const WEEKDAYS_SHORT = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
];

const WEEKDAYS_LONG = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];


export function formatWeekdayShort(i: number) {
    return WEEKDAYS_SHORT[i];
}

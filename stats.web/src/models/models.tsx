export type EdenDateOrDateTime = { date: Date } | { datetime: Date };
export type HomeAway = 'home' | 'away';
export type AssociationType = 'manager' | 'family' | 'player' | 'fan';

export interface TeamListGroupedBySeason {
    [season: string]: ListTeam[];
}

export type Sport = InvalidSport | ValidSport;

export enum InvalidSport {
    FLAG_FOOTBALL = 'flagFootball',
    OTHER = 'other',
}

export type ListTeam = BaseListTeamOrOrg & {
    id: string | undefined;
    avatarUrl: string | undefined;
    playerCount: number;
};

type BaseListTeamOrOrg = {
    name: string;
    sport: Sport;
    seasonName: Season;
    seasonYear: number;
    displaySeason: string;
};

export enum Season {
    SPRING = 'spring',
    SUMMER = 'summer',
    FALL = 'fall',
    WINTER = 'winter',
}

export interface Avatar {
    [key: string]: string;
}

export interface Video {
    id: string;
    schedule_event_id: string;
    url: string;
    cookies: { [key: string]: string };
}

export interface VideoClip {
    id: string;
    url: string;
    cookies: { [key: string]: string };
}

export enum ValidSport {
    BASEBALL = 'baseball',
    BASKETBALL = 'basketball',
    BOWLING = 'bowling',
    CHEERLEADING = 'cheerleading',
    CROSS_COUNTY = 'crossCountry',
    FIELD_HOCKEY = 'fieldHockey',
    FOOTBALL = 'football',
    GOLF = 'golf',
    HOCKEY = 'hockey',
    LACROSSE = 'lacrosse',
    ROWING_AND_CREW = 'rowingAndCrew',
    RUGBY = 'rugby',
    SOCCER = 'soccer',
    SOFTBALL = 'softball',
    SWIMMING_AND_DIVING = 'swimmingAndDiving',
    TENNIS = 'tennis',
    TRACK_AND_FIELD = 'trackAndField',
    VOLLEYBALL = 'volleyball',
    WATER_POLO = 'waterPolo',
    WRESTLING = 'wrestling',
}

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
    completed_game_scores: GameDataResponse[] | null;
    players: Player[];
    season_stats: SeasonStats;
    opponents: Opponent[];
    video_assets: VideoAsset[];
}

export interface Opponent {
    root_team_id: string;
    owning_team_id: string;
    progenitor_team_id: string;
    name: string;
    is_hidden: boolean;
}

export interface VideoAsset {
    id: string;
    stream_id: string;
    duration: number;
    schedule_event_id: string;
    created_at: string;
    ended_at: string;
    audience_type: string;
    thumbnail_url: string;
}

export interface SearchResult {
    id: string;
    name: string;
    sport: string;
    age_group: string;
    number_of_players: number;
    staff: [],
    location: SearchLocation,
    team_season: SearchSeason,
    is_orphan: boolean,
    competition_level: string;
    avatar_url: string;
}

export interface SearchSeason {
    season: string;
    year: number;
}

export interface SearchLocation {
    city: string;
    state: string;
    country: string;
}

export interface Player {
    id: string;
    batting_side: string;
    first_name: string;
    last_name: string | null;
    number: number;
    person_id: string;
    status: string;
    team_id: string;
    throwing_hand: string;
}

export interface Players {
    [key: string]: {
        stats: StatData;
    };
}

export interface TeamEventData {
    event_id: string;
    stream_id: string;
    game_date: string;
    player_stats: {
        players: Players;
        stats: StatData;
    };
    cumulative_stats: {
        players: Players;
        stats: StatData;
    };
}

export interface SeasonStats {
    id: string;
    stats_data: {
        players: Players;
        stats: StatData;
    };
    team_id: string;
}

export type StatData = {
    defense: Defense,
    general: {
        gp: number | null;
    },
    offense: CoreBattingStats
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

export type GameDataResponse = {
    event_id: string;
    game_data: GameData | null;
};

export type GameData = {
    game_id: string;
    scorekeeping_config_id: string | null;
    game_state: GameStates;
    team_score: number;
    opponent_score: number;
    last_time_to_score_ts: string;
};

export enum GameState {
    FIRST_HALF = '1st Half',
    SECOND_HALF = '2nd Half',

    FIRST_QUARTER = '1st Quarter',
    SECOND_QUARTER = '2nd Quarter',
    THIRD_QUARTER = '3rd Quarter',
    FOURTH_QUARTER = '4th Quarter',

    FIRST_PERIOD = '1st Period',
    SECOND_PERIOD = '2nd Period',
    THIRD_PERIOD = '3rd Period',

    HALFTIME = 'Halftime',
    FIRST_OVERTIME = 'Overtime 1',
    SECOND_OVERTIME = 'Overtime 2',
    GAME_OVER = 'Game Over',
}

export type GameStates =
    | '1st Half'
    | '2nd Half'
    | '1st Quarter'
    | '2nd Quarter'
    | '3rd Quarter'
    | '4th Quarter'
    | '1st Period'
    | '2nd Period'
    | '3rd Period'
    | 'Halftime'
    | 'Overtime 1'
    | 'Overtime 2'
    | 'Game Over';

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

const MONTH_SHORT = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

export function formatWeekdayShort(i: number) {
    return WEEKDAYS_SHORT[i];
}

export function formatMonthShort(i: number) {
    return MONTH_SHORT[i];
}

export type CoreBattingStats = {
    '1B': number;
    '2B': number;
    '_2OUTRBI': number;
    '2S+3%': number;
    '2S+3': number;
    '3B': number;
    '6+%': number;
    '6+': number;
    ab: number;
    'AB/HR': number;
    avg: number;
    'BA/RISP': number;
    babip: number;
    bb: number;
    'BB/K': number;
    'C%': number;
    ci: number;
    cs: number;
    'FLB%': number;
    fc: number;
    'GB%': number;
    gidp: number;
    gitp: number;
    GP: number;
    h: number;
    hbp: number;
    hard: number;
    hr: number;
    sol: number;
    'LND%': number;
    lob: number;
    obp: number;
    ops: number;
    pa: number;
    'PA/BB': number;
    pik: number;
    ps: number;
    'PS/PA': number;
    qab: number;
    'QAB%': number;
    r: number;
    rbi: number;
    roe: number;
    shb: number;
    sb: number;
    'SB%': number;
    shf: number;
    slg: number;
    so: number;
    tb: number;
    xbh: number;
    LD: number;
    GB: number;
    FB: number;
};

export type Defense = {
    ip: number;
    'GP:P': number;
    gs: number;
    bf: number;
    '#P': number;
    w: number;
    l: number;
    sv: number;
    svo: number;
    bs: number;
    'SV%': number;
    h: number;
    r: number;
    er: number;
    bb: number;
    so: number;
    sol: number;
    hbp: number;
    era: number;
    whip: number;
    lob: number;
    bk: number;
    'SB%': number;
    wp: number;
    baa: number;
    tb: number;
    ts: number;
    'P/IP': number;
    'P/BF': number;
    'LBFP#': string | number;
    '<3%': number;
    loo: number;
    '1ST2OUT': number;
    '123INN': number;
    '<13': number;
    fip: number;
    'S%': number;
    'FLB%': number;
    'FPS%': number;
    'FPSO%': number;
    'FPSW%': number;
    'FPSH%': number;
    'BB/INN': number;
    '0BBINN': number;
    'IC:C': number;
    'PB:C': number;
    'SB:C': number;
    'SBATT:C': number;
    'PIK:C': number;
    'CS:C': number;
    'CI:C': number;
    'CS:C%': number;
    bbs: number;
    lobb: number;
    lobbs: number;
    'SM%': number;
    'K/BF': number;
    'K/BB': number;
    'WEAK%': number;
    'HARD%': number;
    'GO/AO': number;
    hr: number;
    'LND%': number;
    'FB%': number;
    'GB%': number;
    babip: number;
    'BA/RISP': number;
    FB: number;
    FBS: number;
    'FBS%': number;
    'FBSW%': number;
    'FBSM%': number;
    CT: number;
    CTS: number;
    'CTS%': number;
    'CTSW%': number;
    'CTSM%': number;
    CB: number;
    CBS: number;
    'CBS%': number;
    'CBSW%': number;
    'CBSM%': number;
    SL: number;
    SLS: number;
    'SLS%': number;
    'SLSW%': number;
    'SLSM%': number;
    CH: number;
    CHS: number;
    'CHS%': number;
    'CHSW%': number;
    'CHSM%': number;
    OS: number;
    OSS: number;
    'OSS%': number;
    'OSSW%': number;
    'OSSM%': number;
    RB: number;
    RBS: number;
    'RBS%': number;
    'RBSW%': number;
    'RBSM%': number;
    DB: number;
    DBS: number;
    'DBS%': number;
    'DBSW%': number;
    'DBSM%': number;
    SC: number;
    SCS: number;
    'SCS%': number;
    'SCSW%': number;
    'SCSM%': number;
    DC: number;
    DCS: number;
    'DCS%': number;
    'DCSW%': number;
    'DCSM%': number;
    KB: number;
    KBS: number;
    'KBS%': number;
    'KBSW%': number;
    'KBSM%': number;
    KC: number;
    KCS: number;
    'KCS%': number;
    'KCSW%': number;
    'KCSM%': number;
    '<3': number;
    SM: number;
    SW: number;
    WHB: number;
    hhb: number;
    GO: number;
    AO: number;
    LD: number;
    GB: number;
    FLB: number;
    tc: number;
    a: number;
    po: number;
    fpct: number;
    e: number;
    dp: number;
    tp: number;
    'GP:F': number;
    INN: number;
    pb: number;
    sb: number;
    'SB-ATT': string;
    cs: number;
    'CS%': number;
    pik: number;
    ci: number;
    'GP:C': number;
}
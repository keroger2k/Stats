using System.Text.Json.Serialization;

namespace Stats.ExtApi.Models
{
    public class StatsData
    {
        public PlayerStats stats { get; set; } = null!;
        public Dictionary<string, Player> players { get; set; } = null!;
        public class Player
        {
            public PlayerStats stats { get; set; } = null!;
        }
        public class PlayerStats
        {
            public Defense defense { get; set; } = null!;
            public General general { get; set; } = null!;
            public Offense offense { get; set; } = null!;

            public class Defense
            {
                public int A { get; set; }
                public int E { get; set; }
                public int H { get; set; }
                public int L { get; set; }
                public int R { get; set; }
                public int W { get; set; }

                [JsonPropertyName("#P")]
                public int P { get; set; }
                [JsonPropertyName("1B")]
                public int _1B { get; set; }
                [JsonPropertyName("2B")]
                public int _2B { get; set; }
                [JsonPropertyName("3B")]
                public int _3B { get; set; }

                [JsonPropertyName("<3")]
                public int _3 { get; set; }
                public int AB { get; set; }
                public int AO { get; set; }
                public int BB { get; set; }
                public int BF { get; set; }
                public int BK { get; set; }
                public int BS { get; set; }
                public int CI { get; set; }
                public int CS { get; set; }
                public int DP { get; set; }
                public int ER { get; set; }
                public int FC { get; set; }
                public int GB { get; set; }
                public int GO { get; set; }
                public int GS { get; set; }
                public int HR { get; set; }
                public int IF { get; set; }
                public double IP { get; set; }
                public int OS { get; set; }
                public int PO { get; set; }

                [JsonPropertyName("S%")]
                public double S { get; set; }
                public int SB { get; set; }
                public int SM { get; set; }
                public int SO { get; set; }
                public int SV { get; set; }
                public int SW { get; set; }
                public int TB { get; set; }
                public int TC { get; set; }
                public int TS { get; set; }
                public int WP { get; set; }

                [JsonPropertyName("<13")]
                public int _13 { get; set; }

                [JsonPropertyName("<3%")]
                public double _LT3 { get; set; }
                public double BAA { get; set; }
                public int BBS { get; set; }

                [JsonPropertyName("CB%")]
                public double CB { get; set; }

                [JsonPropertyName("CH%")]
                public double CH { get; set; }

                [JsonPropertyName("CT%")]
                public double CT { get; set; }

                [JsonPropertyName("DB%")]
                public double DB { get; set; }

                [JsonPropertyName("DC%")]
                public double DC { get; set; }
                public double ERA { get; set; }

                [JsonPropertyName("FB%")]
                public double FB { get; set; }
                public double FIP { get; set; }
                public int FLB { get; set; }
                public int FLY { get; set; }
                public int FPS { get; set; }

                [JsonPropertyName("GB%")]
                public double GroundBallPercent { get; set; }
                public int HBP { get; set; }
                public int INP { get; set; }

                [JsonPropertyName("K/G")]
                public double KG { get; set; }

                [JsonPropertyName("KB%")]
                public double KB { get; set; }

                [JsonPropertyName("KC%")]
                public double KC { get; set; }
                public int LND { get; set; }
                public int LOB { get; set; }
                public int LOO { get; set; }

                [JsonPropertyName("OS%")]
                public double OffSpeed { get; set; }
                public int OSS { get; set; }
                public int PIK { get; set; }

                [JsonPropertyName("RB%")]
                public int RB { get; set; }

                [JsonPropertyName("SB%")]
                public double OpponentStolenBasePercent { get; set; }

                [JsonPropertyName("SC%")]
                public double SC { get; set; }
                public int SHB { get; set; }
                public int SHF { get; set; }

                [JsonPropertyName("SL%")]
                public double SL { get; set; }

                [JsonPropertyName("SM%")]
                public double PitchingSwingMissPercent { get; set; }
                public int SOL { get; set; }
                public int SVO { get; set; }

                [JsonPropertyName("<13%")]
                public double LessThan13PitchesPercent { get; set; }

                [JsonPropertyName("CI:C")]
                public int CIC { get; set; }

                [JsonPropertyName("CS:C")]
                public int CSC { get; set; }

                [JsonPropertyName("DP:P")]
                public int DPP { get; set; }

                [JsonPropertyName("FLB%")]
                public double FlyBallPercentage { get; set; }

                [JsonPropertyName("FLY%")]
                public double FlySomethingPercentage { get; set; }
                public double FPCT { get; set; }

                [JsonPropertyName("FPS%")]
                public double FirstPitchStrike { get; set; }
                public int FPSH { get; set; }
                public int FPSO { get; set; }
                public int FPSW { get; set; }
                public int FULL { get; set; }

                [JsonPropertyName("GP:C")]
                public int GPC { get; set; }

                [JsonPropertyName("GP:F")]
                public int GPF { get; set; }

                [JsonPropertyName("GP:P")]
                public int GPP { get; set; }
                public int HARD { get; set; }

                [JsonPropertyName("IC:C")]
                public double ICC { get; set; }

                [JsonPropertyName("IP:F")]
                public double IPF { get; set; }

                [JsonPropertyName("K/BB")]
                public double KBB { get; set; }

                [JsonPropertyName("K/BF")]
                public double KBF { get; set; }

                [JsonPropertyName("LND%")]
                public double LinedSomethingPercentage { get; set; }

                [JsonPropertyName("LOB%")]
                public double LOB_Something { get; set; }
                public int LOBB { get; set; }

                [JsonPropertyName("LOO%")]
                public double LeadOffOutPercentage { get; set; }
                public int OSSM { get; set; }
                public int OSSW { get; set; }

                [JsonPropertyName("P/BF")]
                public double PBF { get; set; }

                [JsonPropertyName("P/IP")]
                public double PIP { get; set; }

                [JsonPropertyName("PB:C")]
                public int PBC { get; set; }

                [JsonPropertyName("SB:C")]
                public int SBC { get; set; }

                [JsonPropertyName("TP:P")]
                public int TPP { get; set; }
                public int WEAK { get; set; }
                public double WHIP { get; set; }
                public int outs { get; set; }
                public double BABIP { get; set; }

                [JsonPropertyName("CS:C%")]
                public double CaughtStealingCatcherPercentage { get; set; }

                [JsonPropertyName("FPSH%")]
                public double FirstPitchResultInStrikePercentage { get; set; }

                [JsonPropertyName("FPSO%")]
                public double FirstPitchResultInStrikeOutPercentage { get; set; }

                [JsonPropertyName("FPSW%")]
                public double FirstPitchResultInStrikeWalkPercentage { get; set; }

                [JsonPropertyName("GO/AO")]
                public double GOAO { get; set; }

                [JsonPropertyName("HARD%")]
                public double HARD_Something { get; set; }
                public int HRISP { get; set; }

                [JsonPropertyName("IP:1B")]
                public double IP1B { get; set; }

                [JsonPropertyName("IP:2B")]
                public double IP2B { get; set; }

                [JsonPropertyName("IP:3B")]
                public double IP3B { get; set; }

                [JsonPropertyName("IP:CF")]
                public double IPCF { get; set; }

                [JsonPropertyName("IP:LF")]
                public double IPLF { get; set; }

                [JsonPropertyName("IP:RF")]
                public double IPRF { get; set; }

                [JsonPropertyName("IP:SF")]
                public double IPSF { get; set; }

                [JsonPropertyName("IP:SS")]
                public double IPSS { get; set; }
                public double LOBBS { get; set; }

                [JsonPropertyName("PIK:C")]
                public int PIKC { get; set; }

                [JsonPropertyName("SB:C%")]
                public double StolenBaseCatcherPercentage { get; set; }

                [JsonPropertyName("WEAK%")]
                public double WEAK_Something { get; set; }
                [JsonPropertyName("0BBINN")]

                public int _0BBINN { get; set; }
                [JsonPropertyName("123INN")]
                public int _123INN { get; set; }
                public int ABRISP { get; set; }

                [JsonPropertyName("BB/INN")]
                public double BBINN { get; set; }

                [JsonPropertyName("outs-C")]
                public int OutsC { get; set; }

                [JsonPropertyName("outs-P")]
                public int OutsP { get; set; }

                [JsonPropertyName("outs:C")]
                public int OutsC_Something { get; set; }

                [JsonPropertyName("outs:F")]
                public int OutsF { get; set; }

                [JsonPropertyName("123INN%")]
                public double OneTwoThreeINN_Percentage { get; set; }
                [JsonPropertyName("1ST2OUT")]
                public int _1ST2OUT { get; set; }

                [JsonPropertyName("BA/RISP")]
                public double BARISP { get; set; }

                [JsonPropertyName("SBATT:C")]
                public int SBATTC { get; set; }

                [JsonPropertyName("outs-1B")]
                public int Outs1B { get; set; }

                [JsonPropertyName("outs-2B")]
                public int Outs2B { get; set; }

                [JsonPropertyName("outs-3B")]
                public int Outs3B { get; set; }

                [JsonPropertyName("outs-CF")]
                public int OutsCF { get; set; }

                [JsonPropertyName("outs-LF")]
                public int OutsLF { get; set; }

                [JsonPropertyName("outs-RF")]
                public int OutsRF { get; set; }

                [JsonPropertyName("outs-SS")]
                public int OutsSS { get; set; }

                [JsonPropertyName("1ST2OUT%")]
                public double First2OUTPercentage { get; set; }
                [JsonPropertyName("2STRIKES")]
                public int _2STRIKES { get; set; }
            }
            public class General
            {
                public int GP { get; set; }
            }
            public class Offense
            {
                public int H { get; set; }
                public int R { get; set; }

                [JsonPropertyName("1B")]
                public int _1B { get; set; }
                [JsonPropertyName("2B")]
                public int _2B { get; set; }
                [JsonPropertyName("3B")]
                public int _3B { get; set; }

                [JsonPropertyName("6+")]
                public int _6 { get; set; }
                public int AB { get; set; }
                public int BB { get; set; }

                [JsonPropertyName("C%")]
                public double C { get; set; }
                public int CI { get; set; }
                public int CS { get; set; }
                public int FC { get; set; }
                public int GB { get; set; }
                public int GP { get; set; }
                public int HR { get; set; }
                public int OB { get; set; }
                public int OS { get; set; }
                public int PA { get; set; }
                public int PS { get; set; }
                public int SB { get; set; }
                public int SM { get; set; }
                public int SO { get; set; }
                public int SW { get; set; }
                public int TB { get; set; }
                public int TS { get; set; }

                [JsonPropertyName("6+%")]
                public double SixPitchABPercentage { get; set; }
                public double AVG { get; set; }

                [JsonPropertyName("CB%")]
                public double CB { get; set; }

                [JsonPropertyName("CH%")]
                public double CH { get; set; }

                [JsonPropertyName("CT%")]
                public double CT { get; set; }

                [JsonPropertyName("DB%")]
                public double DB { get; set; }

                [JsonPropertyName("DC%")]
                public double DC { get; set; }

                [JsonPropertyName("FB%")]
                public double FB { get; set; }
                public int FLB { get; set; }

                [JsonPropertyName("GB%")]
                public double OffenseGB { get; set; }
                public int HBP { get; set; }
                public int INP { get; set; }

                [JsonPropertyName("KB%")]
                public double KB { get; set; }

                [JsonPropertyName("KC%")]
                public double KC { get; set; }
                public int LND { get; set; }
                public int LOB { get; set; }
                public double OBP { get; set; }
                public double OPS { get; set; }

                [JsonPropertyName("OS%")]
                public double OffenseOS { get; set; }
                public int OSS { get; set; }
                public int PIK { get; set; }
                public int QAB { get; set; }

                [JsonPropertyName("RB%")]
                public double RB { get; set; }
                public int RBI { get; set; }
                public int ROE { get; set; }

                [JsonPropertyName("SB%")]
                public double OffenseSB { get; set; }

                [JsonPropertyName("SC%")]
                public double SC { get; set; }
                public int SHB { get; set; }
                public int SHF { get; set; }

                [JsonPropertyName("SL%")]
                public double SL { get; set; }
                public double SLG { get; set; }

                [JsonPropertyName("SM%")]
                public double OffenseSM { get; set; }
                public int SOL { get; set; }

                [JsonPropertyName("SW%")]
                public double OffenseSW { get; set; }
                public int XBH { get; set; }

                [JsonPropertyName("2S+3")]
                public int _2S3 { get; set; }

                [JsonPropertyName("BB/K")]
                public double BBK { get; set; }

                [JsonPropertyName("FLB%")]
                public double OffenseFLB { get; set; }
                public int FULL { get; set; }
                public int GIDP { get; set; }
                public int GITP { get; set; }
                public int GSHR { get; set; }
                public int HARD { get; set; }

                [JsonPropertyName("LND%")]
                public double OffenseLND { get; set; }
                public int LOBB { get; set; }
                public int OSSM { get; set; }
                public int OSSW { get; set; }

                [JsonPropertyName("QAB%")]
                public double OffenseQAB { get; set; }
                public int WEAK { get; set; }

                [JsonPropertyName("2S+3%")]
                public double Offense2S3 { get; set; }

                [JsonPropertyName("AB/HR")]
                public double ABHR { get; set; }
                public double BABIP { get; set; }
                public int HRISP { get; set; }

                [JsonPropertyName("PA/BB")]
                public double PABB { get; set; }

                [JsonPropertyName("PS/PA")]
                public double PSPA { get; set; }
                public int ABRISP { get; set; }
                public int _2OUTRBI { get; set; }
                public int _3OUTLOB { get; set; }

                [JsonPropertyName("BA/RISP")]
                public double BARISP { get; set; }
                public int _2STRIKES { get; set; }
            }
        }
    }

}

export interface CoinDetailType {
  tickers?: Array<{
    base: string;
    target: string;
    market: {
      name: string;
      identifier: string;
      has_trading_incentive: boolean;
    };
    last: number;
    volume: number;
    converted_last: { [key: string]: number };
    converted_volume: { [key: string]: number };
    trust_score: string;
    bid_ask_spread_percentage: number;
    timestamp: string;
    last_traded_at: string;
    last_fetch_at: string;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url?: string;
    token_info_url?: string | null;
    coin_id: string;
    target_coin_id: string;
  }>;
  developer_data?: {
    forks?: number;
    stars?: number;
    subscribers?: number;
    total_issues?: number;
    closed_issues?: number;
    pull_requests_merged?: number;
    pull_request_contributors?: number;
    code_additions_deletions_4_weeks?: {
      additions?: number;
      deletions?: number;
    };
    commit_count_4_weeks?: number;
  };
  market_data?: {
    current_price?: { [key: string]: number };
    ath?: { [key: string]: number };
    ath_change_percentage?: { [key: string]: number };
    ath_date?: { [key: string]: string };
    atl?: { [key: string]: number };
    atl_change_percentage?: { [key: string]: number };
    atl_date?: { [key: string]: string };
    market_cap?: { [key: string]: number };
    fully_diluted_valuation?: { [key: string]: number };
    total_volume?: { [key: string]: number };
    high_24h?: { [key: string]: number };
    low_24h?: { [key: string]: number };
    price_change_24h?: number;
    price_change_percentage_24h?: number;
    price_change_percentage_7d?: number;
    price_change_percentage_14d?: number;
    price_change_percentage_30d?: number;
    price_change_percentage_60d?: number;
    price_change_percentage_200d?: number;
    price_change_percentage_1y?: number;
    market_cap_change_24h?: number;
    market_cap_change_percentage_24h?: number;
    price_change_24h_in_currency?: { [key: string]: number };
    price_change_percentage_1h_in_currency?: { [key: string]: number };
    price_change_percentage_24h_in_currency?: { [key: string]: number };
    price_change_percentage_7d_in_currency?: { [key: string]: number };
    price_change_percentage_14d_in_currency?: { [key: string]: number };
    price_change_percentage_30d_in_currency?: { [key: string]: number };
    price_change_percentage_60d_in_currency?: { [key: string]: number };
    price_change_percentage_200d_in_currency?: { [key: string]: number };
    price_change_percentage_1y_in_currency?: { [key: string]: number };
    market_cap_change_24h_in_currency?: { [key: string]: number };
    market_cap_change_percentage_24h_in_currency?: { [key: string]: number };
    total_supply?: number;
    max_supply?: number;
    max_supply_infinite?: boolean;
    circulating_supply?: number;
    last_updated?: string;
  };
  community_data?: {
    facebook_likes?: number | null;
    reddit_average_posts_48h?: number;
    reddit_average_comments_48h?: number;
    reddit_subscribers?: number;
    reddit_accounts_active_48h?: number;
    telegram_channel_user_count?: number | null;
  };
  id: string;
  name: string;
  symbol: string;
  hashing_algorithm?: string;
  categories?: string[];
  description?: { [key: string]: string };
  image?: { thumb?: string; small?: string; large?: string };
  country_origin?: string;
  genesis_date?: string;
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  watchlist_portfolio_users?: number;
  market_cap_rank?: number;
  links?: {
    homepage?: string[];
    whitepaper?: string;
    blockchain_site?: string[];
    official_forum_url?: string[];
    chat_url?: string[];
    announcement_url?: string[];
    snapshot_url?: string | null;
    twitter_screen_name?: string;
    facebook_username?: string;
    bitcointalk_thread_identifier?: number | null;
    telegram_channel_identifier?: string;
    subreddit_url?: string;
    repos_url?: {
      github?: string[];
      bitbucket?: string[];
    };
  };
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

export interface MarketCoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number | null;
  market_cap: number;
  total_volume: number;
}

export interface GlobalStats {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
  active_exchanges: number;
}

export interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    score: number;
    thumb: string;
    small: string;
    large: string;
  };
}

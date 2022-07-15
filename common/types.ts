export type CountryCode =
  | "ae"
  | "ar"
  | "au"
  | "be"
  | "bh"
  | "br"
  | "ca"
  | "ch"
  | "cl"
  | "cn"
  | "cy"
  | "de"
  | "es"
  | "fi"
  | "fj"
  | "fr"
  | "gi"
  | "gr"
  | "hk"
  | "id"
  | "ie"
  | "il"
  | "it"
  | "jp"
  | "ky"
  | "ma"
  | "mx"
  | "ng"
  | "nl"
  | "no"
  | "nz"
  | "pl"
  | "ro"
  | "ru"
  | "sa"
  | "se"
  | "sg"
  | "th"
  | "tr"
  | "ua"
  | "uk"
  | "us"
  | "vn"
  | "za";

export interface Transaction {
  id: string;
  amount: number;
  bank_country_code: string;
  latency: number;
}

export interface FraudCheckedTransaction {
  id: string;
  fraudulent: boolean;
}

export interface PrioriMemo {
  maxAmount: number;
  transactions: Array<Transaction>;
}

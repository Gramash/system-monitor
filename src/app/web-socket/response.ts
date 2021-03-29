export interface Response {
  cpu?: CPU;
  ram?: RAM;
  diskIO?: DiskIO;
}

export interface CPU {
  load: number;
  idle: number;
}

export interface RAM {
  total: number;
  free: number;
  used: number;
  cache: number;
}

export interface DiskIO {
  read: number;
  write: number;
}

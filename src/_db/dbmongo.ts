export class DBConnection {
  config: any;
  constructor() {
    this.config = {
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      server: process.env.DB_SERVER,
      user: process.env.DB_USER,
    };
  }

  uri() {
    const authstr: string =
      this.config.user === ''
        ? ''
        : `${this.config.user}:${this.config.password}/`;
    const uri = `mongodb://${authstr}${this.config.server}:${this.config.port}/${this.config.database}`;
    return uri;
  }
}

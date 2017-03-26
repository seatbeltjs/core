import { Log } from '../../log';

export class BootApp {
  private log = new Log('Seatbelt-Startup');
  public init() {
    this.log.system('Booting App');
  }
}

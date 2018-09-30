export class ResetPasswordModel {
  public logonId: string;
  public challengeAnswer: string;


  constructor(logonId: string, challengeAnswer: string) {
    this.logonId = logonId;
    this.challengeAnswer = challengeAnswer;
  }
}

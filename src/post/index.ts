export interface IPost {
  post: any;
}

export class Post implements IPost {
  public post() {
    console.log('post strapped');
  }
}
